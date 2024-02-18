import apiCalls from "../utils/api";
const CLEAR_USER_INFO = "clearUserInfo";
const FETCH_PROPOSALVIEW_DATA = "fetchproposalviewdata";
const DAO_DETAILS = "setDaoDetails";
const SET_USER_ID = 'setUserID';
const FETCH_VOTERS_DATA = "fetchVotersData";
const FETCH_DAO_DETAILS = "fetchDaoDetails";
const SAVE_VOTERS_DATA = "savevoterddata";
const FETCH_DAO_SELECTING_DATA = 'fetchSelectingDaoData';
const CUSTOMER_DETAILS = 'user';
const SET_TOKEN = "setToken";

const setToken = (payload) => {
    return {
        type: SET_TOKEN,
        payload
    }
}
const setUserID = (payload) => {
    return {
        type: SET_USER_ID,
        payload,
    };
};

const setDaoDetails = (payload) => {
    return {
        type: DAO_DETAILS,
        payload
    }
};

const savevoterddata = (payload) => {
    return {
        type: SAVE_VOTERS_DATA,
        payload
    }
};
const clearUserInfo = () => {
    return { type: CLEAR_USER_INFO, payload: null }
}

const fetchproposalviewdata = (payload) => {
    return {
        type: FETCH_PROPOSALVIEW_DATA,
        payload
    }
};

const fetchSelectingDaoData = (payload) => {
    return {
        type: FETCH_DAO_SELECTING_DATA,
        payload
    }
}

const fetchDaoDetails = (payload) => {
    return {
        type: FETCH_DAO_DETAILS,
        payload
    }
};
const fetchVotersData = (payload) => {
    return {
        type: FETCH_VOTERS_DATA,
        payload
    }
};
const user = (payload) => {
    return {
        type: CUSTOMER_DETAILS,
        payload
    }
};
const getCustomerDeta = (address, callback) => {
    return async (dispatch) => {
        const response = await apiCalls.customerDetails(address);
        if (response) {
            dispatch(user(response.data));
            //callback ? callback(response) : "";
            if (callback)
            callback({ loading: false, data: response});
        }
    }
}
const getCustomerDetails = (address, callback) => {
    return async (dispatch) => {
        const response = await apiCalls.customerDetails(address);
        if (response) {
            dispatch(user(response.data));
            //callback ? callback(response) : "";
            if (callback)
            callback({ loading: false, data: response});
        }
    }
}
const getDaoData = () => {
    return async (dispatch) => {
        const response = await apiCalls.getDaoDetails(8, 0);
        if (response) {
            dispatch(fetchDaoDetails(response.data))
        }
    }
}
const saveVoting = (obj) => {
    return async (dispatch) => {
        const response = await apiCalls.postSaveVote(obj);
        if (response) {
            dispatch(savevoterddata(obj.status))
        }
    }
}

const getDaoCardDetails = () => {
    return async (dispatch) => {
        const response = await apiCalls.getDaoDetails(8, 0);
        if (response) {
            dispatch(setDaoDetails(response.data))
        }

    }
}

const getVotersGrid = (pageNo, pageSize, id) => {
    const skip = pageNo * pageSize - pageSize;
    const take = pageSize;
    return async (dispatch) => {
        let response = await apiCalls.getProposalVoters(take, skip, id)
        if (response) {
            let MergeGridData = pageNo === 1 ? [...response.data] : [...response.data];
            dispatch({ type: 'fetchVotersData', payload: MergeGridData });
        }
    }
}
const getProposalViewData = (sub) => {
    return async (dispatch) => {
        if (sub) {
            let response = await apiCalls.getProposalView(sub)
            if (response) {
                dispatch({ type: 'fetchproposalviewdata', payload: response?.data });
            }
        }
    }
}

let initialState = {
    token: null,
    user: {},
    fetchproposalviewdata: {},
    daoCardsDetails: [],
    fetchDaoDetails: [],
    fetchSelectingDaoData: {},
    savevoterddata: {},
    fetchVotersData: [],
};

const authReducer = (state, action) => {
    if (!state) {
        state = {
            ...initialState,
            ...state
        }
    }
    switch (action.type) {
        case SET_TOKEN:
            return { ...state, token: action.payload };
        case CUSTOMER_DETAILS:
            state = { ...state, user: action.payload }
            return state;
        case FETCH_PROPOSALVIEW_DATA:
            state = { ...state, fetchproposalviewdata: action.payload }
            return state;
        case DAO_DETAILS:
            state = { ...state, daoCardsDetails: action.payload }
            return state;
        case FETCH_VOTERS_DATA:
            state = { ...state, fetchVotersData: action.payload }
            return state;
        case FETCH_DAO_SELECTING_DATA:
            state = { ...state, fetchSelectingDaoData: action.payload }
            return state;
        default:
            return state;
    }
}
export default (authReducer);
export {
    getCustomerDetails,user, setUserID, clearUserInfo, authReducer, fetchproposalviewdata, setDaoDetails,
    getDaoCardDetails,
    getVotersGrid, saveVoting, fetchVotersData, getDaoData, fetchSelectingDaoData, getProposalViewData,
    getCustomerDeta,setToken
};