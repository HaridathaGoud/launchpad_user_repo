import { Action, FormState } from "./models";

export const formState: FormState = {
  values: {
    imageUrl: "",
    name: "",
    externalLink: "",
    description: "",
    collection: null,
    properties: null,
    supply: '1',
    crypto:'Matic',
    network: null,
    royalities: '',
    isPutonSale: false,
    isPutOnAuction: false,
    isUnlockPurchased: false,
    unlockDescription: "",
    salePrice: "",
    auctionPrice: "",
    filePath: "",
  },
  errors: {},
  modalStep: 0,
  isLoading: "",
  propertyErrors: [],
  propertiesToUpdate: null,
};

export const formReducer = (state: FormState, action: Action) => {
  state = state || formState;
  switch (action.type) {
    case "setValues":
      state = { ...state, values: action.payload };
      return state;
    case "setErrors":
      state = { ...state, errors: action.payload };
      return state;
    case "setIsLoading":
      state = { ...state, isLoading: action.payload };
      return state;
    case "setPropertyErrors":
      state = { ...state, propertyErrors: action.payload };
      return state;
    case "setPropertiesToUpdate":
      state = { ...state, propertiesToUpdate: action.payload };
      return state;
    case "setModalStep":
      state = { ...state, modalStep: action.payload };
      return state;
    default:
      return state;
  }
};
