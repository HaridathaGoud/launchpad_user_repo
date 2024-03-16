export interface StakingStateModel {
  activeTab: number;
  activeStep: number;
  loader: boolean;
  isHideCountDownTimer: boolean;
  stakingDetails: any;
  amounts: any;
  stakeDetails: any;
  addressCopied: boolean;
}

export interface StakingContextModal {
  activeTab?: number;
  setActiveTab?: Function;
  activeStep?: number;
  setActiveStep?: Function;
  unstakedDate?: string | Date;
  getStakeDetails?: Function;
  stakeAmountData?: Function;
  unStakeAmtData?: Function;
  rewardsData?: Function;
  stakedAmount?: any;
  unstakedAmount?: any;
  rewardAmount?: any;
  loader?: boolean;
  isHideCountDownTimer?: boolean;
  setIsHideCountDownTimer?: Function;
  currencyBalance?: string | number;
  tokenBalance?: string| number;
  address?: string;
  isConnected?: boolean;
  stakeDetails?: any;
  setTimers?: Function;
  getAmounts?:Function;
  getNativeCurrency?:Function;
  getCurrency?:Function;
}

export interface StakingTabsModel {
  checkboxValue?: boolean;
  buttonLoader?: boolean;
  tabError?: string;
  amountFieldError?: string;
  tabAmount?: any;
  tabData?: any;
}

export interface StakingTabsContextModel {
  checkboxValue?: boolean;
  buttonLoader?: boolean;
  amountFieldError?: string;
  tabAmount?: any;
  tabData?: any;
  setAmountFieldError?: Function;
  setButtonLoader?: Function;
  setCheckboxValue?: Function;
  setTabAmount?: Function;
  setTabData?: Function;
  resetTab?: Function;
  tabError?: string;
  setTabError?: Function;
}
