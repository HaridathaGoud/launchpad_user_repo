export interface TrendingNftsStateModel {
    previosImageChagne: number;
    loader: boolean;
    todaytrending: any | [];
    showBuyModal: boolean;
    trendingData: Object | any;
    nftDetails:any;
    currentIndex: number;
}
export const trendingNftState = {
    previosImageChagne: 0,
    loader: false,
    todaytrending: [],
    showBuyModal: false,
    trendingData: {},
    nftDetails:{},
    currentIndex: 0
};

export const trendingNFTSReducer = (state = trendingNftState, action) => {
    switch (action.type) {
        case "setPreviosImageChange":
            state = { ...state, previosImageChagne: action.payload };
            break;
        case "setLoader":
            state = { ...state, loader: action.payload };
            break;
        case "setTodayTrending":
            state = { ...state, todaytrending: action.payload };
            break;
        case "setShowBuyModal":
            state = { ...state, showBuyModal: action.payload };
            break;
        case "setTrendingData":
            state = { ...state, trendingData: action.payload };
            break;
        case "setNftDetails":
            state = { ...state, nftDetails: action.payload };
            break;
        case "setCurrentIndex":
            state = { ...state, currentIndex: action.payload };
            break;
        default:
            state = { ...state };
    }
    return state;
};