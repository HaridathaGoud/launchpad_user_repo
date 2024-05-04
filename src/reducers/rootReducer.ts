import apiCalls, { getKyc, getMinting, postMinting } from '../utils/api';
const SET_USER_ID: string = 'setUserID';
const SET_IS_STAKER: string = 'Staker';
const WALLET_ADDRESS: String = 'walletAddress';
const SET_TOKEN = "setToken";
const HANDLE_FETCH_METADATA = 'handleFetchMetaData';
const HANDLE_FETCH_DAO_DATA='handleFetchDaoCardData'
const HANDLE_FETCH_MEMBERTYPE = 'handleFetchMemberType';
const HANDLE_FETCH_MEMBERPRICE = 'handleFetchMemberPrice';
const SET_ISCUSTOMER_REGISTER="setIscustomerRegister";
const SET_CUSTOMER_REGISTER="setCustomerRegister";
const FETCH_WHITELISTING_DETAILS = "fetchWhitelistDetails";
const FETCH_WHITELISTING_DATA = "fetchwhitelistingdata";
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
const setCustomerRegister=(payload)=>{
  return {
    type: SET_CUSTOMER_REGISTER,
    payload,
  };
}
const handleFetchMemberPrice = (payload) => {
  return {
    type: HANDLE_FETCH_MEMBERPRICE,
    payload,
  };
};
const handleFetchMetaData = (payload) => {
  return {
    type: HANDLE_FETCH_METADATA,
    payload,
  };
};
const handleFetchDaoCardData = (payload) => {
  return {
    type: HANDLE_FETCH_DAO_DATA,
    payload,
  };
};
const handleFetchMemberType = (payload) => {
  return {
    type: HANDLE_FETCH_MEMBERTYPE,
    payload,
  };
};
const setIscustomerRegister=(payload)=>{
  return {
    type: SET_ISCUSTOMER_REGISTER,
    payload,
  };
}
const fetchwhitelistingdata = (payload :any) => {
  return {
    type: FETCH_WHITELISTING_DATA,
    payload,
  };
};
const fetchWhitelistDetails = (payload :any) => {
  return {
    type: FETCH_WHITELISTING_DETAILS,
    payload,
  };
};
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

const getDaoCardList = (callback: any) => {
  return async (dispatch: any) => {
    dispatch(handleFetchDaoCardData({ key: 'daoCardList', loading: true, data: [] }));
    const res = await apiCalls.getMIntDaoDetails(10, 0);
    if (res) {
      dispatch(handleFetchDaoCardData({ key: 'daoCardList', loading: false, data: res.data, error: null }));
      if (callback){
      callback({ loading: false, data: res.data, error: null});
      }
    } else {
      dispatch(
        handleFetchDaoCardData({
          key: 'daoCardList',
          loading: false,
          data: {},
          error: res,
        }),
      );
    }
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
const getCustomerRegisterDetails = (customerId) => {
  return async (dispatch: any) => {
    dispatch(setIscustomerRegister({ key: 'customerRegisterDetails',loading: true, data: null }));
    getMinting(`User/iscustomerregister/${customerId}`).then((res) => {
      dispatch(setIscustomerRegister({ key: 'customerRegisterDetails',loading: true,   data: null }));
      if (res) {
        dispatch(setIscustomerRegister({ key: 'customerRegisterDetails', loading: false, data: res.data, error: null }));
      } else {
        dispatch(
          setIscustomerRegister({key: 'customerRegisterDetails',loading: false,  data: null, error: isErrorDispaly(res),}),
        );
      }
    });
  };
};
const setSaveRegistration = (obj:any,callback) => {
  return async (dispatch: any) => {
    dispatch(setCustomerRegister({ key: 'setCustomerRegisterDetails', loading: true, data: null }));
    postMinting(`User/saveregistration`,obj).then((res) => {
      dispatch(setCustomerRegister({ key: 'setCustomerRegisterDetails', loading: true, data: null }));
      if (res) {
        dispatch(setCustomerRegister({ key: 'setCustomerRegisterDetails',loading: false, data: res.data, error: null }));
        callback(res.data)
      } else {
        dispatch(
          setCustomerRegister({key: 'setCustomerRegisterDetails',loading: false, data: null, error: isErrorDispaly(res),}),
        );
      }
    });
  };
};
const getMemberPrice = (crypto: string, selectedId: any, count: any,callback) => {
  return async (dispatch: any) => {
    dispatch(handleFetchMemberPrice({ key: 'memberPrice', loading: true, data: [] }));
    getMinting(`User/GetMemberShipPrice/${crypto}/${selectedId}/${count}`).then((res) => {
      if (res) {
        dispatch(handleFetchMemberPrice({ key: 'memberPrice', loading: false, data: res.data, error: null }));
       callback(res.data)
      } else {
        dispatch(
          handleFetchMemberPrice({
            key: 'memberPrice',
            loading: false,
            data: [],
            error: isErrorDispaly(res),
          }),
        );
      }
    });
  };
};
const getWhiteListDetails = (id : any,whitListId:any) => {
  return async (dispatch: any) => {
    dispatch(fetchWhitelistDetails({ key: 'fetchWhitelistDetails', loading: true, data: [] }));
    getMinting(`User/membertasks/${id}/${whitListId}`).then((res) => {
      if (res) {
        dispatch(fetchWhitelistDetails({ key: 'fetchWhitelistDetails', loading: false, data: res.data, error: null }));
      } else {
        dispatch(
          fetchWhitelistDetails({
            key: 'fetchWhitelistDetails',
            loading: false,
            data: [],
            error: isErrorDispaly(res),
          }),
        );
      }
    }
    )
  };
};
const getWhiteListData=(id : any)=>{   
  return async (dispatch : any) => {
    try{
    dispatch(fetchwhitelistingdata({ key: 'fetchwhitelistingdata', loading: true, data: [] }));
          const response = await  getMinting(`User/whitelistingK/${id}`)
          if (response) {
              if(response.data){
                dispatch(fetchwhitelistingdata({ key: 'fetchwhitelistingdata', loading: false, data:  response.data, error: null }));
          }
      }
    } catch (error) {
      dispatch(
                  fetchwhitelistingdata({
                    key: 'fetchwhitelistingdata',
                    loading: false,
                    data: [],
                    error: isErrorDispaly(error),
                  }),
                );
  }
  
}
}
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
      const response =await getKyc(`User/GetAuthorizationToken/${data?.id}`)
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
  token:null,
  selectedCollection: null,
  popUpEdit:null,
  metaDataDetails: null,
  memberType: null,
  memberPrice: null,
  customerRegisterDetails:{loading: false, data: null,error:null},
  setCustomerRegisterDetails:{loading: false, data: null,error:null},
  fetchWhitelistDetails:{loading: false, data: null,error:null},
  fetchwhitelistingdata:{loading: false, data: null,error:null},
};

const rootReducer = (state: any, { type, payload }) => {
  state=state ||  initialState
  switch (type) {
    case HANDLE_FETCH_METADATA:
      return {
        ...state,
        [payload.key]: {
          data: payload.data,
          error: payload.error,
          isLoading: payload.loading,
        },
      };
      case HANDLE_FETCH_DAO_DATA:
        return {
          ...state,
          [payload.key]: {
            data: payload.data,
            error: payload.error,
            isLoading: payload.loading,
          },
        };
      case HANDLE_FETCH_MEMBERTYPE:
        return {
          ...state,
          [payload.key]: {
            data: payload.data,
            error: payload.error,
            isLoading: payload.loading,
          },
        };
        case SET_ISCUSTOMER_REGISTER:
          return {
            ...state,
            [payload.key]: {
              data: payload.data,
              error: payload.error,
              isLoading: payload.loading,
            },
          };
          case FETCH_WHITELISTING_DETAILS:
            return {
              ...state,
              [payload.key]: {
                data: payload.data,
                error: payload.error,
                isLoading: payload.loading,
              },
            };
            case FETCH_WHITELISTING_DATA:
              return {
                ...state,
                [payload.key]: {
                  data: payload.data,
                  error: payload.error,
                  isLoading: payload.loading,
                },
              };
              case SET_CUSTOMER_REGISTER:
                return {
                  ...state,
                  [payload.key]: {
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
    default:
      return state;
  }
};

export default rootReducer;
export { setUserID, 
  getTokenDetails,
  Staker,
  handleFetchMetaData,
  handleFetchDaoCardData,
  getDaoCardList,
  getMetaDataDetails,
  handleFetchMemberType,
  getCustomerRegisterDetails,
  setIscustomerRegister,
  getMemberTypes,
  walletAddress,
  setSaveRegistration,
  setToken };
