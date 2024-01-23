import { ethers } from "ethers";

export const stakeAmountData = async (getStakedAmount: Function) => {
  let response = await getStakedAmount();
  let _amt = response.toString();
  if (_amt) {
    return parseFloat(ethers.utils.formatEther(_amt));
  }
};
export const unstakeAmtData = async (getUserStakeDetails: Function) => {
  let response = await getUserStakeDetails();
  let _amt = response?.unstakeAmount.toString();
  if (_amt) {
    return parseFloat(ethers.utils.formatEther(_amt));
  }
};

export const rewardsData = async (getRewards: Function) => {
  let response = await getRewards();
  let amt = response.toString();
  if (amt) {
    return parseFloat(ethers.utils.formatEther(amt));
  }
};

export const addCommasToNumber = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const checkpointTexts = {
  balaneTexts: [
    `${process.env.REACT_APP_TOKEN_SYMBOL}${" "}available to deposit`,
    `Have an active ${process.env.REACT_APP_TOKEN_SYMBOL} stake`,
    "7 days waiting period elapsed",
    "Rewards available",
  ],
  maticText: `${process.env.REACT_APP_CURRENCY} available in wallet`,
  maticSubText: `${process.env.REACT_APP_CURRENCY} is required to pay transaction fees on the Polygon network.`,
  eligibleTexts: [
    "Eligible to stake",
    `Eligible to initiate unstake`,
    `You have Unstaked your ${process.env.REACT_APP_TOKEN_SYMBOL}`,
    "Eligible to Stake/Withdraw",
  ],
  eligibleSubTexts: [
    undefined,
    `You cannot unstake if you already have an active ${process.env.REACT_APP_TOKEN_SYMBOL} unstake/withdrawal request`,
    undefined,
    undefined,
  ],
};

export const formatAmount = (amount: number|string, digits: number) => {
  amount=(typeof amount==="number") ? amount.toString():amount;
  return {balance:parseFloat(amount),formattedBalance:parseFloat(amount).toLocaleString("en-US", {
    maximumFractionDigits: digits,
  })};
};