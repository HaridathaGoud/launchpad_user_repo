import { useAccount, useSignMessage } from 'wagmi';
import token from '../contracts/token.json';
import stacking from '../contracts/staking.json';
import project from '../contracts/project.json';
import reward from '../contracts/rewards.json'
import { ethers } from 'ethers';
import Contract from '../contracts/mint.json';
import WETHContract from '../contracts/weth.json';
import { prepareWriteContract, readContract, waitForTransaction, writeContract } from 'wagmi/actions';
import { postSigner } from '../utils/api';
import { useSelector } from 'react-redux';
export default function useContractMethods() {
  const PRIVATE_KEY = process.env.REACT_APP_OWNER_PRIVATE_KEY;
  const user = useSelector((state: any) => state?.auth?.user);
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage({
    message: 'Please verify your identity with metamask',
  });
  const decimals: any = process.env.REACT_APP_DECIMALS;
  const decimalPoints: any = process.env.REACT_APP_POINST;
  function _provider() {
    const _provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_ALCHEMY_PROVIDER);
    return _provider;
  }

  function _getPoolLevel(amount: any) {
    amount = parseFloat(amount);
    let _poolLevel = 1;
    if (amount >= 1000 && amount <= 1499 ||
       amount >= 2500 && amount <= 2999||
       amount >= 5000 && amount <= 6999||
       amount >= 12000 && amount <= 14999||
       amount >= 25000 && amount <= 34999||
       amount >= 60000 && amount <= 79999) {
      _poolLevel = 1;
    } else if (amount >= 1500 && amount <= 1999 ||
      amount >= 3000 && amount <= 3499||
      amount >= 7000 && amount <= 8999||
      amount >= 15000 && amount <= 19999||
      amount >= 35000 && amount <= 44999||
      amount >= 80000 && amount <= 99999) {
      _poolLevel = 2;
    } else if (amount >= 2000 && amount <= 2499 ||
      amount >= 3500 && amount <= 4999||
      amount >= 9000 && amount <= 11999||
      amount >= 20000 && amount <= 24999||
      amount >= 45000 && amount <= 59999||
      amount >= 100000) {
      _poolLevel = 3;
    }
    return _poolLevel;
  }


  async function requestForStakingContract(funName, args) {
    const { request } = await prepareWriteContract({
      address: process.env.REACT_APP_STAKING_CONTRACT,
      abi: stacking.abi,
      functionName: funName,
      args,
    });
    return request;
  }
  async function requestForTokenContract(funName, args) {
    const { request } = await prepareWriteContract({
      address: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS,
      abi: token.abi,
      functionName: funName,
      args,
    });
    return request;
  }
  async function requestForProjectContract(funName, args, caddr,ether=0n) {
    if(funName==='buyToken'){
      const { request } = await prepareWriteContract({
        address: caddr,
        abi: project.abi,
        functionName: funName,
        value:ether,
        args,
      });
      return request;
    }
    const { request } = await prepareWriteContract({
      address: caddr,
      abi: project.abi,
      functionName: funName,
      args,
    });
    return request;
  }
  async function approve(callback: Function, amount: number) {
    const _allowence = ethers.BigNumber.from((amount * decimals).toLocaleString('fullwide', { useGrouping: false }));
    try {
      const request = await requestForTokenContract("approve", [process.env.REACT_APP_STAKING_CONTRACT, _allowence])
      const { hash } = await writeContract(request);
      const receipt = await waitForTransaction({ hash });
      callback({ ok: true, response: receipt });
    } catch (error) {
      callback({ ok: false, error });
    }
  }
  async function stack(callback: Function, amount: any,contract:any) {
    const _amt = ethers.utils.parseUnits(amount, decimalPoints);
    let _pool = _getPoolLevel(amount);
    const {
      signature: { v, r, s },
      nonce,
    } = await getSign(_amt, _pool,0,false,amount);
    try {
      const request = await requestForStakingContract("stake", [_amt, _pool, [v, r, s, nonce],contract])
      const { hash } = await writeContract(request);
      const receipt = await waitForTransaction({ hash });
      callback({ ok: true, response: receipt });
    } catch (error) {
      callback({ ok: false, error });
    }
  }
  function withdrawRewards() { }
  async function withDrawTokens(callback: Function, amount: any) {
    const _amt = ethers.utils.parseUnits(amount.toString(), decimalPoints);
    const count: any = await readContract({ address: process.env.REACT_APP_STAKING_CONTRACT, abi: stacking.abi, functionName: "getTierIdFromUser", args: [address] });
    const tierId = Number(count[0])
    const poolId = Number(count[1])
    const {
      signature: { v, r, s },
      nonce,
   // } = await getSign(_amt, _teirId.poolLevel?.toString(), _teirId.tierId?.toString());
    } = await getSign(_amt, poolId, tierId,true,amount);
    try {
      const request = await requestForStakingContract("withdraw", [[v, r, s, nonce]])
      const { hash } = await writeContract(request);
      const receipt = await waitForTransaction({ hash });
      callback({ ok: true, response: receipt });
    } catch (error) {
      callback({ ok: false, error });
    }
  }
  async function unStack(callback: Function, amount: string) {
    const _amount = ethers.utils.parseUnits(amount, decimalPoints);
    const count: any = await readContract({ address: process.env.REACT_APP_STAKING_CONTRACT, abi: stacking.abi, functionName: "getTierIdFromUser", args: [address] });
    const poolId = Number(count[1])
    const tierId = Number(count[0])
    const {
      signature: { v, r, s },
      nonce,
  } = await getSign(_amount, poolId, tierId,false,amount);
    try {
      const request = await requestForStakingContract("unStake", [_amount, [v, r, s, nonce]])
      const { hash } = await writeContract(request);
      const receipt = await waitForTransaction({ hash });
      callback({ ok: true, response: receipt });
    } catch (error) {
      callback({ ok: false, error });
    }
  }
  async function readAllowence(callback: Function) {
    const _allowence = await readContract({ address: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS, abi: token.abi, functionName: "allowance", args: [address, address] });
    callback(Number(_allowence).toString());
  }
  async function verifySign() {
    return await signMessageAsync();
  }
  async function readRewardBalance(contract:any) {
    const _result=await readContract({address:contract,abi:reward.abi,functionName:'balanceOf',args:[address]})
    return _result
  }
  async function getOwner(contract:any) {
    const _result=await readContract({address:contract,abi:reward.abi,functionName:'owner',args:[]})
    return _result
  }
  async function getStakedAmount() {
    const _result = await readContract({ address: process.env.REACT_APP_STAKING_CONTRACT, abi: stacking.abi, functionName: "getStakedAmount", args: [address] });
    return _result;
  }
  async function getUnstakedAmount() {
    const _result = await readContract({ address: process.env.REACT_APP_STAKING_CONTRACT, abi: stacking.abi, functionName: "getUnStakedAmount", args: [address] });
    return _result;
  }
  async function getRewards() {
    const _result = await readContract({ address: process.env.REACT_APP_STAKING_CONTRACT, abi: stacking.abi, functionName: "getRewards", args: [address] });
    return _result;
  }
  async function isStaker() {
    const _result = await readContract({ address: process.env.REACT_APP_STAKING_CONTRACT, abi: stacking.abi, functionName: "isStaker", args: [address] });
    return _result;
  }
  async function getUserStakeDetails() {
    const _result = await readContract({ address: process.env.REACT_APP_STAKING_CONTRACT, abi: stacking.abi, functionName: "getDetails", args: [address] });
    return _result;
  }
  async function getTotalStakers() {
    const _result = await readContract({ address: process.env.REACT_APP_STAKING_CONTRACT, abi: stacking.abi, functionName: "getTotalParticipants" });
    return Number(_result);
  }
  async function getTotalStaked() {
    const _result = await readContract({ address: process.env.REACT_APP_STAKING_CONTRACT, abi: stacking.abi, functionName: "getTotalStaked" });
    return Number(_result);
  }
  async function getSign(amount: any, poolID: any , _tierId?: any,isWithdraw=false,normalAmount:any) {
    normalAmount=Number(normalAmount)
    let tierID = _tierId || 0;
    if (!tierID && !isWithdraw) {
      if (normalAmount >= 1000 && normalAmount < 2500) {
        tierID = 1;
    } else if (
        normalAmount >= 2500 && normalAmount < 5000
    ) {
      tierID = 2;
    } else if (
        normalAmount >= 5000 && normalAmount < 12000
    ) {
      tierID = 3;
    } else if (
        normalAmount >= 12000 && normalAmount < 25000
    ) {
      tierID = 4;
    } else if (
        normalAmount >= 25000 && normalAmount < 60000
    ) {
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
    // contractAddress:process.env.REACT_APP_STAKING_CONTRACT
    // }
    // let data=await postSigner(`${'createLaunchPadsignature'}`,obj)

    const nonce = Math.floor(new Date().getTime() / 1000);
    const hash = ethers.utils.solidityKeccak256(
      ['address', 'address', 'uint256', 'uint256', 'uint256', 'uint256'],
      [process.env.REACT_APP_STAKING_CONTRACT, address, amount, tierID, poolID, nonce],
    );
    const private_key: any = process.env.REACT_APP_OWNER_PRIVATE_KEY;
    const msgHash = ethers.utils.arrayify(hash);
    const wallet = new ethers.Wallet(private_key, _provider());
    const signHash = await wallet.signMessage(msgHash);
    const signature = ethers.utils.splitSignature(signHash);
    return { signature, nonce };
  }
  async function stackRewards(callback: Function,amount:any,contract:any) {
    const details: any = await readContract({ address: process.env.REACT_APP_STAKING_CONTRACT, abi: stacking.abi, functionName: "getTierIdFromUser", args: [address] });
    const _amt = ethers.utils.parseUnits(amount, decimalPoints);
    const poolId = Number(details[1])
    const tierId = Number(details[0])
    const {
      signature: { v, r, s },
      nonce,
    } = await getSign(_amt, poolId, 0,false,amount);
    
    try {
      const request = await requestForStakingContract("stake", [_amt,poolId, [v, r, s, nonce],contract])
      const { hash } = await writeContract(request);
      const receipt = await waitForTransaction({ hash });
      callback({ ok: true, response: receipt });
    } catch (error) {
      callback({ ok: false, error });
    }
  }
  async function buyTokens(ether,amount: any, contractAddress: any) {
    const value= ethers.utils.parseUnits(ether.toString(),decimalPoints);
    const request = await requestForProjectContract("buyToken", [amount], contractAddress,value);
    return writeContract(request);
  }
  async function claimTokens(contractAddress: any) {
    const request = await requestForProjectContract("claimToken", [], contractAddress) 
    return writeContract(request);
  }
  function getParticipants() {
    return readContract({ address: process.env.REACT_APP_STAKING_CONTRACT, abi: stacking.abi, functionName: "getTierIdFromUser", args: [address] });

  }
  function fcfsStarttime(contractAddress: string) {
    return readContract({ address: contractAddress, abi: project.abi, functionName: "FCFSStartTime" });
  }
  function getAllocations(contractAddress: any) {
    return readContract({ address: contractAddress, abi: project.abi, functionName: "getAllocation", args: [address] });
  }
  async function minMultipleNft(uriArr: any, coinDetails: any, nftPrice: any, address) {
    const private_key: any = PRIVATE_KEY;
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_ALCHEMY_PROVIDER);
    var aggHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(uriArr[0]));
    for (var i = 1; i < uriArr.length; i++) {
      aggHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(`${uriArr[i]};${aggHash}`));
    }
    const nonce = Math.floor(new Date().getTime() / 1000)
    const finalAggHash = ethers.utils.solidityKeccak256(
      ["address", "string", "uint"],
      [address, aggHash, nonce]
    );

    const wallet = new ethers.Wallet(private_key, provider);
    const MSG_HASH = ethers.utils.arrayify(finalAggHash);
    const validSign = await wallet.signMessage(MSG_HASH);
    if (coinDetails == 'Matic') {
      return mintNativeWithWagmi(uriArr, aggHash, { signature: validSign, nonce }, {
        value: ethers.utils.parseUnits(nftPrice.toString(), 18),
        gasLimit: 900000,
        gasPrice: 300000,
      });
    } else {
      await approveEth(ethers.utils.parseUnits(nftPrice.toFixed(8).toString(), 18));
      return mintTokenWithWagmi(uriArr, aggHash, { signature: validSign, nonce }, {
        gasLimit: 900000,
        gasPrice: 300000,
      });
    }
  }
  async function mintNativeWithWagmi(args1, args2, args3, args4) {
    const { request } = await prepareWriteContract({
      address: process.env.REACT_APP_MINTING_CONTRACTOR,
      abi: Contract.abi,
      functionName: "safeMintMultiple",
      args: [args1, args2, args3],
      value: args4.value
    });
    return writeContract(request);
  }
  async function mintTokenWithWagmi(args1, args2, args3, args4) {
    const { request } = await prepareWriteContract({
      address: process.env.REACT_APP_MINTING_CONTRACTOR,
      abi: Contract.abi,
      functionName: "safeMintMultipleWithToken",
      args: [args1, args2, args3],
      gasPrice: args4.gasPrice,
      gas: args4.gasLimit,
    });
    return await writeContract(request);
  }

  async function approveEth(value) {
    const { request } = await prepareWriteContract({
      address: WETHContract.contractAddress,
      abi: WETHContract.abi,
      functionName: "approve",
      args: [process.env.REACT_APP_MINTING_CONTRACTOR, value]
    });
    const { hash } = await writeContract(request);
    return await waitForTransaction({ hash: hash });
  }
  function parseError(message) {
    let _message = message?.details || message?.cause?.reason || message?.message || message.fault;
    return _message;
  }

  return {
    approve,
    stack,
    getRewards,
    withDrawTokens,
    withdrawRewards,
    unStack,
    readAllowence,
    verifySign,
    getStakedAmount,
    getUnstakedAmount,
    getUserStakeDetails,
    getTotalStakers,
    getTotalStaked,
    stackRewards,
    buyTokens,
    claimTokens,
    getParticipants,
    fcfsStarttime,
    getAllocations,
    isStaker,
    minMultipleNft,
    readRewardBalance,
    parseError,
    getOwner
  };
}
