export const resultsState = {
  copied: false,
  isSaving: false,
  selectedOption: null,
  isLoading: false,
  showEditButton: false,
  userContractDetails:null,
};

export const resultsReducer = (state: any = resultsState, action: any) => {
  switch (action.type) {
    case "setIsLoading":
      return { ...state, isLoading: action.payload };
    case "setCopied":
      return { ...state, copied: action.payload };
    case "setIsSaving":
      return { ...state, isSaving: action.payload };
    case "setSelectedOption":
      return { ...state, selectedOption: action.payload };
    case "setShowEditButton":
      return { ...state, showEditButton: action.payload };
    case "setUserContractDetails":
      return { ...state, userContractDetails: action.payload };
    default:
      return state;
  }
};
