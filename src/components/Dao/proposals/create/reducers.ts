export const createProposalState = {
  form: {
    proposal: "",
    summary: "",
    image: null,
    proposalType: "",
    options: [
      {
        options: null,
        id: "00000000-0000-0000-0000-000000000000",
        optionHash: null,
      },
      {
        options: null,
        id: "00000000-0000-0000-0000-000000000000",
        optionHash: null,
      },
    ],
    startDate: null,
    endDate: null,
  },
  formErrors: {},
  shouldOpenDrawer: false,
  currentStep: 1,
  isSaving: false,
  isCopied: false,
};

export const createProposalReducer = (state = createProposalState, action) => {
  switch (action.type) {
    case "setForm":
      state = { ...state, form: action.payload };
      break;
    case "setFormErrors":
      state = { ...state, formErrors: action.payload };
      break;
    case "setShouldOpenDrawer":
      state = { ...state, shouldOpenDrawer: action.payload };
      break;
    case "setCurrentStep":
      state = { ...state, currentStep: action.payload };
      break;
    case "setIsSaving":
      state = { ...state, isSaving: action.payload };
      break;
    case "setIsCopied":
      state = { ...state, isCopied: action.payload };
      break;
    default:
      break;
  }
  return state;
};
