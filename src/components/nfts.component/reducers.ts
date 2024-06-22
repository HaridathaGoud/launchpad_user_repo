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
    values: {
      pageNo: 1,
      take:6,
      categoryName:'All',
      searchBy: null,
      price:'min to max',
      quantity:'All Items',
      currency:'Matic',
      status: 'All',
      customerId:'',
      data:'',
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
      case "setValues":
        state = { ...state, values: action.payload };
        return state;
    default:
      state = { ...state };
  }
  return state;
};
