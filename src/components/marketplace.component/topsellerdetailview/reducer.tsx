export interface stateModel {
    loader: boolean;
    customerInfo: any;
    currentIndex: number;

}
export const topsellerState: stateModel = {
    loader: false,
    customerInfo: {},
    currentIndex:0,
};



export const topsellerReducer = (state=topsellerState, action) => {
    switch (action.type) {
      case "setCustomerInfo":
        state = { ...state, customerInfo: action.payload };
        break;
      case "setLoader":
        state = { ...state, loader: action.payload };
        break;
      default:
        state = { ...state };
    }
    return state;
  };