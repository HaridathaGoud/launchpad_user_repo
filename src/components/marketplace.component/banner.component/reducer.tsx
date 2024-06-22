export interface BannerStateModel {
    currentIndex: number;
    topNftDetails: [] | any;
    loader: boolean;
    countDetails: {} | any;
    isModalOpen : boolean;
}
export const bannerState = {
    currentIndex: 0,
    topNftDetails: [],
    loader: false,
    countDetails: null,
    isModalOpen : false
};

export const bannerReducer = (state = bannerState, action) => {
    switch (action.type) {
        case "setCurrentIndex":
            state = { ...state, currentIndex: action.payload };
            break;
        case "setTopNftDetails":
            state = { ...state, topNftDetails: action.payload };
            break;
        case "setCountDetails":
            state = { ...state, countDetails: action.payload };
            break;
        case "setLoader":
            state = { ...state, loader: action.payload };
            break;
            case "setModalShow":
                state = { ...state, isModalOpen: action.payload };
                break;
        default:
            state = { ...state };
    }
    return state;
};