export interface BannerStateModel {
    currentIndex: number;
    topNftDetails: [] | any;
    loader:boolean;
}
export const bannerState = {
    currentIndex: 0,
    topNftDetails: [],
    loader:false
};

export const bannerReducer = (state = bannerState, action) => {
    switch (action.type) {
        case "setCurrentIndex":
            state = { ...state, currentIndex: action.payload };
            break;
        case "setTopNftDetails":
            state = { ...state, topNftDetails: action.payload };
            break;
        case "setLoader":
            state = { ...state, loader: action.payload };
            break;
        default:
            state = { ...state };
    }
    return state;
};