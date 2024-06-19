import { Row, Col, Card, Tabs, Tab, Container } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
// import Modal from 'react-bootstrap/Modal';
import NavDropdown from "react-bootstrap/NavDropdown";
import { getMarketplace, postMarketplace } from "../../../utils/api";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { useBalance, useAccount } from "wagmi";
import PutOnSale from "../../../utils/putonsale";
import BuyComponent from "../../../utils/buyNow";
import { useCollectionDeployer } from "../../../utils/useCollectionDeployer";
import Moment from "react-moment";
import Confirmations from "../../confirmation.modal";
import defaultlogo from "../../../assets/images/default-bg.png";
import useCopyToClipboard from "../../../hooks/useCopytoClipboard";
import error from "../../../assets/images/error.svg";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import validSuccess from "../../../assets/images/success.png";
import UserContract from "../../../contracts/user721contract.json";
import WalletConnect from "../../shared/connect.wallet";
import loadimg from "../../../assets/images/loader.svg";
import successimg from "../../../assets/images/success.svg";
import Button from "../../../ui/Button";
import DetailpageShimmer from "../loaders/detailpageShimmer";
import { Modal, modalActions } from "../../../ui/Modal";
import DropdownMenus from "../../../ui/DropdownMenus";
import NoDataFound from "../../../ui/noData";
import thorntf from "../../../assets/images/thor.jpg"

const DetailPage = (props: any) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [showCancelSale, setshowCancelSale] = useState(false);
  const [show, setShow] = useState(false);
  const [showdrawer, setshowdrawer] = useState(false);
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
  const [saveObj, setSaveObj] = useState({
    tokenId: "",
    customerId: "",
    value: 0,
    crypto: "",
    saleType: "",
  });
  const [saleErrorMsg, setSaleErrorMsg] = useState(false);
  const [saleLoader, setSaleLoader] = useState(false);
  const [nftProperties, setNFTProperties] = useState();
  const [nftPropAttributes, setnftAttributes] = useState<any[]>([]);
  const [cancelShow, setCancelShow] = useState(false);
  const [cancelType, setCancelType] = useState();
  const [moreCollection, setmoreCollection] = useState<any[]>([]);
  const [fav, setFav] = useState(false);
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({ address: address });
  const router = useNavigate();
  const [validated, setValidated] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [bidData, setBidData] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [acceptbtnLoader, setAcceptbtnLoader] = useState(false);
  const { tokenId, collectionAddress, nftId } = useParams();
  const [isCopied, handleCopy] = useCopyToClipboard();
  const [isChecked, setIsChecked] = useState(false)
  const {
    getSignatureForBid,
    acceptBid,
    getBidConfirmation,
    setApprovalForAll,
    parseError,
  } = useCollectionDeployer();
  const [validationError, setValidationError] = useState(null);
  const [bidValue, setBidValue] = useState();
  const [updateSaleAmount, setUpdateSaleAmount] = useState();
  const [success, setSuccess] = useState(null);
  const [scuess, setSucess] = useState(false);
  const [putanAction, setisPutOnAction] = useState(null);
  const [putanSale, setisPutOnSale] = useState(null);
  const [percentageValue, setPercentageValue] = useState();
  const [totalBuyValue, setTotalBuyValue] = useState();
  const [count, setCount] = useState(1);
  const [confirmations, setConfirmations] = useState({
    showModal: false,
    titles: [
      {
        title: "Place a bid confirmation",
        message: "Please confirm the transaction",
      },
      {
        title: "Signature",
        message: "Please sign to place NFT on sale in marketplace",
      },
    ],
    main_title: "Follow Steps",
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
    // setShow(false);
    modalActions("putonsale", "close");
    modalActions("putonauction", "close");
    setIsChecked(false)
    setSaleErrorMsg(false);
    setShowBuyModal(false);
    setSaveObj({
      tokenId: "",
      customerId: "",
      value: 0,
      crypto: "",
      saleType: "",
    });
  };
  const handleShow = (type: any) => {
    if (type == "sale") {
      setShow(true);
      modalActions("putonsale", "open");
    } else if (type == "auction") {
      modalActions("putonauction", "open");
      setIsChecked(true)
    }
    setSaveObj({
      tokenId: "",
      customerId: "",
      value: 0,
      crypto: "",
      saleType: "",
    });
    setSaleErrorMsg(false);
  };
  const updateCounter = () => {
    setCount(count + 1);
  };
  const deCounter = () => {
    setCount(count - 1);
  };
  function initialize() {
    loadNftDetails();
    loadFavoritesCount();
    loadNFTViewsCount();
    getNFTContractdetails();
    getNFTProperties();
    getbidData();
    setMetaConnectionError(null);
    setSuccessMsg(null);
    setErrorMsg(null);
  }
  const getPlaceABid = async () => {
    let response = await getMarketplace(`User/nfttype/${nftId}`);
    if (response) {
      setisPutOnAction(response.data.isPutOnAuction);
      setisPutOnSale(response.data.isPutOnSale);
    }
  };
  useEffect(() => {
    if (address) {
      setSuccessMsg(null);
      setPlaceABidError(false);
    }
    if (tokenId && collectionAddress && nftId) {
      initialize();
      setPlaceABidError(false);
    }
  }, [tokenId, collectionAddress, nftId, isConnected]);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const loadNftDetails = async () => {
    setLoader(true);
    setBtnLoader(false);
    let response = await getMarketplace(
      `User/NFTDetails/${nftId}/${props.auth.user.id || ""}`
    )
      .then((response: any) => {
        setNftDetails(response.data);
        percentage(response.data);
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
    const buyValue = details.price;
    let percentage = (buyValue * 1) / 100;
    setPercentageValue(percentage);
    let totalValue = buyValue + percentage;
    setTotalBuyValue(totalValue);
  };
  const getMoreNftsCollection = async (data: any) => {
    let morenftRes = await getMarketplace(
      `User/GetMoreNftsByCollection/${data.collectionId}/${data.creatorId}/${tokenId}/${props?.auth?.user?.id}`
    );
    if (morenftRes) {
      setmoreCollection(morenftRes.data);
      scrollableRef.current?.scrollIntoView(0, 0);
    } else {
      setErrorMsg(isErrorDispaly(morenftRes));
      scrollableRef.current.scrollIntoView({ behavior: "smooth" });
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
    let response = await getMarketplace(
      `User/GetNFTContractDetails/${tokenId}/${collectionAddress}`
    );
    if (response) {
      setNFTContractdetails(response.data);
    } else {
      setErrorMsg(isErrorDispaly(response));
    }
  };
  const isErrorDispaly = (objValue: any) => {
    if (
      (objValue.response?.data?.title &&
        typeof objValue.response?.data?.title === "string") ||
      objValue.reason
    ) {
      return objValue.response?.data?.title || objValue.reason;
    } else if (
      objValue.originalError &&
      typeof objValue.originalError.message === "string"
    ) {
      return objValue.originalError.message;
    } else if (objValue.shortMessage) {
      if (objValue.shortMessage?.includes("The total cost")) {
        return "Low balance";
      } else {
        return objValue.shortMessage;
      }
    } else {
      return "Something went wrong please try again!";
    }
  };
  const getDate = (date: any) => {
    var dateIn = moment(date, "YYYY/MM/DD");
    return dateIn.format("DD/MM/YYYY");
  };
  const handleChange = (value: any, type: any) => {
    if (type == "bid") {
      const data = value.target.value;
      const isNumber = /^[0-9].*$/.test(data);
      setBidValue(data);
      if (!isNumber) {
        setValidationError("Please enter only numbers");
      } else {
        setValidationError(null);
      }
    }
    let obj = Object.assign({}, saveObj);
    obj.value = value.target.value;
    setSaveObj(obj);
  };
  const placeONSaleorAuction = async (type: any) => {
    setBtnLoader(true);
    let obj: any = Object.assign({}, saveObj);
    if (obj.value == "0") {
      setSaleErrorMsg("Amount must be greater than zero");
      setBtnLoader(false);
    } else {
      obj.customerId = props.auth.user?.id;
      obj.nftId = nftId ? nftId : "";
      obj.crypto = nftDetails?.currency || "WMATIC";
      obj.saleType = type;
      setSaleLoader(true);
      setApprovalForAll(collectionAddress, UserContract.abi, async (res) => {
        if (res.ok) {
          let response = await postMarketplace(`User/SaveSale`, obj);
          if (response) {
            setSucess(true);
            setBtnLoader(false);
            setSuccess("Nft has been placed on Auction successfully");
            setTimeout(() => {
              setSucess(false);
            }, 2000);
            setSaleLoader(false);
            loadNftDetails();
            if (type == "Sale") {
              setShow(false);
              setBtnLoader(false);
            } else {
              setShowAuction(false);
              setBtnLoader(false);
            }
          } else {
            setSaleLoader(false);
            setSaleErrorMsg(isErrorDispaly(response));
            if (type == "Sale") {
              setShow(false);
              setBtnLoader(false);
            } else {
              setShowAuction(false);
              setBtnLoader(false);
            }
          }
        } else {
          setSaleLoader(false);
          setSaleErrorMsg(isErrorDispaly(res.data));
          if (type == "Sale") {
            setShow(false);
            setBtnLoader(false);
          } else {
            setShowAuction(true);
            setBtnLoader(false);
          }
        }
      });
    }
  };
  const getNFTProperties = async () => {
    let response = await getMarketplace(
      `User/NFTProperties/${tokenId}/${collectionAddress}`
    );
    if (response) {
      setNFTProperties(response.data);
      response.data?.attributes &&
        setnftAttributes(JSON.parse(response.data?.attributes));
    } else {
      setErrorMsg(isErrorDispaly(response));
    }
  };
  const gotoFavorite = (val: any) => {
    if (isConnected) {
      savefavroite(val);
    } else {
      setModalShow(true);
    }
  };
  const gotoFev = (item: any) => {
    if (isConnected) {
      moreCollectionSavefavroite(item);
    } else {
      setModalShow(true);
    }
  };
  const savefavroite = async (val: any) => {
    let obj = {
      nftId: nftId,
      customerId: props.auth.user?.id,
      isFavourite: val ? false : true,
    };
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
      isFavourite: item.isFavourite ? false : true,
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
    // setCancelShow(true);
    modalActions("cancelsale", "open");
    setshowCancelSale(true)
  };
  const handleCancelConfirm = () => {
    modalActions("cancelsale", "close");
  };
  const cancelSaleConfirm = async (type: any) => {
    setBtnLoader(true);
    const obj = {
      nftId: nftId,
      currentOwnerId: nftDetails?.ownerId,
      saleType: cancelType,
    };
    if (type == "Yes") {
      let response = await postMarketplace(`User/CancelSale`, obj);
      if (response) {
        setSucess(true);
        setBtnLoader(false);
        setSuccess(
          cancelType == "sale"
            ? "Sale cancelled successfully"
            : "Auction cancelled successfully"
        );
        setTimeout(() => {
          setSucess(false);
        }, 2000);
        loadNftDetails();
        setCancelShow(false);
        loadFavoritesCount();
        getbidData();
      } else {
        setBtnLoader(false);
        setCancelShow(false);
        setErrorMsg(isErrorDispaly(response));
      }
    } else {
      setBtnLoader(false);
      setCancelShow(false);
    }
  };
  const getNFTImageUrl = (file: any) => {
    const filePath = file?.replace("ipfs://", "");
    return process.env.REACT_APP_IPFS_PREFIX + `${filePath}`;
  };
  const handleCloseBid = () => {
    setShowBid(false);
    setValidationError(null);
  };

  const handleShowBid = () => {
    if (isConnected) {
      modalActions("placebid", "open");
      setSuccessMsg(null);
      getPlaceABid();
      setPlaceABidError(null);
      setValidated(false);
      setShowBid(true);
      setMetaConnectionError(null);
    } else {
      // setMetaConnectionError("Please connect your wallet...")
      window.scrollTo(0, 0);
    }
  };
  const getCheckPlaceBid = () => {
    if (isConnected) {
      handleShowBid();
    } else {
      // setModalShow(true)

      modalActions("marketplace-wallet-connect", "open");
    }
  };
  const placeBid = async (e: any) => {
    setBtnLoader(true);
    e.preventDefault();
    const form = e.currentTarget;
    let obj = {
      nftId: nftId,
      customerId: props.auth.user.id,
      value: parseFloat(bidValue),
      crypto: "WMATIC",
    };

    if (form.checkValidity() === true && validationError == null) {
      try {
        setConfirmations({ ...confirmations, showModal: true, currentStep: 1 });
        await getBidConfirmation(obj.value);
        setConfirmations({ ...confirmations, showModal: true, currentStep: 2 });
        const signature = await getSignatureForBid(
          collectionAddress,
          tokenId,
          obj.value,
          nftDetails.supply
        );
        obj.signature = signature;
        if (putanAction || putanSale) {
          let response = await postMarketplace(`User/SaveNftBid`, obj);
          if (response) {
            setValidated(true);
            setBtnLoader(false);
            setSucess(true);
            setSuccess("Bid has been placed successfully");
            setTimeout(() => {
              setSucess(false);
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
        } else {
          setBtnLoader(false);
          setConfirmations({ ...confirmations, showModal: false });
        }
      } catch (error) {
        setConfirmations({ ...confirmations, showModal: false });
        setBtnLoader(false);
        setPlaceABidError(isErrorDispaly(error));
        setShowBid(false);
        window.scroll(0, 0);
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
  const getCheckBuy = (item: any) => {
    if (isConnected) {
      handleShowBuy();
    } else {
      // setModalShow(true)
      modalActions("marketplace-wallet-connect", "open");
    }
  };
  const handleShowBuy = () => {
    if (isConnected) {
      // setShowBuyModal(true);
      modalActions("marketplace-buy-now", "open");
    } else {
      // setMetaConnectionError("Please connect your wallet...;;")
      window.scrollTo(0, 0);
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
    setConfirmations({
      titles: [
        {
          title: "Executing Bid",
          message:
            "After successful transaction NFT will be transferred to buyer",
        },
      ],
      showModal: true,
      currentStep: 1,
      main_title: "Accept Bid",
    });
    setAcceptbtnLoader(true);
    const obj = {
      nftId: nftId,
      value: item.biddingAmount,
      crypto: "WMATIC",
      buyerAddress: item.bidderAddress,
      BidId: item.bidId,
      TransactionHash: collectionAddress,
    };
    try {
      const acceptBidObj = await acceptBid(
        collectionAddress,
        nftDetails.collectionType,
        item.biddingAmount,
        tokenId,
        item.signature,
        item.bidderAddress,
        1
      );
      let response = await postMarketplace(`User/SaveAcceptBid`, obj);
      if (response) {
        setSucess(true);
        setSuccess("Bid accepted succesfully");
        setTimeout(() => {
          setSucess(false);
          router(`/accounts/${address}`);
        }, 2000);
        setErrorMsg(null);
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
    if (type == "creator") {
      router(`/accounts/${item?.creatorWalletAddress || address}`);
    } else if (type == "currentOwner") {
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
          `/marketplace/nft/${item.tokenId}/${
            item?.collectionContractAddress || item?.creatorWalletAddress
          }/${item.id}`
        );
        // window.scroll(0, 0)
        scrollableRef.current.scrollIntoView(0, 0);
      })
      .catch((error: any) => {
        setErrorMsg(isErrorDispaly(error));
      });
  };

  const notConnectCollectionClick = (item) => {
    scrollableRef.current.scrollIntoView(0, 0);
    router(
      `/marketplace/nft/${item.tokenId}/${
        item?.collectionContractAddress || item?.creatorWalletAddress
      }/${item.id}`
    );
  };
  const dropdownList = [
    { name: "Put on sale", action: () => handleShow("sale"), isActive: false },
    {
      name: " Put on auction",
      action: () => handleShow("auction"),
      isActive: false,
    },
    {
      name: "Cancel auction",
      action: () => cancelAuctionorsale("auction"),
      isActive: false,
    },
    {
      name: "Cancel sale",
      action: () => cancelAuctionorsale("sale"),
      isActive: false,
    },
  ];
  return (
    <>
      <div ref={scrollableRef}></div>
      <div className="container mx-auto px-3 lg-px-0">
        {errorMsg && (
          // <Alert variant="danger">
          //   <Image className='validation-error' src={validError} />
          //   <span>{errorMsg}</span>
          // </Alert>
          <div className="cust-error-bg">
            <div className="mr-4">
              <img src={error} alt="" />
            </div>
            <div>
              <p className="error-title error-red">Error</p>
              <p className="error-desc">{errorMsg}</p>
            </div>
          </div>
        )}
        {placeABidError && (
          <div className="cust-error-bg">
            <div className="mr-4">
              <img src={error} alt="" />
            </div>
            <div>
              <p className="error-title error-red">Error</p>
              <p className="error-desc">{placeABidError}</p>
            </div>
          </div>
        )}
        {metaConnectionError && (
          // <Alert variant="danger">
          //   <Image className='validation-error' src={validError} />
          //   <span>{metaConnectionError}</span>
          // </Alert>
          <div className="cust-error-bg">
            <div className="mr-4">
              <img src={error} alt="" />
            </div>
            <div>
              <p className="error-title error-red">Error</p>
              <p className="error-desc">{metaConnectionError}</p>
            </div>
          </div>
        )}
        {successMsg && (
          // <Alert role="alert">

          //   <Image className='validation-error' src={validSuccess} />
          //   <span>{successMsg && 'Bid successful'}</span>{' '}
          // </Alert>
          <div className="cust-error-bg">
            <div className="mr-4">
              <img src={successimg} alt="" />
            </div>
            <div>
              <p className="error-title">Congratulations !</p>
              <p className="error-desc">{successMsg && "Bid successful"}</p>
            </div>
          </div>
        )}
        {/* {loader && <div className='d-flex align-items-center justify-content-center loader-center'><Spinner></Spinner></div>} */}
        {(loader && (
          <>
            <DetailpageShimmer />
          </>
        )) || (
          <>
            <section className="mt-5">
              <div className="grid md:grid-cols-12 gap-[40px]">
                <div className="md:col-span-5">
                  <div className="relative">
                    <div className="flex justify-between items-center absolute top-5 w-full px-5">
                      <div>
                        <span className="icon matic-detail "></span>
                      </div>
                      <WalletConnect
                        showWalletModal={modalShow}
                        onWalletConect={(addr) => {}}
                        onWalletClose={() => setModalShow(false)}
                      />
                      <div className="flex items-center">
                        <div className="bg-black cursor-pointer rounded-full px-2">
                          <span className="text-white align-middle">
                            {favCount}
                          </span>
                          <span
                            className={`icon like-white ${
                              nftDetails?.isFavorite ? "active" : ""
                            }`}
                            onClick={() => gotoFavorite(nftDetails?.isFavorite)}
                          ></span>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <img
                        src={
                          nftDetails?.image &&
                          !nftDetails?.image?.includes("null")
                            ? `${getNFTImageUrl(nftDetails?.image)}`
                            : defaultlogo
                        }
                        //src={nftDetails?.image ? nftDetails?.image: defaultlogo }
                        alt=""
                        // className="detail-image"
                        className={` h-[516px] ${
                          nftDetails?.isUnlockPurchased &&
                          address?.toLowerCase() !==
                            nftDetails?.creatorWalletAddress?.toLowerCase()
                            ? "w-full object-cover rounded-2xl"
                            : "w-full object-cover rounded-2xl"
                        }`}
                      />
                    </div>
                    {/* <Image src={detailimage} alt="" className="detail-image" /> */}
                  </div>
                  <div className="shadow rounded-lg bg-primary-content mt-4">
                    <div className="px-2.5 py-2">
                      <div className="flex justify-between items-center mb-7">
                        <h1 className="text-2xl font-semibold text-secondary">
                          Overview
                        </h1>
                        <p className="text-secondary text-base font-semibold">
                          {"By"}
                          <span className="text-neutral ml-1">
                            {nftDetails?.creatorName ||
                              nftDetails?.creatorWalletAddress?.slice(0, 4) +
                                "...." +
                                nftDetails?.creatorWalletAddress?.substring(
                                  nftDetails?.creatorWalletAddress?.length - 4,
                                  nftDetails?.creatorWalletAddress?.length
                                )}
                            <span className="copy-space">
                              {!nftDetails?.creatorName &&
                                nftDetails?.creatorWalletAddress && (
                                  <span
                                    className={`${
                                      !isCopied
                                        ? "icon md copy-icon c-pointer ms-0"
                                        : "icon md check-icon"
                                    }`}
                                    onClick={() =>
                                      handleCopy(
                                        nftDetails?.creatorWalletAddress
                                      )
                                    }
                                  />
                                )}
                            </span>
                          </span>
                        </p>
                      </div>

                      {nftDetails?.description && (
                        <>
                          <h3 className="text-base font-semibold text-secondary mb-4">
                            Description
                          </h3>
                          <p className="text-secondary">
                            {nftDetails?.description}
                          </p>
                        </>
                      )}
                    </div>
                    <hr className="mt-[22px] mb-3" />
                    <div className="px-2.5 pt-2 pb-6">
                      <h1 className="text-base font-semibold text-secondary mb-4">
                        Details
                      </h1>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="font-semibold text-secondary">
                            Contract Address
                          </label>
                          {nftcontractDetails?.contractAddress != null && (
                            <h4 className="text-neutral font-semibold break-all">
                              {nftcontractDetails?.contractAddress?.slice(
                                0,
                                4
                              ) +
                                "...." +
                                nftcontractDetails?.contractAddress?.substring(
                                  nftcontractDetails?.contractAddress.length -
                                    4,
                                  nftcontractDetails?.contractAddress.length
                                )}{" "}
                              <span className="copy-space">
                                {nftcontractDetails?.contractAddress && (
                                  <span
                                    className={`${
                                      !isCopied
                                        ? "icon md copy-icon c-pointer ms-0"
                                        : "icon md check-icon"
                                    }`}
                                    onClick={() =>
                                      handleCopy(
                                        nftcontractDetails?.contractAddress
                                      )
                                    }
                                  />
                                )}
                              </span>
                            </h4>
                          )}

                          {nftcontractDetails?.contractAddress == null && (
                            <h4 className="text-neutral font-semibold break-all">
                              {collectionAddress}
                              <span className="copy-space">
                                {collectionAddress &&
                                  nftcontractDetails?.contractAddress ==
                                    null && (
                                    <span
                                      className={`${
                                        !isCopied
                                          ? "icon md copy-icon c-pointer ms-0"
                                          : "icon md check-icon"
                                      }`}
                                      onClick={() =>
                                        handleCopy(collectionAddress)
                                      }
                                    />
                                  )}
                              </span>
                            </h4>
                          )}
                        </div>
                        <div>
                          <label className="font-semibold text-secondary">
                            Token ID
                          </label>
                          <h4 className="text-neutral font-semibold break-all">
                            {nftcontractDetails?.tokenId || "--"}
                          </h4>
                        </div>
                        <div>
                          <label className="font-semibold text-secondary">
                            Token Standard
                          </label>
                          <h4 className="text-neutral font-semibold break-all">
                            {nftcontractDetails?.tokenStandard || "--"}
                          </h4>
                        </div>
                        <div>
                          <label className="font-semibold text-secondary">
                            Chain
                          </label>
                          <h4 className="text-neutral font-semibold break-all">
                            Polygon
                          </h4>
                          {/* <h4 className="overview-value">{nftcontractDetails?.blockChain}</h4> */}
                        </div>
                        <div>
                          <label className="font-semibold text-secondary">
                            Last Updated
                          </label>
                          <h4 className="text-neutral font-semibold break-all">
                            {getDate(nftcontractDetails?.date)}
                          </h4>
                        </div>
                        <div>
                          <label className="font-semibold text-secondary">
                            Creator Earnings
                          </label>
                          <h4 className="text-neutral font-semibold break-all">
                            {nftcontractDetails?.creatorEarning || "0%"}
                          </h4>
                        </div>
                        {nftcontractDetails?.externalLink && (
                          <div>
                            <label className="font-semibold text-secondary">
                              External Link
                            </label>
                            {nftcontractDetails?.externalLink && (
                              <h4 className="text-neutral font-semibold break-all">
                                <span
                                  onClick={() =>
                                    window.open(
                                      nftcontractDetails?.externalLink,
                                      "_blank"
                                    )
                                  }
                                  className=" c-pointer"
                                >
                                  {(!nftcontractDetails?.externalLink && "-") ||
                                    nftcontractDetails?.externalLink}
                                </span>
                              </h4>
                            )}
                            {!nftcontractDetails?.externalLink && (
                              <h4>{"-"}</h4>
                            )}
                            {/* <h4 className="overview-value mt-2">{nftcontractDetails?.externalLink}</h4> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7">
                  <div className="p-0">
                    <div className="">
                      <div className="flex justify-between items-start mb-3 sm:mt-2">
                        <h1 className="text-3xl text-secondary font-semibold mb-3">
                          {nftDetails?.name|| '--'}
                        </h1>
                        <DropdownMenus
                        dropdownClass="dropdown-end"
                          btnContent={
                            <>
                              <span className="icon dots transform rotate-90"></span>
                            </>
                          }
                          dropdownList={dropdownList}
                        ></DropdownMenus>
                        {/* {nftDetails?.ownerAddress?.toLowerCase() == address?.toLowerCase() && ( */}
                       
                        {/* )} */}
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

                      {nftDetails !== undefined && (
                        <BuyComponent
                          showModal={showBuyModal}
                          handleClose={() => setShowBuyModal(false)}
                          nftDetails={nftDetails}
                          collectionAddress={collectionAddress}
                        ></BuyComponent>
                      )}
                      {/* putonauction drawer start  */}
                      {/* <Modal id="putonauction"> */}
                      <form className="drawer drawer-end">
                        <input
                          id="my-drawer-4"
                          type="checkbox"
                          className="drawer-toggle"
                          checked={isChecked}
                        // onChange={() => closeDrawer(!isChecked)}
                        />
                        <div className="drawer-side z-[999]">
                          <label
                            htmlFor="my-drawer-4"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                          // onChange={handleDrawerClose}
                          ></label>
                          <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
                            <div className="flex items-center justify-between">
                              <p className="text-xl text-secondary font-semibold">Checkout</p>
                              <button
                                className="icon close cursor-pointer"
                                onClick={()=>setIsChecked(!isChecked)}
                              ></button>
                            </div>
                            <div className="text-center">
                              {saleLoader && <Spinner></Spinner>}
                            </div>
                            {!saleLoader && (
                              <div className="p-4 pb-2">
                                {saleErrorMsg && (
                                  <div className="cust-error-bg">
                                    <div className="mr-4">
                                      <img src={error} alt="" />
                                    </div>
                                    <div>
                                      <div>
                                        <img
                                          className="validation-error"
                                          src={validError}
                                        />
                                        <span>{saleErrorMsg}</span>
                                      </div>
                                      <p className="error-title error-red text-start">
                                        Error
                                      </p>
                                      <p className="error-desc text-start">
                                        {saleErrorMsg}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                <p className="text-dark mt-5">
                                  NFT Marketplace is the platform where users can
                                  purchase NFT assets directly from creator, Users
                                  need to pay for the gas fee as well as platform
                                  fee before purchasing the NFT. User can purchase
                                  NFT also through bidding, where creator will
                                  accept a price from the user
                                </p>
                              
                                <div className="bg-base-300 px-6 py-8 rounded-[20px] my-8">
                                
                                <div className="mb-4 flex items-center justify-between">
                              <p className="text-sm shrink-0 text-secondary ">
                              Service fee
                              </p>
                              <p className="text-end truncate text-secondary font-semibold">
                              0.0000 ETH
                              </p>
                            </div>
                                  <label className="text-dark text-sm font-normal p-0 mb-2 label ml-4 block">
                                    Auction Price
                                  </label>
                                  <input
                                    placeholder="Ex: 0.01 WMATIC"
                                    aria-label="Username"
                                    className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                                    onChange={(value) => handleChange(value)}
                                  />
                                </div>
                              </div>
                            )}
                           <div className="mt-40 lg:max-w-[300px] lg:mx-auto mb-5">
                          <Button
                            btnClassName="w-full mb-4 !min-h-[39px]"
                            type="replyCancel"
                            handleClick={()=>setIsChecked(!isChecked)}
                          >
                            Cancel
                          </Button>
                          <Button
                            btnClassName="w-full !min-h-[39px] lg:px-3"
                            type="primary"
                            disabled={saleLoader}
                            handleClick={() => placeONSaleorAuction("Auction")}
                          >
                            {btnLoader && (
                                    <Spinner size="sm" className="text-base-100" />
                                  )}
                            Put on Auction
                          </Button>
                        </div>
                          </div>
                        </div>
                      </form>
                      {/* </Modal> */}
                      {/* putonauction drawer end  */}
                                  {/* cancel sale drawer start  */}
                      {/* <Modal id="cancelsale"> */}
                      <form className="drawer drawer-end">
                        <input
                          id="my-drawer-4"
                          type="checkbox"
                          className="drawer-toggle"
                          checked={showCancelSale}
                        // onChange={() => closeDrawer(!isChecked)}
                        />
                        <div className="drawer-side z-[999]">
                          <label
                            htmlFor="my-drawer-4"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                          // onChange={handleDrawerClose}
                          ></label>
                          <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
                            <div className="flex items-center justify-between">
                              <p className="text-xl text-secondary font-semibold">Confirmation</p>
                              <button
                                className="icon close cursor-pointer"
                                  onClick={()=>setshowCancelSale(!showCancelSale)}
                              ></button>
                            </div>
                       

                            <div>
                              <p className="text-dark my-8">
                                Are you sure, Do you want to cancel {cancelType}?
                              </p>
                            </div>
                           
                            <div className="mt-20 lg:w-[350px] lg:mx-auto mb-5">
                              <Button
                                type="replyCancel"
                                handleClick={() => cancelSaleConfirm("No")}
                                btnClassName="w-full mb-4 !min-h-[39px]"
                              >
                                No
                              </Button>
                              <Button
                                type="primary"
                                handleClick={() => cancelSaleConfirm("Yes")}
                                btnClassName="w-full !h-[32px] !min-h-[39px] lg:px-3"
                              >
                                <span>
                                  {btnLoader && (
                                    <Spinner size="sm" className="text-base-100" />
                                  )}{" "}
                                </span>{" "}
                                Yes
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                      {/* </Modal> */}
 {/* cancel sale drawer end  */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="font-semibold text-secondary">
                            Creator
                          </label>
                          <div className="text-neutral font-semibold">
                            <span
                              onClick={() => goToAccount(nftDetails, "creator")}
                              className=" cursor-pointer"
                            >
                              {nftDetails?.creatorName ||
                                (nftDetails?.creatorWalletAddress
                                  ? nftDetails?.creatorWalletAddress?.slice(
                                      0,
                                      4
                                    ) +
                                    "...." +
                                    nftDetails?.creatorWalletAddress?.substring(
                                      nftDetails?.creatorWalletAddress?.length -
                                        4
                                    )
                                  : "Un named")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="font-semibold text-secondary">
                            Current Owner
                          </label>
                          <div className="text-neutral font-semibold ">
                            <span
                              onClick={() =>
                                goToAccount(nftDetails, "currentOwner")
                              }
                              className="cursor-pointer"
                            >
                              {" "}
                              {nftDetails?.ownerName ||
                                (nftDetails?.ownerAddress
                                  ? nftDetails?.ownerAddress?.slice(0, 4) +
                                    "...." +
                                    nftDetails?.ownerAddress?.substring(
                                      nftDetails?.ownerAddress?.length - 4
                                    )
                                  : "Un named")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-6 mt-8">
                      <div>
                        <span className="icon eye"> </span>
                        <span className="text-secondary font-semibold opacity-60">
                          {viewsCount} views
                        </span>
                      </div>
                      <div>
                        <span className="icon gray-love"></span>
                        <span className="text-secondary font-semibold opacity-60">
                          {favCount} favorites
                        </span>
                      </div>
                      <div>
                        <span className="icon art"></span>
                        <span className="text-secondary font-semibold opacity-60">
                          {nftDetails?.categoryName || "-"}
                        </span>
                      </div>
                    </div>
                    <hr className="mt-[18px] mb-2.5" />
                    <div className="md:flex justify-between gap-4">
                      {nftDetails?.price && (
                        <div>
                          <h3 className="text-secondary text-2xl mb-3 opacity-60">
                            Current Price
                          </h3>
                          <h1 className="text-3xl text-secondary font-semibold mb-5 break-all">
                            {nftDetails?.price}{" "}
                            {nftDetails?.currency?.toUpperCase()}
                          </h1>
                          <p className="text-secondary mt-7 text-base opacity-60">
                            $1,072.29
                          </p>
                        </div>
                      )}
                      <div className="max-sm:mt-4">
                        <p className="font-semibold text-secondary break-all">
                          View proof of authenticity
                        </p>
                        <p className="text-neutral my-3 break-all">
                          View on Maticscan
                        </p>
                        <p className="text-neutral break-all">View on IPFS</p>
                        <p></p>
                      </div>
                    </div>
                  </div>

                  <div className="md:flex items-center justify-between mt-4">
                    {/* {nftDetails?.ownerAddress != address && ( */}
                      <div>
                        {/* {nftDetails?.saleType == "sale" ||
                          (nftDetails?.saleType == "Sale" &&
                            nftDetails?.ownerAddress?.toLowerCase() !=
                              address?.toLowerCase() && ( */}
                              <Button
                                type="secondary"
                                btnClassName="mr-2.5"
                                handleClick={getCheckBuy}
                              >
                                Buy Now
                              </Button>
                            {/* ))} */}
                        {/* {nftDetails?.saleType == "sale" ||
                          (nftDetails?.saleType == "Sale" &&
                            nftDetails?.ownerAddress?.toLowerCase() !=
                              address?.toLowerCase() && ( */}
                              <Button
                                type="cancel"
                                handleClick={getCheckPlaceBid}
                              >
                                Place a bid
                              </Button>
                            {/* // ))} */}
                        {nftDetails?.saleType == "auction" ||
                          (nftDetails?.saleType == "Auction" &&
                            nftDetails?.ownerAddress?.toLowerCase() !=
                              address?.toLowerCase() && (
                              <Button
                                type="cancel"
                                handleClick={getCheckPlaceBid}
                              >
                                Place a bid
                              </Button>
                            ))}
                      </div>
                    {/*  )} */}
                    <div
                      className={`max-sm:mt-4 border border-[2px] rounded-[28px] justify-between md:min-w-[132px] px-3 py-2 flex gap-3 items-center`}
                    >
                      <span
                        className={`detail-minus icon cursor-pointer`}
                        onClick={deCounter}
                      ></span>
                      <p className="font-semibold text-secondary">{count}</p>
                      <span
                        className={`detail-plus icon cursor-pointer`}
                        onClick={updateCounter}
                      ></span>
                    </div>
                  </div>
                  <h2 className="text-base font-semibold text-secondary mt-9 mb-3.5">
                    Properties
                  </h2>
                  <div className="grid md:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="border border-[#939393] px-5 py-4 text-center rounded-lg">
                      <p className="text-neutral font-semibold">
                        OG Wearables Charge
                      </p>
                      <p className="text-secondary font-semibold my-1">Used</p>
                      <p className="text-secondary">7% have this trait</p>
                    </div>
                    <div className="border border-[#939393] px-5 py-4 text-center rounded-lg">
                      <p className="text-neutral font-semibold">
                      Rarity
                      </p>
                      <p className="text-secondary font-semibold my-1">Very Common</p>
                      <p className="text-secondary">67% have this trait</p>
                    </div>
                    <div className="border border-[#939393] px-5 py-4 text-center rounded-lg">
                      <p className="text-neutral font-semibold">
                      Space Doodles Charge
                      </p>
                      <p className="text-secondary font-semibold my-1">Available</p>
                      <p className="text-secondary">100% have this trait</p>
                    </div>
                    <div className="border border-[#939393] px-5 py-4 text-center rounded-lg">
                      <p className="text-neutral font-semibold">
                      Type
                      </p>
                      <p className="text-secondary font-semibold my-1">Dooplicator</p>
                      <p className="text-secondary">100% have this trait</p>
                    </div>
                  </div>
                </div>
            
              </div>
            </section>
            {/* place a bid drawer start  */}
              <form  className="drawer drawer-end">
                  <input
                    id="placebid"
                    type="checkbox"
                    className="drawer-toggle"
                    checked={false}
                  // onChange={() => closeDrawer(!isChecked)}
                  />
                  <div className="drawer-side z-[999]">
                    <label
                      htmlFor="my-drawer-4"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    // onChange={handleDrawerClose}
                    ></label>
                    <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
                      <div className="flex justify-between items-center my-2">
                        <h2 className="text-lg text-dark font-semibold mb-0">
                          Place a Bid
                        </h2>
                        <span className="icon close cursor-pointer" ></span>
                      </div>

                      <form
                        noValidate
                        validated={validated}
                        onSubmit={(e) => placeBid(e)}
                      >
                      {  <>
                        <div className="">
                       
                          <div className="flex gap-5 items-center mt-10 mb-12">
                         
                        <img className="w-[112px] h-[112px] object-cover rounded-[15px]" src={thorntf} alt="nft-image" />
                          <div className="">
                          
                          
                              <p className="truncate text-[28px] text-secondary font-semibold leading-8 mb-0">
                              Thor 3d #1654
                              </p>
                          
                              <p className="truncate text-secondary opacity-60 font-semibold text-xl leading-6 mb-0">
                              Current Price
                              </p>
                              <p className="truncate text-secondary text-[22px] font-semibold leading-[26px] mb-0">
                              <span className=""> {data?.formatted || "--"}</span>{" "}
                                <span className="">{nftDetails?.currency || "--"}</span>
                              </p>
                          </div>
                        </div>
                          <div className="bg-base-300 px-6 py-8 rounded-[20px] my-8">
                          <div className="mb-4 flex items-center justify-between px-4">
                              <p className="text-sm shrink-0 text-secondary ">
                              Price
                              </p>
                              <p className="truncate text-secondary font-semibold">
                                
                                {nftDetails?.price || "--"}{" "}
                              <span>{nftDetails?.currency || "--"}</span>
                              </p>
                            </div>
                            <div className="mb-4 flex items-center justify-between px-4">
                              <p className="text-sm shrink-0 text-secondary ">
                              Buyer Fee
                              </p>
                              <p className="truncate text-secondary font-semibold">
                              {percentageValue || "--"} <span>{nftDetails?.currency || "--"}</span>
                              </p>
                            </div>
                            <div className="mb-4 flex items-center justify-between px-4">
                              <p className="text-sm shrink-0 text-secondary ">
                              Total Price
                              </p>
                              <p className="truncate text-secondary font-semibold">
                              {totalBuyValue} <span>{nftDetails?.currency}</span>
                              </p>
                            </div>
                            <div className="mb-4">
                              <label className="text-dark text-sm font-normal p-0 mb-2 label ml-4">
                                Your Bid *
                              </label>
                              <input
                                type="text"
                                name="value"
                                aria-label="Username"
                                className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                                placeholder="Bidding Amount"
                                onChange={(e) => handleChange(e, "bid")}
                                isInvalid={!!validationError}
                                feedback={validationError}
                                required
                                maxLength={13}
                              />
                              {validationError && (
                                <>
                                  {" "}
                                  <p type="invalid">
                                    Please provide valid Bid Value.
                                  </p>
                                </>
                              )}
                            </div>
                            <div className="mb-4">
                              <label className="text-dark text-sm font-normal p-0 mb-2 label ml-4">
                                Crypto Type
                              </label>
                              <div className="relative ">
                                <select
                                  aria-label="Default select example"
                                  className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10 !bg-white"
                                >
                                  <option>MATIC</option>
                                  <option value="1">WMATIC</option>
                                </select>
                              </div>
                            </div>
                            <div className="mb-5">
                              <label className="text-dark text-sm font-normal p-0 mb-2 label ml-4">
                                Buy Price
                              </label>
                              <input
                                placeholder="0.01 WETH"
                                aria-label="Username"
                                className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                              />
                            </div>
                            <div className="px-4">
                            <div className="mb-4 flex items-center justify-between">
                              <p className="text-sm shrink-0 text-secondary ">
                                Your balance
                              </p>
                              <p className="truncate text-secondary font-semibold">
                                <span className=""> {data?.formatted}</span>{" "}
                                <span className="">{nftDetails?.currency}</span>
                              </p>
                            </div>
                            <div className="mb-4 flex items-center justify-between">
                              <p className="text-sm shrink-0 text-secondary ">
                                Your bidding balance
                              </p>
                              <p className="truncate text-secondary font-semibold">
                                0.0025 Matic
                              </p>
                            </div>
                            <div className="mb-4 flex items-center justify-between">
                              <p className="text-sm shrink-0 text-secondary ">
                                Service fee
                              </p>
                              <p className="text-end truncate text-secondary font-semibold">
                                0.0025 WMatic
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm shrink-0 text-secondary ">
                                Total bid amount
                              </p>
                              <p className="text-end truncate text-secondary font-semibold">
                                {0.0025 + data?.formatted} {nftDetails?.currency}
                              </p>
                            </div>
                          </div>
                          </div>
                          
                        </div>

                        <div className="mt-16 lg:max-w-[250px] lg:mx-auto mb-5">
                          <Button
                            btnClassName="w-full mb-4 !min-h-[39px]"
                            type="replyCancel"
                            handleClick={handleCloseBid}
                          >
                            Cancel
                          </Button>
                          <Button
                            btnClassName="w-full !h-[32px] !min-h-[39px] lg:px-3"
                            type="primary"
                            disabled={btnLoader}
                          >
                            <span>{btnLoader && <Spinner size="sm" />} </span>
                            Place a bid
                          </Button>
                        </div>
                        </>}
                        {/* success section start */}
                        {
                          
                        //   <div className='text-center relative mt-16'>   
                        // <img src={validSuccess} alt="" className=' mx-auto ' />         
                        // <div className='z-[1] relative'>
                        // <img src={success} alt="" className='w-[124px] mx-auto' />
                        // <h1 className='text-[28px] text-[#15AB3D] font-semibold mt-3'>Congratulations!</h1>
                        // <p className='text-[18px] font-semibold text-secondary mt-4'>You Won this NFT</p>
                        // </div>
                        
                        // <div className="flex gap-5 items-center mt-10 mb-12 justify-center">
                         
                        //  <img className="w-[112px] h-[112px] object-cover rounded-[15px]" src={thorntf} alt="nft-image" />
                        //    <div className="">
                           
                           
                        //        <p className="truncate text-[28px] text-secondary font-semibold leading-8 mb-0 text-left">
                        //        Thor 3d #1654
                        //        </p>
                           
                        //        <p className="truncate text-secondary opacity-60 font-semibold text-xl leading-6 mb-0 text-left">
                        //        Current Price
                        //        </p>
                        //        <p className="truncate text-secondary text-[22px] font-semibold leading-[26px] mb-0 text-left">
                        //        <span className=""> {data?.formatted || "--"}</span>{" "}
                        //          <span className="">{nftDetails?.currency || "--"}</span>
                        //        </p>
                        //    </div>
                        //  </div>
                        // </div>
                         
                         }
                          {/* success section end */}
                      </form>
                    </div>
                  </div>
                </form>
                {/* place a bid drawer end  */}
                {/* buy now drawer start  */}
                <form  className="drawer drawer-end">
                  <input
                    id="placebid"
                    type="checkbox"
                    className="drawer-toggle"
                    checked={false}
                  // onChange={() => closeDrawer(!isChecked)}
                  />
                  <div className="drawer-side z-[999]">
                    <label
                      htmlFor="my-drawer-4"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    // onChange={handleDrawerClose}
                    ></label>
                    <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg text-dark font-semibold mb-4">
                          Place a Bid
                        </h2>
                        <span className="icon close cursor-pointer" ></span>
                      </div>

                      <form
                        noValidate
                        validated={validated}
                        onSubmit={(e) => placeBid(e)}
                      >
                        <div className="flex gap-5 items-center mt-10">
                         
                        <img className="w-[112px] h-[112px] object-cover rounded-[15px]" src={thorntf} alt="nft-image" />
                          <div className="">
                          
                          
                              <p className="truncate text-[28px] text-secondary font-semibold leading-8 mb-0">
                              Thor’s Hammer
                              </p>
                          
                              <p className="truncate text-secondary opacity-60 font-semibold text-xl leading-6 mb-0">
                              Current Price
                              </p>
                              <p className="truncate text-secondary text-[22px] font-semibold leading-[26px] mb-0">
                              0.003 Matic
                              </p>
                          </div>
                        </div>

                        <div className="mt-60 lg:max-w-[300px] lg:mx-auto mb-5">
                          <Button
                            btnClassName="w-full mb-4 !min-h-[39px]"
                            type="replyCancel"
                            handleClick={handleCloseBid}
                          >
                            Place A Bid
                          </Button>
                          <Button
                            btnClassName="w-full !min-h-[39px] lg:px-3"
                            type="primary"
                            disabled={btnLoader}
                          >
                            <span>{btnLoader && <Spinner size="sm" />} </span>
                            Own with 0.003Matic / $1.32
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </form>
                {/* buy now drawer end  */}
            <h3 className="text-[24px] font-semibold text-secondary mb-1 mt-6">
              Bidding Details
            </h3>

            <div className="max-sm:w-full overflow-auto px-1">
              <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px]  ">
                <thead>
                  <tr className="">
                    <th className="text-left text-base text-secondary font-bold">
                      S.No
                    </th>
                    <th className="text-left text-base text-secondary font-bold">
                      Date
                    </th>
                    <th className="text-left text-base text-secondary font-bold">
                      Buyer Address
                    </th>
                    <th className="text-left text-base text-secondary font-bold">
                      Bidding Amount
                    </th>
                    <th className="text-left text-base text-secondary font-bold">
                      Creator Name
                    </th>
                    <th className="text-left text-base text-secondary font-bold"></th>
                  </tr>
                </thead>

                <tbody>
                  {bidData?.map((item: any, idx: any) => (
                    <tr className="" key={idx}>
                      <td
                        scope="row"
                        className="font-normal text-sm text-secondary"
                      >
                        {idx + 1}
                      </td>
                      <td className="font-normal text-sm text-secondary">
                        <Moment format="DD-MM-YYYY " className="blue-text">
                          {item.bidDate || "--"}
                        </Moment>
                      </td>
                      <td className="font-normal text-sm text-secondary">
                        {item.bidderAddress || "--"}
                      </td>
                      <td className="font-normal text-sm text-secondary">
                        {item.biddingAmount + " " || "--"}
                        {item.crypto ? item.crypto : ""}
                      </td>
                      <td className="font-normal text-sm text-secondary">
                        {item.creatorName || "--"}
                      </td>

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
                          </Button> */}{" "}
                        {nftDetails?.ownerAddress.toLowerCase() ===
                          address?.toLowerCase() && (
                          <Button
                            btnClassName="px-5 lg:px-5"
                            handleClick={() => executeBid(item)}
                          >
                            Accept Bid{" "}
                            {/* <span>{acceptbtnLoader && <Spinner size="sm" />} </span> */}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bidData.length == 0 && (
                <>
                  <NoDataFound text ={''}/>
                </>
              )}
            </div>
            <section className="mt-5">
              <h2 className="text-[24px] font-semibold text-secondary mb-5 mt-6">
                More from this collection
              </h2>
              <div className="min-h-[250px]">

              {moreCollection?.length !==0 && <div className="relative">
                <div className="carousel gap-4 flex py-2 px-2 md:px-14">
                  {moreCollection?.map((item) => (
                    <div className="carousel-item shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]" key={item.name+item.walletAddress+item.image}>
                      {/* <Link className="nav-link" href={`/assets/${item.tokenId}/${item.collectionContractAddress}/${item.id}`}> */}
                      <div>
                        <div
                          className="cursor-pointer"
                          onClick={
                            isConnected
                              ? () => moreCollectionClick(item)
                              : () => notConnectCollectionClick(item)
                          }
                        >
                          <img
                            src={
                              item?.image
                                ? `${getNFTImageUrl(item?.image)}`
                                : defaultlogo
                            }
                            className={`h-[255px] w-full object-cover rounded-tl-lg rounded-tr-lg ${
                              item?.isUnlockPurchased &&
                              address?.toLowerCase() !==
                                item?.walletAddress?.toLowerCase()
                                ? ""
                                : ""
                            }`}
                            alt=""
                          />
                        </div>
                        <div className="cursor-pointer bg-black top-3 absolute cursor-pointer right-3 rounded-full">
                          <span
                            className={`icon like-white  ${
                              item?.isFavourite ? "active" : ""
                            }`}
                            onClick={() => gotoFev(item)}
                          ></span>
                        </div>
                        <div className="px-2 py-2.5">
                          <p className="text-xs text-secondary truncate">
                            Avengers
                          </p>
                          <h1 className="mb-2.5 text-base font-semibold truncate text-secondary">
                            {" "}
                            {item.name}{" "}
                          </h1>
                          <div className="flex justify-between truncate mb-3 gap-2">
                            <p className="opacity-60 truncate text-secondary flex-1">
                              Price
                            </p>
                            <p className="font-semibold text-secondary flex-1 truncate text-right">
                              {item.price ? item.price : "--"}{" "}
                              {item.price
                                ? item.currency ||
                                  process.env.REACT_APP_CURRENCY_SYMBOL
                                : ""}
                            </p>
                          </div>
                          <div className="flex justify-between gap-2">
                            <p className="opacity-60 text-secondary flex-1">
                              Highest bid
                            </p>
                            <p className="font-semibold text-secondary flex-1 text-right truncate">
                              {item.highestBid ? item.highestBid : "--"}{" "}
                              {item.highestBid
                                ? item.currency ||
                                  process.env.REACT_APP_CURRENCY_SYMBOL
                                : ""}
                            </p>
                          </div>
                        </div>
                        <hr />
                        <div className="px-2.5 py-4 flex justify-between">
                          <div className="flex add-cart cursor-pointer">
                            <span className="icon card-cart"></span>
                            <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
                              Add to Cart
                            </span>
                          </div>
                          <div className="w-px border"></div>
                          <div className="flex shop-card cursor-pointer">
                            <span className="icon card-shop"></span>
                            <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
                              Buy Now
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* </Link> */}
                    </div>
                  ))}
                </div>
                <div className="md:flex md:absolute md:w-full justify-between md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 max-sm:mt-4">
                  <span className="icon carousal-left-arrow cursor-pointer lg:scale-[1.4] mr-1"></span>
                  <span className="icon carousal-right-arrow cursor-pointer lg:scale-[1.4]"></span>
                </div>
              </div>}
              {moreCollection.length == 0 && (
                <>
                  <NoDataFound text ={''}/>
                </>
              )}
              </div>
            </section>
           
          </>
        )}
      </div>
      <Confirmations {...confirmations} />
      <div className="p-absolute toaster-center">
        <ToastContainer className="p-3 cust-nametoster position-fixed bottom-0">
          <Toast show={scuess} className="text-center toster-component">
            <Toast.Body className="toaster-cust">
              <Image src={validSuccess} className="svalidation-error" />{" "}
              <span>{success}</span>
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
