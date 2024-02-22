import apiCalls from "../utils/api";
const FETCH_NFTS = "fetchNftsAction";
const SET_LOADER = "setLoaderAction";
const SET_ERROR = "setErrorAction"
const SET_PAGE_NO = 'setPageNoAction'
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

const clearNfts=()=>{
    return (dispatch)=>{
        dispatch(setLoaderAction(false))
        dispatch(setPageNoAction(1))
        dispatch(fetchNftsAction(null))
    }
}

const fetchNfts = (data,pageNo = 1, category = 'all', search = null, id = '', take = 10) => {
    const skip = pageNo * take - take;
    return async (dispatch) => {
        dispatch(setLoaderAction(true));
        const response = await apiCalls.getMarketplace(`User/ExploreNfts/${take}/${skip}/${category}/${search}/${id}`);
        if (response.status === 200) {
            const mergedData=skip>0 ? [...data,...response.data] : response.data
            dispatch(fetchNftsAction(mergedData));
            dispatch(setPageNoAction(pageNo+1))

        } else {
            dispatch(setErrorAction(response));
        }
        dispatch(setLoaderAction(false));
    }
}

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


const marketPlaceReducer = { exploreNtfsReducer }
export default marketPlaceReducer
export { fetchNfts,clearNfts };