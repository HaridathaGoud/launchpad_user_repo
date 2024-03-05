export interface StakingStateModel {
  activeTab: number;
  activeStep: number;
  timeLoader: boolean;
  isHideCountDownTimer: boolean;
  stakingDetails: any;
  amounts: any;
  stakeDetails: any;
  addressCopied: boolean;
  maticBalance: number | string;
  ybtBalance: number | string;
}

export interface StakingContextModal {
  activeTab?: number;
  setActiveTab?: Function;
  activeStep?: number;
  setActiveStep?: Function;
  unstakedDate?: string | Date;
  getDetails?: Function;
  stakeAmountData?: Function;
  unStakeAmtData?: Function;
  rewardsData?: Function;
  stakedAmount?: any;
  unstakedAmount?: any;
  rewardAmount?: any;
  timeLoader?: boolean;
  isHideCountDownTimer?: boolean;
  setIsHideCountDownTimer?: Function;
  maticBalance?: string | number;
  ybtBalance?: string| number;
  address?: string;
  isConnected?: boolean;
  stakeDetails?: any;
  setTimers?: Function;
  getAmounts?:Function;
  getNativeCurrency?:Function;
  getMaticCurrency?:Function;
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
