export interface BrowserByCategoryStateModel {
    browseByCategoryList: any | [];
    loader:boolean;
}
export const browserByCategoryState = {
    browseByCategoryList: [],
    loader:false
};

export const browserByCategoryreducer = (state = browserByCategoryState, action) => {
    switch (action.type) {
        case "setBrowseByCategoryList":
            state = { ...state, browseByCategoryList: action.payload };
            break;
            case "setLoader":
                state = { ...state, loader: action.payload };
                break;
        default:
            state = { ...state };
    }
    return state;
};