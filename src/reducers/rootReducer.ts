import { getKyc, getMinting } from '../utils/api';
const SET_USER_ID: string = 'setUserID';
const SET_IS_STAKER: string = 'Staker';
const WALLET_ADDRESS: string = 'walletAddress';
const SET_TOKEN = "setToken";
const HANDLE_FETCH_METADATA = 'handleFetchMetaData';
const HANDLE_FETCH_MEMBERTYPE = 'handleFetchMemberType';
const SET_ARCANA_USER_DETAILS='setArcanaUserDetails';
const setUserID = (payload: string) => {
  return {
    type: SET_USER_ID,
    payload,
  };
};
const Staker = (payload: string) => {
  return {
    type: SET_IS_STAKER,
    payload,
  };
};
const walletAddress = (payload: string) => {
  return {
    type: WALLET_ADDRESS,
    payload,
  };
};
const setToken = (payload) => {
  return {
      type: SET_TOKEN,
      payload
  }
};
const handleFetchMetaData = (payload) => {
  return {
    type: HANDLE_FETCH_METADATA,
    payload,
  };
};
const handleFetchMemberType = (payload) => {
  return {
    type: HANDLE_FETCH_MEMBERTYPE,
    payload,
  };
};
const setArcanaUserDetails=(payload)=>{
  return {
    type:SET_ARCANA_USER_DETAILS,
    payload
  }
}
const getMetaDataDetails = (count: any,daoId, callback: any) => {
  return async (dispatch: any) => {
    dispatch(handleFetchMetaData({ key: 'metaDataDetails', loading: true, data: [] }));
    getMinting(`User/mintfiles/${count}/${daoId}`).then((res) => {
      if (res) {
        dispatch(handleFetchMetaData({ key: 'metaDataDetails', loading: false, data: res.data, error: null }));
        callback(res.data);
      } else {
        dispatch(
          handleFetchMetaData({
            key: 'metaDataDetails',
            loading: false,
            data: [],
            error: isErrorDispaly(res),
          }),
        );
      }
    });
  };
};

const getMemberTypes = (daoId,customerId,callback) => {
  return async (dispatch: any) => {
    dispatch(handleFetchMemberType({ key: 'memberType', loading: true, data: [], error: null }));
    getMinting(`User/GetMemberShipType/${daoId}/${customerId}`).then((res) => {
      if (res) {
        dispatch(handleFetchMemberType({ key: 'memberType', loading: false, data: res.data, error: null }));
        if (callback)
          callback({ loading: false, data: res.data, error: null});
      } else {
        dispatch(
          handleFetchMemberType({
            key: 'memberType',
            loading: false,
            data: [],
            error: isErrorDispaly(res),
          }),
        );
      }
    });
  };
};
const isErrorDispaly = (objValue: any) => {
  if (objValue?.status >= 400 && objValue?.status < 500 && objValue?.status != 401) {
    return 'Something went wrong please try again!';
  } else {
    if (objValue?.data && typeof objValue?.data === 'string') {
      return objValue?.data;
    } else if (objValue?.data && objValue?.data.title && typeof objValue?.data.title) {
      return objValue?.data.title;
    } else if (objValue?.originalError && typeof objValue?.originalError.message === 'string') {
      return objValue?.originalError.message;
    } else {
      return 'Something went wrong please try again!';
    }
  }
};

const getTokenDetails=(data:any,dispatchCustomerDetails:Function |null)=>{
  return async (dispatch: any) => {
    try{
      const response =await getKyc(`User/GetAuthorizationToken/${data?.id || ""}`)
      if((response.statusText.toLowerCase()==='ok' || response.status===200) && response.data){
        await dispatch(setToken(response.data))
        dispatchCustomerDetails?.(data)
      }else{
        return isErrorDispaly(response)
      }
    }catch(error){
      return isErrorDispaly(error)
    }
  }
}
const initialState = {
  user: { id: '', name: '' },
  isStaker: false,
  address: null,
  token:"",
  metaDataDetails: null,
  memberType: null,
  memberPrice: null,
  arcanaUser:{isLoggedIn:false,email:''}
};

const rootReducer = (state: any, { type, payload }) => {
  state=state ||  initialState
  switch (type) {
    case HANDLE_FETCH_METADATA:
      return {
        ...state,
        metaDataDetails: {
          data: payload.data,
          error: payload.error,
          isLoading: payload.loading,
        },
      };
      case HANDLE_FETCH_MEMBERTYPE:
        return {
          ...state,
          memberType: {
            data: payload.data,
            error: payload.error,
            isLoading: payload.loading,
          },
        };
    case SET_USER_ID:
      state = { ...state, user: payload };
      return state;
    case SET_IS_STAKER:
      state = { ...state, isStaker: payload };
      return state;
    case WALLET_ADDRESS:
      state = { ...state, address: payload };
      return state;
      case SET_TOKEN:
        state={...state,token:payload} ;
        return state;
      case SET_ARCANA_USER_DETAILS:
        state={...state,arcanaUser:payload} ;
        return state;
    default:
      return state;
  }
};

export default rootReducer;
export { setUserID, 
  getTokenDetails,
  Staker,
  getMetaDataDetails,
  getMemberTypes,
  walletAddress,
  setToken,
  setArcanaUserDetails };
