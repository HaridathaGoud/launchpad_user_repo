import apiCalls from "../utils/api";

const FETCH_TOP_SELLERS = "fetchTopSellersAction"
const fetchTopSellersAction = (payload) => {
    return {
        type: FETCH_TOP_SELLERS,
        payload
    }
}

  const fetchTopSellers = (information) => {
    const {take,page, data } = information;
    const skip = take * (page) - take;
    return async (dispatch) => {
      dispatch(fetchTopSellersAction({ key: 'dashboard', loading: true, data: data }));
      try {
        const res = await apiCalls.getMarketplace(`User/TopSellers/${take}/${skip}`);
        if (res.status === 200) {
          dispatch(fetchTopSellersAction({ key: 'dashboard', loading: false, data: data ? [...data, ...res.data] : res.data, error: null,nextPage: page + 1 }));
        } else {
          dispatch(
            fetchTopSellersAction({
              key: 'dashboard',
              loading: false,
              data: data,
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
            fetchTopSellersAction({
            key: 'dashboard',
            loading: false,
            data: data,
            error: error,
          }),
        );
      }
    };
  }



  const initialState = {
    topSellers: { loading: false, data: null, nextPage: 1 },
  }
  const dashboardReducer = (state, action) => {
    if (!state) {
      state = {
        ...initialState,
        ...state
      }
    }
    switch (action.type) {
        case FETCH_TOP_SELLERS:
          return {
            ...state, topSellers: {
              data: action.payload.data,
              error: action.payload.error,
              loading: action.payload.loading,
              nextPage: action.payload.nextPage || state?.['topSellers'].nextPage
            },
          };
          default:
      return state;
  }
}
export default dashboardReducer;
export {
    fetchTopSellers }