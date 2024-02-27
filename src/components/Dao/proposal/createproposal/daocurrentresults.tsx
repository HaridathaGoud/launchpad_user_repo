import { NextPage } from 'next';
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import styles from "./dao.module.css";
import { useAccount } from 'wagmi';
import { connect, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Button from '../../../../ui/Button';
import { Modal, modalActions } from '../../../../ui/Modal';
import votesuccess from   '../../../../assets/images/vote-success.gif'
import { useVotingContract } from '../../../../contracts/useContract';
import { getProposalViewData, saveVoting, getCustomeVoted, getVotersGrid } from '../../../../reducers/votingReducer';
import MintContract from '../../../../contracts/seichi.json';
import { readContract } from 'wagmi/actions';
import { getCustomerDetails } from '../../../../reducers/authReducer';
import OutletContextModel from '../../../../layout/context/model';
import outletContext from '../../../../layout/context/outletContext';
import Spinner from '../../../loaders/spinner';
import useContract from "../../../../hooks/useContract";
import { ethers } from "ethers";
const reducers = (state: any, action: any) => {
    switch (action.type) {
      case 'copied':
        return { ...state, copied: action.payload };
      case 'isNoButtonLoading':
        return { ...state, isNoButtonLoading: action.payload };
      case 'isButtonLoading':
        return { ...state, isButtonLoading: action.payload };
      case 'mintedMemberShipCount':
        return { ...state, mintedMemberShipCount: action.payload };
      case 'errorMsg':
        return { ...state, errorMsg: action.payload };
      case 'selectedOption':
        return { ...state, selectedOption: action.payload };
      case 'selectedhash':
        return { ...state, selectedhash: action.payload };
    }
  }
const   DaoCurrentResults = (props: any) => {
  const [saveBtn,setsaveBtn] = useState(true);
  const [editBtn,seteditBtn] = useState(false);
  const { isConnected, address } = useAccount();
  const proposarDetailas = useSelector((state: any) => state?.vtg?.fetchproposalviewdata);
  const savevoterddata = useSelector((state: any) => state?.vtg?.savevoterddata);
  const getCustomerData = useSelector((state: any) => state?.oidc?.user);
  const [isVoted, setisVoted] = useState<any>(false);
  const user = useSelector((state: any) => isConnected ? state?.oidc?.fetchproposalviewdata : state?.proposal?.proViewData);
  const params = useParams();
  const { castVote, parseError } = useVotingContract();
  const [optionVotingHashs, setOptionVotingHashs] = useState([])
  const scrollableRef = useRef<any>(null);
  const [state, dispatch] = useReducer(reducers, {
    copied: false, isButtonLoading: false, isNoButtonLoading: false,
    mintedMemberShipCount: null, errorMsg: null, selectedOption: null, selectedhash: null
  })
  const [loading, setLoading] = useState(false)
  const {setErrorMessage} :OutletContextModel=useContext(outletContext) 
  const {setToaster} :OutletContextModel=useContext(outletContext) 
  const mintingContractAddress: any = process.env.REACT_APP_MINTING_CONTRACTOR;
  const mintingKrijiContractAddress: any = process.env.REACT_APP_MINTING_KEIJI_CONTRACTOR;
  const votingSeicheContractAddress: any = process.env.REACT_APP_VOTING_CONTRACTOR;
  const votingKeijiContractAddress: any = process.env.REACT_APP_VOTING_KEIJI_CONTRACTOR;
  const DaoDetail = useSelector((state: any) => state?.proposal?.getWalletAddressChecking?.data)
  const selectedDaoData = useSelector((state: any) => state?.oidc?.fetchSelectingDaoData);
  const [daoVoteName, setDaoVoteName] = useState();
  const { getStakedAmount } = useContract();
  const [stakedAmount, setStakedAmount] = useState(0);
  const [stakeAmountLoader,setStakeAmountLoader]=useState(false)
  const getStakeAmount = async () => {
    setStakeAmountLoader(true)
    let response = await getStakedAmount();
    let _amt = response?.toString();
    if (_amt) {
      setStakedAmount(parseFloat(ethers.utils.formatEther(_amt)));
    }
    setStakeAmountLoader(false)
  };
  useEffect(() => {
    getStakeAmount();
  }, [address]);
  useEffect(() => {
    scrollableRef?.current?.scrollIntoView(0, 0);
    getDaoItem()
    if (isConnected) {
      setLoading(true)
      getOptionHashes()
      setErrorMessage?.("")
      dispatch({ type: 'errorMsg', payload: null })
    }
    getCustomer();
    if (address && isVoted) {
      window.location.reload();
    }
  }, [isConnected, address])

  const getDaoItem = () => {
    let daoData = DaoDetail?.find((item) => item?.daoId == selectedDaoData?.daoId||props?.pjctInfo?.daoId ) //selectedDaoData?.daoId)
    setDaoVoteName(daoData?.name)
    getBalanceCount(daoData?.name, address)
  }
  async function getBalanceCount(daoName, address) {
    // let contractAddress = daoName == "SEIICHI ISHII" ? mintingContractAddress : mintingKrijiContractAddress
    let contractAddress = daoName=  mintingContractAddress
    let balance: any = await readContract({
      address: contractAddress,
      abi: MintContract.abi,
      functionName: "balanceOf",
      args: [address]
    });
    balance = Number(balance);
    dispatch({ type: 'mintedMemberShipCount', payload: balance })
  }
  const getCustomer = () => {
    props.customers(address, (callback: any) => {
      setLoading(true)
      if (callback) {
        props.proposalViewData(params?.proposalId, callback?.data?.data?.id, (callback: any) => {
          if (callback) {
            setLoading(false)
          }
        });
      } else {
        setLoading(false)
      }
    });
  }

    const handleChange = (e: any) => {
        dispatch({ type: 'selectedOption', payload: e?.option })
        dispatch({ type: 'selectedhash', payload: e?.optionHash })
      }
      const handleRedirectVotingScreen = () => {
        if (state?.selectedOption ) {
            // modalActions('agreeModel','open')
            saveVote(true)
           }else{
            setErrorMessage?.("Please select your option")
           }
    }
    const getOptionHashes = () => {
        let hashes = proposarDetailas?.data?.options;
        for (let i in hashes) {
          let _obj = hashes[i];
          optionVotingHashs.push(_obj?.optionHash);
        }
      }
      useEffect(() => {
        setTimeout(() => {
          if (getCustomerData?.id) {
            props.getCustomeVoted(params?.proposalId, getCustomerData?.id, (callback: any) => {
              setisVoted(callback?.data?.data?.isVoted);
            })
          }
        }, 500);
      }, [getCustomerData, savevoterddata])

      const saveVote = async (value: any) => {
        getOptionHashes()
        dispatch({ type: 'isButtonLoading', payload: true })
        if (value && !state?.selectedOption) {
            setErrorMessage?.("Please select your option")
            dispatch({ type: 'isButtonLoading', payload: false })
        } else {
          dispatch({ type: 'errorMsg', payload: null })
          // dispatch({ type: 'isButtonLoading', payload: false })
          dispatch({ type: 'isNoButtonLoading', payload: !value })
          let obj = {
            "proposalId": params?.proposalId,
            "walletAddress": address,
            "Options": state?.selectedOption,
            "TransactionHash": state?.selectedhash,
            "Status": ((value && "Voted") || "Abstain")
          }
          // let contractAddress = daoVoteName === "SEIICHI ISHII" ? votingSeicheContractAddress : votingKeijiContractAddress
          let contractAddress = user?.data?.votingContractAddress;
          console.log(contractAddress)
          try {
            const response = await castVote(contractAddress, proposarDetailas?.data?.titleHash, state?.selectedhash);
            if (response) {
              props.saveVotersData(obj, (callback: any) => {
                if (callback?.data) {
                  props.proposalViewData(params?.proposalId, getCustomerData?.id);
                  props.getVotersGrid(1, 10, params?.proposalId);
                  dispatch({ type: 'isButtonLoading', payload: false })
                  dispatch({ type: 'isNoButtonLoading', payload: false })
                  setToaster?.("Your vote was cast successfully.")
                  setsaveBtn(false);
                  seteditBtn(true);
                } else {
                  dispatch({ type: 'isButtonLoading', payload: false })
                  dispatch({ type: 'isNoButtonLoading', payload: false })
                }
              });
            }
          } catch (error) {
            dispatch({ type: 'isButtonLoading', payload: false })
            dispatch({ type: 'isNoButtonLoading', payload: false })
            setsaveBtn(true);
            seteditBtn(false);
            setOptionVotingHashs([])
            setErrorMessage?.(parseError(error))
          }
        }
      };
    const handleCancel = () => {
        modalActions('agreeModel','close')
        modalActions('castYourVote','close')
    }
    const handleAgree=()=>{
        modalActions('agreeModel','close')
        modalActions('castYourVote','open')
    }
    const handleConfirmVote=()=>{
        modalActions('castYourVote','close')
        saveVote(true)
    }
    const handleEditVote=()=>{
        modalActions('agreeModel','open')
    }
    const handleViewVote=()=>{
        seteditBtn(false);
        setsaveBtn(true);
    }
    const getRecorderValue = (recorder) => {
      const recorderValues = ["A", "B", "C", "D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
      return recorderValues[recorder - 1];
    };
    return (
        <>
            <div>
                <h1 className='text-xl font-semibold mb-2 text-secondary mt-5'>Current results</h1>
                <div  className={` daorightpanel-bg rounded-[15px] py-4 px-4`}>
                <div className='flex justify-between gap-5 mb-5'>
                   <div className='shrink-0'>
                   <div className='mb-2'>           
                  {user?.data?.options?.map((data: any,index) => (<div className='text-secondary' key={data?.id}>
                    <div >
                    <span className={`${data?.votersCount ? styles.greenDot : styles.redDot} mr-2 align-middle`}></span>
                    <span className='text-secondary' >{data?.option} {`(${data?.votersCount || "0"})`}
                    </span>
                  </div>
                       </div>))}
                        
                    </div>
                   </div>
                   <div>
                   {/* <p className='text-secondary truncate'>23k The Saf...</p> */}
                   {editBtn && <> 
                    <img src={votesuccess} alt="" className='mt-2 w-[90px]' />
                    </>}
                   </div>
                 </div>
                 {!editBtn && !stakeAmountLoader && stakedAmount>=1000 &&
                 <div>
                 <h2 className='text-base font-semibold mb-2 text-secondary'>Cast Your Vote</h2>
                  <div className="mb-9">
                  {proposarDetailas?.data?.options?.length != 0 && <div className='mt-5'>
                          <div className='flex flex-wrap gap-2'>
                            {proposarDetailas?.data?.options?.map((item: any) => (<div className='me-4 break-all'>
                              <input type="radio" name="radio-1" className="radio mr-1 align-middle" 
                              key={item?.option}
                              value={item?.option}
                              aria-label={`radio ${item?.option}`}
                              disabled={isVoted && item?.isSelect === false}
                              onClick={() => handleChange(item)}
                              checked={item?.isSelect ? item?.isSelect : state?.selectedOption === item?.option}
                              />
                              <label className='text-secondary'>{item?.option}</label>
                            </div>
                            ))}
                          </div>
                        </div>}
                  </div>
                 </div> }
                <div>
                {editBtn && <> 
                    <p className=' text-secondary my-4 text-center'>Your vote was cast successfully.
                        </p>
                    </>}
                </div>
                    {saveBtn && !stakeAmountLoader && stakedAmount>=1000 && !isVoted && 
                        <div className='mb-2'>
                            <Button handleClick={handleRedirectVotingScreen} type='secondary' btnClassName='w-full flex justify-center gap-2'>
                            <span>{state?.isButtonLoading && <Spinner/>} </span>{" "}{'Vote Now'}
                            </Button>
                        </div>
                    }
                    {editBtn &&
                        <div>
                            <div className='mb-2'>
                                <Button children={'Edit Vote'} handleClick={handleEditVote} type='secondary' btnClassName='w-full' />
                            </div>
                            <div className='mb-2'>
                                <Button children={'View Vote'} handleClick={handleViewVote} type='secondary' btnClassName='w-full' />
                            </div>
                        </div>
                    } 
                  
                </div>
            </div>
           

                        <Modal id='agreeModel' modalClass='max-w-[510px]'>
                    <div >
                        <div className=''>
                            <div className="flex justify-between items-center  mb-5">
                                <h3 className="font-semibold text-lg">Terms Of Service</h3>
                            </div>
                            <div className={`py-4 px-3 flex gap-3 ${styles.popBg}`}>
                                <div>
                                    <span className={`icon ${styles.info}`}></span>
                                </div>
                                <div>
                                    <p>Oops, it seems you don’t have any voting power at block 31,272,274. <span className='font-semibold text-base cursor-pointer'>Learn more</span><span className={`icon cursor-pointer ${styles.squareArrow}`}></span></p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-7 px-10">
                                <p className='text-center font-semibold truncate'>docs.safran.store/library/terms-a...</p><span className={`icon cursor-pointer shrink-0 ${styles.squareArrow}`}></span>
                            </div>
                        </div>
                        <div className={`modal-action justify-center pt-4 ${styles.borderTop}`}>
                            <form method="dialog" className='flex items-center'>
                                <div className='mr-5'> <Button children={'Cancel'} handleClick={handleCancel} type='cancel' /></div>
                                 <Button children={'I agree'} handleClick={handleAgree} type='secondary' />
                            </form>
                        </div>
                    </div>
              
                        </Modal>
                      
            <Modal id='castYourVote' modalClass='max-w-[510px]'>
                <div >
                    <div >
                        <div className="flex justify-between items-center  mb-5">
                            <h3 className="font-semibold text-lg mb-5">Cast your vote</h3>
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <p className={`text-sm ${styles.lightColor}`}>Choice</p>
                            <p> {state?.selectedOption} </p>
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <p className={`text-sm ${styles.lightColor}`}>DOTT</p>
                            <p>31,272,274 <span className={`icon ${styles.squareArrow}`}></span></p>
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <p className={`text-sm ${styles.lightColor}`}>Your voting power</p>
                            <p>0 Safran</p>
                        </div>
                        <div className={`py-4 px-3 flex gap-3 mb-4 ${styles.popBg}`}>
                            <div>
                                <span className={`icon ${styles.info}`}></span>
                            </div>
                            <div>
                                <p>Oops, it seems you don’t have any voting power at block 31,272,274. <span className='font-semibold text-base cursor-pointer'>Learn more</span><span className={`icon cursor-pointer ${styles.squareArrow}`}></span></p>
                            </div>
                        </div>
                    </div>
                    <div className={`modal-action justify-center pt-6 mt-2 ${styles.borderTop}`}>
                        <form method="dialog" className='flex items-center'>
                            <div className='mr-5'> <Button children={'Cancel'} handleClick={handleCancel} type='cancel' /></div>
                            <Button children={'Confirm'} handleClick={handleConfirmVote} type='secondary' />
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
};
const connectDispatchToProps = (dispatch: any) => {
    return {
      proposalViewData: (sub: any, custId: any, callback: any) => {
        dispatch(getProposalViewData(sub, custId, callback));
      },
      getVotersGrid: (pageNo: any, pageSize: any, id: any) => {
        dispatch(getVotersGrid(pageNo, pageSize, id));
      },
      saveVotersData: (obj: any, callback: any) => {
        dispatch(saveVoting(obj, callback));
      },
      getCustomeVoted: (proposalId: any, getCustomerData: any, callback: any) => {
        dispatch(getCustomeVoted(proposalId, getCustomerData, callback));
      },
      customers: (address: any, callback: any) => {
        dispatch(getCustomerDetails(address, callback));
      },
    }
  }

export default connect(null, connectDispatchToProps) (DaoCurrentResults);