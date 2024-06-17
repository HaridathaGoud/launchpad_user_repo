interface FormValues {
  nftImage: string;
  name: string;
  externalLink: string;
  description: string;
  collection: string | null;
  properties: string | null;
  supply: number;
  network: string | null;
  royalities: number;
  putOn: string;
  unlockOnPurchase: false;
  unlockDescription: string;
}
interface FormErrors {
  nftImage: string;
  name: string;
  externalLink: string;
  description: string;
  collection: any;
  properties: string | null;
  supply: number;
  network: string | null;
  royalities: number;
  putOn: string;
  unlockOnPurchase: false;
  unlockDescription: string;
}
interface Lookups {
  collections: any[] | null;
  networks: any[] | null;
}
interface FormState {
  values: FormValues;
  errors: FormErrors;
  lookups: Lookups;
  modalToOpen: string;
  isLoading: string;
}
interface Action {
  type: string;
  payload: any;
}
export const formState: FormState = {
  values: {
    nftImage: "",
    name: "",
    externalLink: "",
    description: "",
    collection: null,
    properties: null,
    supply: 0,
    network: null,
    royalities: 0,
    putOn: "",
    unlockOnPurchase: false,
    unlockDescription: "",
  },
  errors: {
    nftImage: "",
    name: "",
    externalLink: "",
    description: "",
    collection: "",
    properties: "",
    supply: "",
    network: "",
    royalities: "",
    putOn: "",
    unlockOnPurchase: "",
    unlockDescription: "",
  },
  modalToOpen: "",
  lookups: { collections: null, networks: null },
  isLoading: "",
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
    default:
      return state;
  }
};
