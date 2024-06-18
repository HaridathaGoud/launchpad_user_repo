import apiCalls from "../utils/api";
import { get, post,getCustomer } from '../utils/api';
import { useDispatch } from 'react-redux';
const FETCH_NFTS_COLLECTION = "featchNFTsCollection";
const SET_LOADER = "setLoaderAction";
const SET_ERROR = "setErrorAction";
const SET_PAGE_NO = 'setPageNoAction';
const SETISFAVARATODCOUNT = "setIsFavaratedCount";
const featchNFTsCollection = (payload) => {
    return {
        type: FETCH_NFTS_COLLECTION,
        payload
    }
}
const setLoaderAction = (payload) => {
    return {
        type: SET_LOADER,
        payload
    }
};
const setErrorAction = (payload) => {
    return {
        type: SET_ERROR,
        payload: apiCalls.isErrorDispaly(payload)
    }
};
const setPageNoAction = (payload) => {
    return {
        type: SET_PAGE_NO,
        payload
    }
}
const setIsFavaratedCount = (payload) => {
    return {
        type: SETISFAVARATODCOUNT,
        payload
    }
}
const fetchNftsCollection = (walletAddress,data,pageNo = 1, take = 10, category, search = null, id = '',selectTabs) => {
    const skip = pageNo * take - take;
    return async (dispatch) => {
        dispatch(setLoaderAction(true));
        const response = await apiCalls.getMarketplace(`User/${selectTabs || "GetNfts"}/${walletAddress}/${take}/${skip}/${category}/${search}/${id}`);
        if (response.status == 200) {
            const mergedData = skip > 0 ? [...data, ...response.data] : response.data
            dispatch(featchNFTsCollection(mergedData));
            dispatch(setPageNoAction(pageNo + 1));
            // if(callback){
            //     callback(response)
            // }
        } else {
            // if(callback){
            //     callback(response)
            // }
            dispatch(setErrorAction(response));
        }
        dispatch(setLoaderAction(false));
    }
}
const saveFavoriteNFT = async (obj, callback) => {
    try {
      const response = await post(`User/SaveFavorite`, obj);
      if (callback) {
        callback(response);
      }
    } catch (error) {
    //   setErrorMsg(isErrorDispaly(error));
    }
  };
  const getFavoritedCount = async (useraddress, callback) => {
    // const dispatch = useDispatch();
  
    try {
      const res = await get(`User/FavoritesCount/${useraddress}`);
      if (res.status === 200) {
        if (callback) {
          callback(res);
        }
        // dispatch(setIsFavaratedCount(res.data));
      } else {
        if (callback) {
          callback(res);
        }
      }
    } catch (error) {
      console.error('Error fetching favorited count:', error);
      if (callback) {
        callback({ status: 'error', error });
      }
    }
  };

let nftsCollections = {
    data: null,
    loader: false,
    error: '',
    pageNo: 1,
}
const ntfsCollectionsReducer = (state = nftsCollections, action) => {
    switch (action.type) {
        case FETCH_NFTS_COLLECTION:
            state = { ...state, data: action.payload };
            return state;
        case SET_LOADER:
            state = { ...state, loader: action.payload }
            return state;
        case SET_ERROR:
            state = { ...state, error: action.payload }
            return state;
        case SET_PAGE_NO:
            state = { ...state, pageNo: action.payload };
            return state;
        default:
            return state;
    }
}
const marketPlaceProfileReducer = { ntfsCollectionsReducer }
export default marketPlaceProfileReducer
export {fetchNftsCollection,saveFavoriteNFT,getFavoritedCount};