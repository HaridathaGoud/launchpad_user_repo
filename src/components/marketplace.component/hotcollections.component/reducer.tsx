
export interface HotcollectionStateModel {
    loader: boolean;
    hotCollectionData: any | [];
    currentIndex: number;
    searchValue:any,
    activeTab:any,
    cardDetails:any,
    selection:any,
    favoriteLoader: any;
    cardLoader: any,
    selectedStatus:string,
    selectedCurrency:string,
    selectedPriceLevel:any,
}
export const hotcollectionState = {
    loader: false,
    hotCollectionData: [],
    currentIndex: 0,
    searchValue:'',
    activeTab:'',
    cardDetails:null,
    selection:{
      searchValue:null,
      minMaxCategory:'min to max',
    },
    favoriteLoader: { id: "", loading: false },
    cardLoader:false,
    selectedStatus:'All',
    selectedCurrency:'Matic',
    selectedPriceLevel:'min to max'
};

export const hotCollectionReducer = (state = hotcollectionState, action) => {
    switch (action.type) {
        case "setLoader":
            state = { ...state, loader: action.payload };
            break;
        case "setHotCollectionData":
            state = { ...state, hotCollectionData: action.payload };
            break;
        case "setCurrentIndex":
            state = { ...state, currentIndex: action.payload };
            break; 
            case "setActiveTab":
            state = { ...state, activeTab: action.payload };
            break;
            case "setCardDetails": 
            state = { ...state, cardDetails: action.payload };
            break;
            case "update":
            state = { ...state, selection: action.payload };
            break;
            case "setFavoriteLoader":
            state = { ...state, favoriteLoader: action.payload };
            break;
            case "setCardLoader":
           state = { ...state, cardLoader: action.payload };
           break;
           case "setSelectedCurrency":
           state = { ...state, selectedCurrency: action.payload };
           break;
           case "setSelectedStatus":
           state = { ...state, selectedStatus: action.payload };
           break;
           case "setSelectedPriceLevel":
           state = { ...state, selectedPriceLevel: action.payload };
           break;
        default:
            state = { ...state };
    }
    return state;
};
