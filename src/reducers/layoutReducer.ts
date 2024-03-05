import formatErrorMessage from "../utils/formatErrorMessage";

//Action types
const SET_TOASTER = "SET_TOASTER";
const SET_ERROR = "SET_ERROR";

//Actions
const setToaster = (payload) => {
  if (payload.message) {
    return {
      type: SET_TOASTER,
      payload: {
        ...payload,
        callback: payload?.callback,
        type: payload?.type || "success",
        position: payload?.position || "topRight",
        timeout: payload?.timeout || 2000,
        callbackTimeout: payload?.callbackTimeout || 1000,
      },
    };
  }
  return {
    type: SET_TOASTER,
    payload: payload,
  };
};
const setError = (payload) => {
  return {
    type: SET_ERROR,
    payload: {
      message: formatErrorMessage(payload?.message),
      onCloseCallback: payload?.onCloseCallback,
    },
  };
};

//InitialState
const userData = {
  toaster: {
    message: "",
  },
  error: {
    message: "",
  },
};

//Reducer
const layoutReducer = (state = userData, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_ERROR":
      state = {
        ...state,
        error: payload,
      };
      break;
    case "SET_TOASTER":
      state = {
        ...state,
        toaster: payload,
      };
      break;
    default:
      break;
  }
  return state;
};

export default layoutReducer;
export { setToaster, setError };
