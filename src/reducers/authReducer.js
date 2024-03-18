import apiCalls from "../utils/api";
const CLEAR_USER_INFO = "clearUserInfo";
const SET_USER_ID = 'setUserID';
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

const clearUserInfo = () => {
    return { type: CLEAR_USER_INFO, payload: null }
}

const user = (payload) => {
    return {
        type: CUSTOMER_DETAILS,
        payload
    }
};
const getCustomerDetails = (address, callback) => {
    return async (dispatch) => {
        try {
            if (callback)
                callback({ loading: true, data: null });
            const response = await apiCalls.customerDetails(address);
            if (response.status === 200) {
                dispatch(user(response.data));
                if (callback)
                    callback({ loading: false, data: response });
            } else {
                if (callback)
                    callback({ loading: false, error: response });
            }
        } catch (error) {
            if (callback)
                callback({ loading: false, error: error });
        }

    }
}

let initialState = {
    token: null,
    user: {},
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
        default:
            return state;
    }
}
export default (authReducer);
export {
    getCustomerDetails, user, setUserID, clearUserInfo, authReducer, setToken
};