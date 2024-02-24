import React, { useState, useEffect, useRef, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import user from '../../../assets/images/praposal-user.png';
import voteimg from '../../../assets/images/vote-img.png';
import { getProposalViewData, saveVoting, getCustomeVoted, getVotersGrid } from '../../../reducers/votingReducer';
import { getCustomerDetails } from '../../../reducers/authReducer';
import { connect } from "react-redux";
import { useAccount } from 'wagmi';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useVotingContract } from '../../../contracts/useContract';
import Placeholder from 'react-bootstrap/Placeholder';
import error from '../../../assets/images/error.svg';
import Image from 'react-bootstrap/Image';
import moment from 'moment';
import MintContract from '../../../contracts/seichi.json';
import { readContract } from 'wagmi/actions';
import daoimg from '../../../assets/images/dao-img.png';
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
function ProposalVoting(props: any) {
  const { isConnected, address } = useAccount();
  const proposarDetailas = useSelector((state: any) => state?.vtg?.fetchproposalviewdata);
  const savevoterddata = useSelector((state: any) => state?.vtg?.savevoterddata);
  const getCustomerData = useSelector((state: any) => state?.oidc?.user);
  const [isVoted, setisVoted] = useState<any>(false);
  const [readMore, setReadMore] = useState(false)
  const params = useParams();
  const { castVote, parseError } = useVotingContract();
  const [optionVotingHashs, setOptionVotingHashs] = useState([])
  const scrollableRef = useRef<any>(null);
  const [state, dispatch] = useReducer(reducers, {
    copied: false, isButtonLoading: false, isNoButtonLoading: false,
    mintedMemberShipCount: null, errorMsg: null, selectedOption: null, selectedhash: null
  })
  const mintingContractAddress: any = process.env.REACT_APP_MINTING_CONTRACTOR;
  const mintingKrijiContractAddress: any = process.env.REACT_APP_MINTING_KEIJI_CONTRACTOR;
  const votingSeicheContractAddress: any = process.env.REACT_APP_VOTING_CONTRACTOR;
  const votingKeijiContractAddress: any = process.env.REACT_APP_VOTING_KEIJI_CONTRACTOR;
  const DaoDetail = useSelector((state: any) => state?.proposal?.getWalletAddressChecking?.data)
  const selectedDaoData = useSelector((state: any) => state?.oidc?.fetchSelectingDaoData);
  const [daoVoteName, setDaoVoteName] = useState();
  const loading1 = useSelector((state: any) => state?.vtg?.fetchproposalviewdata.loading)
  const [loading, setLoading] = useState(false)
  const userDetails = useSelector((state: any) => isConnected ? state?.oidc?.fetchproposalviewdata : state?.proposal?.proViewData);
  const startDate = new Date(proposarDetailas?.data?.startDate);
  useEffect(() => {
    scrollableRef?.current?.scrollIntoView(0, 0);
    getDaoItem()
    if (isConnected) {
      setLoading(true)
      getOptionHashes()
      dispatch({ type: 'errorMsg', payload: null })
    }
    getCustomer();
    if (address && isVoted) {
      window.location.reload();
    }
  }, [isConnected, address])

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
  const getDaoItem = () => {
    let daoData = DaoDetail?.find((item) => item?.daoId == selectedDaoData?.daoId)
    setDaoVoteName(daoData?.name)
    getBalanceCount(daoData?.name, address)
  }
  async function getBalanceCount(daoName, address) {
    // let contractAddress = daoName == "SEIICHI ISHII" ? mintingContractAddress : mintingKrijiContractAddress
    let contractAddress = daoName = mintingContractAddress
    let balance: any = await readContract({
      address: contractAddress,
      abi: MintContract.abi,
      functionName: "balanceOf",
      args: [address]
    });
    balance = Number(balance);
    dispatch({ type: 'mintedMemberShipCount', payload: balance })
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

  // const saveVote = async (value: any) => {
  //   getOptionHashes()
  //   if (value && !state?.selectedOption) {
  //     dispatch({ type: 'errorMsg', payload: "Please select your option" })
  //     window.scrollTo(0, 0)
  //   } else {
  //     dispatch({ type: 'errorMsg', payload: null })
  //     dispatch({ type: 'isButtonLoading', payload: value })
  //     dispatch({ type: 'isNoButtonLoading', payload: !value })
  //     let obj = {
  //       "proposalId": params?.id,
  //       "walletAddress": address,
  //       "Options": state?.selectedOption,
  //       "TransactionHash": state?.selectedhash,
  //       "Status": ((value && "Voted") || "Abstain")
  //     }
  //     let contractAddress = daoVoteName === "SEIICHI ISHII" ? votingSeicheContractAddress : votingKeijiContractAddress
  //     try {
  //       const response = await castVote(contractAddress, proposarDetailas?.data?.titleHash, state?.selectedhash);
  //       if (response) {
  //         props.saveVotersData(obj, (callback: any) => {
  //           if (callback?.data?.ok) {
  //             props.proposalViewData(params?.id, getCustomerData?.id);
  //             props.getVotersGrid(1, 10, params?.id);
  //             dispatch({ type: 'isButtonLoading', payload: false })
  //             dispatch({ type: 'isNoButtonLoading', payload: false })
  //             window.location.reload("_blank")
  //           } else {
  //             dispatch({ type: 'isButtonLoading', payload: false })
  //             dispatch({ type: 'isNoButtonLoading', payload: false })
  //             window.scrollTo(0, 0)
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       dispatch({ type: 'isButtonLoading', payload: false })
  //       dispatch({ type: 'isNoButtonLoading', payload: false })
  //       window.scrollTo(0, 0)
  //       setOptionVotingHashs([])
  //       dispatch({ type: 'errorMsg', payload: parseError(error) })

  //     }
  //   }

  // }
  const handleCopy = () => {
    dispatch({ type: 'copied', payload: true })
    setTimeout(() => {
      dispatch({ type: 'copied', payload: false })
    }, 1000);
  }
  const handleChange = (e: any) => {
    dispatch({ type: 'selectedOption', payload: e?.option })
    dispatch({ type: 'selectedhash', payload: e?.optionHash })
  }

  let currentDate = moment(new Date()).utc().format("YYYY-MM-DDTHH:mm:ss");
  const createdDate = moment(proposarDetailas?.data?.startDate).format("X");
  const ended = moment(proposarDetailas?.data?.endDate).format("X");
  const presentDate = moment(currentDate).format("X")

  const selectedObject = proposarDetailas?.data?.options?.find((obj: any) => obj?.isSelect === true);

  const showVotingOptions = presentDate >= createdDate && presentDate <= ended;


  const beforeStartDateandTime = () => {

    let stDateData = moment(new Date()).utc().format("YYYY-MM-DDTHH:mm:ss");
    let epochStart = moment(stDateData).format("X")
    let edDataData = proposarDetailas?.data?.startDate
    let epochEnd = moment(edDataData).format("X")

    const timeDifference = moment(proposarDetailas?.data?.startDate).format("X") == moment(stDateData).format("X")
    return timeDifference
  }
  const handleShowMore = (value:string)=>{
    value==="more" && setReadMore(true);
    value==="less" && setReadMore(false);
  }
  return (

    <>

      <div ref={scrollableRef}></div>
      <div className='py-[18px] px-5 rounded-lg shadow-md daorightpanel-bg'>
        {/* {(proposarDetailas?.error || savevoterddata?.error || state?.errorMsg) && (
          <div className='cust-error-bg'>
            <div className='mr-4'><Image src={error} alt="" /></div>
            <div>
              <p className='error-title error-red'>Error</p>
              <p className="error-desc">{proposarDetailas?.error || savevoterddata?.error || state?.errorMsg}</p></div>
          </div>
        )} */}
        <div>
          {loading ?
            <>
              <Placeholder xs={12} animation="glow">
                <Placeholder xs={1} className='me-3 shimmer-icon' />
                <Placeholder xs={5} />
              </Placeholder>
              <hr />
              <Placeholder as="p" animation="wave">
                <Placeholder style={{ width: '25%' }} /><br />
                <Placeholder className="w-75" /><br />
                <Placeholder style={{ width: '25%' }} /><br />
                <Placeholder className="w-75" />
              </Placeholder>
              <Placeholder xs={12} animation="glow">
                <Placeholder xs={1} className='me-3 shimmer-icon' />
                <Placeholder xs={2} className='me-3' />
                <Placeholder xs={1} className='me-3 shimmer-icon' />
                <Placeholder xs={2} className='me-3' />
              </Placeholder>
            </> :
            <>
              <div className='flex justify-between items-start'>
                <div className=''>
                  <span className='text-2xl font-semibold text-secondary'>{proposarDetailas?.data?.title}</span>
                </div>
                {isVoted && <div className='ml-auto'>
                  <span className='bg-primary text-white px-4 py-2 rounded rounded-[33px]'>VOTED</span>
                </div>}
              </div>
              <div>
                  <div>
                    <div >
                      <div className='pt-2'>
                        <div>
                          <div className="md:flex justify-between items-center mb-3.5">
                            <div className="flex items-center flex-wrap">
                              <div className='w-9 h-9 mr-2'>
                                <img src={user} className='' />
                              </div>
                              <p className='mr-2 text-secondary opacity-50'>Stargate DAO by</p>
                              {/* <p className='text-base font-semibold mr-4 text-secondary'>Harsha</p> */}
                              <div>
                                <span className={`text-base-100 font-semibold px-3 py-1 rounded bg-success`}>Active</span>
                              </div>
                            </div>
                            <div className='flex items-center gap-4'>
                              <h2 className='text-base font-semibold text-secondary whitespace-nowrap'>Created  By</h2>
                              <div className='flex items-center bg-accent rounded-[50px] p-1.5 truncate'>
                                <img src={user} className='w-[24px] mr-3' />
                                <span className='truncate'> {proposarDetailas?.data?.walletAddress === address ? "YOU" : proposarDetailas?.data?.createdBy ? proposarDetailas?.data?.createdBy : proposarDetailas?.data?.walletAddress}</span>
                                <CopyToClipboard text={proposarDetailas?.data?.walletAddress} options={{ format: 'text/plain' }}
                                  onCopy={() => handleCopy()}
                                >
                                  <span className={!state?.copied ? 'icon md copy-icon  cursor-pointer shrink-0' : 'icon copy-check c-pointer shrink-0  cursor-pointer'} />
                                </CopyToClipboard>
                              </div>
                            </div>
                          </div>
                          {/* <div className={`shrink-0 h-64`}>
                            <Image src={daoimg} className='rounded-lg object-cover w-full h-64' />
                          </div> */}
                          <h2 className='text-base font-semibold mt-3 text-secondary'>Project Overview</h2>
                          <p className='text-secondary break-all'>
                            {(!readMore && proposarDetailas?.data?.description?.length>30)
                              ? proposarDetailas?.data?.description?.slice(0, 30)+" ..."
                              : proposarDetailas?.data?.description}
                          </p>
                        </div>

                        {/* {proposarDetailas?.data?.options?.length != 0 && <div className='mt-5'>
                          <p className='text-base font-semibold mt-3 text-secondary'>choose your option</p>
                          <div className='d-flex flex-wrap-align voting-card-opt'>
                            {proposarDetailas?.data?.options?.map((item: any) => (<Form.Check className='me-4 options-width'>
                              <Form.Check.Input
                                type="radio"
                                className='c-pointer'
                                key={item?.option}
                                value={item?.option}
                                aria-label={`radio ${item?.option}`}
                                disabled={isVoted && item?.isSelect === false}
                                onClick={() => handleChange(item)}
                                checked={item?.isSelect ? item?.isSelect : state?.selectedOption === item?.option}
                              /><Form.Label className='text-secondary'>{item?.option}</Form.Label>
                            </Form.Check>))}
                          </div>
                        </div>} */}
                        <p className='text-center'>
                          {(!readMore && proposarDetailas?.data?.description?.length>30) && (<button onClick={()=>handleShowMore('more')} className='hover:text-primary text-secondary'>Show More</button>)}
                          {readMore && (<button onClick={()=>handleShowMore('less')} className="hover:text-primary text-secondary">Show Less</button>)}
                        </p>
                      </div>
                      {/* {proposarDetailas?.data?.options?.length == 0 && <><div className='mt-3'>
                        <h2 className='common-heading'>Votes</h2>
                        <div>
                          <ProgressBar className='custom-progress'>
                            <ProgressBar variant="success" now={proposarDetailas?.data?.yesPercentage} key={1} />
                            <ProgressBar variant="danger" now={proposarDetailas?.data?.noPercentage} key={2} />
                          </ProgressBar>
                        </div>
                      </div>
                        <div className='mt-2'>
                          <ul className='yes-no'>
                            <li> <span className='green-circle me-2'></span> <span>Yes</span> </li>
                            <li> {proposarDetailas?.data?.yesPercentage} </li>
                            <li>{proposarDetailas?.data?.TokenName}</li>
                          </ul>
                          <ul className='yes-no'>
                            <li> <span className='red-circle me-2'></span> <span>No</span> </li>
                            <li>{proposarDetailas?.data?.noPercentage} </li>
                            <li>{proposarDetailas?.data?.TokenName}</li>
                          </ul>
                        </div></>} */}
                    </div>
                  </div>

                  {/* <Row className='justify-content-center mt-4'>
                    <Col lg={8}>
                      {(!isVoted &&
                        state?.mintedMemberShipCount ==0
                        && showVotingOptions
                        && userDetails?.data?.status != "Publishing")
                        &&
                         <> {<div className='d-flex '>
                          <Button className='yes-btn' size="lg" onClick={() => saveVote(true)}
                            disabled={state?.isButtonLoading}
                          >
                            {state?.isButtonLoading && <Spinner size="sm" className='spinner-color text-base-100' />}
                            <span className='icon check'></span>
                            <span >Submit Vote</span>
                          </Button>
                        </div>}
                        </>
                         }  
                        </Col>
                  </Row> */}

                  {/* {isVoted && <div className=' pt-2 px-4 pb-4 success-vote'>
                    <div className='d-flex status-section justify-content-center align-items-center py-3'>
                      <span className='icon success-icon me-2'></span>
                      <div>
                        <p className='mb-0 text-secondary'>Your vote was cast successfully<br />You voted <span className='text-base font-semibold text-secondary'>
                          {(selectedObject?.option ? selectedObject?.option : state?.selectedOption) || (proposarDetailas?.data?.isAbstainStatus === true && "Abstain")}</span>
                        </p>
                      </div>
                    </div></div>} */}
              </div>
            </>}
        </div>
      </div>
    </>
  );
}
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
export default connect(null, connectDispatchToProps)(ProposalVoting);