import { useAccount, useSignMessage, useNetwork } from "wagmi";
import token from "../contracts/token.json";
import staking from "../contracts/staking.json";
import project from "../contracts/project.json";
import reward from "../contracts/rewards.json";
import mint from "../contracts/mint.json";
import { ethers } from "ethers";
import WETHContract from "../contracts/weth.json";
import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
  switchNetwork,
} from "wagmi/actions";
import { auth } from "../appConfig";
import { supportedChainIds } from "../utils/supportedChains";
export default function useContractMethods() {
  const PRIVATE_KEY = process.env.REACT_APP_OWNER_PRIVATE_KEY;
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage({
    message: "Please verify your identity with metamask",
  });
  const decimals: any = process.env.REACT_APP_DECIMALS;
  const decimalPoints: any = process.env.REACT_APP_POINST;
  const stakingContract:`0x${string}`=process.env.REACT_APP_STAKING_CONTRACT as `0x${string}`
  function _provider() {
    const _provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ALCHEMY_PROVIDER
    );
    return _provider;
  }

  function _getPoolLevel(amount: any) {
    amount = parseFloat(amount);
    let _poolLevel = 1;
    if (
      (amount >= 1000 && amount <= 1499) ||
      (amount >= 2500 && amount <= 2999) ||
      (amount >= 5000 && amount <= 6999) ||
      (amount >= 12000 && amount <= 14999) ||
      (amount >= 25000 && amount <= 34999) ||
      (amount >= 60000 && amount <= 79999)
    ) {
      _poolLevel = 1;
    } else if (
      (amount >= 1500 && amount <= 1999) ||
      (amount >= 3000 && amount <= 3499) ||
      (amount >= 7000 && amount <= 8999) ||
      (amount >= 15000 && amount <= 19999) ||
      (amount >= 35000 && amount <= 44999) ||
      (amount >= 80000 && amount <= 99999)
    ) {
      _poolLevel = 2;
    } else if (
      (amount >= 2000 && amount <= 2499) ||
      (amount >= 3500 && amount <= 4999) ||
      (amount >= 9000 && amount <= 11999) ||
      (amount >= 20000 && amount <= 24999) ||
      (amount >= 45000 && amount <= 59999) ||
      amount >= 100000
    ) {
      _poolLevel = 3;
    }
    return _poolLevel;
  }
  async function handleNetwork() {
    const shouldChangeChain=(auth.connected && !supportedChainIds.includes(auth.chainId)) || (!auth.connected && !supportedChainIds.includes(chain?.id));
    if(shouldChangeChain){
      await switchNetwork({
        chainId: Number(process.env.REACT_APP_CHAIN_ID_NUMARIC) || 0,
      });
    }
  }
  const getAbiFor = (contract: string) => {
    switch (contract) {
      case "token":
        return token.abi;
      case "staking":
        return staking.abi;
      case "project":
        return project.abi;
      default:
        return [];
    }
  };
  async function requestForContract(
    contractAddress: any,
    abiName: string,
    functionName: string,
    args: object | any,
    value: any = 0n
  ) {
    await handleNetwork();
    let requestObject: any = {
      address: contractAddress,
      abi: getAbiFor(abiName),
      functionName,
      args,
    };
    if (value) {
      requestObject = { ...requestObject, value };
    }
    const { request } = await prepareWriteContract(requestObject);
    return request;
  }
  async function approve(callback: Function, amount: number) {
    const _allowence = ethers.BigNumber.from(
      (amount * decimals).toLocaleString("fullwide", { useGrouping: false })
    );
    try {
      const request = await requestForContract(
        process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
        "token",
        "approve",
        [stakingContract, _allowence]
      );
      const { hash } = await writeContract(request);
      const receipt = await waitForTransaction({ hash });
      callback({ ok: true, response: receipt });
    } catch (error) {
      callback({ ok: false, error });
    }
  }
  async function stake(callback: Function, amount: any, contract: any) {
    const _amt = ethers.utils.parseUnits(amount, decimalPoints);
    let _pool = _getPoolLevel(amount);
    const {
      signature: { v, r, s },
      nonce,
    } = await getSign(_amt, _pool,amount, 0,false);
    try {
      const request = await requestForContract(
        stakingContract,
        "staking",
        "stake",
        [_amt, _pool, [v, r, s, nonce], contract]
      );
      const { hash } = await writeContract(request);
      const receipt = await waitForTransaction({ hash });
      callback({ ok: true, response: receipt });
    } catch (error) {
      callback({ ok: false, error });
    }
  }
  function withdrawRewards() {}
  async function withDrawTokens(callback: Function, amount: any) {
    const _amt = ethers.utils.parseUnits(amount.toString(), decimalPoints);
    const count: any = await readContract({
      address: stakingContract as `0x${string}`,
      abi: staking.abi,
      functionName: "getTierIdFromUser",
      args: [address],
    });
    const tierId = Number(count[0]);
    const poolId = Number(count[1]);
    const {
      signature: { v, r, s },
      nonce,
      
    } = await getSign(_amt, poolId, amount, tierId,true);
    try {
      const request = await requestForContract(
        stakingContract,
        "staking",
        "withdraw",
        [[v, r, s, nonce]]
      );
      const { hash } = await writeContract(request);
      const receipt = await waitForTransaction({ hash });
      callback({ ok: true, response: receipt });
    } catch (error) {
      callback({ ok: false, error });
    }
  }
  async function unStake(callback: Function, amount: string) {
    const _amount = ethers.utils.parseUnits(amount, decimalPoints);
    const count: any = await readContract({
      address: stakingContract as `0x${string}`,
      abi: staking.abi,
      functionName: "getTierIdFromUser",
      args: [address],
    });
    const poolId = Number(count[1]);
    const tierId = Number(count[0]);
    const {
      signature: { v, r, s },
      nonce,
    } = await getSign(_amount, poolId, amount, tierId,false );
    try {
      const request = await requestForContract(
        stakingContract,
        "staking",
        "unStake",
        [_amount, [v, r, s, nonce]]
      );
      const { hash } = await writeContract(request);
      const receipt = await waitForTransaction({ hash });
      callback({ ok: true, response: receipt });
    } catch (error) {
      callback({ ok: false, error });
    }
  }
  async function readAllowence(callback: Function) {
    const _allowence = await readContract({
      address: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS as `0x${string}`,
      abi: token.abi,
      functionName: "allowance",
      args: [address, address],
    });
    callback(Number(_allowence).toString());
  }
  async function verifySign() {
    return await signMessageAsync();
  }
  async function readRewardBalance(contract: any) {
    const _result = await readContract({
      address: contract,
      abi: reward.abi,
      functionName: "balanceOf",
      args: [address],
    });
    return _result;
  }
  async function getOwner(contract: any) {
    const _result = await readContract({
      address: contract,
      abi: reward.abi,
      functionName: "owner",
      args: [],
    });
    return _result;
  }
  async function getStakedAmount() {
    const _result = await readContract({
      address: stakingContract as `0x${string}`,
      abi: staking.abi,
      functionName: "getStakedAmount",
      args: [address],
    });
    return _result;
  }
  async function getUnstakedAmount() {
    const _result = await readContract({
      address: stakingContract as `0x${string}`,
      abi: staking.abi,
      functionName: "getUnStakedAmount",
      args: [address],
    });
    return _result;
  }
  async function getRewards() {
    const _result = await readContract({
      address: stakingContract as `0x${string}`,
      abi: staking.abi,
      functionName: "getRewards",
      args: [address],
    });
    return _result;
  }
  async function isStaker() {
    const _result = await readContract({
      address: stakingContract as `0x${string}`,
      abi: staking.abi,
      functionName: "isStaker",
      args: [address],
    });
    return _result;
  }
  async function getUserStakeDetails() {
    const _result = await readContract({
      address: stakingContract as `0x${string}`,
      abi: staking.abi,
      functionName: "getDetails",
      args: [address],
    });
    return _result;
  }
  async function getTotalStakers() {
    const _result = await readContract({
      address: stakingContract as `0x${string}`,
      abi: staking.abi,
      functionName: "getTotalParticipants",
    });
    return Number(_result);
  }
  async function getTotalStaked() {
    const _result = await readContract({
      address: stakingContract,
      abi: staking.abi,
      functionName: "getTotalStaked",
    });
    return Number(_result);
  }
  async function getSign(
    amount: any,
    poolID: any,
    normalAmount: any,
    _tierId?: any,
    isWithdraw = false
  ) {
    normalAmount = Number(normalAmount);
    let tierID = _tierId || 0;
    if (!tierID && !isWithdraw) {
      if (normalAmount >= 1000 && normalAmount < 2500) {
        tierID = 1;
      } else if (normalAmount >= 2500 && normalAmount < 5000) {
        tierID = 2;
      } else if (normalAmount >= 5000 && normalAmount < 12000) {
        tierID = 3;
      } else if (normalAmount >= 12000 && normalAmount < 25000) {
        tierID = 4;
      } else if (normalAmount >= 25000 && normalAmount < 60000) {
        tierID = 5;
      } else if (normalAmount >= 60000) {
        tierID = 6;
      } else {
        tierID = 0;
      }
    }

    // let obj = {
    // customerId:user.id,
    // address:address,
    // signAmount:amount,
    // signTierId:tierID,
    // signPoolId:poolID,
    // contractAddress:stakingContract
    // }
    // let data=await postSigner(`${'createLaunchPadsignature'}`,obj)

    const nonce = Math.floor(new Date().getTime() / 1000);
    const hash = ethers.utils.solidityKeccak256(
      ["address", "address", "uint256", "uint256", "uint256", "uint256"],
      [
        stakingContract,
        address,
        amount,
        tierID,
        poolID,
        nonce,
      ]
    );
    const private_key: any = process.env.REACT_APP_OWNER_PRIVATE_KEY;
    const msgHash = ethers.utils.arrayify(hash);
    const wallet = new ethers.Wallet(private_key, _provider());
    const signHash = await wallet.signMessage(msgHash);
    const signature = ethers.utils.splitSignature(signHash);
    return { signature, nonce };
  }
  async function stakeRewards(callback: Function, amount: any, contract: any) {
    const details: any = await readContract({
      address: stakingContract,
      abi: staking.abi,
      functionName: "getTierIdFromUser",
      args: [address],
    });
    const _amt = ethers.utils.parseUnits(amount, decimalPoints);
    const poolId = Number(details[1]);
    const {
      signature: { v, r, s },
      nonce,
    } = await getSign(_amt, poolId, 0, false, amount);

    try {
      const request = await requestForContract(
        stakingContract,
        "staking",
        "stake",
        [_amt, poolId, [v, r, s, nonce], contract]
      );
      const { hash } = await writeContract(request);
      const receipt = await waitForTransaction({ hash });
      callback({ ok: true, response: receipt });
    } catch (error) {
      callback({ ok: false, error });
    }
  }
  async function buyTokens(
    ether,
    amount: any,
    isPublic: boolean,
    contractAddress: any
  ) {
    const value = ethers.utils.parseUnits(ether.toString(), decimalPoints);
    const request = await requestForContract(
      contractAddress,
      "project",
      "buyToken",
      [amount, isPublic],
      value
    );
    const response= await writeContract(request);
    await waitForTransaction({hash:response.hash});
    return response
  }
  async function claimTokens(contractAddress: any) {
    const request = await requestForContract(
      contractAddress,
      "project",
      "claimToken",
      []
    );
    return writeContract(request);
  }
  function getParticipants() {
    return readContract({
      address: stakingContract,
      abi: staking.abi,
      functionName: "getTierIdFromUser",
      args: [address],
    });
  }
  function fcfsStarttime(contractAddress: `0x${string}`) {
    return readContract({
      address: contractAddress,
      abi: project.abi,
      functionName: "FCFSStartTime",
    });
  }
  function getAllocations(contractAddress: `0x${string}`) {
    return readContract({
      address: contractAddress,
      abi: project.abi,
      functionName: "getAllocation",
      args: [address],
    });
  }
  async function minMultipleNft(
    uriArr: any,
    coinDetails: any,
    nftPrice: any,
    contractAddress
  ) {
    const private_key: any = PRIVATE_KEY;
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_ALCHEMY_PROVIDER
    );
    var aggHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(uriArr[0]));
    for (var i = 1; i < uriArr.length; i++) {
      aggHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(`${uriArr[i]};${aggHash}`)
      );
    }
    const nonce = Math.floor(new Date().getTime() / 1000);
    const finalAggHash = ethers.utils.solidityKeccak256(
      ["address", "string", "uint"],
      [address, aggHash, nonce]
    );

    const wallet = new ethers.Wallet(private_key, provider);
    const MSG_HASH = ethers.utils.arrayify(finalAggHash);
    const validSign = await wallet.signMessage(MSG_HASH);
    if (coinDetails === "Matic") {
      return mintNativeWithWagmi(
        uriArr,
        aggHash,
        { signature: validSign, nonce },
        {
          value: ethers.utils.parseUnits(nftPrice.toFixed(8), 18),
          // gasLimit: 900000,
          // gasPrice: 300000,
        },
        contractAddress
      );
    } else {
      await approveEth(
        ethers.utils.parseUnits(nftPrice.toFixed(8).toString(), 18)
      );
      return mintTokenWithWagmi(
        uriArr,
        aggHash,
        { signature: validSign, nonce },
        {
          gasLimit: 900000,
          gasPrice: 300000,
        }
      );
    }
  }
  async function mintNativeWithWagmi(
    args1,
    args2,
    args3,
    args4,
    contractAddress
  ) {
    const request = await prepareWriteContract({
      address: contractAddress,
      abi: mint.abi,
      functionName: "safeMintMultiple",
      args: [args1, args2, args3],
      value: args4.value,
    });
    return writeContract(request);
  }
  async function mintTokenWithWagmi(args1, args2, args3, args4) {
    const { request } = await prepareWriteContract({
      address: process.env.REACT_APP_MINTING_CONTRACTOR as `0x${string}`,
      abi: mint.abi,
      functionName: "safeMintMultipleWithToken",
      args: [args1, args2, args3],
      gasPrice: args4.gasPrice,
      gas: args4.gasLimit,
    });
    return await writeContract(request);
  }

  async function approveEth(value) {
    const { request } = await prepareWriteContract({
      address: WETHContract.contractAddress as `0x${string}`,
      abi: WETHContract.abi,
      functionName: "approve",
      args: [process.env.REACT_APP_MINTING_CONTRACTOR, value],
    });
    const { hash } = await writeContract(request);
    return await waitForTransaction({ hash: hash });
  }
  function parseError(message) {
    let _message =
      message?.details ||
      message?.cause?.reason ||
      message?.message ||
      message.fault;
    return _message;
  }

  async function readMintBalance(mintingContractAddress: any) {
    const balance = await readContract({
      address: mintingContractAddress,
      abi: mint.abi,
      functionName: "balanceOf",
      args: [address],
    });
    return balance;
  }

  async function getNativeTokenPriceForMint(mintingContractAddress: any) {
    const response = await readContract({
      address: mintingContractAddress,
      abi: mint.abi,
      functionName: "getPriceForNativeMint",
    });
    return response;
  }

  async function getMintedCount(mintingContractAddress: any) {
    const response = await readContract({
      address: mintingContractAddress,
      abi: mint.abi,
      functionName: "mintedCount",
    });
    return response;
  }
  async function getTotalSoldTokens(contractAddress: any,type:string) {
    try{
      const contractDetails={'ERC-20':[project.abi,'totalSoldToken'],'ERC-721':[mint.abi,'mintedCount']}
      const response = await readContract({
        address: contractAddress,
        abi: contractDetails[type][0],
        functionName: contractDetails[type][1],
      });
      
      return {data:parseFloat(ethers.utils.formatEther(response.toString())),error:''};
    }catch(error){
      return {data:null,error}
    }
   
  }
  return {
    approve,
    stake,
    getRewards,
    withDrawTokens,
    withdrawRewards,
    unStake,
    readAllowence,
    verifySign,
    getStakedAmount,
    getUnstakedAmount,
    getUserStakeDetails,
    getTotalStakers,
    getTotalStaked,
    stakeRewards,
    buyTokens,
    claimTokens,
    getParticipants,
    fcfsStarttime,
    getAllocations,
    isStaker,
    minMultipleNft,
    readRewardBalance,
    readMintBalance,
    getNativeTokenPriceForMint,
    getMintedCount,
    parseError,
    getOwner,
    getTotalSoldTokens
  };
}
