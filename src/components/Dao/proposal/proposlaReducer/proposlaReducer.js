import apiCalls from "../../../../utils/api";
const SET_CUSROMER_WALLETADDRESS = "setCustomerWalletAddress";
const PROPOSAL_DETAILS_LIST = "proposalDetailsList";
const LOOKUP_CALL = "lookUp";
const PROPOSAL_DATA = "proposalData";
const SAVE_PROPOSAL ="saveProposal";
const CON_DETAILS_DATA = "setConDetailsData";
const PROPOSAL_VIEW_DATA = "setProposalViewData";
const ISCHECKSEEMORE = "isCheckSeeMore";
const REFERRAL = "referral";

const setCustomerWalletAddress = (payload) => {
    return {
      type: SET_CUSROMER_WALLETADDRESS,
      payload,
    };
  }
  const  isCheckSeeMore= (payload) => {
    return {
        type: ISCHECKSEEMORE,
        payload
    }
};
 
const  lookUp= (payload) => {
  return {
      type: LOOKUP_CALL,
      payload
  }
};

const  proposalData= (payload) => {
  return {
      type: PROPOSAL_DATA,
      payload
  }
};

const  saveProposal= (payload) => {
  return {
      type: SAVE_PROPOSAL,
      payload
  }
};
const setProposalViewData = (payload) => {
  return {
      type: PROPOSAL_VIEW_DATA,
      payload
  }
};
const setConDetailsData = (payload) => {
  return {
      type: CON_DETAILS_DATA,
      payload
  }
};
  const walletAddressChecking = (callback) => {
    return async (dispatch) => {
      dispatch(setCustomerWalletAddress({ key: 'getWalletAddressChecking', loading: true, data: {} }));
      const res = await apiCalls.getDaoDetails(8, 0);
      if (res) {
        dispatch(setCustomerWalletAddress({ key: 'getWalletAddressChecking', loading: false, data: res.data, error: null }));
        if (callback){
        callback({ loading: false, data: res.data, error: null});
        }
      } else {
        dispatch(
          setCustomerWalletAddress({
            key: 'getWalletAddressChecking',
            loading: false,
            data: {},
            error: res,
          }),
        );
      }
    };
  }

  const getReferralData = (id,pageNo,pageSize,callback)=>{
    const skip = pageNo * pageSize - pageSize;
    const take = pageSize;
    return async (dispatch) => {
    const response = await apiCalls.customerReferraal(id,take,skip)
    if (response) {            
      if(callback){
        callback(response)
      }
      dispatch({ type: 'referralData', payload:response.data}); 
    }
    }
  }

  const getCardsProposalList = (pageNo,pageSize,dao,status,search,startDate,endDate,callback) => {
    const skip = pageNo * pageSize - pageSize;
    const take = pageSize;
    return async (dispatch) => {
      dispatch({ type: 'isCheckSeeMore', payload:null,loading:true });
         const response = await apiCalls.getProposalList( take,skip,dao,status,search,startDate,endDate);
         if (response) {             
            let MergeGridData = [...response.data];
            dispatch({ type: 'proposalDetailsList', payload: MergeGridData,pageNo,loading:false,});
            dispatch({ type: 'isCheckSeeMore', payload:response.data?.length>=5 ? true : false,loading:false }); 
            if(callback){
              callback(response)
            }
         } else {         
          if(callback){
            callback(response)
          }
          dispatch({ type: 'proposalDetailsList', payload: [],loading:false });
        }
     }
 }
 const getLookUp =(getLookUpCall)=>{
  return async (dispatch) => {
    dispatch(lookUp({ key: 'lookUp', loading: true, data: {},error:null }));
      const response = await apiCalls.getStatusLu();
      if (response) {
          dispatch(lookUp(response.data));
          dispatch(lookUp({ key: 'lookUp', loading: false, data: response.data,error:null }));
          if (getLookUpCall){
            getLookUpCall(response.data)
          }
      }

  }
}
const contractDetailsData = (dao) => {
  return async (dispatch) => {
      dispatch(setConDetailsData({ key: "contractDetails", loading: true, data: null }));
      const response = await apiCalls.getContractDetails(dao.id);
      dispatch(setConDetailsData({ key: "contractDetails", loading: false, data: response.data, error: null }));
      if (response) {
          dispatch(setConDetailsData(response.data))
      } else {
          dispatch(setConDetailsData({
              key: "contractDetails",
              loading: false, data: null,
              error: apiCalls.isErrorDispaly(response)
          }));
      }

  }
}
const proposalViewData = (proposalId) => {
  return async (dispatch) => {
      dispatch(setProposalViewData({ key: "proViewData", loading: true, data: null }));
      const response = await apiCalls.getProposalView(proposalId);
      dispatch(setProposalViewData({ key: "proViewData", loading: false, data: response.data, error: null }));
      if (response) {
          dispatch(setProposalViewData(response.data))
      } else {
          dispatch(setProposalViewData({
              key: "proViewData",
              loading: false, data: null,
              error: apiCalls.isErrorDispaly(response)
          }));
      }

  }
}

const saveProposalCall = (saveObj,callback)=>{
  return async (dispatch) => {
      dispatch (saveProposal({ key: 'saveProposal', loading: true, data: null,error:null }))
      let obj={
        id: "00000000-0000-0000-0000-000000000000",
        customerId: saveObj?.customerId,
        daoId: saveObj?.daoId,
        title: saveObj?.title,
        description:saveObj?.description,
        titleHash:saveObj.titleHash,
        startTime: saveObj?.startTime,
        endTime: saveObj?.endTime,
        membershipsCount:saveObj.membershipsCount,
        proposalType:saveObj.proposalType,
        proposalOptionDetails:saveObj?.proposalOptionDetails
    }
      let response = await apiCalls.postCreateProposal(obj)
      if(response){
          dispatch (saveProposal({ key: 'saveProposal', loading: false, data: response.data,error:null }));
          if (callback){
            callback({ loading: false, data: response.data, error: null});
          }
      }else{
          dispatch(saveProposal({ key: 'saveProposal', loading: false, data: null}));
          if (callback){
          callback({ loading: false, data: response.data, error: null});
          }
      }
  }
  }
  let initialState = {
    getWalletAddressChecking: {},
    proposalDetailsList:[],
    lookUp:{},
    proposalDetails:{},
    saveProposal:{},
    contractDetails: {},
    proViewData: {},
    isCheckSeeMore:false,
    referralData:{}
  };

  const proposlaReducer = (state, action) => {
    if (!state) {
      state = {
        ...initialState,
        ...state
      }
    }


    switch (action.type) {
        case SET_CUSROMER_WALLETADDRESS:
            return {
              ...state, [action.payload.key]: {
                data: action.payload.data,
                error: action.payload.error,
                isLoading: action.payload.loading,
              },
            };
            case PROPOSAL_DETAILS_LIST:
              state = { ...state, proposalDetailsList:(action.pageNo === 1 ? [...action.payload] : [...state.proposalDetailsList,...action.payload,])}//loading:action.payload,error:action.payload
              return state;
             case LOOKUP_CALL:
              state = { ...state, [action.payload]:{ ...state[action.payload.key], ...action.payload }}
                        return state; 
                        case ISCHECKSEEMORE:
                          state = { ...state, isCheckSeeMore: action.payload }
                          return state; 
                          case REFERRAL:
                          state = { ...state, referralData: action.payload }
                          return state;
             case PROPOSAL_DATA:
                          state = { ...state, proposalDetails: action.payload }
                          return state;
             case SAVE_PROPOSAL:
                            state = { ...state, saveProposal: action.payload }
                            return state;
             case PROPOSAL_VIEW_DATA:
                              state = { ...state, [action.payload.key]: { ...state[action.payload.key], ...action.payload } };
                              return state;
            case CON_DETAILS_DATA:
                              state = { ...state, [action.payload.key]: { ...state[action.payload.key], ...action.payload } };
                              return state;
                            
      default:
        return state;
    }
  }


  
  export default proposlaReducer;
  export {
    walletAddressChecking,getReferralData,
     setCustomerWalletAddress,getCardsProposalList,getLookUp,proposalData,saveProposalCall,proposalViewData, contractDetailsData,isCheckSeeMore
  };