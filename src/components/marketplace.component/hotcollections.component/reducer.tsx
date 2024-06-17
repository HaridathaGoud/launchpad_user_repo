export interface HotcollectionStateModel {
    loader: boolean;
    hotCollectionData: any | [];
    currentIndex: number;
}
export const hotcollectionState = {
    loader: false,
    hotCollectionData: [],
    currentIndex: 0
};

export const hotCollectionReducer = (state = hotcollectionState, action) => {
    switch (action.type) {
        case "setLoader":
            state = { ...state, loader: action.payload };
            break;
        case "setHotCollectionData":
            state = { ...state, hotCollectionData: action.payload };
            break;
            case "setCurrentIndex":
                state = { ...state, currentIndex: action.payload };
                break;
        default:
            state = { ...state };
    }
    return state;
};