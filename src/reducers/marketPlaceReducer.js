import apiCalls from "../utils/api";
const FETCH_NFTS = "fetchNftsAction";
const SET_LOADER = "setLoaderAction";
const SET_ERROR = "setErrorAction"
const SET_PAGE_NO = 'setPageNoAction'

//dashboard action types
const FETCH_TOP_SELLERS = "fetchTopSellersAction"
const FETCH_TOP_COLLECTIONS = "featchTopCollections"

//Create NFT Action Types:
const FETCH_USER_COLLECTIONS = "fetchUserCollections"
const FETCH_NETWORKS = "fetchNetworks"
const SAVE_NFT = "saveNft"

//collections

const FETCH_ALL_COLLECTIONS = "fetchAllCollections"
const SET_COLLECTION_LOADER = "setCollectionLoaderAction";
const SET_COLLECTION_ERROR = "setCollectionErrorAction"
const SET_COLLECTION_PAGE_NO = 'setCollectionPageNoAction'
const FETCH_MY_COLLECTIONS = 'fetchMyCollections';
//Explore NFTs actions
const fetchNftsAction = (payload) => {
    return {
        type: FETCH_NFTS,
        payload
    }
};
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

// Create nft actions

const fetchUserCollections = (payload) => {
    return {
        type: FETCH_USER_COLLECTIONS,
        payload
    }
}
const fetchNetworks = (payload) => {
    return {
        type: FETCH_NETWORKS,
        payload
    }
}

const saveNft = (payload) => {
    return {
        type: SAVE_NFT,
        payload
    }
}

//Dashboard Actions

const fetchTopSellersAction = (payload) => {
    return {
        type: FETCH_TOP_SELLERS,
        payload
    }
}

const featchTopCollections = (payload) => {
    return {
        type: FETCH_TOP_COLLECTIONS,
        payload
    }
}
//Explore Nfts methods:
const clearNfts = () => {
    return (dispatch) => {
        dispatch(setLoaderAction(false))
        dispatch(setPageNoAction(1))
        dispatch(fetchNftsAction(null))
    }
}

//collection methods:
const fetchAllCollections = (payload) => {
    return {
        type: FETCH_ALL_COLLECTIONS,
        payload
    }
}
const fetchMyCollections = (payload) => {
    return {
        type: FETCH_MY_COLLECTIONS,
        payload
    }
}

const collectionActions = { 'myCollections': fetchMyCollections, 'allCollections': fetchAllCollections };
const clearCollections = (key,payload=null) => {
    return (dispatch) => {
        dispatch(collectionActions[key](payload || {loading:false,data:null,error:'',nextPage:1}))
    }
}
const setCollectionLoaderAction = (payload) => {
    return {
        type: SET_COLLECTION_LOADER,
        payload
    }
};
const setCollectionErrorAction = (payload) => {
    return {
        type: SET_COLLECTION_ERROR,
        payload: payload
    }
};
const setCollectionPageNoAction = (payload) => {
    return {
        type: SET_COLLECTION_PAGE_NO,
        payload
    }
}

const fetchNfts = (information, screenName) => {
    const { pageNo, take, categoryName, searchBy, price, quantity, currency, status, customerId, collectionid, data, walletAddress, activeTab, amount } = information;
    const skip = pageNo * take - take;
    return async (dispatch) => {
        dispatch(setLoaderAction(true));
        let url;
        if (screenName === 'explorenfs') {
            url = `User/ExploreNfts/${take}/${skip}/${categoryName}/${searchBy}/${price}/${quantity || "All%20items"}/${currency}/${status}/${amount || null}/${customerId}`;
        } else if (screenName === 'hot collections') {
            url = `User/GetNftsByCollectionId/${collectionid}/${take}/${skip}/${price}/${quantity || "All%20items"}/${currency}/${status}/${amount || null}/${searchBy}/${customerId}`;
        }
        else if (screenName === 'profile' || screenName == 'topSellers') {
            url = `User/${activeTab}/${walletAddress}/${take}/${skip}/${price}/${searchBy}/${customerId}`
        }
        else if (screenName === 'browse by categeory') {
            url = `User/ExploreNfts/${take}/${skip}/${categoryName}/${searchBy}/${price}/${quantity || "All%20items"}/${currency}/${status}/${amount || null}/${customerId}`;
        }
        try {
            const response = await apiCalls.getMarketplace(url);
            if (response.status === 200) {
                const mergedData = skip > 0 ? [...data, ...response.data] : response.data;
                dispatch(fetchNftsAction(mergedData));
                dispatch(setPageNoAction(pageNo + 1));
                dispatch(setLoaderAction(false));
            } else {
                dispatch(setErrorAction(response));
            }
        } catch (error) {
            dispatch(setErrorAction({ message: error.message }));
        } finally {
            dispatch(setLoaderAction(false));
        }
    };
};

//dashboard methods:

const fetchTopSellers = (pageNo = 1, take = 4) => {
    const skip = pageNo * take - take;
    return async (dispatch) => {
        const response = await apiCalls.getMarketplace(`User/TopSellers/${take}/${skip}`)
        if (response.status === 200) {
            dispatch(fetchTopSellersAction({
                key: 'topSellers', data: response.data, loader: false, error: '',
                currPage: pageNo
            }));

        } else {
            dispatch(fetchTopSellersAction({
                key: 'topSellers', data: null, loader: false, error: apiCalls.isErrorDispaly(response),
                currPage: pageNo
            }));
        }
    }
}
//collections
const fetchCollections = (data, pageNo, search, screenName, customerId) => {
    pageNo = pageNo || 1
    search = search || null
    let take = 10
    const skip = pageNo * take - take;
    const api = { 'myCollections': `User/GetCustomerCollections/${customerId}`, 'allCollections': `User/GetAllCollections/${take}/${skip}/${search}` };
    return async (dispatch) => {
        try {
            dispatch(collectionActions[screenName]?.({ loading: true, data: data, error: '' }))
            const response = await apiCalls.getMarketplace(api[screenName]);
            if (response.status === 200) {
                const mergedData = skip > 0 ? [...data, ...response.data] : response.data;

                dispatch(collectionActions[screenName]?.({ loading: false, data: mergedData, error: '' }))

            } else {

                dispatch(collectionActions[screenName]?.({ loading: false, data: data, error: response }))
            }
        }
        catch (err) {
            dispatch(collectionActions[screenName]?.({ loading: false, data: data, error: err }))
        }
    }
}


//create nft methods:
const clearUserCollections = () => {
    return (dispatch) => {
        dispatch(fetchUserCollections({ loading: false, data: [], error: '' }))
    }
}
const getUserCollections = (params) => {
    const { customerId, collectionType } = params
    return async (dispatch) => {
        try {
            dispatch(fetchUserCollections({ loading: true, data: [], error: '' }));
            const response = await apiCalls.getMarketplace(`User/CollectionLu/${customerId}/${collectionType}`);
            if (response.status === 200) {
                dispatch(fetchUserCollections({ loading: false, data: response.data, error: '' }));
            } else {
                dispatch(fetchUserCollections({ loading: false, data: [], error: response }));
            }
        } catch (err) {
            dispatch(fetchUserCollections({ loading: false, data: [], error: err }));
        }

    }
}
const clearNetworks = () => {
    return (dispatch) => {
        dispatch(fetchNetworks({ loading: false, data: [], error: '' }))
    }
}
const getNetworks = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchNetworks({ loading: true, data: [], error: '' }));
            const response = await apiCalls.getMarketplace(`User/networkslu`);
            if (response.status === 200) {
                dispatch(fetchNetworks({ loading: false, data: response.data, error: '' }));
            } else {
                dispatch(fetchNetworks({ loading: false, data: [], error: response }));
            }
        } catch (err) {
            dispatch(fetchNetworks({ loading: false, data: [], error: err }));
        }

    }
}
const createNft = async (params) => {
    const { requestObject } = params
    try {
        const response = await apiCalls.postMarketplace(`User/SaveNFT`, requestObject);
        if (response.status === 200) {
            return { status: true, error: '' }
        } else {
            return { status: false, error: response }
        }
    } catch (err) {
        return { status: false, error: err }
    }
}

//Reducers:

let exploreNtfs = {
    data: null,
    loader: false,
    error: '',
    pageNo: 1,
}

const exploreNtfsReducer = (state = exploreNtfs, action) => {
    switch (action.type) {
        case FETCH_NFTS:
            state = { ...state, data: action.payload };
            return state;
        case FETCH_TOP_COLLECTIONS:
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

let marketPlaceDashboardState = {
    topSellers: {
        data: null, loader: false,
        error: '',
        currPage: 1,
    }
}

const marketPlaceDashboardReducer = (state = marketPlaceDashboardState, action) => {
    const { key, ...payload } = action.payload || {};
    switch (action.type) {
        case FETCH_TOP_SELLERS:
            state = { ...state, [key]: { ...state[key], ...payload } };
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

const createNftState = {
    userCollections: { loading: false, data: [], error: '' },
    networks: { loading: false, data: [], error: '' }
}
const createNftReducer = (state, action) => {
    state = state || createNftState
    switch (action.type) {
        case FETCH_USER_COLLECTIONS:
            state = { ...state, userCollections: action.payload };
            return state;
        case FETCH_NETWORKS:
            state = { ...state, networks: action.payload };
            return state;
        default:
            return state;
    }
}
const collectionData = {
    allCollections: {
        data: null,
        loading: false,
        error: '',
        pageNo: 1,
    },
    myCollections: {
        data: null,
        loading: false,
        error: '',
        pageNo: 1,
    }
}
const marketPlaceCollectionReducer = (state = collectionData, action) => {
    switch (action.type) {
        case FETCH_ALL_COLLECTIONS:
            state = {
                ...state, allCollections: {
                    data: action.payload.data,
                    error: action.payload.error,
                    loading: action.payload.loading,
                    nextPage: action.payload.nextPage || state?.['allCollections'].nextPage
                },
            };
            return state;
        case FETCH_MY_COLLECTIONS:
            state = {
                ...state, myCollections: {
                    data: action.payload.data,
                    error: action.payload.error,
                    loading: action.payload.loading,
                    nextPage: action.payload.nextPage || state?.['myCollections'].nextPage
                },
            };
            return state;
        default:
            return state;
    }
}

const marketPlaceReducer = { exploreNtfsReducer, marketPlaceDashboardReducer, createNftReducer, marketPlaceCollectionReducer }
export default marketPlaceReducer
export { fetchNfts, clearNfts, fetchTopSellers, fetchCollections, clearCollections, getUserCollections, createNft, getNetworks, clearUserCollections, clearNetworks, fetchNftsAction, setCollectionErrorAction };