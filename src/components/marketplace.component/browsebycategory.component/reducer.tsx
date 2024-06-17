export interface BrowserByCategoryStateModel {
    browseByCategoryList: any | [];
    loader: boolean;
    currentIndex: number;
}
export const browserByCategoryState = {
    browseByCategoryList: [],
    loader: false,
    currentIndex: 0
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
        default:
            state = { ...state };
    }
    return state;
};