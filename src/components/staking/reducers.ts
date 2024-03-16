import { StakingStateModel, StakingTabsModel } from "./models";
export const initialStakingState = {
  stakeDetails: null,
  activeTab: 0,
  activeStep: 0,
  loader: true,
  isHideCountDownTimer: false,
  stakingDetails: {},
  amounts: { stakedAmount: null, unstakedAmount: null, rewardAmount: null },
  addressCopied: false,
  maticBalance:0,
  ybtBalance:0,
};

export const stakingTabsInitialState = {
  checkboxValue: false,
  buttonLoader: false,
  tabError: "",
  amountFieldError: "",
  tabAmount: null,
  tabData: null,
};
export const stakingReducer = (
  state: StakingStateModel = initialStakingState,
  action: any
) => {
  switch (action.type) {
    case "setMaticBalance":
      state = { ...state, maticBalance: action.payload };
      break;
    case "setYbtBalance":
      state = { ...state, ybtBalance: action.payload };
      break;
    case "setStakeDetails":
      state = { ...state, stakeDetails: action.payload };
      break;
    case "setActiveTab":
      state = { ...state, activeTab: action.payload };
      break;
    case "setActiveStep":
      state = { ...state, activeStep: action.payload };
      break;
    case "setLoader":
      state = { ...state, loader: action.payload };
      break;
    case "setIsHideCountDownTimer":
      state = { ...state, isHideCountDownTimer: action.payload };
      break;
    case "setStakingDetails":
      state = { ...state, stakingDetails: action.payload };
      break;
    case "setAmounts":
      state = { ...state, amounts: action.payload };
      break;
    case "setAddressCopied":
      state = { ...state, addressCopied: action.payload };
      break;
    default:
      state = { ...state };
  }
  return state;
};

export const stakingTabsCommonReducer = (
  state: StakingTabsModel = stakingTabsInitialState,
  action: any
) => {
  switch (action.type) {
    case "setCheckboxValue":
      state = { ...state, checkboxValue: action.payload };
      break;
    case "setButtonLoader":
      state = { ...state, buttonLoader: action.payload };
      break;
    case "setTabError":
      state = { ...state, tabError: action.payload };
      break;
    case "setAmountFieldError":
      state = { ...state, amountFieldError: action.payload };
      break;
    case "setTabAmount":
      state = { ...state, tabAmount: action.payload };
      break;
    case "setTabData":
      state = { ...state, tabData: action.payload };
      break;
    default:
      break;
  }
  return state;
};
