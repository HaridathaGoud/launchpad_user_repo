export interface NftsStateModel {
  favoriteLoader: any;
  cardLoader: any;
  category: string;
  selectedStatus:string,
  selectedCurrency:string,
  selection:any,
}
export const nftsState = {
  category: "all",
  favoriteLoader: { id: "", loading: false },
  loader: false,
  selectedStatus:'All',
    selectedCurrency:'Matic',
    selectedPriceLevel:'min to max',
    selection:{
      searchValue:null,
      minMaxCategory:'min to max',
    },
};

export const nftsReducer = (state = nftsState, action) => {
  switch (action.type) {
    case "setFavoriteLoader":
      state = { ...state, favoriteLoader: action.payload };
      break;
    case "setLoader":
      state = { ...state, loader: action.payload };
      break;
    case "setCategory":
      state = { ...state, category: action.payload };
      break;
    case "update":
      state = { ...state, selection: action.payload };
      break;
    case "setSelectedStatus":
      state = { ...state, selectedStatus: action.payload };
      break;
    case "setSelectedCurrency":
      state = { ...state, selectedCurrency: action.payload };
      break;
    case "setSelectedPriceLevel":
      state = { ...state, selectedPriceLevel: action.payload };
      break;
    default:
      state = { ...state };
  }
  return state;
};
