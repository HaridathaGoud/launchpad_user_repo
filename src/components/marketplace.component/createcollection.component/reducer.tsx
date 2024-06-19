interface FormValues {
    id: string,
    customerId: string,
    collectionName: string,
    description: string,
    logo: string,
    bannerImage: string,
    featuredImage: string,
    category: string,
    status: string,
    urls: string,
    facebook: string,
    twitter: string,
    linkedIn: string,
    websiteUrl: string,
    contractAddress: string,
    collectionType: string,
    blockChain:string,
    tokenNetwork:string,
}
interface FormErrors {
    logo: string,
    bannerImage: string,
    featuredImage: string,
    collectionName: string,
    description: string,
    category: string,
    urls:string,
    websiteUrl:string,
    linkedIn:string,
    facebook:string,
    twitter:string,
}
interface Lookups {
    collections: any[] | null;
    networks: any[] | null;
}
interface FormState {
    values: FormValues;
    errors: FormErrors;
    lookups: Lookups;
    isLoading: string;
}
interface Action {
    type: string;
    payload: any;
}
export const formState: FormState = {
    values: {
        id: '',
        customerId: '',
        collectionName: '',
        description: '',
        logo: '',
        bannerImage: '',
        featuredImage: '',
        category: '',
        status: '',
        urls: '',
        facebook: '',
        twitter: '',
        linkedIn: '',
        websiteUrl: '',
        contractAddress: '',
        collectionType: '',
        blockChain:'',
        tokenNetwork:'MATIC'

    },
    errors: {
        logo: '',
        bannerImage: '',
        featuredImage: '',
        collectionName: '',
        description: '',
        category: '',
        urls:'',
        websiteUrl:'',
        linkedIn:'',
        facebook:'',
        twitter:'',
    },
    lookups: { collections: [], networks: [] },
    isLoading: '',
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