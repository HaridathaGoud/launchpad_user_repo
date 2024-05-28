export interface PortfolioStateModel {
    amounts?: any;
    search?:string
    activeStep?:any;
  }
export const initialPortfolioState = {
    amounts: { stakedAmount: null, unstakedAmount: null, rewardAmount: null },
    search:'',
    activeStep:0,
  };
  export const portfolioReducer = (
    state: PortfolioStateModel = initialPortfolioState,
    action: any
  ) => {
    switch (action.type) {
      case "setAmounts":
        state = { ...state, amounts: action.payload };
        break;
          case "setSearch":
            state = { ...state, search: action.payload };
            break;
          case "setActiveStep":
            state = { ...state, activeStep: action.payload };
            break;
      default:
        state = { ...state };
    }
    return state;
  };
