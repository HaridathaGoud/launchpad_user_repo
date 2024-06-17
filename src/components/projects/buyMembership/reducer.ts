export const buyMembershipState = {
  isLoading: false,
  isMinting: false,
  details: null,
  currUserMintedCount: 0,
  nftPrice: 0,
  totalNftsMinted: 0,
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
    case "setCurrUserMintedCount":
      return { ...state, currUserMintedCount: action.payload };
    case "setNftPrice":
      return { ...state, nftPrice: action.payload };
    case "setTotalNftsMinted":
      return { ...state, totalNftsMinted: action.payload };
    case "setInputCount":
      return { ...state, inputCount: action.payload };
    default:
      return { ...state };
  }
};
