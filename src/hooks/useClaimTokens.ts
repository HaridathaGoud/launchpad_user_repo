import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setError } from '../reducers/layoutReducer';
import useContractMethods from './useContract';
import { ethers } from 'ethers';

const useClaimTokens = (onClaim?:Function) => {
    const rootDispatch=useDispatch()
    const {claimTokens} = useContractMethods();
    const [isClaiming, setisClaiming] = useState<any>(false);
    const [tokensClaimed,setTokensClaimed]=useState(false)
    const _provider=()=> {
        const _connector: any = (window as any)?.ethereum;
        const provider = new ethers.providers.Web3Provider(_connector);
        return provider;
      }
    const handleClaim = async (index: any,item:any) => {
        rootDispatch(setError({message:''}))
        setisClaiming(index);
        try{
            const response=await claimTokens(item?.contractAddress);
            const receipt=await _provider().waitForTransaction(response?.hash);
            if(receipt){
                setisClaiming(-1);
                setTokensClaimed(true)
            }
        }catch(err){
            rootDispatch(setError({message:err,from:'contract'},))
        }finally{
            setisClaiming(-1);
        }
      };
      return {isClaiming,handleClaim,tokensClaimed}
}

export default useClaimTokens