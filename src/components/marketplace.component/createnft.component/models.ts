export interface FormValues {
  imageUrl: string;
  name: string;
  externalLink: string;
  description: string;
  collection: string | null;
  properties: string | null;
  supply: number;
  network: string | null;
  royalities: number;
  isPutonSale: boolean;
  isPutOnAuction: boolean;
  isUnlockPurchased: boolean;
  unlockDescription: string;
}
export interface FormErrors {
  imageUrl: string;
  name: string;
  externalLink: string;
  description: string;
  collection: string;
  properties: string;
  supply: string;
  network: string;
  royalities: string;
  isPutonSale: string;
  isPutOnAuction: string;
  isUnlockPurchased: string;
  unlockDescription: string;
}

export interface Property {
  type: string;
  value: string;
}
export type Properties = Property[];
export type PropertyArray = Property[];
export interface Lookups {
  collections: any[] | null;
  networks: any[] | null;
}
export interface FormState {
  values: FormValues;
  errors: FormErrors;
  lookups: Lookups;
  modalToOpen: string;
  isLoading: string;
  propertyErrors:PropertyArray;
  propertiesToUpdate:Properties | null;
}
export interface Action {
  type: string;
  payload: any;
}
