import apiCalls from "../utils/api";
const FETCH_NFTS = "fetchNftsAction";
const SET_LOADER = "setLoaderAction";
const SET_ERROR = "setErrorAction"
const SET_PAGE_NO = 'setPageNoAction'

//dashboard action types
const FETCH_TOP_SELLERS = "fetchTopSellersAction"



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
//Dashboard Actions

const fetchTopSellersAction = (payload) => {
    return {
        type: FETCH_TOP_SELLERS,
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

const fetchNfts = (data, pageNo = 1, category = 'all', search = null, id = '', take = 10) => {
    const skip = pageNo * take - take;
    return async (dispatch) => {
        dispatch(setLoaderAction(true));
        const response = await apiCalls.getMarketplace(`User/ExploreNfts/${take}/${skip}/${category}/${search}/${id}`);
        if (response.status === 200) {
            const mergedData = skip > 0 ? [...data, ...response.data] : response.data
            dispatch(fetchNftsAction(mergedData));
            dispatch(setPageNoAction(pageNo + 1))

        } else {
            dispatch(setErrorAction(response));
        }
        dispatch(setLoaderAction(false));
    }
}

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

const marketPlaceReducer = { exploreNtfsReducer, marketPlaceDashboardReducer }
export default marketPlaceReducer
export { fetchNfts, clearNfts,fetchTopSellers };