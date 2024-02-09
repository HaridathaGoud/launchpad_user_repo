import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { connect } from "react-redux";
import shimmers from "../../shimmers/shimmers";
import PlaceHolder from "../../shimmers/placeholder";
import { saveProposalCall, contractDetailsData } from '../proposlaReducer/proposlaReducer';
import StartedSteps from './steps';
import apiCalls from '../../../../utils/api';
import { useAccount } from 'wagmi';
import Moment from 'react-moment';
import { useVotingContract } from '../../../../contracts/useContract';
import Image from 'react-bootstrap/Image';
import error from '../../../../assets/images/error.svg';
import { getCustomerDetails } from '../../../../reducers/authReducer';
import { waitForTransaction } from 'wagmi/actions';
import WalletText from '../../../../utils/walletText';
import OutletContextModel from '../../../../layout/context/model';
import outletContext from '../../../../layout/context/outletContext';
import Button from '../../../../ui/Button';
import PublishProposalShimmer from '../../shimmers/publishproposalshimmer';

function PublishProposal(props: any) {
  const PublishShimmers = shimmers.PublishProposal(3);
  const { addQuestion, parseError } = useVotingContract();
  const [btnLoader, setBtnLoader] = useState(false);
  // const [errorMsg, setErrorMessage?.] = useState(null)
  const {toasterMessage,setErrorMessage,setToaster}:OutletContextModel=useContext(outletContext)
  const [optionVotingHashs, setOptionVotingHashs] = useState([])
  const [startDateEpoch,setStartDateEpoch] = useState<any>()
  const [endDateEpoch,setEndDateEpoch] = useState<any>()
  const contractData = useSelector((state: any) => state?.proposal?.contractDetails)
  const proposalDetails = useSelector((state: any) => state?.proposal?.proposalDetails);
  const getCustomerId = useSelector((state: any) => state?.oidc?.user?.id);
  const saveProposal = useSelector((state: any) => state?.proposal?.saveProposal)
  const router = useNavigate();
  const params = useParams();
  const { isConnected,address } = useAccount();  
  const [daoName, setDaoName] = useState();
  const [loader,setLoader] = useState(false);
  const [custmerKYC,setCustomerKYC] = useState<any>(false);
  const DaoDetail = useSelector((state: any) => state?.proposal?.getWalletAddressChecking?.data)
  const votingSeicheContractAddress: any = process.env.REACT_APP_VOTING_CONTRACTOR;
  const votingKeijiContractAddress: any = process.env.REACT_APP_VOTING_KEIJI_CONTRACTOR;


  useEffect(() => {
    if(isConnected){
    let localDate1 = new Date(proposalDetails?.startdate); 
    let utcDate = localDate1?.toISOString();   
    let utcDateObject = new Date(utcDate); 
    let startEpochTime = utcDateObject?.getTime(); 
    let stEpochTime = startEpochTime/1000
    setStartDateEpoch(stEpochTime);   
    
    let localDate2 = new Date(proposalDetails?.enddate); 
    let utcDate2 = localDate2?.toISOString();   
    let utcDateObject2 = new Date(utcDate2); 
    let endEpochTime = utcDateObject2?.getTime(); 
    let enEpochTime = endEpochTime/1000
    setEndDateEpoch(enEpochTime); 

    props?.contractDetails(params);
    setErrorMessage?.(props?.proposal?.contractDetails?.error)
    getDaoItem()
    }
  }, [getCustomerId])

  useEffect(()=>{
    if(address && isConnected){
      setLoader(true)
      props?.customerDetails(address,(callback:any)=>{      
        if(callback?.data?.data?.kycStatus?.toLowerCase() === "completed"){
          setLoader(false)
          setCustomerKYC(callback?.data?.data)
        }
        // else{
        //   router(`/user/kyc`)      
        // }
      })
    }
  },[address])
 

  const getDaoItem = () => {
    let daoData = DaoDetail?.find((item) => item?.daoId == params?.id)
    setDaoName(daoData?.name)
  }
  const getOptionHashes = () => {
    let hashes = proposalDetails?.ProposalOptionDetails;
    for (let i in hashes) {
      let _obj = hashes[i];
      optionVotingHashs.push(_obj?.optionhash);
    }
  }
 
  const publishProposal = async () => {
    setBtnLoader(true)
    getOptionHashes()
    let localDate = new Date(proposalDetails?.startdate); 
    let stUTC= localDate.toISOString(); 
    let stDateData = stUTC?.slice(0, 19)
    
    let localDate2 = new Date(proposalDetails?.enddate); 
    let endUTC = localDate2.toISOString(); 
    let endDateData  = endUTC?.slice(0, 19)    
    const obj = {
      id: "00000000-0000-0000-0000-000000000000",
      customerId: getCustomerId || custmerKYC.id || proposalDetails.customerId,
      daoId: params.id,
      title: proposalDetails?.proposal,
      description: proposalDetails?.summary,
      titleHash: proposalDetails.TitleHash,
      startTime: stDateData,
      endTime: endDateData,
      proposalType: proposalDetails?.proposalType,
      proposalOptionDetails: proposalDetails?.ProposalOptionDetails
    }
    let contractAddress = daoName == "SEIICHI ISHII" ? votingSeicheContractAddress : votingKeijiContractAddress
    try {
      const response = await addQuestion(contractAddress, proposalDetails.TitleHash, optionVotingHashs, startDateEpoch,endDateEpoch);
      const txResponse = await waitForTransaction({ hash: response.hash });
      if (txResponse && txResponse.status === 0) {
        setErrorMessage?.("transaction failed");
        setBtnLoader(false)
      }else{
        props?.saveProposalData(obj, (callback: any) => {
          if (callback?.data.id) {
            router(`/dao/success/${params?.id}`)
            setBtnLoader(false)
          } else {
            setErrorMessage?.(apiCalls.isErrorDispaly(callback));
            window.scroll(0, 0);
            setBtnLoader(false)
          }
        })
      }
  
    } catch (error) {
      setOptionVotingHashs([])
      setErrorMessage?.(apiCalls.isErrorDispaly(error));
      setBtnLoader(false)
      window.scroll(0, 0);
    }

  }
  return (
    <>
    {isConnected ? 
    <>
     
      <div className='container mx-auto pt-5'>
            {loader &&  <PublishProposalShimmer/> }
            {!loader && (
              <>
                {/* <Link to={`/dao/${params.id}/createpraposal`} className='title-width-fit'>  <span className='mb-0 back-text'>Create Proposal</span></Link>
        <hr className='custom-hr' />  */}
                <>
                  <div className='grid md:grid-cols-12 gap-4 max-md:px-3'>
                    {/* <div className='md:col-span-4'>
                      <StartedSteps formSteps={66} stepsOne={1} stepsTwo={2} number={2} />
                    </div> */}
                    
                    <div className='md:col-span-8'>
                      <div className='bg-base-300 rounded-lg bgDaocard py-2.5 px-4 mb-4'>
                        {!contractData?.loading && !loader ?
                          <div className=''>
                            <div className=''>
                              <span className='mb-0 me-2 text-base font-semibold text-secondary'>{proposalDetails?.proposal}</span>
                              <p className='mt-2'>{proposalDetails?.summary}</p>
                            </div>
                            <hr className='my-3' />
                            <div className=''>
                              <div className='flex items-center justify-between'>
                                <h1 className='mb-2 text-base font-semibold text-secondary'>Voting </h1>
                              </div>
                              <div>
                                <p>Your proposal options</p>
                                {proposalDetails?.ProposalOptionDetails?.map((item) => (
                                  <>
                                    <p className=''>{item?.index || "A"}. {item?.options}</p>
                                  </>
                                ))}
                              </div>
                            </div><hr className='my-3' />
                            <div className=''>
                              <h3 className='mb-3 text-base font-semibold text-secondary'>Duration </h3>
                              <div className='flex items-center justify-between mb-4'>
                                <p className=''>Start Date & Time</p>
                                <p className=''>
                                  <Moment local={true} format={"DD/MM/YYYY HH:mm"}>
                                    {proposalDetails?.startdate}
                                  </Moment>
                                </p>
                              </div>
                              <div className='flex items-center justify-between mb-4'>
                                <p className=''>End Date & Time</p>
                                <p className=''>
                                  <Moment local={true} format={"DD/MM/YYYY HH:mm"}>
                                    {proposalDetails?.enddate}
                                  </Moment>
                                </p>
                              </div>
                            </div>
                            <div className='text-end mt-2'>
                              <Button type='primary' disabled={btnLoader} handleClick={publishProposal} >
                                <span>{(saveProposal?.loading || btnLoader) && <span className="loading loading-spinner loading-sm"></span>} </span>
                                Publish Proposal
                              </Button>
                            </div>
                          </div>
                          : <PlaceHolder contenthtml={PublishShimmers} />}
                      </div>
                    </div>

                  </div>
                </>
              </>)}
      </div> 
      </> : <WalletText/>}
    </>
  );
}
const connectStateToProps = ({ oidc, proposal }: any) => {
  return { oidc: oidc, proposal: proposal };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    contractDetails: (params: any) => {
      dispatch(contractDetailsData(params));
    },
    saveProposalData: (obj: any, callback: any) => {
      dispatch(saveProposalCall(obj, callback))
    },
    customerDetails: (address:any,callback:any) => {
      dispatch(getCustomerDetails(address,callback));
  }
  }
}


export default connect(connectStateToProps, connectDispatchToProps)(PublishProposal);