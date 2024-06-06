export const walletState = {
    email: "",
    otp: "",
    verifying: "",
    initiatedTime: 0,
    showTimer: false,
    errors: { email: "", otp: "" },
    otpSent: 0,
  };
  
  export const walletReducer = (state, action) => {
    state = state || walletState;
    switch (action.type) {
      case "setEmail":
        state = { ...state, email: action.payload };
        return state;
      case "setOtpSent":
        state = { ...state, otpSent: action.payload };
        return state;
      case "setOTP":
        state = { ...state, otp: action.payload };
        return state;
      case "setVerifying":
        state = { ...state, verifying: action.payload };
        return state;
      case "setInitiatedTime":
        state = { ...state, initiatedTime: action.payload };
        return state;
      case "setShowTimer":
        state = { ...state, showTimer: action.payload };
        return state;
      case "setErrors":
        state = { ...state, errors: action.payload };
        return state;
      case "setState":
        state = { ...state, ...action.payload };
        return state;
      default:
        return state;
    }
  };
  