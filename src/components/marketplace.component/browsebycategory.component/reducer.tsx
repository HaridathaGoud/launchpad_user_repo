export interface BrowserByCategoryStateModel {
    browseByCategoryList: any | [];
    loader: boolean;
    currentIndex: number;
    favoriteLoader:any,
    cardLoader:any,
    selection:any,
}
export const browserByCategoryState = {
    browseByCategoryList: [],
    loader: false,
    currentIndex: 0,
    favoriteLoader: { id: "", loading: false },
    cardLoader:false,
    selection:{
        searchValue:null,
        minMaxCategory:null,
      },
};

export const browserByCategoryreducer = (state = browserByCategoryState, action) => {
    switch (action.type) {
        case "setBrowseByCategoryList":
            state = { ...state, browseByCategoryList: action.payload };
            break;
        case "setLoader":
            state = { ...state, loader: action.payload };
            break;
        case "setCurrentIndex":
            state = { ...state, currentIndex: action.payload };
            break;
        case "setFavoriteLoader":
            state = { ...state, favoriteLoader: action.payload };
            break;
        case "setCardLoader":
            state = { ...state, cardLoader: action.payload };
            break;
        case "update":
            state = { ...state, selection: action.payload };
            break;
        default:
            state = { ...state };
    }
    return state;
};