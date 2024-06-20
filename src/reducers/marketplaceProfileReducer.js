import apiCalls from "../utils/api";
import { getTopNft, post,getCustomer } from '../utils/api';
import { setError, setToaster }  from './layoutReducer'
const FETCH_NFTS_COLLECTION = "featchNFTsCollection";
const SETISFAVARATODCOUNT = "saveFavaratedCount";
const IS_CREATED_COUNT="isCreatedCount";
const IS_OWNED_NFTS_COUNT="isOwnedNFTsCount";
const SAVEFAVARATED_NFT = "saveFavaratedNft";
const featchNFTsCollection = (payload) => {
    return {
        type: FETCH_NFTS_COLLECTION,
        payload
    }
}
const saveFavaratedCount = (payload) => {
    return {
        type: SETISFAVARATODCOUNT,
        payload
    }
}
const saveFavaratedNft = (payload) => {
    return {
        type: SAVEFAVARATED_NFT,
        payload
    }
}
const isCreatedCount = (payload) => {
    return {
        type: IS_CREATED_COUNT,
        payload
    }
}
const isOwnedNFTsCount = (payload) => {
    return {
        type: IS_OWNED_NFTS_COUNT,
        payload
    }
}

const fetchNftsCollection = (selectTabs, walletAddress, pageNo, pageSize, category, search, id, data = [], callback) => {
    const skip = pageNo * pageSize - pageSize;
    const take = pageSize;
  
    return async (dispatch) => {
      dispatch(featchNFTsCollection({ key: 'collectionData', loading: true, data: null, error: null }));
  
      try {
        const response = await apiCalls.getMarketplace(`User/${selectTabs || "GetNfts"}/${walletAddress}/${take}/${skip}/${category}/${search}/${id}`);
        
        if (response) {
          if (callback) {
            callback(response);
          }
          const previousData = Array.isArray(data) ? data : [];
          const mergedData = pageNo === 1 ? [...response.data] : [...previousData, ...response.data];
          dispatch(featchNFTsCollection({ key: 'collectionData', loading: false, data: mergedData, error: null }));
        } else {
          const errorMessage = apiCalls.isErrorDispaly(response);
          setError({ message: errorMessage });
          dispatch(featchNFTsCollection({ key: 'collectionData', loading: false, data: null, error: errorMessage }));
        }
      } catch (error) {
        const errorMessage = error.message || 'An error occurred';
        setError({ message: errorMessage });
        dispatch(featchNFTsCollection({ key: 'collectionData', loading: false, data: null, error: errorMessage }));
        if (callback) {
          callback({ status: 500, message: errorMessage });
        }
      }
    };
  };
  

const saveFavoriteNFT = (obj, callback) => {
    return async (dispatch) => {
      dispatch(saveFavaratedNft({ key: 'saveFavaratedNft', data: 0, loading: true, error: null }));
  
      try {
        const response = await post('User/SaveFavorite', obj);
  
        if (response.status === 200) {
          dispatch(saveFavaratedNft({ key: 'saveFavaratedNft', data: response?.data, loading: false, error: null }));
          if (callback) {
            callback(response);
          }
        } else {
          dispatch(saveFavaratedNft({ key: 'saveFavaratedNft', data: 0, loading: false, error: apiCalls.isErrorDispaly(response) }));
          if (callback) {
            callback(response);
          }
        }
      } catch (error) {
        dispatch(saveFavaratedNft({ key: 'saveFavaratedNft', data: 0, loading: false, error: error.message || 'An error occurred' }));
        if (callback) {
          callback({ status: 500, message: error });
        }
      }
    };
  };
  

const getFavoritedCount = (useraddress) => {
    return async (dispatch) => {
        const res = await getTopNft(`User/FavoritesCount/${useraddress}`);
        if (res.status == 200) {
            dispatch(saveFavaratedCount({key:'getFavaratedCount',data:res.data,loading:false,error:null}));
        } else {
            dispatch(saveFavaratedCount({key:'getFavaratedCount',data:null,loading:false,error:apiCalls.isErrorDispaly(res)}));
        }
    }
}

const getCreatedCount = (useraddress,customerId) => {
    return async (dispatch) => {
        const res = await getTopNft(`User/CreatorsCount/${useraddress}/${customerId}`);
        if (res.status == 200) {
            dispatch(isCreatedCount({key:'createdNFTSCount',data:res.data,loading:false,error:null}));
        } else {
            dispatch(isCreatedCount({key:'createdNFTSCount',data:null,loading:false,error:apiCalls.isErrorDispaly(res)}));
        }
    }
}

const getOwnedCountData = (useraddress) => {
    return async (dispatch) => {
        const res = await getTopNft(`User/currentownerscount/${useraddress}`);
        if (res.status == 200) {
            dispatch(isOwnedNFTsCount({key:'ownedNFTsCount',data:res.data,loading:false,error:null}));
        } else {
            dispatch(isOwnedNFTsCount({key:'ownedNFTsCount',data:null,loading:false,error:apiCalls.isErrorDispaly(res)}));
        }
    }
}

let nftsCollections = {
    collectionData:{data:null,loading:false,error:null,page:1},
    saveFavaratedCount:{data:0,loading:false,error:null},
    getFavaratedCount:{data:null,loader:false,error:null},
    createdNFTSCount:{data:null,loader:false,error:null},
    ownedNFTsCount:{data:null,loader:false,error:null},
    saveFavaratedNft:{data:null,loading:false,error:null},
    data: null,
    loader: false,
    error: '',
}
const ntfsCollectionsReducer = (state = nftsCollections, action) => {
    switch (action.type) {
        case FETCH_NFTS_COLLECTION:
            state = { ...state, collectionData: action.payload };
            return state;
        case SETISFAVARATODCOUNT:
            state = { ...state, saveFavaratedCount: action.payload };
            return state; 
        case SAVEFAVARATED_NFT:
            state = { ...state, saveFavaratedNft: action.payload };
            return state;
        case IS_CREATED_COUNT:
             state = { ...state, createdNFTSCount: action.payload };
             return state; 
             case IS_OWNED_NFTS_COUNT:
             state = { ...state, ownedNFTsCount: action.payload };
             return state;          
        default:
            return state;
    }
}
const marketPlaceProfileReducer = { ntfsCollectionsReducer }
export default marketPlaceProfileReducer
export {fetchNftsCollection,saveFavoriteNFT,getFavoritedCount,getCreatedCount,getOwnedCountData};