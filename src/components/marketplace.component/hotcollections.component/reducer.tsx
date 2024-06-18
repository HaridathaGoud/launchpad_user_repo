import apiCalls from "../../../utils/api";
const SET_HOT_COLLECTIONS_VIEW_DATA = "setHotCollectionsViewData";
const setHotCollectionsViewData = (payload) => {
    return {
      type: SET_HOT_COLLECTIONS_VIEW_DATA,
      payload,
    };
  }
  const clearHotCollectionsViewDetails = () => {
    return (dispatch) => {
      dispatch(setHotCollectionsViewData({ loading: false, data: null, nextPage: 1 }))
    }
  }


  const fetchHotCollectionsViewDetails = (information) => {
    const {  data,id } = information;
    return async (dispatch) => {
      dispatch(setHotCollectionsViewData({ key: 'hotCollectionViewDetails', loading: true, data: data }));
      try {
        const res = await apiCalls.getMarketplace(`User/GetCollectionDetails/${id}`);
        if (res.status === 200) {
          dispatch(setHotCollectionsViewData({ key: 'hotCollectionViewDetails', loading: false, data: data ? [...data, ...res.data] : res.data, error: null, }));
        } else {
          dispatch(
            setHotCollectionsViewData({
              key: 'hotCollectionViewDetails',
              loading: false,
              data: data,
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
            setHotCollectionsViewData({
            key: 'hotCollectionViewDetails',
            loading: false,
            data: data,
            error: error,
          }),
        );
      }
    };
  }

export interface HotcollectionStateModel {
    loader: boolean;
    hotCollectionData: any | [];
    currentIndex: number;
    hotCollectionViewDetails:any,
}
export const hotcollectionState = {
    loader: false,
    hotCollectionData: [],
    currentIndex: 0,
    hotCollectionViewDetails: { loading: false, data: null, nextPage: 1 },

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
        case SET_HOT_COLLECTIONS_VIEW_DATA:
            return {
                ...state, hotCollectionViewDetails: {
                    data: action.payload.data,
                    error: action.payload.error,
                    loading: action.payload.loading,
                    nextPage: action.payload.nextPage 
                },
            };
        default:
            state = { ...state };
    }
    return state;
};
export {
    clearHotCollectionsViewDetails,
    fetchHotCollectionsViewDetails,
}