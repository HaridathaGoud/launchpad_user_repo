export interface HotcollectionStateModel {
    loader: boolean;
    hotCollectionData: any | [];
}
export const hotcollectionState = {
    loader: false,
    hotCollectionData: [],
};

export const hotCollectionReducer = (state = hotcollectionState, action) => {
    switch (action.type) {
        case "setLoader":
            state = { ...state, loader: action.payload };
            break;
        case "setHotCollectionData":
            state = { ...state, hotCollectionData: action.payload };
            break;
        default:
            state = { ...state };
    }
    return state;
};