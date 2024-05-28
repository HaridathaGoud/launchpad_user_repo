import apiCalls from "../utils/api";

const SET_PORTFOLIO = "setPortFolio";
const SET_USER_INVESTMENTS = 'setUserInvestments';
const SET_USER_CLAIMS= 'setUserClaims';
const setPortfolio = (payload) => {
    return {
      type: SET_PORTFOLIO,
      payload,
    };
  }
  const setUserInvestments = (payload) => {
    return {
      type: SET_USER_INVESTMENTS,
      payload,
    };
  }
  const setUserClaims = (payload) => {
    return {
      type: SET_USER_CLAIMS,
      payload,
    };
  }
  const clearPortFolio = () => {
    return (dispatch) => {
      dispatch(setPortfolio({ loading: false, data: null, nextPage: 1 }))
    }
  }
  const clearUserInvestments = () => {
    return (dispatch) => {
      dispatch(setUserInvestments({ loading: false, data: null, nextPage: 1 }))
    }
  }
  const clearUserClaims = () => {
    return (dispatch) => {
      dispatch(setUserClaims({ loading: false, data: null, nextPage: 1 }))
    }
  }

  const getPortFolio = (information) => {
    const {  data,customerId } = information;
    return async (dispatch) => {
      dispatch(setPortfolio({ key: 'portfoliodata', loading: true, data: data }));
      try {
        const res = await apiCalls.getPortFolioData(customerId);
        if (res.status === 200) {
          dispatch(setPortfolio({ key: 'portfoliodata', loading: false, data: data ? [...data, ...res.data] : res.data, error: null, }));
        } else {
          dispatch(
            setPortfolio({
              key: 'portfoliodata',
              loading: false,
              data: data,
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
            setPortfolio({
            key: 'portfoliodata',
            loading: false,
            data: data,
            error: error,
          }),
        );
      }
    };
  }

  const getUserinvestments = (information) => {
    const {take,page, data,customerId,search } = information;
    const skip = take * (page) - take;
    return async (dispatch) => {
      dispatch(setUserInvestments({ key: 'userinvestmentsata', loading: true, data: data }));
      try {
        const res = await apiCalls.getUserInvestments(take, skip, customerId, search);
        if (res.status === 200) {
          dispatch(setUserInvestments({ key: 'userinvestmentsata', loading: false, data: data ? [...data, ...res.data] : res.data, error: null,nextPage: page + 1 }));
        } else {
          dispatch(
            setUserInvestments({
              key: 'userinvestmentsata',
              loading: false,
              data: data,
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
            setUserInvestments({
            key: 'userinvestmentsata',
            loading: false,
            data: data,
            error: error,
          }),
        );
      }
    };
  }
  const getUserClaims = (information) => {
    const {take,page, data,customerId,search } = information;
    const skip = take * (page) - take;
    return async (dispatch) => {
      dispatch(setUserClaims({ key: 'userclaims', loading: true, data: data }));
      try {
        const res = await apiCalls.getUserclaims(take, skip, customerId,search);
        if (res.status === 200) {
          dispatch(setUserClaims({ key: 'userclaims', loading: false, data: data ? [...data, ...res.data] : res.data, error: null,nextPage: page + 1 }));
        } else {
          dispatch(
            setUserClaims({
              key: 'userclaims',
              loading: false,
              data: data,
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
            setUserClaims({
            key: 'userclaims',
            loading: false,
            data: data,
            error: error,
          }),
        );
      }
    };
  }

  let initialState = {
    portfoliodata: { loading: false, data: null, nextPage: 1 },
    userinvestmentsata: { loading: false, data: null, nextPage: 1 },
    userclaims: { loading: false, data: null, nextPage: 1 },
  }
  const portfolioReducer = (state, action) => {
    if (!state) {
      state = {
        ...initialState,
        ...state
      }
    }
    switch (action.type) {
        case SET_PORTFOLIO:
          return {
            ...state, portfoliodata: {
              data: action.payload.data,
              error: action.payload.error,
              loading: action.payload.loading,
              nextPage: action.payload.nextPage || state?.['portfoliodata'].nextPage
            },
          };
          case SET_USER_INVESTMENTS:
          return {
            ...state, userinvestmentsata: {
              data: action.payload.data,
              error: action.payload.error,
              loading: action.payload.loading,
              nextPage: action.payload.nextPage || state?.['userinvestmentsata'].nextPage
            },
          };
          case SET_USER_CLAIMS:
          return {
            ...state, userclaims: {
              data: action.payload.data,
              error: action.payload.error,
              loading: action.payload.loading,
              nextPage: action.payload.nextPage || state?.['userclaims'].nextPage
            },
          };
          default:
      return state;
  }
}
export default portfolioReducer;
export {
    getPortFolio,clearPortFolio,clearUserInvestments,getUserinvestments,clearUserClaims,getUserClaims }