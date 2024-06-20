import apiCalls from "../../../utils/api";
const SET_HOT_COLLECTIONS_VIEW_DATA = "setHotCollectionsViewData";
const SET_HOT_COLLECTIONS_ACTIVITY_DATA = "setHotCollectionsActivityData";
const SET_NFTS='SetNfts';

const setHotCollectionsViewData = (payload:any) => {
    return {
      type: SET_HOT_COLLECTIONS_VIEW_DATA,
      payload,
    };
  }
  const clearHotCollectionsViewDetails = () => {
    return (dispatch:any) => {
      dispatch(setHotCollectionsViewData({ loading: false, data: null, nextPage: 1 }))
    }
  }
  const setHotCollectionsActivityData = (payload:any) => {
    return {
      type: SET_HOT_COLLECTIONS_ACTIVITY_DATA,
      payload,
    };
  }
  const clearCollectionsActivityData = () => {
    return (dispatch:any) => {
      dispatch(setHotCollectionsActivityData({ loading: false, data: null, nextPage: 1 }))
    }
  }
  const SetNfts = (payload:any) => {
    return {
      type: SET_NFTS,
      payload,
    };
  }
  const clearNfts = () => {
    return (dispatch:any) => {
      dispatch(SetNfts({ loading: false, data: null, nextPage: 1 }))
    }
  }

  const fetchHotCollectionsViewDetails = (information:any) => {
    const {  data,id } = information;
    return async (dispatch:any) => {
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
  const fetchHotCollectionsActivityDetails = (information:any) => {
    const {  collectionId,data,id,take,page } = information;
    const skip = take * (page) - take;
    return async (dispatch:any) => {
      dispatch(setHotCollectionsActivityData({ key: 'hotCollectionsActivityDetails', loading: true, data: data }));
      try {
        const res = await apiCalls.getMarketplace(`User/Activities/${collectionId}/${id}/${take}/${skip}`);
        // const res = await apiCalls.getMarketplace(`User/Activities/15FD0929-71F5-4A01-BA8A-1B50930F0775/3C30FDF3-3D62-43B5-AB12-6C1939745DE9/10/0`)
        if (res.status === 200) {
          dispatch(setHotCollectionsActivityData({ key: 'hotCollectionsActivityDetails', loading: false, data: data ? [...data, ...res.data] : res.data, error: null,nextPage: page + 1 }));
        } else {
          dispatch(
            setHotCollectionsActivityData({
              key: 'hotCollectionsActivityDetails',
              loading: false,
              data: data,
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
            setHotCollectionsActivityData({
            key: 'hotCollectionsActivityDetails',
            loading: false,
            data: data,
            error: error,
          }),
        );
      }
    };
  }
  const fetchNftsDetails = (information:any) => {
    const {  collectionId,data,take,page,status,search,minMaxCategory,currency } = information;
    const skip = take * (page) - take;
    return async (dispatch:any) => {
      dispatch(SetNfts({ key: 'NftDetails', loading: true, data: data }));
      try {
        const res = await apiCalls.getMarketplace(`User/GetNftsByCollectionId/${collectionId}/${take}/${skip}/${minMaxCategory}/all%20items/${currency}/${status}/${search}`);
                                                                                                             //{price}/{quatity}/{currency}/{status}/{searchBy}
        // const res = await apiCalls.getMarketplace(`User/GetNftsByCollectionId/15FD0929-71F5-4A01-BA8A-1B50930F0775/10/0/min%20to%20max/all%20items/null/all/null`)
        if (res.status === 200) {
          dispatch(SetNfts({ key: 'NftDetails', loading: false, data: data ? [...data, ...res.data] : res.data, error: null,nextPage: page + 1 }));
        } else {
          dispatch(
            SetNfts({
              key: 'NftDetails',
              loading: false,
              data: data,
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
            SetNfts({
            key: 'NftDetails',
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
    hotCollectionsActivityDetails:any,
    NftDetails:any,
    searchValue:any,
    activeTab:any,
    cardDetails:any,
    selection:any,
    favoriteLoader: any;
    cardLoader: any,
    selectedStatus:string,
    selectedCurrency:string,
    selectedPriceLevel:any,
}
export const hotcollectionState = {
    loader: false,
    hotCollectionData: [],
    currentIndex: 0,
    hotCollectionViewDetails: { loading: false, data: null, nextPage: 1 },
    hotCollectionsActivityDetails: { loading: false, data: null, nextPage: 1 },
    NftDetails: { loading: false, data: null, nextPage: 1 },
    searchValue:'',
    activeTab:'',
    cardDetails:null,
    selection:{
      searchValue:null,
      minMaxCategory:'min to max',
    },
    favoriteLoader: { id: "", loading: false },
    cardLoader:false,
    selectedStatus:'All',
    selectedCurrency:'Matic',
    selectedPriceLevel:'min to max'
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
            case SET_HOT_COLLECTIONS_ACTIVITY_DATA:
            return {
                ...state, hotCollectionsActivityDetails: {
                    data: action.payload.data,
                    error: action.payload.error,
                    loading: action.payload.loading,
                    nextPage: action.payload.nextPage 
                },
            };
            case SET_NFTS:
            return {
                ...state, NftDetails: {
                    data: action.payload.data,
                    error: action.payload.error,
                    loading: action.payload.loading,
                    nextPage: action.payload.nextPage 
                },
            }; 
            case "setActiveTab":
            state = { ...state, activeTab: action.payload };
            break;
            case "setCardDetails": 
            state = { ...state, cardDetails: action.payload };
            break;
            case "update":
            state = { ...state, selection: action.payload };
            break;
            case "setFavoriteLoader":
            state = { ...state, favoriteLoader: action.payload };
            break;
            case "setCardLoader":
           state = { ...state, cardLoader: action.payload };
           break;
           case "setSelectedCurrency":
           state = { ...state, selectedCurrency: action.payload };
           break;
           case "setSelectedStatus":
           state = { ...state, selectedStatus: action.payload };
           break;
           case "setSelectedPriceLevel":
           state = { ...state, selectedPriceLevel: action.payload };
           break;
        default:
            state = { ...state };
    }
    return state;
};
export {
    clearHotCollectionsViewDetails,
    fetchHotCollectionsViewDetails,
    clearCollectionsActivityData,
    fetchHotCollectionsActivityDetails,
    fetchNftsDetails,
    clearNfts,
}