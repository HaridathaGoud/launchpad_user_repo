import formatErrorMessage from "../utils/formatErrorMessage";
import { ethers } from "ethers";
//Action types
const SET_BALANCES = "setBalances";
const SET_AMOUNTS = "setAmounts";
const SET_TOASTER = "SET_TOASTER";
const SET_ERROR = "SET_ERROR";

//Actions
const setBalances = (payload) => {
  return {
    type: SET_BALANCES,
    payload,
  };
};
const setAmounts = (payload) => {
  return {
    type: SET_AMOUNTS,
    payload,
  };
};


const fetchStakedAmount=(getStakedAmount)=>{
    return async (dispatch)=>{
        let response=await getStakedAmount()
        let _amt = response.toString();
        if (_amt) {
          dispatch(setAmounts({key:'staked',value:parseFloat(ethers.utils.formatEther(_amt))}));
        }
    }
}
const fetchUnstakedAmount=(getUnstakedAmount)=>{
    return async (dispatch)=>{
        let response=await getUnstakedAmount()
        let _amt = response.toString();
        if (_amt) {
          dispatch(setAmounts({key:'unstaked',value:parseFloat(ethers.utils.formatEther(_amt))}));
        }
    }
}
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
  transactionDetails: {
    stakedAmount: null,
    unstakedAmount: null,
    rewardAmount: null,
    maticBalance: 0,
    tokenBalance: 0,
  },
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
    case "SET_BALANCES":
      if (payload.key === "matic") {
        state = {
          ...state,
          transactionDetails: {
            ...state.transactionDetails,
            maticBalance: payload.value,
          },
        };
      } else if (payload.key === "ybt") {
        state = {
          ...state,
          transactionDetails: {
            ...state.transactionDetails,
            tokenBalance: payload.value,
          },
        };
      }
      break;
    case "SET_AMOUNTS":
      if (payload.key === "staked") {
        state = {
          ...state,
          transactionDetails: {
            ...state.transactionDetails,
            stakedAmount: payload.value,
          },
        };
      } else if (payload.key === "unstaked") {
        state = {
          ...state,
          transactionDetails: {
            ...state.transactionDetails,
            unstakedAmount: payload.value,
          },
        };
      } else if (payload.key === "rewards") {
        state = {
          ...state,
          transactionDetails: {
            ...state.transactionDetails,
            rewardAmount: payload.value,
          },
        };
      }
      break;
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
export { setBalances, fetchStakedAmount,fetchUnstakedAmount, setToaster, setError };
