import Contract from './voting.json';
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions';
export function useVotingContract() {
    async function addQuestion(contractAddress:any,questionHash: any, oprionHash: any, startTime: any, endTime) {
        return await proposalAddQuestion(contractAddress,questionHash,oprionHash,startTime,endTime);
    }
    async function castVote(contractAddress,questionHash: any, oprionHash: any) {
      return await proposalCastVote(contractAddress,questionHash,oprionHash);
  }
    function parseError(message) {
      let _message = message?.details || message?.cause?.reason || message?.message || message.fault;
      return _message;
    }
    async function proposalAddQuestion(contractAddress,args1, args2, args3, args4) {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: Contract.abi,
        functionName: "addQuestion",
        args: [args1, args2, args3,args4],
        gasLimit: 2700000,
        gasPrice: 900000,
      });
      const response=await writeContract(request);
      await waitForTransaction({hash:response.hash});
      return response
    }
    async function proposalCastVote(contractAddress,args1, args2) {
      const  request  = await prepareWriteContract({
        address: contractAddress,
        abi: Contract.abi,
        functionName: "castVote",
        args: [args1, args2],
        gasLimit: 2700000,
        gasPrice: 900000,
      });
      const response=await writeContract(request);
      await waitForTransaction({hash:response.hash})
      return response
    }
    return { addQuestion,castVote, parseError };
  }