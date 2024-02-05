import { Row, Col, Button,  Card, Tabs, Tab, Container } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState ,useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getMarketplace, postMarketplace } from '../../../utils/api';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { useBalance, useAccount } from 'wagmi';
import PutOnSale from '../../../utils/putonsale';
import nodata from '../../../assets/images/no-data.png';
import BuyComponent from '../../../utils/buyNow';
import { useCollectionDeployer } from '../../../utils/useCollectionDeployer';
import Moment from 'react-moment';
import Confirmations from '../../confirmation.modal';
import defaultlogo from '../../../assets/images/default-logo.png';
import useCopyToClipboard from '../../../hooks/useCopytoClipboard';
import error from '../../../assets/images/error.svg';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import validSuccess from '../../../assets/images/success.png';
import UserContract from '../../../contracts/user721contract.json';
import WalletConnect from '../../shared/connect.wallet';
import loadimg from '../../../assets/images/loader.svg';
import successimg from '../../../assets/images/success.svg';



const DetailPage = (props: any) => {
  const [modalShow, setModalShow] = React.useState(false);
 
  const [show, setShow] = useState(false);
  const [showBid, setShowBid] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showAuction, setShowAuction] = useState(false);
  const [nftDetails, setNftDetails] = useState<any>();
  const [errorMsg, setErrorMsg] = useState(false);
  const [metaConnectionError, setMetaConnectionError] = useState(false);
  const [placeABidError, setPlaceABidError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [favCount, setfavCount] = useState();
  const [viewsCount, setviewsCount] = useState();
  const [nftcontractDetails, setNFTContractdetails] = useState<any>();
  const [saveObj, setSaveObj] = useState({ tokenId: '', customerId: '', value: 0, crypto: '', saleType: '' });
  const [saleErrorMsg, setSaleErrorMsg] = useState(false);
  const [saleLoader, setSaleLoader] = useState(false);
  const [nftProperties, setNFTProperties] = useState();
  const [nftPropAttributes, setnftAttributes] = useState<any[]>([]);
  const [cancelShow, setCancelShow] = useState(false);
  const [cancelType, setCancelType] = useState();
  const [moreCollection, setmoreCollection] = useState<any[]>([]);
  const [fav, setFav] = useState(false);
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({address: address})
  const router = useNavigate();
  const [validated, setValidated] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [bidData, setBidData] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [acceptbtnLoader, setAcceptbtnLoader] = useState(false);
  const { tokenId, collectionAddress, nftId } = useParams();
  const [isCopied, handleCopy] = useCopyToClipboard();
  const { getSignatureForBid, acceptBid, getBidConfirmation, setApprovalForAll,parseError } = useCollectionDeployer();
  const [validationError, setValidationError] = useState(null);
  const [bidValue, setBidValue] = useState();
  const [updateSaleAmount, setUpdateSaleAmount] = useState();
  const [success, setSuccess] = useState(null);
  const [scuess, setSucess] = useState(false);
  const [putanAction,setisPutOnAction]=useState(null);
  const [putanSale,setisPutOnSale]=useState(null);
  const [percentageValue, setPercentageValue] = useState();
  const [totalBuyValue, setTotalBuyValue] = useState();
  const [confirmations, setConfirmations] = useState({
    showModal: false,
    titles: [
      { title: 'Place a bid confirmation', message: 'Please confirm the transaction' },
      { title: 'Signature', message: 'Please sign to place NFT on sale in marketplace' },
    ],
    main_title: 'Follow Steps',
    currentStep: 1,
  });
  const scrollableRef = useRef<any>(null);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleClose = () => {
    setShow(false);
    setShowAuction(false);
    setSaleErrorMsg(false);
    setShowBuyModal(false);
    setSaveObj({ tokenId: '', customerId: '', value: 0, crypto: '', saleType: '' });
  };
  const handleShow = (type: any) => {
    if (type == 'sale') {
      setShow(true);
    } else if (type == 'auction') {
      setShowAuction(true);
    }
    setSaveObj({ tokenId: '', customerId: '', value: 0, crypto: '', saleType: '' });
    setSaleErrorMsg(false);
  };
  function initialize() {
    loadNftDetails();
    loadFavoritesCount();
    loadNFTViewsCount();
    getNFTContractdetails();
    getNFTProperties();
    getbidData();
    setMetaConnectionError(null)
    setSuccessMsg(null)
    setErrorMsg(null)
  }
  const getPlaceABid = async ()=>{
    let response = await getMarketplace(`User/nfttype/${nftId}`);
    if(response){
      setisPutOnAction(response.data.isPutOnAuction)
      setisPutOnSale(response.data.isPutOnSale)
    }
   }
  useEffect(() => {
    if (address) {
      setSuccessMsg(null)
      setPlaceABidError(false)
    }
    if (tokenId && collectionAddress && nftId) {
      initialize();
      setPlaceABidError(false)
    }
  }, [tokenId, collectionAddress, nftId, isConnected]);
  useEffect(() => {
    window.scroll(0,0);
  }, []);
  const loadNftDetails = async () => {
    setLoader(true);
    setBtnLoader(false);
    let response = await getMarketplace(`User/NFTDetails/${nftId}/${props.auth.user.id}`)
      .then((response: any) => {
        setNftDetails(response.data);
        percentage(response.data)
        setFav(response.data.isFavorite);
        setLoader(false);
        getMoreNftsCollection(response.data);
      })
      .catch((error: any) => {
        setLoader(false);
        setErrorMsg(isErrorDispaly(error));
      });
  };
  const percentage = (details) => {
    const buyValue = details.price 
    let percentage = (buyValue * 1) / 100
    setPercentageValue(percentage)
    let totalValue = buyValue + percentage
    setTotalBuyValue(totalValue)
  }
  const getMoreNftsCollection = async (data: any) => {
    let morenftRes = await getMarketplace(`User/GetMoreNftsByCollection/${data.collectionId}/${data.creatorId}/${tokenId}/${props?.auth?.user?.id}`);
    if (morenftRes) {
      setmoreCollection(morenftRes.data);
      scrollableRef.current?.scrollIntoView(0,0);
    } else {
      setErrorMsg(isErrorDispaly(morenftRes));
      scrollableRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const loadFavoritesCount = async () => {
    let response = await getMarketplace(`User/NftFavoritesCount/${nftId}`);
    if (response) {
      setfavCount(response.data);
    } else {
      setErrorMsg(isErrorDispaly(response));
    }
  };
  const loadNFTViewsCount = async () => {
    let response = await getMarketplace(`User/getviewerscount/${nftId}`);
    if (response) {
      setviewsCount(response.data);
    } else {
      setErrorMsg(isErrorDispaly(response));
    }
  };
  const getNFTContractdetails = async () => {
    let response = await getMarketplace(`User/GetNFTContractDetails/${tokenId}/${collectionAddress}`);
    if (response) {
      setNFTContractdetails(response.data);
    } else {
      setErrorMsg(isErrorDispaly(response));
    }
  };
  const isErrorDispaly = (objValue: any) => {
    if (objValue.response?.data?.title && typeof objValue.response?.data?.title === 'string' || objValue.reason) {
      return objValue.response?.data?.title || objValue.reason;
    } else if (objValue.originalError && typeof objValue.originalError.message === 'string') {
      return objValue.originalError.message;
    } else if(objValue.shortMessage){
      if(objValue.shortMessage?.includes("The total cost")){
        return "Low balance"
      }else{
       return objValue.shortMessage
      }    
    }else {
      return 'Something went wrong please try again!';
    }
  };
  const getDate = (date: any) => {
    var dateIn = moment(date, 'YYYY/MM/DD');
    return dateIn.format('DD/MM/YYYY');
  };
  const handleChange = (value: any, type: any) => {
    if (type == 'bid') {
      const data = value.target.value;
      const isNumber = /^[0-9].*$/.test(data);
      setBidValue(data);
      if (!isNumber) {
        setValidationError('Please enter only numbers');
      } else {
        setValidationError(null);
      }
    }
    let obj = Object.assign({}, saveObj);
    obj.value = value.target.value;
    setSaveObj(obj);
  };
  const placeONSaleorAuction = async (type: any) => {
    setBtnLoader(true)
    let obj: any = Object.assign({}, saveObj);
    if (obj.value == '0') {
      setSaleErrorMsg('Amount must be greater than zero');
      setBtnLoader(false)
    } else {
      obj.customerId = props.auth.user?.id;
      obj.nftId = nftId ? nftId : '';
      obj.crypto = nftDetails?.currency || 'WMATIC';
      obj.saleType = type;
      setSaleLoader(true);
      setApprovalForAll(collectionAddress, UserContract.abi, async (res) => {
        if (res.ok) {
          let response = await postMarketplace(`User/SaveSale`, obj);
          if (response) {
            setSucess(true)
            setBtnLoader(false)
            setSuccess("Nft has been placed on Auction successfully")
            setTimeout(() => {
              setSucess(false)
            }, 2000);
            setSaleLoader(false);
            loadNftDetails();
            if (type == 'Sale') {
              setShow(false);
              setBtnLoader(false)
            } else {
              setShowAuction(false);
              setBtnLoader(false)
            }
          } else {
            setSaleLoader(false);
            setSaleErrorMsg(isErrorDispaly (response));
            if (type == 'Sale') {
              setShow(false);
              setBtnLoader(false)
            } else {
              setShowAuction(false);
              setBtnLoader(false)
            }
          }
        } else {
          setSaleLoader(false);
          setSaleErrorMsg(isErrorDispaly(res.data));
          if (type == 'Sale') {
            setShow(false);
            setBtnLoader(false)
          } else {
            setShowAuction(true);
            setBtnLoader(false)
          }
        }
      })
    }
  };
  const getNFTProperties = async () => {
    let response = await getMarketplace(`User/NFTProperties/${tokenId}/${collectionAddress}`);
    if (response) {
      setNFTProperties(response.data);
      setnftAttributes(JSON.parse(response.data?.attributes));
    } else {
      setErrorMsg(isErrorDispaly(response));
    }
  };
  const gotoFavorite=(val: any)=>{
    if(isConnected){
      savefavroite(val)
    }else{
      setModalShow(true)
    }
  }
  const gotoFev=(item: any)=>{
    if(isConnected){
      moreCollectionSavefavroite(item)
    }else{
      setModalShow(true)
    }
  }
  const savefavroite = async (val: any) => {
    let obj = { nftId: nftId, customerId: props.auth.user?.id, isFavourite: val ? false : true };
    let response = await postMarketplace(`User/SaveFavorite`, obj);
    if (response) {
      loadNftDetails();
      loadFavoritesCount();
    } else {
      setErrorMsg(isErrorDispaly(response));
    }
  };
  const moreCollectionSavefavroite = async (item: any) => {
    let obj = { 
      nftId: item.id, 
      customerId: props.auth.user?.id,
       isFavourite: item.isFavourite ? false : true
       };
    let response = await postMarketplace(`User/SaveFavorite`, obj);
    if (response) {
      loadNftDetails();
      loadFavoritesCount();
    } else {
      setErrorMsg(isErrorDispaly(response));
    }
  };
  const cancelAuctionorsale = async (val: any) => {
    setCancelType(val);
    setCancelShow(true);
    };
  const handleCancelConfirm = () => {
    setCancelShow(false);
  };
  const cancelSaleConfirm = async (type: any) => {
    setBtnLoader(true)
    const obj = { nftId: nftId, currentOwnerId: nftDetails?.ownerId, saleType: cancelType };
    if (type == 'Yes') {
      let response = await postMarketplace(`User/CancelSale`, obj);
      if (response) {
        setSucess(true)
        setBtnLoader(false)
        setSuccess(cancelType == "sale" ? "Sale cancelled successfully" : "Auction cancelled successfully")
         setTimeout(() => {
          setSucess(false)
        }, 2000);
        loadNftDetails();
        setCancelShow(false);
        loadFavoritesCount();
        getbidData();
      } else {
        setBtnLoader(false)
        setCancelShow(false);
        setErrorMsg(isErrorDispaly(response));
      }
    } else {
      setBtnLoader(false)
      setCancelShow(false);
    }
  };
  const getNFTImageUrl = (file: any) => {

    const filePath = file?.replace('ipfs://', '');
    return process.env.REACT_APP_IPFS_PREFIX + `${filePath}`;
  };
  const handleCloseBid = () => {
    setShowBid(false);
    setValidationError(null);
  };

  const handleShowBid = () => {
    if (isConnected) {
      setSuccessMsg(null);
      getPlaceABid();
      setPlaceABidError(null)
      setValidated(false);
      setShowBid(true);
      setMetaConnectionError(null)
    } else {
      // setMetaConnectionError("Please connect your wallet...")
      window.scrollTo(0, 0)
    }
  };
  const getCheckPlaceBid=()=>{
    if(isConnected){
      handleShowBid();
    }else{
      setModalShow(true)
    }
  }
  const placeBid = async (e: any) => {
    debugger
    setBtnLoader(true);
    e.preventDefault();
    const form = e.currentTarget;
    let obj = {
      nftId: nftId,
      customerId: props.auth.user.id,
      value: parseFloat(bidValue),
      crypto: 'WMATIC',
    };
  

    if (form.checkValidity() === true && validationError == null) {
      try {
        setConfirmations({ ...confirmations, showModal: true, currentStep: 1 });
        await getBidConfirmation(obj.value);
        setConfirmations({ ...confirmations, showModal: true, currentStep: 2 });
        const signature = await getSignatureForBid(collectionAddress, tokenId, obj.value, nftDetails.supply);
        obj.signature = signature;        
        if(putanAction || putanSale){
        let response = await postMarketplace(`User/SaveNftBid`, obj);
        if (response) {
          setValidated(true);
          setBtnLoader(false);
          setSucess(true)
          setSuccess("Bid has been placed successfully")
          setTimeout(() => {
            setSucess(false)
            getbidData();
          }, 2000);
          setShowBid(false);
          setConfirmations({ ...confirmations, showModal: false });          
        } else {
          setBtnLoader(false);
          setValidated(false);
          setShowBid(false);
          setErrorMsg(isErrorDispaly(error));
          setSuccessMsg(null);
          setConfirmations({ ...confirmations, showModal: false });
          setErrorMsg(isErrorDispaly(response));
        }
      }else{
        setBtnLoader(false);
        setConfirmations({ ...confirmations, showModal: false });
      }
      } catch (error) {
        setConfirmations({ ...confirmations, showModal: false });
        setBtnLoader(false);
        setPlaceABidError(isErrorDispaly(error))
        setShowBid(false);
        window.scroll(0, 0)
        //setShowBid(false);
      }

    } else {
      setBtnLoader(false);
      setValidated(true);
      //setShowBid(false);
      setSuccessMsg(null);
      setConfirmations({ ...confirmations, showModal: false });
    }
  
  };
  const getCheckBuy=(item: any)=>{
    if(isConnected){
      handleShowBuy();
    }else{
      setModalShow(true)
    }
  }
  const handleShowBuy = () => {
    if (isConnected) {
      setShowBuyModal(true);
    } else {
     // setMetaConnectionError("Please connect your wallet...;;")
      window.scrollTo(0, 0)
    }
  };
  const getbidData = async () => {
    let response = await getMarketplace(`User/biddata/${nftId}/${10}/${0}`);
    if (response) {
      setBidData(response.data);
    } else {
      setErrorMsg(isErrorDispaly(response));
    }
  };
  const executeBid = async (item: any) => {
    debugger
    setConfirmations({
      titles: [{ title: 'Executing Bid', message: 'After successful transaction NFT will be transferred to buyer' }],
      showModal: true,
      currentStep: 1,
      main_title: 'Accept Bid',
    });
    setAcceptbtnLoader(true);
    const obj = {
      nftId: nftId,
      value: item.biddingAmount,
      crypto: 'WMATIC',
      buyerAddress: item.bidderAddress,
      BidId: item.bidId,
      TransactionHash:collectionAddress,
    };
    try {
      const acceptBidObj = await acceptBid(
        collectionAddress,
        nftDetails.collectionType,
        item.biddingAmount,
        tokenId,
        item.signature,
        item.bidderAddress,
        1,
      );
      let response = await postMarketplace(`User/SaveAcceptBid`, obj);
      if (response) {
        setSucess(true)
        setSuccess("Bid accepted succesfully")
        setTimeout(() => {
          setSucess(false)
          router(`/accounts/${address}`);
        }, 2000);
        setErrorMsg(null)
        setAcceptbtnLoader(false);
        setConfirmations({ ...confirmations, showModal: false });     
      } else {
        setAcceptbtnLoader(false);
        setConfirmations({ ...confirmations, showModal: false });
        setErrorMsg(isErrorDispaly(response));
      }
    } catch (error) {
      window.scroll(0, 0);
      setErrorMsg(isErrorDispaly(error));
      setConfirmations({ ...confirmations, showModal: false });
    }

  };

  const goToAccount = (item: any, type: any) => {
    if (type == 'creator') {
      router(`/accounts/${item?.creatorWalletAddress || address}`);
    } else if (type == 'currentOwner') {
      router(`/accounts/${item?.ownerAddress || address}`);
    }
  };
  const handleUpdateAmount = (childData: any) => {
    setUpdateSaleAmount(childData);
    if (childData) {
      loadNftDetails();
    }
  };

  const moreCollectionClick = async (item) => {
    let obj = {
      nftId: item.id,
      customerId: props.auth.user.id,
    };
    await postMarketplace(`User/SaveViewer`, obj)
      .then((response: any) => {
        router(
          `/marketplace/assets/${item.tokenId}/${item?.collectionContractAddress || item?.creatorWalletAddress}/${item.id}`,
        );
        // window.scroll(0, 0)
        scrollableRef.current.scrollIntoView(0,0);
      })
      .catch((error: any) => {
        setErrorMsg(isErrorDispaly(error));
      });
  }

  const notConnectCollectionClick = (item) =>{
    scrollableRef.current.scrollIntoView(0,0);
    router(
      `/marketplace/assets/${item.tokenId}/${item?.collectionContractAddress || item?.creatorWalletAddress}/${item.id}`,
    );
  }

  return (
    <>
     <div ref={scrollableRef}></div>
      <Container>
      {errorMsg && (
          // <Alert variant="danger">
          //   <Image className='validation-error' src={validError} />
          //   <span>{errorMsg}</span>
          // </Alert>
          <div className='cust-error-bg'>
          <div className='mr-4'><Image src={error} alt="" /></div>
          <div>
            <p className='error-title error-red'>Error</p>
            <p className="error-desc">{errorMsg}</p></div>
        </div>
        )}
        {placeABidError && (
          // <Alert variant="danger">
          //   <Image className='validation-error' src={validError} />
          //   <span>{placeABidError}</span>
          // </Alert>
          <div className='cust-error-bg'>
          <div className='mr-4'><Image src={error} alt="" /></div>
          <div>
          <p className='error-title error-red'>Error</p>
          <p className="error-desc">{placeABidError}</p></div>
          </div>
        )}
        {metaConnectionError && (
          // <Alert variant="danger">
          //   <Image className='validation-error' src={validError} />
          //   <span>{metaConnectionError}</span>
          // </Alert>
          <div className='cust-error-bg'>
          <div className='mr-4'><Image src={error} alt="" /></div>
          <div>
          <p className='error-title error-red'>Error</p>
          <p className="error-desc">{metaConnectionError}</p></div>
          </div>
        )}
        {successMsg && (
          // <Alert role="alert">

          //   <Image className='validation-error' src={validSuccess} />
          //   <span>{successMsg && 'Bid successful'}</span>{' '}
          // </Alert>
         <div className='cust-error-bg'>
         <div className='mr-4'><Image src={successimg} alt="" /></div>
         <div>
         <p className='error-title'>Congratulations !</p>
         <p className="error-desc">{successMsg && 'Bid successful'}</p></div>
         </div>
        )}
        {/* {loader && <div className='d-flex align-items-center justify-content-center loader-center'><Spinner></Spinner></div>} */}
        {loader && 
        <>
               <div className="flex justify-center">
       <div className='loading-overlay'><div className="text-center image-container">
       <Image
                 className=""
                 src={loadimg}
                 alt=""
               />
     </div></div>
     </div>
        </>
        || 
          <>
            <section className="mt-5">
              <Row>
                <Col lg={6} sm={12}>
                  <div className="detail-image-card">
                    <div className="detail-icons">
                      <div>
                        <span className="icon polygon transfonrm-icon"></span>
                      </div>
                      <WalletConnect showWalletModal={modalShow} onWalletConect={(addr) => {}} onWalletClose={() => setModalShow(false)} />
                    <div>
                        <span className="detail-count">{favCount}</span>
                        <div className="like-icon-bg c-pointer">
                          <span
                            className={`icon detail-like ${nftDetails?.isFavorite ? 'active' : ''}`}
                            onClick={() => gotoFavorite(nftDetails?.isFavorite)}
                          ></span>
                        </div>
                      </div>
                    </div>

                    <div className="card-fixes detail-card-fixes">
                      <Image
                       src={
                        nftDetails?.image && !nftDetails?.image?.includes('null')
                          ? `${getNFTImageUrl(nftDetails?.image)}`
                          : defaultlogo
                      }
                        //src={nftDetails?.image ? nftDetails?.image: defaultlogo }
                        alt=""
                        // className="detail-image"
                        className={`${nftDetails?.isUnlockPurchased && address?.toLowerCase() !== nftDetails?.creatorWalletAddress?.toLowerCase()
                            ? 'detail-image blur-image'
                            : 'detail-image'
                          }`}
                        width="100"
                        height="100"
                      />
                    </div>
                    {/* <Image src={detailimage} alt="" className="detail-image" /> */}
                  </div>
                </Col>
                <Col lg={6} sm={12}>
                  <div className="detail-text-card p-0">
                    <div className="">
                      <div className="d-flex justify-content-between align-items-start mb-3 sm-mt-2">
                        <h1 className="detail-title mb-0">
                          {nftDetails?.name} 
                        </h1>

                        {nftDetails?.ownerAddress?.toLowerCase() == address?.toLowerCase() && (
                          <NavDropdown
                            title={<span className="icon more-nav"></span>}
                            id="basic-nav-dropdown"
                            className="detailpage-navmenu"
                          >
                            {!nftDetails?.isPutonSale &&
                              !nftDetails?.isPutOnAuction &&
                              nftDetails?.ownerAddress?.toLowerCase() == address?.toLowerCase() && (
                                <NavDropdown.Item href="" onClick={() => handleShow('sale')}>
                                  Put on sale
                                </NavDropdown.Item>
                              )}
                            {!nftDetails?.isPutOnAuction && !nftDetails?.isPutonSale && (
                              <NavDropdown.Item href="" onClick={() => handleShow('auction')}>
                                Put on auction
                              </NavDropdown.Item>
                            )}

                            {nftDetails?.saleType == 'auction' ||
                              (nftDetails?.saleType == 'Auction' && (
                                <NavDropdown.Item href="" onClick={() => cancelAuctionorsale('auction')}>
                                  Cancel auction
                                </NavDropdown.Item>
                              ))}
                            {nftDetails?.saleType == 'sale' ||
                              (nftDetails?.saleType == 'Sale' && (
                                <NavDropdown.Item href="" onClick={() => cancelAuctionorsale('sale')}>
                                  Cancel Sale
                                </NavDropdown.Item>
                              ))}
                          </NavDropdown>
                        )}
                      </div>
                      {/* modal  */}

                      {/* {show && (
                    <SaleComponent
                      nftDetails={nftDetails}
                      showModal={show}
                      reqFields={{ tokenId: tokenId, data: data, auth: props.auth }}
                      handleClose={() => setShow(false)}
                    ></SaleComponent>
                  )} */}
                      {show && (
                        <PutOnSale
                        refresh={loadNftDetails}
                          nftDetails={nftDetails}
                          handleClose={() => setShow(false)}
                          showModal={show}
                          updateAmount={handleUpdateAmount}
                          reqFields={{
                            tokenId: tokenId,
                            data: data,
                            auth: props.auth,
                            collectionAddress: collectionAddress,
                          }}
                        ></PutOnSale>
                      )}

                      {showBuyModal && nftDetails !== undefined && (
                        <BuyComponent
                          showModal={showBuyModal}
                          handleClose={() => setShowBuyModal(false)}
                          nftDetails={nftDetails}
                          collectionAddress={collectionAddress}
                        ></BuyComponent>
                      )}

                      <Modal centered show={showAuction} onHide={handleClose} className="wallet-popup checkout-modal confirmaton-modal">
                        <Modal.Header className="p-4 justify-content-between">
                        <h2 className="section-title mt-0 mb-0">Checkout</h2>
                          <span className="icon close c-pointer" onClick={handleClose}></span>
                        </Modal.Header>
                        {/* <div className="text-center">{saleLoader && <Spinner></Spinner>}</div> */}
                        {/* {!saleLoader && ( */}
                        <Modal.Body className='p-4 pb-2'>
                          {saleErrorMsg && (
                            // <Alert variant="danger">
                            //   <Image className='validation-error' src={validError} />
                            //   <span>{saleErrorMsg}</span>
                            // </Alert>
                            <div className='cust-error-bg'>
                            <div className='mr-4'><Image src={error} alt="" /></div>
                            <div>
                              <p className='error-title error-red text-start'>Error</p>
                              <p className="error-desc text-start">{saleErrorMsg}</p></div>
                          </div>
                          )}
                          
                          <p className="common-text mb-4 text-start">
                          NFT Marketplace is the platform where users can purchase NFT assets directly from creator, 
                          Users need to pay for the gas fee as well as platform fee before purchasing the NFT.
                           User can purchase NFT also through bidding, where creator will accept a price from the user
                          </p>
                          {/* <div className="balance-card">
                        <div className="bal-feild">
                          <label>Service fee</label>
                          <h6>0.0000 ETH</h6>
                        </div>
                      </div> */}
                          <InputGroup className="input name-feild mb-4">
                            <Form.Label className="input-label">Auction Price</Form.Label>
                            <Form.Control
                              placeholder="Ex: 0.01 WMATIC"
                              aria-label="Username"
                              className="input-style"
                              onChange={(value) => handleChange(value)}
                            />
                          </InputGroup>
                        </Modal.Body>
                        {/* )} */}
                        <Modal.Footer className='p-4'>
                          <Button className="custom-btn" disabled={saleLoader} onClick={() => placeONSaleorAuction('Auction')}>
                            <span>{btnLoader && <Spinner size="sm" className='text-base-100' />} </span>  Put on Auction
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                        <Modal
                          centered
                          show={cancelShow}
                          onHide={handleCancelConfirm}
                          className="wallet-popup Confirmation confirmaton-modal"
                        >
                          <Modal.Header className='justify-content-between'>
                            <Modal.Title className='section-title mt-0'>Confirmation</Modal.Title>
                            <div>
                              <span
                                className="icon close c-pointer modal-position"
                                onClick={handleCancelConfirm}
                              ></span>
                            </div>
                          </Modal.Header>

                          <Modal.Body>
                            <p className="common-text mb-0 py-3 text-start">Are you sure, Do you want to cancel {cancelType}?</p>
                          </Modal.Body>

                          <Modal.Footer className='border-footertop'>
                            <Button variant="secondary" onClick={() => cancelSaleConfirm('No')} className="custom-btn border-btn">
                              No
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => cancelSaleConfirm('Yes')}
                              className="custom-btn ms-2"
                            >
                              <span>{btnLoader && <Spinner size="sm" className='text-base-100' />} </span> Yes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                      {/* modal  */}
                      <div className="nft-details">
                        <div>
                          <label className="detail-label">Creator</label>
                          <div
                           
                            className="detail-creator-title"
                          >
                           <span  onClick={() => goToAccount(nftDetails, 'creator')} className=' c-pointer'> 
                           {nftDetails?.creatorName ||
                              (nftDetails?.creatorWalletAddress
                                ? nftDetails?.creatorWalletAddress?.slice(0, 4) +
                                '....' +
                                nftDetails?.creatorWalletAddress?.substring(
                                  nftDetails?.creatorWalletAddress?.length - 4,
                                )
                                : 'Un named')}</span>
                          </div>
                        </div>
                        <div>
                          <label className="detail-label">Current Owner</label>
                          <div
                            
                            className="detail-creator-title "
                          >
                          <span onClick={() => goToAccount(nftDetails, 'currentOwner')} className='c-pointer'> {nftDetails?.ownerName ||
                              (nftDetails?.ownerAddress
                                ? nftDetails?.ownerAddress?.slice(0, 4) +
                                '....' +
                                nftDetails?.ownerAddress?.substring(nftDetails?.ownerAddress?.length - 4)
                                : 'Un named')}</span> 
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="details-favour">
                      <span className="icon detail-view-eye ml-2"> </span>
                      <span className="detail-view-label">{viewsCount} views</span>
                      <span className="icon favourite-filled"></span>
                      <span className="detail-view-label">{favCount} favorites</span>
                      {/* <span className="icon art"></span>
                      <span className="detail-view-label">{nftDetails?.categoryName || '-'}</span> */}
                    </div>
                    <hr className="detail-border" />
                    {nftDetails?.price && (
                      <div>
                        <h3 className="price-title">Current Price</h3>
                        <h1 className="detail-value">
                          {nftDetails?.price} {nftDetails?.currency?.toUpperCase()}
                        </h1>
                      </div>
                    )}
                  </div>

                  {nftDetails?.ownerAddress != address && (
                    <>
                      {nftDetails?.saleType == 'sale' ||
                        (nftDetails?.saleType == 'Sale' && nftDetails?.ownerAddress?.toLowerCase() != address?.toLowerCase() && (
                          <div className="detail-buttons">
                            <button className="detail-btn" onClick={getCheckBuy}>
                              Buy Now
                            </button>
                          </div>
                        ))}
                      {nftDetails?.saleType == 'sale' ||
                        (nftDetails?.saleType == 'Sale' && nftDetails?.ownerAddress?.toLowerCase() != address?.toLowerCase() && (
                          <div className="mt-3">
                            <button className="place-btn" onClick={getCheckPlaceBid}>
                              Place a bid
                            </button>
                          </div>
                        ))}
                      {nftDetails?.saleType == 'auction' ||
                        (nftDetails?.saleType == 'Auction' && nftDetails?.ownerAddress?.toLowerCase() != address?.toLowerCase() && (
                          <div className="mt-3">
                            <button className="place-btn" onClick={getCheckPlaceBid}>
                              Place a bid
                            </button>
                          </div>
                        ))}
                    </>
                  )}
                </Col>
                <Modal centered show={showBid} onHide={handleCloseBid} className="wallet-popup checkout-modal confirmaton-modal">
                  <Modal.Header className='light-bg p-3 justify-content-between'>
                  <h2 className="section-title text-center mt-0 mb-0">Place a Bid</h2>
                    <span className="icon close c-pointer" onClick={handleCloseBid}></span>
                  </Modal.Header>

                  <Form noValidate validated={validated} onSubmit={(e) => placeBid(e)}>
                    <Modal.Body className="p-3">
                      
                      <div className="mb-4 input d-flex align-items-center justify-content-between">
                        <label className="input-label">Price</label>
                        <h6 className="mb-0 ms-2">
                          {nftDetails?.price} <span>{nftDetails?.currency}</span>
                        </h6>
                      </div>
                      <div className="mb-4 input d-flex align-items-center justify-content-between">
                        <label className="input-label">Buyer Fee</label>
                        <h6 className="mb-0 ms-2">
                          {percentageValue} <span>{nftDetails?.currency}</span>
                        </h6>
                      </div>
                      <div className="mb-4 input d-flex align-items-center justify-content-between">
                        <label className="input-label">Total Price</label>
                        <h6 className="mb-0 ms-2">
                          {totalBuyValue} <span>{nftDetails?.currency}</span>
                        </h6>
                      </div>
                      <InputGroup className="mb-4 input name-feild">
                        <Form.Label className="input-label">Your Bid *</Form.Label>
                        {/* <Form.Control
                          placeholder="Bidding Amount"
                          aria-label="Username"
                          className="input-style"
                          name="value"
                          required
                        /> */}
                        <Form.Control
                          type="text"
                          name="value"
                          aria-label="Username"
                          className="input-style mb-0"
                          placeholder="Bidding Amount"
                          onChange={(e) => handleChange(e, 'bid')}
                          isInvalid={!!validationError}
                          feedback={validationError}
                          required
                          maxLength={13}
                        />
                        <Form.Control.Feedback type="invalid">Please provide valid Bid Value.</Form.Control.Feedback>
                      </InputGroup>
                      <InputGroup className="mb-4 input name-feild">
                        <Form.Label className="input-label mt-2">Crypto Type</Form.Label>
                        <div className="p-relative ">
                          <Form.Select aria-label="Default select example" className="form-select select-coin mb-2">
                            {/* <option>MATIC</option> */}
                            <option value="1">WMATIC</option>
                          </Form.Select>
                          {/* <span className="icon select-arrow"></span> */}
                        </div>
                      </InputGroup>                   
                      {/* <InputGroup className="mb-5 input name-feild">
                    <Form.Label className="input-label">Buy Price</Form.Label>
                    <Form.Control placeholder="0.01 WETH" aria-label="Username" className="input-style" />
                  </InputGroup> */}
                      <div className="balance-card">
                        <div className="bid-balance">
                          <label>Your balance</label>
                          <h6 className="mb-0">
                           <span className='matic-bal'> {data?.formatted}</span> <span className='regular-text'>{nftDetails?.currency}</span>
                          </h6>
                        </div>
                        {/* <div className="bal-feild">
                          <label>Your bidding balance</label>
                          <h6>0.0025 Matic</h6>
                        </div> */}
                        {/* <div className="bal-feild">
                          <label>Service fee</label>
                          <h6 className="text-end">0.0025 WMatic</h6>
                        </div>
                        <div className="bal-feild">
                          <label>Total bid amount</label>
                          <h6 className="text-end">
                            {0.0025 + data?.formatted} {nftDetails?.currency}
                          </h6>
                        </div> */}
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="custom-btn cancel-btn c-pointer"  onClick={handleCloseBid}>
                        Cancel
                      </Button>
                      <Button className="custom-btn c-pointer ms-3" type="submit" disabled={btnLoader}>
                        <span>{btnLoader && <Spinner size="sm" />} </span>
                        Place a bid 
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
              </Row>
            </section>
            <section>
              <Row className="tab-section">
                <Col lg={6} sm={12}>
                  <div className="creator-tabs">
                    <Tabs className="tab-border" defaultActiveKey="first">
                      <Tab eventKey="first" title="Overview">
                        <div>
                          <h3 className=" overview-space">
                            <span className='address-label'>By{' '}</span>
                            <span className='overview-value'>
                              {nftDetails?.creatorName ||
                                nftDetails?.creatorWalletAddress?.slice(0, 4) +
                                '....' +
                                nftDetails?.creatorWalletAddress?.substring(
                                  nftDetails?.creatorWalletAddress?.length - 4,
                                  nftDetails?.creatorWalletAddress?.length,
                                )}
                              <span className="copy-space">
                                {!nftDetails?.creatorName && nftDetails?.creatorWalletAddress && (
                                  <span
                                    className={`${!isCopied ? 'icon md copy-icon c-pointer ms-0' : 'icon md check-icon'
                                      }`}
                                    onClick={() => handleCopy(nftDetails?.creatorWalletAddress)}
                                  />
                                )}
                              </span>
                            </span>
                          </h3>
                          {nftDetails?.description && (
                            <>
                              <h3 className="address-label">Description</h3>
                              <p className="overview-text">{nftDetails?.description}</p>
                            </>
                          )}
                        </div>
                      </Tab>
                      <Tab eventKey="second" title=" Details">
                        <div>
                          <Row className="mt-4">
                            <Col lg={4}>
                              <label className="address-label">Token ID</label>
                              <h4 className="overview-value">{nftcontractDetails?.tokenId ||"--"}</h4>
                            </Col>
                            <Col lg={4}>
                              <label className="address-label">Token Standard</label>
                              <h4 className="overview-value">{nftcontractDetails?.tokenStandard ||"--"}</h4>
                            </Col>
                            <Col lg={4}>
                              <label className="address-label">Chain</label>
                              <h4 className="overview-value">Polygon</h4>
                              {/* <h4 className="overview-value">{nftcontractDetails?.blockChain}</h4> */}
                            </Col>
                          </Row>
                          <Row className="mt-4 update-address">

                            <Col lg={4}>
                              <label className="address-label">Last Updated</label>
                              <h4 className="overview-value">{getDate(nftcontractDetails?.date)}</h4>
                            </Col>
                            <Col lg={4}>
                              <label className="address-label">Creator Earnings</label>
                              <h4 className="overview-value">{nftcontractDetails?.creatorEarning || "0%"}</h4>
                            </Col>
                          </Row>
                          <Row className="mt-4 update-address">
                            <Col lg={12}>
                              <label className="address-label">Contract Address</label>
                              {nftcontractDetails?.contractAddress != null && (
                                <h4 className="mb-breack overview-value">
                                  {nftcontractDetails?.contractAddress?.slice(0, 4) +
                                    '....' +
                                    nftcontractDetails?.contractAddress?.substring(
                                      nftcontractDetails?.contractAddress.length - 4,
                                      nftcontractDetails?.contractAddress.length,
                                    )}{' '}
                                  <span className="copy-space">
                                    {nftcontractDetails?.contractAddress && (
                                      <span
                                        className={`${!isCopied ? 'icon md copy-icon c-pointer ms-0' : 'icon md check-icon'
                                          }`}
                                        onClick={() => handleCopy(nftcontractDetails?.contractAddress)}
                                      />
                                    )}
                                  </span>
                                </h4>
                              )}

                              {nftcontractDetails?.contractAddress == null && (
                                <h4 className="overview-value">
                                  {collectionAddress}
                                  <span className="copy-space">
                                    {collectionAddress && nftcontractDetails?.contractAddress == null && (
                                      <span
                                        className={`${!isCopied ? 'icon md copy-icon c-pointer ms-0' : 'icon md check-icon'
                                          }`}
                                        onClick={() => handleCopy(collectionAddress)}
                                      />
                                    )}
                                  </span>
                                </h4>
                              )}
                            </Col>
                          </Row>
                          <Row className="mt-3 update-address">
                            <Col lg={12}>
                              <label className="address-label">Description</label>
                              <h4 className="overview-text">{nftcontractDetails?.description}</h4>
                            </Col>
                          </Row>
                         {nftcontractDetails?.externalLink && < Row className="mt-4 update-address">
                            <Col lg={12}>
                              <label className="address-label">External Link</label>
                              {nftcontractDetails?.externalLink && (
                                <h4
                                  className="overview-value text-blue text-green"
                                  
                                >
                                  <span onClick={() => window.open(nftcontractDetails?.externalLink, '_blank')} className=' c-pointer'>{(!nftcontractDetails?.externalLink && '-') || nftcontractDetails?.externalLink}</span>
                                </h4>
                                )}
                              {!nftcontractDetails?.externalLink && (
                                <h4>
                                  {"-"}
                                </h4>)}
                              {/* <h4 className="overview-value mt-2">{nftcontractDetails?.externalLink}</h4> */}
                            </Col>
                          </Row>}
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </Col>
                <Col lg={6} sm={12} className="ps-2">
                  <div className="ps-lg-4">
                    {nftPropAttributes.length > 0 && (
                      <h3 className="property-title overview-space text-lg-start">Properties</h3>
                    )}
                    <Row>
                      {nftPropAttributes?.map((attr) => (
                        <Col lg={4} md={4} sm={6} xs={6}>
                          <div className="property-card mb-4 d-flex align-items-center justify-content-center">
                            <div className="text-overflow-ellipse">
                              <span className="overview-title-color detail-card-label text-overflow-ellipse">
                                {attr.Avathar || attr.trait_type}
                              </span>
                              <span className="detail-card-label text-overflow-ellipse">{attr.value}</span>
                              {/* <span className="card-sub-label">7% have this trait</span> */}
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Col>
              </Row>
            </section>
            <h3 className="mb-2  mt-5 sub-title text-black">Bidding Details</h3>
            <hr className="top-seller-hr"/>
            <div className="responsive-table ">
              <div>
               
              </div>
              <table className="table activity-table mt-4 ">
                <thead>
                  <tr className="claim-head ">
                    <th className="pool-data">S.No</th>
                    <th className="pool-data">Date</th>
                    <th className="pool-data">Buyer Address</th>
                    <th className="pool-data">Bidding Amount</th>
                    <th className="pool-data">Creator Name</th>
                    <th className="pool-data"></th>
                  </tr>
                </thead>

                <tbody>
                  <>
                    {bidData?.map((item: any, idx: any) => (
                      <tr className="black-bg" key={idx}>
                        <td scope="row" className="pool-data">
                          {idx + 1}
                        </td>
                        <td className="pool-data">
                          <Moment format="DD-MM-YYYY " className="blue-text">
                            {item.bidDate || '--'}
                          </Moment>
                        </td>
                        <td className="pool-data">{item.bidderAddress || '--'}</td>
                        <td className="pool-data">
                          {item.biddingAmount + ' ' || '--'}
                          {item.crypto ? item.crypto : ''}
                        </td>
                        <td className="pool-data">{item.creatorName || '--'}</td>

                        <td>
                          {/* <Button
                            onClick={() =>
                              acceptBid(
                                collectionAddress,
                                nftDetails.collectionType,
                                item.biddingAmount,
                                tokenId,
                                item.signature,
                                item.bidderAddress,
                                1,
                              )
                            }
                          >
                            Accept Bid
                          </Button> */}{' '}
                          {nftDetails?.ownerAddress.toLowerCase() === address?.toLowerCase() && (
                            <Button className="custom-btn" onClick={() => executeBid(item)}>
                              Accept Bid {/* <span>{acceptbtnLoader && <Spinner size="sm" />} </span> */}
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                </tbody>
              </table>
              {bidData.length == 0 && (
                <>
                  <div className="nodata-text db-no-data">
                    <Image src={nodata} alt=""></Image>
                    <h3 className="text-center">No data found</h3>
                  </div>
                </>
              )}
            </div>
            <section className="mt-5 detail-corousel detail-page pb-60">
              <h2 className="sub-title text-dark">More from this collection</h2>
              <hr className="top-seller-hr"/>
              <div className="corousel">
                <Carousel autoPlaySpeed={1000} infinite responsive={responsive} className="corousel-arrows">
                  {moreCollection?.map((item) => (
                    <div className="creator-card">
                      {/* <Link className="nav-link" href={`/assets/${item.tokenId}/${item.collectionContractAddress}/${item.id}`}> */}
                      <Card className="creator-bg detail-view-card">
                      <div className="creator-like zindex-view c-pointer">
                          <span
                            className={`icon md creator-icon ${item?.isFavourite ? 'active' : ''}`}
                            onClick={() =>gotoFev(item)}
                          ></span>
                        </div>
                        <div className="account-card-img c-pointer" 
                        onClick={isConnected ? () => moreCollectionClick(item) : () =>notConnectCollectionClick(item)}
                        >                       
                          <Image
                            //src={ item?.image ? item?.image: defaultlogo}
                            src={item?.image ? `${getNFTImageUrl(item?.image)}` : defaultlogo}
                            //className="creator-img card-img"
                            className={`${item?.isUnlockPurchased && address?.toLowerCase() !== item?.walletAddress?.toLowerCase()
                              ? 'creator-img card-img blur-image'
                              : 'creator-img card-img'
                              }`}
                            alt=""
                            height="100"
                            width="100"
                          />
                        </div>
                        <Card.Body className='pt-2'>
                          <Card.Text className="title-wrap"></Card.Text>
                          <Card.Title className="title-wrap mt-0">
                            {item.name} 
                          </Card.Title>
                        </Card.Body>
                        <div className="card-footer">
                          <div className="footer-price">
                            <span className="card-text ms-0">Price</span>
                            <div className="cardfooter-ellipse">
                              {item.price ? item.price : "--"} {item.price ? item.currency || process.env.REACT_APP_CURRENCY_SYMBOL : ""}
                            </div>
                          </div>

                          <div className="footer-price mt-2">
                            <span className="card-text ms-0">Highest bid</span>
                            <div className="cardfooter-ellipse">
                              {item.highestBid ? item.highestBid : "--"} {item.highestBid ? item.currency || process.env.REACT_APP_CURRENCY_SYMBOL : ""}
                            </div>
                          </div>
                        </div>
                      </Card>
                      {/* </Link> */}
                    </div>
                  ))}
                </Carousel>
              </div>
              {moreCollection.length == 0 && (
                <>
                  <div className="nodata-text db-no-data">
                    <Image src={nodata} alt=""></Image>
                    <h3 className="text-center">No data found</h3>
                  </div>
                </>
              )}
            </section>
          </>
        } 
      </Container>
      <Confirmations {...confirmations} />
      <div className='p-absolute toaster-center'>
      <ToastContainer className="p-3 cust-nametoster position-fixed bottom-0" >
              <Toast show={scuess} className="text-center toster-component">
                <Toast.Body className="toaster-cust">
                <Image src={validSuccess} className='svalidation-error' /> <span>{success}</span>
                </Toast.Body>
              </Toast>
            </ToastContainer>
            </div>
    </>
  );
};
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(DetailPage);
