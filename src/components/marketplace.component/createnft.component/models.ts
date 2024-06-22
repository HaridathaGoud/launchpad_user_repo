export interface FormValues {
  imageUrl: string;
  name: string;
  externalLink: string;
  description: string;
  collection: any;
  properties: string | null;
  supply: string;
  network: any;
  royalities: string;
  isPutonSale: boolean;
  isPutOnAuction: boolean;
  isUnlockPurchased: boolean;
  unlockDescription: string;
  salePrice: string;
  auctionPrice: string;
  filePath: any;
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
  salePrice: string;
  auctionPrice: string;
}

export interface Property {
  trait_type: string;
  value: string;
}
export type Properties = Property[];
export type PropertyArray = Property[];

export interface FormState {
  values: FormValues;
  errors: FormErrors;
  isLoading: string;
  propertyErrors: PropertyArray;
  propertiesToUpdate: Properties | null;
  modalStep: number;
}
export interface Action {
  type: string;
  payload: any;
}
