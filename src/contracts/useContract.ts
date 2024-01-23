import Contract from './voting.json';
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions';
export function useVotingContract() {
    async function addQuestion(contractAddress:any,questionHash: any, oprionHash: any, startTime: any, endTime) {
        return proposalAddQuestion(contractAddress,questionHash,oprionHash,startTime,endTime);
    }
    async function castVote(contractAddress,questionHash: any, oprionHash: any) {
      return proposalCastVote(contractAddress,questionHash,oprionHash);
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
      return writeContract(request);
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
      return writeContract(request);
    }
    return { addQuestion,castVote, parseError };
  }