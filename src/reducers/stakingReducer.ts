

const SET_STAKE_DETAILS="setStakeDetails"
const SET_STAKING_ACTIVE_TAB="setStakingActiveTab"
const SET_STAKING_ACTIVE_STEP="setStakingActiveStep"
const SET_SHOW_TIMER="setShowTimer"
const SET_AMOUNTS="setAmounts"
const SET_STAKING_TABS_DATA="setStakingTabsData"
const SET_BALANCES="setBalances";

export interface StakingDataModel {
    activeTab: number;
    activeStep: number;
    showTimer: boolean;
    stakedAmount:any,
    unstakedAmount:any,
    rewardAmount:any,
    stakeDetails: any;
    addressCopied: boolean;
    maticBalance: number | string;
    ybtBalance: number | string;
  }
const setStakeDetails=(payload)=>{
    return {
        type:SET_STAKE_DETAILS,
        payload:payload
    }
}
const setStakingTabsData=(payload)=>{
    return {
        type:SET_STAKING_TABS_DATA,
        payload:payload
    }
}


const stakingData={
    stakeDetails: null,
    activeTab: 0,
    activeStep: 0,
    timeLoader: false,
    isHideCountDownTimer: false,
    stakedAmount:null,
    unstakedAmount:null,
    rewardAmount:null,
    maticBalance:0,
    ybtBalance:0,
}

const stakingTabsData={
    checkboxValue: false,
    buttonLoader: false,
    tabError: "",
    amountFieldError: "",
    tabAmount: null,
    tabData: null,
}

const stakingReducer = (
    state: StakingDataModel = stakingData,
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
      case "setTimeLoader":
        state = { ...state, timeLoader: action.payload };
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