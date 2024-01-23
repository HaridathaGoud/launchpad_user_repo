import apiCalls from "../utils/api";
const FETCH_PROPOSALVIEW_DATA = "fetchproposalviewdata";
const FETCH_VOTERS_DATA="fetchVotersData";
const SAVE_VOTERS_DATA = "savevoterddata";
const FETCH_CUSTOMERVOTED = "fetchCustomerVoted";

const fetchproposalviewdata = (payload) => {
    return {
        type: FETCH_PROPOSALVIEW_DATA,
        payload
    }
};
const  fetchVotersData= (payload) => {
    return {
        type: FETCH_VOTERS_DATA,
        payload
    }
};
const  savevoterddata= (payload) => {
    return {
        type: SAVE_VOTERS_DATA,
        payload
    }
};
const  fetchCustomerVoted= (payload) => {
    return {
        type: FETCH_CUSTOMERVOTED,
        payload
    }
}
const getProposalViewData = (sub,custId,callback) => {
    return async (dispatch) => {
        dispatch(fetchproposalviewdata({ key: 'fetchproposalviewdata', loading: true, data: {},error:null }));
        dispatch(savevoterddata({ key: 'savevoterddata', loading: false, data: false,error:null }));
        if(sub){ 
         let response= await apiCalls.getProposalView(sub,custId);
         if(response){
            if (callback){
                callback({ loading: false, data: response});
            }
            if(response.data){
                dispatch(fetchproposalviewdata({ key: 'fetchproposalviewdata',data:response.data, loading: false,error:null}));
        }
         }else{
            dispatch(fetchproposalviewdata({ key: 'fetchproposalviewdata',data:null, loading: false,error:apiCalls.isErrorDispaly(response)}));
         }
        }
     }
}
const getVotersGrid = (pageNo, pageSize,id,callback) => {
    const skip = pageNo * pageSize - pageSize;
    const take = pageSize;
    return async (dispatch) => {
            let response = await apiCalls.getProposalVoters(take, skip,id)
            if(response){
                if(response.data){ 
                    let MergeGridData = [...response.data];
                    dispatch({ type: 'fetchVotersData', payload: MergeGridData,pageNo,loading:false });
                    } 
            }else{
                // callback ? callback(response) : ""
                if (callback){
                    callback({ loading: false, data: response});
                }
                dispatch({ type: 'fetchVotersData', payload: [],loading:false });
            }
     }
}
const saveVoting=(obj,callback)=>{
    return async(dispatch) =>{
        const response =  await apiCalls.postSaveVote(obj);
        if(response.ok){
            dispatch(savevoterddata({ key: 'savevoterddata', loading: false, data: true,error:null }));
           // callback ? callback(response) : ""
            if (callback){
                callback({ loading: false, data: response});
            }
        }else{
            dispatch(savevoterddata({ key: 'savevoterddata', loading: false, data:false,error:apiCalls.isErrorDispaly(response)}));
            //callback ? callback(response) : ""
            if (callback){
                callback({ loading: false, data: response});
            }           

        }
    }
}
const getCustomeVoted = (proposalId,customerId,callback) => {
    return async (dispatch) => {
        const response =  await apiCalls.customerVoted(proposalId,customerId);
        if (response) {
            dispatch(fetchCustomerVoted({ key: 'fetchCustomerVoted', loading: false, data: response.data,error:null }));
            //callback ? callback(response?.data) : ""
            if (callback){
                callback({ loading: false, data: response});
            } 
        }
    }
}
let initialState={
    fetchproposalviewdata: {data:{},loading:false,error:null},
    savevoterddata:{data:null,loading:false,error:null},
    // fetchVotersData:{data:[],loading:false,error:null},
    fetchVotersData:[],
    fetchCustomerVoted:null,
}


const votingReducer=(state, action)=>{
    if(!state){
       state={
           ...initialState,
           ...state
       }
    }
       switch (action.type) {
         
               case FETCH_PROPOSALVIEW_DATA:
                   state = { ...state, [action.payload.key]: { ...state[action.payload.key], ...action.payload } };
                  return state;
               case FETCH_VOTERS_DATA:
                    state = { ...state, fetchVotersData:(action.pageNo === 1 ? [...action.payload] : [...state.fetchVotersData,...action.payload])}//loading:action.payload,error:action.payload
                    return state;
               case FETCH_CUSTOMERVOTED:
                   state = { ...state, fetchCustomerVoted: action.payload }
                   return state;
                   case SAVE_VOTERS_DATA:
                    state = { ...state, savevoterddata: action.payload }
                     return state;
             
           default:
               return state;
       }
   }
   export default (votingReducer);
   export {fetchproposalviewdata,getVotersGrid,saveVoting,fetchVotersData,getProposalViewData,
    getCustomeVoted,fetchCustomerVoted};