import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'react-bootstrap/Image';
import Placeholder from 'react-bootstrap/Placeholder';
import { ethers } from 'ethers';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import Alert from 'react-bootstrap/Alert';
import MintContract from '../../contracts/mint.json';
import {  Button } from 'react-bootstrap';
 import { create as ipfsHttpClient } from 'ipfs-http-client';
import { getMetaDataDetails, getMemberTypes, getCustomerRegisterDetails, setIscustomerRegister, handleFetchMetaData, setUserID } from '../../reducers/rootReducer';
import { connect, useSelector } from 'react-redux';
import  useContractMethods  from '../../hooks/useContract';
import { put } from '../../utils/apiPut';
import Registrationchecklist from "./registrationChecklist"
import { store } from '../../store';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { readContract, waitForTransaction } from 'wagmi/actions';
import Modal from 'react-bootstrap/Modal';
import { getCUstomers } from '../../utils/api';
import loadimg from '../../assets/images/loader.svg'
import { useParams } from 'react-router-dom';
import error from '../../assets/images/error.svg';
function Dashboard(props: any) {
  const { isConnected, address } = useAccount();
  const [type, setType] = useState<any>('General');
  const [nftPrice, setNftPrice] = useState<any>('');
  const [count, setCount] = useState<any>(1);
  const [isMinting, setMinting] = useState<any>(false);
  const [loader, setLoader] = useState<any>(false);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [getMemberShipPriceDetails, setGetMemberShipPriceDetails] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<any>({});
  const [luDataSet, setLuData] = useState<any>(null);
  const memberType = useSelector((state: any) => state.auth.memberType);
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null);
  const [nftMintCount, setNftMintCount] = useState<any>(null);
  const { minMultipleNft, parseError } = useContractMethods();
  const router = useNavigate();
  const [success, setSuccess] = useState<any>(null);
  const projectId = process.env.REACT_APP_PROJECTID;
  const projectSecret = process.env.REACT_APP_PROJECTSECRET;
  const authorization = 'Basic ' + btoa(projectId + ':' + projectSecret);
  const [metaDataUri, setMetaDataUri] = useState<any[]>([]);
  const [coinDetails, setCoinDetails] = useState<any>('Matic');
  const authInfo = useSelector((state: any) => state.auth.user);
  const customerRegisterDetails = useSelector((state: any) => state.auth.customerRegisterDetails);
  const [smartMintedNftCount, setSmartMintedNftCount] = useState<any>(null)
  const [maxMintedNfts, setMaxMintedNfts] = useState<any>()
  const [maxNftCount, setMaxNftCount] = useState<any>(null)
  const [currencyValue, setCurrencyValue] = useState<any>()
  const shouldLog = useRef(true);
  const [note, setNote] = useState<any>()
  const [currecnyLodaer, setCurrecnyLodaer] = useState(false);
  const [showRefreshbtn, setIsShowRefreshBtn] = useState<any>(false)
  const [imageCid,setImageCid]=useState([])
   const [benefitsShow, setBenefitsShow] = React.useState(false);
   const [referralPrice,setReferralPrice]=useState()
  const mintingContractAddress: any = process.env.REACT_APP_MINTING_CONTRACTOR;
  const params = useParams()
  useEffect(() => {
    debugger
    store.dispatch(setIscustomerRegister({ key: 'customerRegisterDetails', data: null }));
    getMemberShipDetails()
    if (isConnected) {
      handleSubmit()
      getCustomerDetail()
    }
  }, [isConnected]);


  const getCustomerDetail = async () => {
    if(isConnected && address){
      let response = await getCUstomers(`User/CustomerDetails/${address}`);
      if (response) {
        if(!response.data.isReferralPage && response.data.kycStatus?.toLowerCase() == 'completed'){
            store.dispatch(setUserID(response.data));
            router(`/minnapad/referrals`)
        }
    }
  }
  };


  const handleSubmit = useCallback(() => {
    if (address) {
      getContractCounts()
    }
  }, [address])

  useEffect(() => {
    console.log(params)
    props.trackMemberType(isConnected,params.daoid, authInfo?.id, (memType) => {
      getMemberShipTypes(memType);
    });
    setErrorMsg(null);
  }, [authInfo])

  const getMemberShipDetails = () => {
    debugger
    props.trackMemberType(isConnected,params?.daoid, authInfo?.id, (memType) => {
      getMemberShipTypes(memType);
    });

  }

  const getContractCounts = () => {
    getCount();
    getBalanceCount(address)
    getNativeMint()
  }
  const getMemberShipTypes = async (getMemberTypes: any) => {
    debugger
    setMaxMintedNfts(getMemberTypes?.data[0]?.maxMintedNfts)
    setMaxNftCount(getMemberTypes?.data[0]?.maxNftCount)
    setLuData(getMemberTypes?.data[0]?.prices);
    if (type === 'General') {
      setSelectedData(getMemberTypes?.data[0]);
      setLuData(getMemberTypes?.data[0]?.prices);
    }
  };

  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });
  async function getCount() {
    let mintCount: any = await readContract({
      address: mintingContractAddress,
      abi: MintContract.abi,
      functionName: "mintedCount"
    });
    mintCount = Number(mintCount);
    setNftMintCount(mintCount);
  }
  async function getBalanceCount(address) {
    let balance: any = await readContract({
      address: mintingContractAddress,
      abi: MintContract.abi,
      functionName: "balanceOf",
      args: [address]
    });
    balance = Number(balance);
    setSmartMintedNftCount(balance);
  }

  async function getNativeMint(currency = "native") {
    setNote(null)
    setCount(1)
    setCurrecnyLodaer(true)
    setSelectedCrypto("Matic")
    const _methodNames = { "token": "getPriceForTokenMint", "native": "getPriceForNativeMint" }
    const nativeMint: any = await readContract({
      address: mintingContractAddress,
      abi: MintContract.abi,
      functionName: _methodNames[currency]
    });
    const hex = ethers.utils.formatEther(nativeMint)
    const hexCurrencyValue = parseFloat(hex)
    const percentage = 1 / 100;
    const newCurrencyValue = hexCurrencyValue + hexCurrencyValue * percentage
    const currencyValue = parseFloat(newCurrencyValue)
    setNftPrice(currencyValue);
    setReferralPrice(currencyValue)
    setCurrencyValue(currencyValue);
    setCurrecnyLodaer(false)
  }


  const handleCounterIncrement = () => {
    setNote(null);
    let quantity = count + 1;
    if (quantity <= maxNftCount) {
      let totalPrice = parseFloat(currencyValue) * (quantity);
      setNftPrice(totalPrice);
      setCount(quantity);
    } else {
      setNote(` Only a maximum of ${maxNftCount} NFT's are allowed to be minted per transaction.`)
      setLoader(false)
    }

  };

  const handleCounterDecrement = () => {
    if (count != 1) {
      setNote(null);
      let result = parseFloat(currencyValue) * (count - 1);
      setNftPrice(result);
      setCount(count - 1);
    }
  };
  const handleMinting = () => {
    enableDisableLoader(true);
    setNote(null);
    setSuccess(null);
    setLoader(true)
    if (nftMintCount < memberType?.data[0]?.totalNfts) {
      let checkCount = smartMintedNftCount + count;
      if (checkCount <= memberType?.data[0]?.maxMintedNfts) {
        props.trackauditlogs(count,params?.daoid, (data) => {
          getMetaDataList(data);
        });
      }
      else if (checkCount > smartMintedNftCount) {
        if (smartMintedNftCount == memberType?.data[0]?.maxMintedNfts) {
          setNote("The maximum number of NFT's has already been minted.")
          setLoader(false)
        } else {
          let remainingCount = memberType?.data[0]?.maxMintedNfts - smartMintedNftCount
          let remainingCountValue=remainingCount<=0?0:remainingCount
          setNote(`You have already minted ${smartMintedNftCount} NFT. You are eligible to mint only ${remainingCountValue} more NFT in this ${memberType?.data[0]?.saleName}.`)
          setLoader(false)
        }
      }

    }
    else {
      if (nftMintCount == memberType?.data[0]?.totalNfts) {
        setNote("The maximum number of NFT's has already been minted.")
        setLoader(false)
      } else {
        let remainingCount = memberType?.data[0]?.totalNfts - nftMintCount
        setNote(`You have already minted ${nftMintCount} NFT. You are eligible to mint ${remainingCount} more NFT in this ${memberType?.data[0]?.saleName}.`)
        setLoader(false)
      }

    }
  }
  const getMetaDataList = (data: any) => {
    setMetaDataUri([])
    ipfsDataUpload(data);
  };
  const ipfsDataUpload = async (data: any) => {
    let metaDataDetails = data;
    let metadataIpfs;
    let fileNames: any[] = [];
    for (let item of metaDataDetails) {
      const base64String = item?.image;
      const binaryString = atob(base64String);
      let buffer = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        buffer[i] = binaryString.charCodeAt(i);
      }
      const result = await ipfs.add(buffer);
      if (!result) {
        setErrorMsg(isErrorDispaly(result));
        setIsShowRefreshBtn(true)
      }
      item.image = `ipfs://${result?.path}`;
      let nftMetadata = JSON.stringify(item);
      const jsonBlob = new Blob([nftMetadata], { type: 'application/json' });
      metadataIpfs = await ipfs.add(jsonBlob);
      metaDataUri.push(metadataIpfs.path);
      fileNames.push({ fileName: item.serialNo,
        ImageCid:result?.path,
         Description:item.description,
         NftName:item.name,
         cid: metadataIpfs.path,
         coin:coinDetails,
         price:Number(referralPrice).toFixed(8)

         });
    }
   ipfsMetadata(metaDataUri, fileNames, metaDataDetails);
  };
  const ipfsMetadata = async (uri: string[], fileNames: any[], data: any[]) => {
    try {
      const response = await minMultipleNft(uri, coinDetails, nftPrice, address);
       transactionHash(response, fileNames);
    } catch (error) {
      setErrorMsg(parseError(error));
      setLoader(false)
      enableDisableLoader(false);
      setMetaDataUri([])
      store.dispatch(handleFetchMetaData({ key: 'metaDataDetails', loading: false, data: [], error: error?.message }));
      setIsShowRefreshBtn(true)
      setIsShowRefreshBtn(true);
    }
  };
  const enableDisableLoader = (val: any) => {
    setLoader(val);
    setMinting(val);
  };
  const transactionHash = async (response: any, transactionObj: any) => {
    put('User/updatetransactionhash', {
      transactionHash: response.hash,
      files: transactionObj,
      customerId: authInfo.id,
    });
    try {
      const txResponse = await waitForTransaction({ hash: response.hash });
      if (txResponse && txResponse.status === "reverted") {
        setErrorMsg('Transaction failed');
        setLoader(false)
        setIsShowRefreshBtn(true);

      } else {
        setSuccess('NFT has minted successfully');
        setTimeout(() => {
          router('/minnapad/mycollections');
        }, 3000)

          // gtag('event', 'conversion', {
          //     'send_to': 'AW-877960628/40NzCOr-jcsYELS70qID',
          //     'transaction_id': ''
          // });
      }
    } catch (error) {
      setIsShowRefreshBtn(true);
      setLoader(false)
      setErrorMsg(parseError(error));
    }
    setMinting(false)
    setLoader(false)
    enableDisableLoader(false);
  };

  const handleClose = () => {
    setBenefitsShow(false)
  }
  const handleCryptoChange = (crypto: any) => {
    setNote(null)
    setNftPrice('');
    let currecny = crypto?.crypto
    getNativeMint(currecny == "Matic" ? "native" : "token")
    setCoinDetails(crypto?.crypto);
    setSelectedCrypto(currecny);
    setCount(1)
  };

  const isErrorDispaly = (objValue: any) => {
    if (objValue.data && typeof objValue.data === 'string') {
      return objValue.data;
    } else if (objValue.originalError && typeof objValue.originalError.message === 'string') {
      return objValue.originalError.message;
    } else {
      return 'Something went wrong please try again!';
    }
  };
  const gotoDashboard = () => {
    setIsShowRefreshBtn(false);
    getNativeMint()
    getMemberShipDetails()
    setErrorMsg(null);
  }
  return (
    <>
      <div className="container dao-mt">
        <div className="row page-content align-center-dashboard card-mt-pt">
          {memberType?.isLoading ? (
            <div className="flex justify-center">
              <div className='loading-overlay'><div className="text-center image-container">
                {/* <Spinner className="text-center" /> */}
                <Image
                  className=""
                  src={loadimg}
                  alt=""
                />
              </div></div>
            </div>
          ) : <>
            <div className="col-md-12 col-lg-6 col-xs-12">

              {memberType?.error && (
                <Alert variant="danger" className="cust-alert-design">
                  <p className='d-flex justify-content-between'>{memberType?.error}<span className='icon error-close c-pointer'></span></p>
                </Alert>
              )}
              {!memberType?.isLoading && (
                <>
                  {selectedData?.name == 'General' &&
                    (
                      <div className="detailview-content">
                        {/* shimmers start */}
                        {memberType?.data[0] ? <h2 className="detailview-title">{selectedData?.heading}</h2> : <Placeholder animation="glow">
                          <Placeholder xs={7} />
                        </Placeholder>}

                        <hr className='custom-hr dao-hr-style' />
                        {memberType?.data[0] ? <p className="regular-text">{selectedData?.description}</p> : <Placeholder animation="glow">
                          <Placeholder xs={7} />
                        </Placeholder>}

                        <div className='text-end mb-4'>
                          {/* <Button className="head-btn mintnow-btn" onClick={() => setBenefitsShow(true)}> */}
                          <span onClick={() => setBenefitsShow(true)} className='c-pointer more-hover'>Benefits <span className="icon md right-doublearrowblack"></span></span>
                        {/* </Button> */}
                        </div>
                        {/* <div className='join-card'> */}
                          {/* <span className='join-text'><a href="https://discord.gg/k4Ty4CXn9r" target='_blank'>Join our DAO discord now!</a></span> */}
                          <div className='text-end'>
                          <a href={selectedData.discordLink} target='_blank'>
                            <span className='join-text mintnow-btn btn btn-primary'>
                            Join the DAO discord!
                            <span className="icon md right-doublearrow"></span>
                            </span></a></div>
                        {/* </div> */}

                        {/* <Button className="head-btn" onClick={() => setBenefitsShow(true)}>moreDetails</Button> */}
                      <Modal
                          show={benefitsShow}
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          className="profile-edit"
                        >
                          <Modal.Header >
                          <Modal.Title id="example-custom-modal-styling-title"></Modal.Title>
                            <span className="icon close c-pointer" onClick={handleClose}></span>
                          </Modal.Header>
                          <Modal.Body className="text-center">
                          <div  dangerouslySetInnerHTML={{ __html: selectedData?.htmlContent }} />

                          </Modal.Body>
                        <Modal.Footer>
                          <div className="mt-4 text-end">
                            <Button type="button" className="border-btn m-0 text-center btn-cancel" onClick={handleClose}>
                              Close
                            </Button>

                          </div>
                        </Modal.Footer>
                        </Modal>




                        {errorMsg && (

                          <div className='cust-error-bg'>
                            <div className='mr-4'><Image src={error} alt="" /></div>
                            <div>
                              <p className='error-title error-red'>Error</p>
                              <p className="error-desc">{errorMsg}</p></div></div>
                        )}
                        {memberType?.data[0] ?

                          <Registrationchecklist
                            customerDetails={customerRegisterDetails}
                            currencyValue={getNativeMint}
                            mintedNftBlance={getBalanceCount}
                            luDataSet={luDataSet}
                            cryptoChange={handleCryptoChange}
                            selectedData={selectedData}
                            selectedCrypto={selectedCrypto}
                            count={count}
                            handleCounterDecrement={handleCounterDecrement}
                            handleCounterIncrement={handleCounterIncrement}
                            nftPrice={nftPrice}
                            coinDetails={coinDetails}
                            getMemberShipPriceDetails={getMemberShipPriceDetails}
                            loader={loader}
                            handleMinting={handleMinting}
                            note={note}
                            errorMsg={() => { }}
                            showRefreshbtn={showRefreshbtn}
                            currecnyLodaer={currecnyLodaer}
                            memberShipDetails={getMemberShipDetails}
                            gotoDashboard={gotoDashboard}
                          > </Registrationchecklist>
                          : <Placeholder animation="glow">
                            <Placeholder xs={7} />
                          </Placeholder>}
                      </div>
                    )}
                </>
              )}

            </div>
            <ToastContainer className="p-3" position="bottom-center">
              <Toast show={success} className="text-center toster-component">
                <Toast.Body className="toaster-cust">
                  <span className="icon success me-2"></span>
                  <span>{success}</span>
                </Toast.Body>
              </Toast>
            </ToastContainer>

            <div className="col-md-12 col-lg-5 general-tab-style">
              {/* shimmers start */}
              {memberType?.data[0] ? <div className="image-bgcard">
                <div>
                  <Image
                    width={300}
                    height={500}
                    src={memberType?.data[0]?.imageUrl}
                    className="modal-img"
                    alt=""
                  />
                </div>
              </div> : <div className="image-bgcard">
                <Placeholder animation="glow">
                  <Placeholder xs={7} className="shimmer-img" />
                </Placeholder>
              </div>}
              {/* shimmers end */}

            </div>
          </>}

        </div>
        <div className="art-collections">
        </div>
      </div>
    </>
  );
}

const connectDispatchToProps = (dispatch: any) => {
  return {
    trackauditlogs: (count: any, daoId,callback: any) => {
      dispatch(getMetaDataDetails(count,daoId, callback));
    },
    trackMemberType: (isConnected,daoId, id, callback: any) => {
      dispatch(getMemberTypes(isConnected, daoId,id, callback));
    },
    customerRegister: (customerId: any) => {
      dispatch(getCustomerRegisterDetails(customerId));
    },

    dispatch,
  };
};

export default connect(null, connectDispatchToProps)(Dashboard);
