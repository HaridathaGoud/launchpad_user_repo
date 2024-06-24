import apiCalls from "../utils/api";
const SET_CUSTOMER_DATA = "setcustomerDetailsData";
const SET_TOP_SELLER_BANNER_DATA = "setTopSellerBannerData";

const setcustomerDetailsData = (payload:any) => {
    return {
      type: SET_CUSTOMER_DATA,
      payload,
    };
  } 
  const clearcustomerDetailsDetails = () => {
    return (dispatch:any) => {
      dispatch(setcustomerDetailsData({ loading: false, data: null, nextPage: 1 }))
    }
  } 
  const setTopSellerBannerData = (payload:any) => {
    return {
      type: SET_TOP_SELLER_BANNER_DATA,
      payload,
    };
  }
  const clearrTopSellerBannerDetails = () => {
    return (dispatch:any) => {
      dispatch(setTopSellerBannerData({ loading: false, data: null, nextPage: 1 }))
    }
  }
  const customerDetails = (information:any) => {
    const {  data,address } = information;
    return async (dispatch:any) => {
      dispatch(setcustomerDetailsData({ key: 'customerDetails', loading: true, data: data }));
      try {
        const res = await apiCalls.getMarketplace(`User/CustomerDetails/${address}`);
        if (res.status === 200) {
          dispatch(setcustomerDetailsData({ key: 'customerDetails', loading: false, data: data ? [...data, ...res.data] : res.data, error: null, }));
        } else {
          dispatch(
            setcustomerDetailsData({
              key: 'customerDetails',
              loading: false,
              data: data,
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
            setcustomerDetailsData({
            key: 'customerDetails',
            loading: false,
            data: data,
            error: error,
          }),
        );
      }
    };
  } 
  const fectTopSellerBannerDetails = (information:any) => {
    const {  followerId,customerId,data } = information;
    return async (dispatch:any) => {
      dispatch(setTopSellerBannerData({ key: 'topSellerBanerDetails', loading: true, data: data }));
      try {
        const res = await apiCalls.getMarketplace(`User/CustomerFollowers/${followerId}/${customerId}`);
        if (res.status === 200) {
          dispatch(setTopSellerBannerData({ key: 'topSellerBanerDetails', loading: false, data: data ? [...data, ...res.data] : res.data, error: null, }));
        } else {
          dispatch(
            setTopSellerBannerData({
              key: 'topSellerBanerDetails',
              loading: false,
              data: data,
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
            setTopSellerBannerData({
            key: 'topSellerBanerDetails',
            loading: false,
            data: data,
            error: error,
          }),
        );
      }
    };
  }

  export interface topSellerStateModel {
    customerDetails:any,
    topSellerBanerDetails:any,
}
export const topSellerState = {
    customerDetails: { loading: false, data: null, nextPage: 1 },
    topSellerBanerDetails: { loading: false, data: null, nextPage: 1 },
};
const topSellerReducer = (state = topSellerState, action) => {
    switch (action.type) {
        case SET_CUSTOMER_DATA: 
            return {
                ...state, customerDetails: {
                    data: action.payload.data,
                    error: action.payload.error,
                    loading: action.payload.loading,
                    nextPage: action.payload.nextPage 
                },
            };
            case SET_TOP_SELLER_BANNER_DATA:
            return {
                ...state, topSellerBanerDetails: {
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
export default topSellerReducer
export {
    clearcustomerDetailsDetails,
    customerDetails,
    fectTopSellerBannerDetails,
    clearrTopSellerBannerDetails
}