import apiCalls from "../utils/api";
const FETCH_PROPOSAL_DETAILS = "fetchProposalDetails";
const FETCH_VOTERS = "fetchVoters";
const SAVE_VOTER = "saveVoter";
const FETCH_IS_CUSTOMER_VOTED = "fetchIsCustomerVoted";

const fetchProposalDetails = (payload) => {
    return {
        type: FETCH_PROPOSAL_DETAILS,
        payload
    }
};
const fetchVoters = (payload) => {
    return {
        type: FETCH_VOTERS,
        payload
    }
};
const saveVoter = (payload) => {
    return {
        type: SAVE_VOTER,
        payload
    }
};
const fetchIsCustomerVoted = (payload) => {
    return {
        type: FETCH_IS_CUSTOMER_VOTED,
        payload
    }
}
const clearVoters = () => {
    return (dispatch) => {
      dispatch(fetchVoters({ loading: false, data: null, nextPage: 1 }))
    }
  }
const getProposalDetails = (sub, custId) => {
    return async (dispatch) => {
        dispatch(fetchProposalDetails({ loading: true, data: null, error: '' }));
        try {
            if (sub) {
                let response = await apiCalls.getProposalView(sub, custId);
                if (response.status === 200) {
                    dispatch(fetchProposalDetails({ data: response.data, loading: false, error: '' }));
                } else {
                    dispatch(fetchProposalDetails({ data: null, loading: false, error: response }));
                }
            }
        } catch (error) {
            dispatch(fetchProposalDetails({ data: null, loading: false, error: error }));
        }
    }
}
const getVoters = (information) => {
    const { take, page, id,data } = information;
    const skip = take * (page) - take;
    return async (dispatch) => {
        dispatch(fetchVoters({ loading: true, data: data, error: '' }));
        try {
            const res = await apiCalls.getProposalVoters(take, skip, id);
            if (res.status === 200) {
                dispatch(fetchVoters({ loading: false, data: data ? [...data, ...res.data] : res.data, error: '', nextPage: page + 1 }));
            } else {
                dispatch(
                    fetchVoters({
                        loading: false,
                        data: data,
                        error: res,
                    }),
                );
            }
        } catch (error) {
            dispatch(
                fetchVoters({
                    loading: false,
                    data: data,
                    error: error,
                }),
            );
        }
    };
}
const saveVoting = (obj) => {

    return async (dispatch) => {
        dispatch(saveVoter({ loading: true, data: null, error: '', status: '' }));
        try {
            const response = await apiCalls.postSaveVote(obj);
            if (response.status === 200) {
                dispatch(saveVoter({ loading: false, data: response.data, error: '', status: 'ok' }));
            } else {
                dispatch(saveVoter({ loading: false, data: null, error: response, status: '' }));
            }
        } catch (error) {
            dispatch(saveVoter({ loading: false, data: null, error: error, status: '' }));
        }

    }
}
const getCustomerVoteStatus = (proposalId, customerId) => {
    return async (dispatch) => {
        dispatch(fetchIsCustomerVoted({ loading: true, data: null, error: '' }));
        try {
            const response = await apiCalls.customerVoted(proposalId, customerId);
            if (response.status === 200) {
                dispatch(fetchIsCustomerVoted({ loading: false, data: response.data, error: '' }));
            } else {
                dispatch(fetchIsCustomerVoted({ loading: false, data: null, error: response }));
            }
        } catch (error) {
            dispatch(fetchIsCustomerVoted({ loading: false, data: null, error: error }));
        }
    }
}
let initialState = {
    proposalDetails: { data: null, loading: false, error: '' },
    savedVoter: { data: null, loading: false, error: '' },
    voters: { data: null, loading: false, error: '', nextPage: 1 },
    isCustomerVoted: null,
}


const votingReducer = (state, action) => {
    if (!state) {
        state = {
            ...initialState,
            ...state
        }
    }
    switch (action.type) {

        case FETCH_PROPOSAL_DETAILS:
            state = { ...state, proposalDetails: { ...state.proposalDetails, ...action.payload } };
            return state;
        case FETCH_VOTERS:
            state = {
                ...state, voters: {
                    data: action.payload.data,
                    error: action.payload.error,
                    loading: action.payload.loading,
                    nextPage: action.payload.nextPage || state?.['voters'].nextPage
                },
            }
            return state;
        case FETCH_IS_CUSTOMER_VOTED:
            state = { ...state, isCustomerVoted: action.payload }
            return state;
        case SAVE_VOTER:
            state = { ...state, savedVoter: action.payload }
            return state;

        default:
            return state;
    }
}
export default (votingReducer);
export {
    getProposalDetails, getVoters, saveVoting, fetchVoters,
    getCustomerVoteStatus, fetchIsCustomerVoted,clearVoters
};