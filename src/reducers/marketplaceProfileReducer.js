import apiCalls from "../utils/api";
import { get, post,getCustomer } from '../utils/api';
const FETCH_NFTS_COLLECTION = "featchNFTsCollection";
const SET_PAGE_NO = 'setPageNoAction';
const SETISFAVARATODCOUNT = "saveFavaratedCount";
const IS_CREATED_COUNT="isCreatedCount";
const IS_OWNED_NFTS_COUNT="isOwnedNFTsCount";
const featchNFTsCollection = (payload) => {
    return {
        type: FETCH_NFTS_COLLECTION,
        payload
    }
}

const setPageNoAction = (payload) => {
    return {
        type: SET_PAGE_NO,
        payload
    }
}
const saveFavaratedCount = (payload) => {
    return {
        type: SETISFAVARATODCOUNT,
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

const fetchNftsCollection = (walletAddress,data,pageNo, take, category, search = null, id = '',selectTabs) => {
    const skip = pageNo * take - take;
    return async (dispatch) => {
        dispatch(featchNFTsCollection({ key: 'collectionData', loading: true, data: null,error:null }));
        const response = await apiCalls.getMarketplace(`User/${selectTabs || "GetNfts"}/${walletAddress}/${take}/${skip}/${category}/${search}/${id}`);
        if (response.status == 200) {
            const mergedData = skip > 0 ? [...data, ...response.data] : response.data;
            dispatch(featchNFTsCollection({ key: 'collectionData', loading: false, data: mergedData,error:null }));
            dispatch(setPageNoAction(pageNo + 1));
        } else {
            dispatch(featchNFTsCollection({ key: 'collectionData', loading: false, data: null,error:apiCalls.isErrorDispaly(response) }));
        }
    }
}

const saveFavoriteNFT = (obj,callback) => {
    return async (dispatch) => {
        const response = await post(`User/SaveFavorite`, obj);
        if (response.status == 200) {
            dispatch(saveFavaratedCount({key:'saveFavaratedCount',data:response.data,loading:false,error:null}));
            if(callback){
                callback(response)
            }
        } else {
            dispatch(saveFavaratedCount({key:'saveFavaratedCount',data:null,loading:false,error:apiCalls.isErrorDispaly(response)}));
        }
    }
}

const getFavoritedCount = (useraddress) => {
    return async (dispatch) => {
        const res = await get(`User/FavoritesCount/${useraddress}`);
        if (res.status == 200) {
            dispatch(saveFavaratedCount({key:'getFavaratedCount',data:res.data,loading:false,error:null}));
        } else {
            dispatch(saveFavaratedCount({key:'getFavaratedCount',data:null,loading:false,error:apiCalls.isErrorDispaly(res)}));
        }
    }
}

const getCreatedCount = (useraddress,customerId) => {
    return async (dispatch) => {
        const res = await get(`User/CreatorsCount/${useraddress}/${customerId}`);
        if (res.status == 200) {
            dispatch(isCreatedCount({key:'createdNFTSCount',data:res.data,loading:false,error:null}));
        } else {
            dispatch(isCreatedCount({key:'createdNFTSCount',data:null,loading:false,error:apiCalls.isErrorDispaly(res)}));
        }
    }
}

const getOwnedCountData = (useraddress) => {
    return async (dispatch) => {
        const res = await get(`User/currentownerscount/${useraddress}`);
        if (res.status == 200) {
            dispatch(isOwnedNFTsCount({key:'ownedNFTsCount',data:res.data,loading:false,error:null}));
        } else {
            dispatch(isOwnedNFTsCount({key:'ownedNFTsCount',data:null,loading:false,error:apiCalls.isErrorDispaly(res)}));
        }
    }
}

let nftsCollections = {
    collectionData:{data:null,loading:false,error:null,page:1},
    saveFavaratedCount:{data:null,loader:false,error:null},
    getFavaratedCount:{data:null,loader:false,error:null},
    createdNFTSCount:{data:null,loader:false,error:null},
    ownedNFTsCount:{data:null,loader:false,error:null},
    data: null,
    loader: false,
    error: '',
    pageNo: 1,
}
const ntfsCollectionsReducer = (state = nftsCollections, action) => {
    switch (action.type) {
        case FETCH_NFTS_COLLECTION:
            state = { ...state, collectionData: action.payload };
            return state;
        case SET_PAGE_NO:
            state = { ...state, pageNo: action.payload };
            return state;
        case SETISFAVARATODCOUNT:
            state = { ...state, saveFavaratedCount: action.payload };
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