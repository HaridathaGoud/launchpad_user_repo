import React, { useReducer } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { create as ipfsHttpClient } from "ipfs-http-client";
// import { get, post } from '../../utils/api';
import { connect } from "react-redux";
import BreadCrumb from "../../../ui/breadcrumb";
import Button from "../../../ui/Button";
import { Modal, modalActions } from "../../../ui/Modal";
// import UserContract from '../../contracts/user721contract.json';
import { useCollectionDeployer } from '../../../utils/useCollectionDeployer';
// import Confirmations from '../../components/confirmation.modal';
// import { isErrorDispaly } from '../../utils/errorHandling';
// import ToastContainer from 'react-bootstrap/ToastContainer';
// import validError from '../../assets/images/validation-error.png';
// import error from '../../assets/images/error.svg';
// import Toast from 'react-bootstrap/Toast';
// import { useConnectWallet } from '../../hooks/useConnectWallet';
// import validSuccess from '../../assets/images/success.png';
// import loadimg from '../../assets/images/Minnapad-Logo-loader.svg';
import Form from "./form";
import { formReducer, formState } from "./reducer";
const projectId = process.env.REACT_APP_PROJECTID;
const projectSecret = process.env.REACT_APP_PROJECTSECRET;
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
const ipfs = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});
function CreateNft(props: any) {
  const [localState,localDispatch]=useReducer(formReducer,formState)
  const [show, setShow] = useState(false);
  const router = useNavigate();
  const [filePath, setFilePath] = useState<any>(null);
  const [loader, setLoader] = useState(false);
 
  const { address } = useAccount();
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalErrorMsg, setModalErrorMsg] = useState(null);
  const [showSaleFields, setShowSaleFields] = useState();
  const [showPurchasedFields, setShowPurchasedFields] = useState();
  const [showAuctionFields, setShowAuctionFields] = useState();
  const [collectionsLu, setcollectionsLu] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [propertiesFields, setPropertiesFields] = useState([
    { trait_type: null, value: null },
  ]);
  const [validated, setValidated] = useState(false);
  const { setApprovalForAll, getSignatureForSale,mintTo721 } = useCollectionDeployer();
  const [royaltiValidationError, setRoyaltiValidationError] = useState(null);
  const [salevalidationError, setSaleValidationError] = useState(null);
  const [auctionValidationError, setAuctionValidationError] = useState(null);
  const [nameError, setIsNameError] = useState(null);
  const [externalLinkError, setExternalError] = useState(null);
  const [picloader, setPicLoader] = useState(false);
  const [success, setSuccess] = useState(null);
  const [scuess, setSucess] = useState(false);
  const [description, setIsDescription] = useState(null);
  // const { connectWallet } = useConnectWallet();
  const [loading, setLoadings] = useState(false);
  const [ketError, setKeyError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [indexposition, setIndexPosition] = useState(null);
  const [valueIndexposition, setValueIndexPosition] = useState(null);
  const scrollableRef = useRef<any>(null);
  const [_properties, _setProperties] = useState<any>([]);
  const [confirmations, setConfirmations] = useState({
    showModal: false,
    titles: [
      {
        title: "Approval",
        message: "Please provide approval for NFT transfer",
      },
      { title: "Mint", message: "Send transaction to mint NFT" },
    ],
    main_title: "Follow Steps",
    currentStep: 1,
  });
  const [profile, setProfile] = useState({
    name: "",
    external_Link: "",
    description: "",
    collectionId: "",
    royaltifee: "",
    purchased: "",
    purchasedDes: "",
    logo: null,
    id: " 00000000-0000-0000-0000-000000000000",
    salePrice: "",
    saleType: "",
    auctionPrice: "",
  });
  const handleChange = (e: any, key: any) => {
    const value = e.target.value;
    const reg = /<(.|\n)*?>/g;
    const emojiRejex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\u2010-\u2017])/g;
    const isNumber = /^[0-9].*$/.test(value);
    const checkpercent = /^\d+(\.\d{1,2})?$/.test(value);
    // const containsHTMLTags = /<\/?[a-z][\s\S]*>/i.test(value);
    // const containsEmoji = /[\u{1F300}-\u{1F6FF}]/u.test(value);
    // const containsNonAlphabetic = !/^[\p{L} ]+$/u.test(value);
    const containsHTMLTags = /<\/?[a-z][\s\S]*>/i.test(value);
    const containsEmoji = /[\u{1F300}-\u{1F6FF}]/u.test(value);
    const containsNonAlphabetic = !/^[\p{L} ,.;]+$/u.test(value);
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (key == "name") {
      if (containsHTMLTags || containsEmoji || containsNonAlphabetic) {
        setIsNameError("Please enter valid content");
      } else {
        setIsNameError(null);
      }
    } else if (key == "external_Link") {
      // if (value && (reg.test(value) || value.match(emojiRejex))) {
      //   setExternalError('Please enter valid content');
      // } else {
      //   setExternalError(null)
      // }
      if (!pattern.test(value)) {
        setExternalError("Please enter valid content");
      } else if (value && (reg.test(value) || value.match(emojiRejex))) {
        setExternalError("Please enter valid content");
      } else {
        setExternalError(null);
      }
    } else if (key == "description") {
      if (value && (reg.test(value) || value.match(emojiRejex))) {
        setIsDescription("Please enter valid content");
      } else {
        setIsDescription(null);
      }
    } else if (key == "royaltifee") {
      if (
        !isNumber ||
        (value && (reg.test(value) || value.match(emojiRejex) || !checkpercent))
      ) {
        setRoyaltiValidationError("Please enter only numbers");
      } else {
        setRoyaltiValidationError(null);
      }
    } else if (key == "salePrice") {
      if (
        !isNumber ||
        (value && (reg.test(value) || value.match(emojiRejex)))
      ) {
        setSaleValidationError("Please enter only numbers");
      } else {
        setSaleValidationError(null);
      }
    } else if (key == "auctionPrice") {
      if (
        !isNumber ||
        (value && (reg.test(value) || value.match(emojiRejex)))
      ) {
        setAuctionValidationError("Please enter only numbers");
      } else {
        setAuctionValidationError(null);
      }
    }
    let _obj: any = { ...profile };
    _obj[key] = value;
    setProfile(_obj);
  };
  // useEffect(() => {
  //   if (shouldLog.current) {
  //     shouldLog.current = false;
  //     checkWalletAndProceed();
  //   }
  //   scrollableRef?.current?.scrollIntoView(0,0);
  // }, []);
  // async function checkWalletAndProceed() {
  //   const response = await connectWallet();
  //   if (response) {
  //     getCollectionLu();
  //   }
  // }
  function _provider() {
    const _connector: any = window?.ethereum;
    const provider = new ethers.providers.Web3Provider(_connector);
    return provider;
  }

  // const getCollectionLu = async () => {
  //   // window.scroll(0,0);
  //   scrollableRef?.current?.scrollIntoView(0,0);
  //   setLoadings(true)
  //   let id = props.auth.user.id;
  //   let res = await get(`User/CollectionLu/${id}/ERC-721`);
  //   if (res) {
  //     setLoadings(false)
  //     setcollectionsLu(res.data);
  //     let _obj = { ...profile };
  //     setProfile(_obj);
  //   }
  //   setLoadings(false)
  // };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      nameError == null &&
      externalLinkError == null &&
      description == null &&
      royaltiValidationError == null &&
      salevalidationError == null
    ) {
      setLoader(true);
      let selectedCollectionData = collectionsLu.find(
        (item: any) => item.id == profile.collectionId
      );
      const form = e.currentTarget;
      let obj = {
        description: profile.description,
        external_url: profile.external_Link,
        image: `ipfs://${filePath}`,
        name: profile.name,
        attributes: JSON.stringify(attributes),
      };
      if (form.checkValidity() === true) {
        let nftMetadata = JSON.stringify(obj);
        const result = await ipfs.add(nftMetadata);
        if (
          result.path &&
          royaltiValidationError == null &&
          salevalidationError == null &&
          auctionValidationError == null
        ) {
          mint(result, selectedCollectionData);
        } else {
          setValidated(true);
          setLoader(false);
        }
      } else {
        setValidated(true);
        setLoader(false);
        window.scroll({
          top: 150,
          left: 100,
          behavior: "smooth",
        });
      }
    }
  };
  async function mint({ path }: any, selectedCollectionData: any) {
    let contractAddress: string=localState.values.collection?.contractAddress;
    const _connector: any = window?.ethereum;
    const provider = new ethers.providers.Web3Provider(_connector);
    const signer: any = provider.getSigner();
    if (showSaleFields) {
      const _titles = [
        ...confirmations.titles,
        {
          title: "Signature",
          message: "Please sign to place NFT on Sale in Marketplace",
        },
      ];
      setConfirmations({ ...confirmations, titles: _titles, showModal: true });
    } else {
      setConfirmations({ ...confirmations, showModal: true });
    }
    const saveDetails=(responseAfterMint:any)=>{
      const {ok,receipt}=responseAfterMint;
      const tokenId = parseInt(receipt.logs[0].topics[3]);
      try{
        if(ok){
          let obj = {
            ...localState.values,
            customerId: props.auth.user.id,
            imageUrl: `ipfs://${filePath}`,
            name: profile.name,
            tokenId: tokenId,
            description: profile.description,
            externalLink: profile.external_Link,
            collectionId: profile.collectionId,
            properties: JSON.stringify(attributes),
            isPutonSale: showSaleFields,
            IsPutOnAuction: showAuctionFields,
            isUnlockPurchased: showPurchasedFields,
            salePrice: profile.salePrice || profile.auctionPrice,
            saleToken: "WMATIC",
            saleType: showSaleFields
              ? "Sale"
              : showAuctionFields
              ? "Auction"
              : null,
            collectionType: "ERC-721",
            metadataUri: `ipfs/${path}`,
            contractAttachment: null,
            contractCoverProfile: null,
            contractName: null,
            contractSymbol: null,
            contractDescription: null,
            contractAddress: null,
            isCreateOwn: true,
            signature,
          };
        }
      }catch(saveError){

      }finally{

      }
    }
    const mintNFT=async (approvalResponse:any)=>{
      const {ok,receipt}=approvalResponse
      try{
        if(ok){
          await mintTo721()
        }
      }catch(error){

      }finally{

      }
    }
     await setApprovalForAll(contractAddress, mintNFT)
    return setApprovalForAll(
      contractAddress,
      mintOnPlatform ? MintContract.abi : UserContract.abi,
      async (result: any) => {
        if (result.ok) {
          try {
            setSuccess(result?.data?.reason);
              const nftContract = new ethers.Contract(
                contractAddress,
                UserContract.abi,
                signer
              );
              nftContract
                .mint(
                  process.env.REACT_APP_IPFS_PREFIX + `/${path}`,
                  profile.royaltifee,
                  {
                    gasLimit: 700000,
                    gasPrice: ethers.utils.parseUnits("50", "gwei"),
                  }
                )
                .then((res: any) => {
                  _provider()
                    .waitForTransaction(res?.hash)
                    .then(async (resp) => {
                      const tokenId = parseInt(resp.logs[0].topics[3]);
                      let signature;
                  
                      let obj = {
                        customerId: props.auth.user.id,
                        imageUrl: `ipfs://${filePath}`,
                        name: profile.name,
                        tokenId: tokenId,
                        description: profile.description,
                        externalLink: profile.external_Link,
                        collectionId: profile.collectionId,
                        properties: JSON.stringify(attributes),
                        supply: 1,
                        royalities: profile.royaltifee,
                        isPutonSale: showSaleFields,
                        IsPutOnAuction: showAuctionFields,
                        isUnlockPurchased: showPurchasedFields,
                        salePrice: profile.salePrice || profile.auctionPrice,
                        saleToken: "WMATIC",
                        saleType: showSaleFields
                          ? "Sale"
                          : showAuctionFields
                          ? "Auction"
                          : null,
                        collectionType: "ERC-721",
                        metadataUri: `ipfs/${path}`,
                        contractAttachment: null,
                        contractCoverProfile: null,
                        contractName: null,
                        contractSymbol: null,
                        contractDescription: null,
                        contractAddress: null,
                        isCreateOwn: true,
                        signature,
                      };
                      try {
                        setLoader(false);
                        let res = await post(`User/SaveNFT`, obj);
                        setSucess(true);
                        setSuccess("NFT has been successfully created");
                        setTimeout(() => {
                          setSucess(false);
                          router(`/accounts/${address}`);
                        }, 2000);
                        setConfirmations({
                          ...confirmations,
                          showModal: false,
                        });
                      } catch (error) {
                        setConfirmations({
                          ...confirmations,
                          showModal: false,
                        });
                      }
                    });
                })
                .catch((error: any) => {
                  setLoader(false);
                  const err: any =
                    error.code === "ACTION_REJECTED"
                      ? "Transaction rejected by user"
                      : "Something went wrong. Please try again";
                  setErrorMsg(err);

                  window.scroll({
                    top: 150,
                    left: 100,
                    behavior: "smooth",
                  });
                  setConfirmations({ ...confirmations, showModal: false });
                });
            
          } catch (error: any) {
            const err: any =
              error.code === "ACTION_REJECTED"
                ? "Transaction rejected by user"
                : "Something went wrong. Please try again";
            setErrorMsg(err);
          }
        } else {
          window.scroll({
            top: 150,
            left: 100,
            behavior: "smooth",
          });
          setErrorMsg(result.data.reason);
          setConfirmations({ ...confirmations, showModal: false });
          setLoader(false);
        }
      }
    );
  }
  async function getSign(path: string) {
    const nonce = Math.floor(new Date().getTime() / 1000);
    const hash = ethers.utils.solidityKeccak256(
      ["address", "address", "string", "uint256"],
      [MintContract.contractAdress, address, path, nonce]
    );
    const private_key: any = process.env.REACT_APP_OWNER_PRIVATE_KEY;
    const msgHash = ethers.utils.arrayify(hash);
    const wallet = new ethers.Wallet(private_key, _provider());
    const signHash = await wallet.signMessage(msgHash);
    const signature = ethers.utils.splitSignature(signHash);
    return { signature, nonce };
  }
  const inputRef = useRef<HTMLInputElement>(null);

  
  const handlePicChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadToServer(file);
    }
  };

  // const uploadToServer = async (file: any) => {
  //   setPicLoader(true)
  //   const body: any = new FormData();
  //   setErrorMsg(null);
  //   body.append('file', file);
  //   let fileType = {
  //     'image/png': true,
  //     'image/jpg': true,
  //     'image/jpeg': true,
  //     'image/PNG': true,
  //     'image/JPG': true,
  //     'image/JPEG': true,
  //   };
  //   if (fileType[file.type]) {
  //     apiUploadPost(`/Upload/UploadFileNew`, body)
  //       .then((res) => res)
  //       .then((data) => {
  //         let _obj = { ...profile };
  //         _obj.logo = data[0];
  //         setProfile(_obj);
  //         setPicLoader(false)
  //       })
  //       .catch((error) => {
  //         setPicLoader(false)
  //         setErrorMsg(isErrorDispaly(error));
  //         window.scroll(0,0);
  //       });
  //     const result = await ipfs.add(file);
  //     setFilePath(result.path);
  //   } else {
  //     setPicLoader(false)
  //     window.scroll(0,0);
  //     setErrorMsg('File is not allowed. You can upload jpg, png, jpeg files');
  //   }
  // };

  const handleAddField = () => {
    const newFields = [...propertiesFields, { trait_type: null, value: null }];
    setPropertiesFields(newFields);
  };
  const handleShowModel = () => {
    setModalErrorMsg(null);
    setShow(true);
    modalActions("addproperty", "open");
  };
  const handleSaveAddField = () => {
    if (ketError == false && valueError == false) {
      let fieldValidation = false;
      let _properties = [...propertiesFields];
      for (let trait of _properties) {
        if (!trait?.trait_type || !trait?.value) {
          fieldValidation = true;
        }
      }
      if (fieldValidation) {
        setModalErrorMsg("Please provide valid data");
      } else {
        let _attributes = [];
        for (let i in _properties) {
          let _obj = {};
          for (let key in _properties[i]) {
            _obj[key] = _properties[i][key];
          }
          _attributes.push(_obj);
        }
        setAttributes(_attributes);
        setShow(false);
      }
    }
  };
  const handleFieldChange = (index: any, event: any, type: any) => {
    const reg = /<(.|\n)*?>/g;
    const emojiRejex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\u2010-\u2017])/g;
    setModalErrorMsg(null);
    const newFields = [...propertiesFields];
    if (type == "avathar") {
      if (
        event.target.value &&
        (reg.test(event.target.value) || event.target.value.match(emojiRejex))
      ) {
        setKeyError(true);
        setIndexPosition(index);
      } else {
        setKeyError(false);
        newFields[index].trait_type = event.target.value;
      }
    } else if (type == "avatharValue") {
      if (
        event.target.value &&
        (reg.test(event.target.value) || event.target.value.match(emojiRejex))
      ) {
        setValueError(true);
        setValueIndexPosition(index);
      } else {
        setValueError(false);
        newFields[index].value = event.target.value;
      }
    }
    setPropertiesFields(newFields);
  };
  const handleRemoveFields = (index: any) => {
    const newFields = [...propertiesFields];
    if (propertiesFields.length > 1) {
      newFields.splice(index, 1);
    }
    setPropertiesFields(newFields);
  };

  const handleToggle = (e: any, type: any) => {
    let data = e.target.checked;
    if (type == "isPutonSale") {
      setShowSaleFields(data);
    } else if (type == "isUnlockPurchased") {
      setShowPurchasedFields(data);
    } else if (type == "isPutonAuction") {
      setShowAuctionFields(data);
    }
  };
  function resetProperties() {
    if (attributes?.length !== 0) {
      let _attributes = attributes.map((item: any) => {
        return { ...item };
      });
      let _properties = [];
      for (let i in _attributes) {
        let _obj: any = {};
        for (let key in _attributes[i]) {
          _obj[key] = _attributes[i][key];
        }
        _properties.push(_obj);
      }
      setPropertiesFields(_attributes);
    }
  }
  const handleClose = () => {
    resetProperties();
    setShow(false);
  };
  // const handleClose = () => {
  //   _setProperties([])
  //   setShow(false);
  //   if(attributes != propertiesFields){
  //     const slicedString = propertiesFields.slice(0, 1);
  //     setPropertiesFields(slicedString);
  //   }
  //  };// resetProperties();
  const deleteImage = () => {
    let _obj = { ...profile };
    _obj.logo = null;
    setProfile(_obj);
  };
  return (
    <>
      <div ref={scrollableRef}></div>

      <div className="container mx-auto mt-4 px-3 lg:px-0">
        <BreadCrumb />{" "}
        <Form
          profile={profile}
          inputRef={inputRef}
          deleteImage={deleteImage}
          handlePicChange={handlePicChange}
          collectionsLu={collectionsLu}
          handleShowModel={handleShowModel}
          attributes={attributes}
        />
      </div>
    </>
  );
}
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(CreateNft);
