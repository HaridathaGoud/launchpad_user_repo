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
const clearCollections = () => {
    return (dispatch) => {
        dispatch(setLoaderAction(false))
        dispatch(setPageNoAction(1))
        dispatch(featchTopCollections(null))
    }
}
const fetchNfts = (information, screenName) => {
    const { pageNo, take, categoryName, searchBy, price, quantity, currency, status, customerId, collectionid, data,walletAddress,activeTab } = information;
    const skip = pageNo * take - take;
    return async (dispatch) => {
        dispatch(setLoaderAction(true));
        let url;
        if (screenName === 'explorenfs') {
            url = `User/ExploreNfts/${take}/${skip}/${categoryName}/${searchBy}/${price}/${quantity || "All%20items"}/${currency}/${status}/${customerId}`;
        } else if (screenName === 'hot collections') {
            url = `User/GetNftsByCollectionId/${collectionid}/${take}/${skip}/${price}/${quantity || "All%20items"}/${currency}/${status}/${searchBy}`;
        }
        else if(screenName === 'profile'){
            url = `User/${activeTab}/${walletAddress}/${take}/${skip}/${categoryName}/${searchBy}/${customerId}`
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

const fetchCollections = (data, pageNo, search, screenName, customerId) => {
    pageNo = pageNo || 1
    search = search || null
    let take = 10
    const skip = pageNo * take - take;
    return async (dispatch) => {
        dispatch(setLoaderAction(true));
        // const response = await apiCalls.getMarketplace(`User/ExploreNfts/${take}/${skip}/${category}/${search}/${id}`);
        const response = screenName === '/marketplace/mycollections' ? await apiCalls.getMarketplace(`User/GetCustomerCollections/${customerId}`) : await apiCalls.getMarketplace(`User/GetAllCollections/${take}/${skip}/${search}`);
        if (response.status === 200) {
            const mergedData = skip > 0 ? [...data, ...response.data] : response.data
            dispatch(featchTopCollections(mergedData));
            dispatch(setPageNoAction(pageNo + 1))

        } else {
            dispatch(setErrorAction(response));
        }
        dispatch(setLoaderAction(false));
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

const marketPlaceReducer = { exploreNtfsReducer, marketPlaceDashboardReducer, createNftReducer }
export default marketPlaceReducer
export { fetchNfts, clearNfts, fetchTopSellers, fetchCollections, clearCollections, getUserCollections, createNft, getNetworks, clearUserCollections, clearNetworks };