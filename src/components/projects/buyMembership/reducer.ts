export const buyMembershipState = {
  isLoading: true,
  isMinting: false,
  details: null,
  mintedAmount: 0,
  nftPrice: 0,
  nftMintedTillNow: 0,
  inputCount: 1,
};

export const buyMembershipReducer = (state: any, action: any) => {
  state = state || buyMembershipState;
  switch (action.type) {
    case "setIsLoading":
      return { ...state, isLoading: action.payload };
    case "setIsMinting":
      return { ...state, isMinting: action.payload };
    case "setDetails":
      return { ...state, details: action.payload };
    case "setMintedAmount":
      return { ...state, mintedAmount: action.payload };
    case "setNftPrice":
      return { ...state, nftPrice: action.payload };
    case "setNftMintedTillNow":
      return { ...state, nftMintedTillNow: action.payload };
    case "setInputCount":
      return { ...state, inputCount: action.payload };
    default:
      return { ...state };
  }
};
