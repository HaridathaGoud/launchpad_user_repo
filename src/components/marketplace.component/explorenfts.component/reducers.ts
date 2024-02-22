export interface NftsStateModel {
  favoriteLoader: any;
  cardLoader: any;
  category: string;
}
export const nftsState = {
  category: "all",
  favoriteLoader: { id: "", loading: false },
  loader: false,
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
    default:
      state = { ...state };
  }
  return state;
};
