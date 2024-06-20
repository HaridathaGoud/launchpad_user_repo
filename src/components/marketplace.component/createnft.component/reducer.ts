import { Action, FormState } from "./models";

export const formState: FormState = {
  values: {
    imageUrl: "",
    name: "",
    externalLink: "",
    description: "",
    collection: null,
    properties: null,
    supply: 0,
    network: null,
    royalities: 0,
    isPutonSale: false,
    isPutOnAuction: false,
    isUnlockPurchased: false,
    unlockDescription: "",
  },
  errors: {
    imageUrl: "",
    name: "",
    externalLink: "",
    description: "",
    collection: "",
    properties: "",
    supply: "",
    network: "",
    royalities: "",
    isPutonSale: "",
    isPutOnAuction: "",
    isUnlockPurchased: "",
    unlockDescription: "",
  },
  modalToOpen: "",
  lookups: { collections: null, networks: null },
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
    case "setModalToOpen":
      state = { ...state, modalToOpen: action.payload };
      return state;
    case "setLookups":
      state = { ...state, lookups: action.payload };
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
    default:
      return state;
  }
};
