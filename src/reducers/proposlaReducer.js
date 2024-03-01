import apiCalls from "../utils/api";
const SET_DAOS = "setDaos";
const SET_PROPOSALS="setProposals"
const PROPOSAL_DETAILS_LIST = "proposalDetailsList";
const LOOKUP_CALL = "setProposalStatusLookUp";
const PROPOSAL_DATA = "proposalData";
const SAVE_PROPOSAL = "saveProposal";
const CON_DETAILS_DATA = "setConDetailsData";
const PROPOSAL_VIEW_DATA = "setProposalViewData";
const ISCHECKSEEMORE = "isCheckSeeMore";
const REFERRAL = "referral";

const setDaos = (payload) => {
  return {
    type: SET_DAOS,
    payload,
  };
}
const setProposals=(payload)=>{
  return {
    type:SET_PROPOSALS,
    payload,
  }
}
const isCheckSeeMore = (payload) => {
  return {
    type: ISCHECKSEEMORE,
    payload
  }
};

const setProposalStatusLookUp = (payload) => {
  return {
    type: LOOKUP_CALL,
    payload
  }
};

const proposalData = (payload) => {
  return {
    type: PROPOSAL_DATA,
    payload
  }
};

const saveProposal = (payload) => {
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

const clearDaos=()=>{
  return (dispatch) => {
    dispatch(setDaos({loading:false,data:null,nextPage:1}))
}
}
const clearProposals=()=>{
  return (dispatch) => {
    dispatch(setProposals({loading:false,data:null,nextPage:1}))
}
}

const clearLookup=()=>{
  return (dispatch)=>{
    dispatch(setProposalStatusLookUp({loading: false, data: ['All'], error: ''}))
  }
}
const getDaos = (information) => {
  const {take,page,data}=information;
  const skip=take*(page)-take;
  return async (dispatch) => {
    dispatch(setDaos({ key: 'daos', loading: true, data: data}));
    try{
      const res = await apiCalls.getDaoDetails(take, skip);
      if (res.status===200) {
        dispatch(setDaos({ key: 'daos', loading: false, data: data ?[...data,...res.data]:res.data, error: null,nextPage:page+1 }));
      } else {
        dispatch(
          setDaos({
            key: 'daos',
            loading: false,
            data: data,
            error: res,
          }),
        );
      }
    }catch(error){
      dispatch(
        setDaos({
          key: 'daos',
          loading: false,
          data: data,
          error: error,
        }),
      );
    } 
  };
}

const getReferralData = (id, pageNo, pageSize, callback) => {
  const skip = pageNo * pageSize - pageSize;
  const take = pageSize;
  return async (dispatch) => {
    const response = await apiCalls.customerReferraal(id, take, skip)
    if (response) {
      if (callback) {
        callback(response)
      }
      dispatch({ type: 'referralData', payload: response.data });
    }
  }
}


const getProposals=(information)=>{
  const {take,page,data, daoId, status, search, startDate, endDate}=information;
  const skip=take*(page)-take;
  return async (dispatch) => {
    dispatch(setProposals({loading: true, data: data,error:''}));
    try{
      const res = await apiCalls.getProposalList(take, skip, daoId, status, search, startDate, endDate);
      if (res.status===200) {
        dispatch(setProposals({ loading: false, data: data ?[...data,...res.data]:res.data, error: '',nextPage:page+1 }));
      } else {
        dispatch(
          setProposals({
            loading: false,
            data: data,
            error: res,
          }),
        );
      }
    }catch(error){
      dispatch(
        setProposals({
          loading: false,
          data: data,
          error: error,
        }),
      );
    } 
  };
}
const getProposalStatusLookup = () => {
  return async (dispatch) => {
    dispatch(setProposalStatusLookUp({ loading: true, data: ['All'], error: '' }));
    try{
      const response = await apiCalls.getStatusLu();
      if (response.status===200) {
        dispatch(setProposalStatusLookUp({loading: false, data: response.data, error: '' }));
      }else{
        dispatch(setProposalStatusLookUp({loading: false, data: ['All'], error: response }));
      }
    }catch(error){
      dispatch(setProposalStatusLookUp({ loading: false, data: ['All'], error: error }));
    }
    
  }
}
const contractDetailsData = (dao) => {
  return async (dispatch) => {
    dispatch(setConDetailsData({ key: "contractDetails", loading: true, data: null }));
    const response = await apiCalls.getContractDetails(dao.daoId);
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

const saveProposalCall = (saveObj, callback) => {
  return async (dispatch) => {
    dispatch(saveProposal({ key: 'saveProposal', loading: true, data: null, error: null }))
    let obj = {
      id: "00000000-0000-0000-0000-000000000000",
      customerId: saveObj?.customerId,
      daoId: saveObj?.daoId,
      title: saveObj?.title,
      description: saveObj?.description,
      titleHash: saveObj.titleHash,
      startTime: saveObj?.startTime,
      endTime: saveObj?.endTime,
      membershipsCount: saveObj.membershipsCount,
      proposalType: saveObj.proposalType,
      proposalOptionDetails: saveObj?.proposalOptionDetails
    }
    let response = await apiCalls.postCreateProposal(obj)
    if (response) {
      dispatch(saveProposal({ key: 'saveProposal', loading: false, data: response.data, error: null }));
      if (callback) {
        callback({ loading: false, data: response.data, error: null });
      }
    } else {
      dispatch(saveProposal({ key: 'saveProposal', loading: false, data: null }));
      if (callback) {
        callback({ loading: false, data: response.data, error: null });
      }
    }
  }
}
let initialState = {
  daos: {loading:false,data:null,nextPage:1},
  proposals: {loading: false, data: null,error:'',nextPage:1},
  proposalStatusLookup: {loading:false,data:['All'],error:''},
  proposalDetails: {},
  saveProposal: {},
  contractDetails: {},
  proViewData: {},
  isCheckSeeMore: false,
  referralData: {}
};

const proposlaReducer = (state, action) => {
  if (!state) {
    state = {
      ...initialState,
      ...state
    }
  }


  switch (action.type) {
    case SET_DAOS:
      return {
        ...state, daos: {
          data: action.payload.data,
          error: action.payload.error,
          loading: action.payload.loading,
          nextPage:action.payload.nextPage || state?.['daos'].nextPage
        },
      };
    case SET_PROPOSALS:
      return {
        ...state, proposals: {
          data: action.payload.data,
          error: action.payload.error,
          loading: action.payload.loading,
          nextPage:action.payload.nextPage || state?.['proposals'].nextPage
        },
      };
    case PROPOSAL_DETAILS_LIST:
      state = { ...state, proposalDetailsList: (action.pageNo === 1 ? [...action.payload] : [...state.proposalDetailsList, ...action.payload,]) }//loading:action.payload,error:action.payload
      return state;
    case LOOKUP_CALL:
      state = { ...state, proposalStatusLookup: { ...state['proposalStatusLookup'], ...action.payload } }
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
  getDaos, getReferralData,
  setDaos, getProposalStatusLookup, proposalData, saveProposalCall, proposalViewData, contractDetailsData, isCheckSeeMore,clearDaos,getProposals,clearProposals,clearLookup
};