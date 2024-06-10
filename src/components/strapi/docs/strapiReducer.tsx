import apiCalls from "../../../utils/api";


const SET_DATA = "setData";
const SET_ABOUT_PAGE_US_DATA='setAboutPageData';
const SET_DOCS_PAGE_REST_DATA='setDocsPageRestData';

const setData = (payload) => {
    return {
      type: SET_DATA,
      payload,
    };
  }
  const setAboutPageData = (payload) => {
    return {
      type: SET_ABOUT_PAGE_US_DATA,
      payload,
    };
  }
  const setDocsPageRestData = (payload) => {
    return {
      type: SET_DOCS_PAGE_REST_DATA,
      payload,
    };
  }

  const clearDocsData = () => {
    return (dispatch) => {
      dispatch(setData({ loading: false, data: null, nextPage: 1 }))
    }
  }
  const clearAboutPageData = () => {
    return (dispatch) => {
      dispatch(setAboutPageData({ loading: false, data: null, nextPage: 1 }))
    }
  }
  const clearDocsPageRestData = () => {
    return (dispatch) => {
      dispatch(setDocsPageRestData({ loading: false, data: null, nextPage: 1 }))
    }
  }

  const getDocsDeatils = () => {
    return async (dispatch) => {
      dispatch(setData({ key: 'docsData', loading: true, data: [] }));
      try {
        const res = await apiCalls.getDocData();
        if (res.status === 200) {
          dispatch(setData({ key: 'docsData', loading: false, data: res.data.data, error: null, }));
        } else {
          dispatch(
            setData({
              key: 'docsData',
              loading: false,
              data: [],
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
            setData({
            key: 'docsData',
            loading: false,
            data: [],
            error: error,
          }),
        );
      }
    };
  }
  const getAboutPageDeatils = () => {
    return async (dispatch) => {
      dispatch(setAboutPageData({ key: 'aboutPageData', loading: true, data: [] }));
      try {
        const res = await apiCalls.getAboutpageData();
        if (res.status === 200) {
          dispatch(setAboutPageData({ key: 'aboutPageData', loading: false, data: res.data.data, error: null, }));
        } else {
          dispatch(
            setAboutPageData({
              key: 'aboutPageData',
              loading: false,
              data: [],
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
          setAboutPageData({
            key: 'aboutPageData',
            loading: false,
            data: [],
            error: error,
          }),
        );
      }
    };
  }
  const getDocPageRestDeatils = () => {
    return async (dispatch) => {
      dispatch(setDocsPageRestData({ key: 'docsPageRestData', loading: true, data: [] }));
      try {
        const res = await apiCalls.getDocsRestData();
        if (res.status === 200) {
          dispatch(setDocsPageRestData({ key: 'docsPageRestData', loading: false, data: res.data.data, error: null, }));
        } else {
          dispatch(
            setDocsPageRestData({
              key: 'docsPageRestData',
              loading: false,
              data: [],
              error: res,
            }),
          );
        }
      } catch (error) {
        dispatch(
          setDocsPageRestData({
            key: 'docsPageRestData',
            loading: false,
            data: [],
            error: error,
          }),
        );
      }
    };
  }

  let initialState = {
    docsData: { loading: true, data: null, nextPage: 1 },
    aboutPageData :{ loading: true, data: null, nextPage: 1 },
    docsPageRestData :{ loading: true, data: null, nextPage: 1 },
    activeTab:-1,
    activeStep: 0,
  }
  const strapiReducer = (state, action) => {
    if (!state) {
      state = {
        ...initialState,
        ...state
      }
    }
    switch (action.type) {

      case SET_ABOUT_PAGE_US_DATA:
        return {
          ...state,aboutPageData:{
            data:action.payload.data,
            error:action.payload.error,
            loading:action.payload.loading
          }
        }
        case SET_DATA:
        return {
          ...state,docsData:{
            data:action.payload.data,
            error:action.payload.error,
            loading:action.payload.loading
          }
        }
        case SET_DOCS_PAGE_REST_DATA:
          return {
            ...state,docsPageRestData:{
              data:action.payload.data,
              error:action.payload.error,
              loading:action.payload.loading
            }
          }
      case 'setActiveTab':
        state = { ...state, activeTab: action.payload }
        return state;
      case 'setActiveStep':
        state = { ...state, activeStep: action.payload }
        return state;
      default:
        return state;
    }
  }
  export default strapiReducer;
export {getDocsDeatils,clearDocsData ,getAboutPageDeatils,clearAboutPageData,getDocPageRestDeatils,clearDocsPageRestData};
