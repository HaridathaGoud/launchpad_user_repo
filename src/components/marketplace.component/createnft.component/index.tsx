import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
// import MintContract from '../../contracts/singleTokem.json';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { create as ipfsHttpClient } from 'ipfs-http-client';
// import { get, post } from '../../utils/api';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
// import apiUploadPost from '../../../utils/apiUploadPost';
import Image from 'react-bootstrap/Image';
import { Spinner, Row, Col } from 'react-bootstrap';
// import UserContract from '../../contracts/user721contract.json';
// import { useCollectionDeployer } from '../../utils/useCollectionDeployer';
// import Confirmations from '../../components/confirmation.modal';
// import { isErrorDispaly } from '../../utils/errorHandling';
// import ToastContainer from 'react-bootstrap/ToastContainer';
// import validError from '../../assets/images/validation-error.png';
// import error from '../../assets/images/error.svg';
// import Toast from 'react-bootstrap/Toast';
// import { useConnectWallet } from '../../hooks/useConnectWallet';
// import validSuccess from '../../assets/images/success.png';
// import loadimg from '../../assets/images/Minnapad-Logo-loader.svg';
function CreateNft(props: any) {
  const [show, setShow] = useState(false);
  const router = useNavigate();
  const [filePath, setFilePath] = useState<any>(null);
  const [loader, setLoader] = useState(false);
  const projectId = process.env.REACT_APP_PROJECTID;
  const projectSecret = process.env.REACT_APP_PROJECTSECRET;
  const authorization = 'Basic ' + btoa(projectId + ':' + projectSecret);
  const { address } = useAccount();
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalErrorMsg, setModalErrorMsg] = useState(null);
  const [showSaleFields, setShowSaleFields] = useState();
  const [showPurchasedFields, setShowPurchasedFields] = useState();
  const [showAuctionFields, setShowAuctionFields] = useState();
  const [collectionsLu, setcollectionsLu] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [propertiesFields, setPropertiesFields] = useState([{ trait_type: null, value: null }]);
  const [validated, setValidated] = useState(false);
  // const { setApprovalForAll, getSignatureForSale } = useCollectionDeployer();
  const [royaltiValidationError, setRoyaltiValidationError] = useState(null);
  const [salevalidationError, setSaleValidationError] = useState(null);
  const [auctionValidationError, setAuctionValidationError] = useState(null);
  const [nameError, setIsNameError] = useState(null);
  const [externalLinkError, setExternalError] = useState(null);
  const [picloader, setPicLoader] = useState(false);
  const shouldLog = useRef(true);
  const [success, setSuccess] = useState(null);
  const [scuess, setSucess] = useState(false);
  const [description, setIsDescription] = useState(null);
  // const { connectWallet } = useConnectWallet();
  const [loading, setLoadings] = useState(false);
  const [ketError,setKeyError]=useState(false);
  const [valueError,setValueError]=useState(false);
  const[indexposition,setIndexPosition]=useState(null);
  const [valueIndexposition,setValueIndexPosition]=useState(null);
  const scrollableRef = useRef<any>(null);
  const[_properties,_setProperties] = useState<any>([]);
  const [confirmations, setConfirmations] = useState({
    showModal: false,
    titles: [
      { title: 'Approval', message: 'Please provide approval for NFT transfer' },
      { title: 'Mint', message: 'Send transaction to mint NFT' },
    ],
    main_title: 'Follow Steps',
    currentStep: 1,
  });
  const [profile, setProfile] = useState({
    name: '',
    external_Link: '',
    description: '',
    collectionId: '',
    royaltifee: '',
    purchased: '',
    purchasedDes: '',
    logo: null,
    id: ' 00000000-0000-0000-0000-000000000000',
    salePrice: '',
    saleType: '',
    auctionPrice: '',
  });
  const handleChange = (e: any, key: any) => {
    const value = e.target.value;
    const reg = /<(.|\n)*?>/g;
    const emojiRejex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\u2010-\u2017])/g;
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
      if(containsHTMLTags || containsEmoji || containsNonAlphabetic){
        setIsNameError('Please enter valid content');
      } else {
        setIsNameError(null)
      }
    }
    else if (key == "external_Link") {
      // if (value && (reg.test(value) || value.match(emojiRejex))) {
      //   setExternalError('Please enter valid content');
      // } else {
      //   setExternalError(null)
      // }
      if(!pattern.test(value)){
        setExternalError('Please enter valid content');
      }
       else if (value && (reg.test(value) || value.match(emojiRejex))) {
        setExternalError('Please enter valid content');
      }
       else {
        setExternalError(null)
      }
    
    }
    else if (key == "description") {
      if (value &&(reg.test(value) || value.match(emojiRejex))) {
        setIsDescription('Please enter valid content');
      } else {
        setIsDescription(null)
      }
    }
    else if (key == 'royaltifee') {
      if (!isNumber || value && (reg.test(value) || value.match(emojiRejex) || !checkpercent)) {
        setRoyaltiValidationError('Please enter only numbers');
      } else {
        setRoyaltiValidationError(null);
      }
    } else if (key == 'salePrice') {
      if (!isNumber || value && (reg.test(value) || value.match(emojiRejex))) {
        setSaleValidationError('Please enter only numbers');
      } else {
        setSaleValidationError(null);
      }
    } else if (key == 'auctionPrice') {
      if (!isNumber || value && (reg.test(value) || value.match(emojiRejex))) {
        setAuctionValidationError('Please enter only numbers');
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
    if(nameError==null && externalLinkError==null && description==null && royaltiValidationError==null && salevalidationError==null){
    setLoader(true);
    let selectedCollectionData = collectionsLu.find((item: any) => item.id == profile.collectionId);
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
        behavior: 'smooth',
      });
    }
  }
};
  async function mint({ path }: any, selectedCollectionData: any) {
    let contractAddress: string;
    let mintOnPlatform = false;
    if (selectedCollectionData) {
      contractAddress = selectedCollectionData?.contractAddress;
    } else {
      contractAddress = MintContract.contractAdress;
      mintOnPlatform = true;
    }
    const _connector: any = window?.ethereum;
    const provider = new ethers.providers.Web3Provider(_connector);
    const signer: any = provider.getSigner();
    if (showSaleFields) {
      const _titles = [
        ...confirmations.titles,
        { title: 'Signature', message: 'Please sign to place NFT on Sale in Marketplace' },
      ];
      setConfirmations({ ...confirmations, titles: _titles, showModal: true });
    } else {
      setConfirmations({ ...confirmations, showModal: true });
    }
    return setApprovalForAll(
      contractAddress,
      mintOnPlatform ? MintContract.abi : UserContract.abi,
      async (result: any) => {
        if (result.ok) {
          try {
            setSuccess(result?.data?.reason)
            if (mintOnPlatform) {
              const nftContract = new ethers.Contract(contractAddress, MintContract.abi, signer);
              const {
                signature: { v, r, s },
                nonce,
              } = await getSign(process.env.REACT_APP_IPFS_PREFIX + `/${path}`);
              if (showSaleFields) {
                const _titles = [
                  ...confirmations.titles,
                  { title: 'Signature', message: 'Please sign to place NFT on Sale in Marketplace' },
                ];
                setConfirmations({ ...confirmations, titles: _titles, showModal: true, currentStep: 2 });
              } else {
                setConfirmations({ ...confirmations, showModal: true, currentStep: 2 });
              }
              nftContract
                .mint(process.env.REACT_APP_IPFS_PREFIX + `/${path}`, profile.royaltifee, [v, r, s, nonce], {
                  gasLimit: 700000,
                  gasPrice: ethers.utils.parseUnits('50', 'gwei'),
                })
                .then((res: any) => {
                  _provider()
                    .waitForTransaction(res?.hash)
                    .then(async (resp) => {
                      const tokenId = parseInt(resp.logs[0].topics[3]);
                      if (showSaleFields) {
                        const _titles = [
                          ...confirmations.titles,
                          { title: 'Signature', message: 'Please sign to place NFT on Sale in Marketplace' },
                        ];
                        setConfirmations({ ...confirmations, titles: _titles, showModal: true, currentStep: 3 });
                      } else {
                        setConfirmations({ ...confirmations, showModal: true, currentStep: 3 });
                      }
                      let signature;
                      if (showSaleFields) {
                        signature = await getSignatureForSale(contractAddress, tokenId, 'ERC721', profile.salePrice);
                      }
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
                        saleToken: 'WMATIC',
                        saleType: showSaleFields ? 'Sale' : showAuctionFields ? 'Auction' : null,
                        collectionType: 'ERC-721',
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
                        setSucess(true)
                        setSuccess("NFT has been successfully created")
                        setTimeout(() => {
                          setSucess(false)
                          router(`/accounts/${address}`);
                        }, 2000);
                        setConfirmations({ ...confirmations, showModal: false });
                      } catch (error) { }
                    });
                })
                .catch((error: any) => {
                  setLoader(false);
                  const err: any =
                    error.code === 'ACTION_REJECTED'
                      ? 'Transaction rejected by user'
                      : 'Something went wrong. Please try again';
                  setErrorMsg(err);
                  setConfirmations({ ...confirmations, showModal: false });

                  window.scroll({
                    top: 150,
                    left: 100,
                    behavior: 'smooth',
                  });
                });
            } else {
              if (showSaleFields) {
                const _titles = [
                  ...confirmations.titles,
                  { title: 'Signature', message: 'Please sign to place NFT on Sale in Marketplace' },
                ];
                setConfirmations({ ...confirmations, titles: _titles, showModal: true, currentStep: 2 });
              } else {
                setConfirmations({ ...confirmations, showModal: true, currentStep: 2 });
              }
              const nftContract = new ethers.Contract(contractAddress, UserContract.abi, signer);
              nftContract
                .mint(process.env.REACT_APP_IPFS_PREFIX + `/${path}`, profile.royaltifee, {
                  gasLimit: 700000,
                  gasPrice: ethers.utils.parseUnits('50', 'gwei'),
                })
                .then((res: any) => {
                  _provider()
                    .waitForTransaction(res?.hash)
                    .then(async (resp) => {
                      const tokenId = parseInt(resp.logs[0].topics[3]);
                      let signature;
                      if (showSaleFields) {
                        const _titles = [
                          ...confirmations.titles,
                          { title: 'Signature', message: 'Please sign to place NFT on Sale in Marketplace' },
                        ];
                        setConfirmations({ ...confirmations, titles: _titles, showModal: true, currentStep: 3 });
                        signature = await getSignatureForSale(contractAddress, tokenId, 'ERC721', profile.salePrice);
                      } else {
                        setConfirmations({ ...confirmations, showModal: true, currentStep: 3 });
                      }
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
                        saleToken: 'WMATIC',
                        saleType: showSaleFields ? 'Sale' : showAuctionFields ? 'Auction' : null,
                        collectionType: 'ERC-721',
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
                        setSucess(true)
                        setSuccess("NFT has been successfully created")
                        setTimeout(() => {
                          setSucess(false)
                          router(`/accounts/${address}`);
                        }, 2000);
                        setConfirmations({ ...confirmations, showModal: false });
                      } catch (error) {
                        setConfirmations({ ...confirmations, showModal: false });
                      }
                    });
                })
                .catch((error: any) => {
                  setLoader(false);
                  const err: any =
                    error.code === 'ACTION_REJECTED'
                      ? 'Transaction rejected by user'
                      : 'Something went wrong. Please try again';
                  setErrorMsg(err);

                  window.scroll({
                    top: 150,
                    left: 100,
                    behavior: 'smooth',
                  });
                  setConfirmations({ ...confirmations, showModal: false });
                });
            }
          }
          catch (error: any) {
            const err: any =
              error.code === 'ACTION_REJECTED'
                ? 'Transaction rejected by user'
                : 'Something went wrong. Please try again';
            setErrorMsg(err);
          }
        } else {
          window.scroll({
            top: 150,
            left: 100,
            behavior: 'smooth',
          });
          setErrorMsg(result.data.reason);
          setConfirmations({ ...confirmations, showModal: false });
          setLoader(false);
        }
      },
    );
  }
  async function getSign(path: string) {
    const nonce = Math.floor(new Date().getTime() / 1000);
    const hash = ethers.utils.solidityKeccak256(
      ['address', 'address', 'string', 'uint256'],
      [MintContract.contractAdress, address, path, nonce],
    );
    const private_key: any = process.env.REACT_APP_OWNER_PRIVATE_KEY;
    const msgHash = ethers.utils.arrayify(hash);
    const wallet = new ethers.Wallet(private_key, _provider());
    const signHash = await wallet.signMessage(msgHash);
    const signature = ethers.utils.splitSignature(signHash);
    return { signature, nonce };
  }
  const inputRef = useRef<HTMLInputElement>(null);

  const ipfs = ipfsHttpClient({
    url: 'https://ipfs.infura.io:5001/api/v0',
    headers: {
      authorization,
    },
  });
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
  };
  const handleSaveAddField = () => {
    if(ketError==false && valueError==false){
    let fieldValidation = false;
    let _properties = [...propertiesFields];
    for (let trait of _properties) {
      if (!trait?.trait_type || !trait?.value) {
        fieldValidation = true;
      }
    }
    if (fieldValidation) {
      setModalErrorMsg('Please provide valid data');
    } else {
      let _attributes = [];
      for (let i in _properties) {
        let _obj = {};
        for (let key in _properties[i]) {
          _obj[key] = _properties[i][key]
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
    const emojiRejex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\u2010-\u2017])/g;
    setModalErrorMsg(null);
    const newFields = [...propertiesFields];
    if (type == 'avathar') {
       if (event.target.value && (reg.test(event.target.value) || event.target.value.match(emojiRejex))) {
        setKeyError(true)
        setIndexPosition(index)
       }else{
              setKeyError(false)
              newFields[index].trait_type = event.target.value;
       }
    } else if (type == 'avatharValue') {
      if (event.target.value && (reg.test(event.target.value) || event.target.value.match(emojiRejex))) {
        setValueError(true)
        setValueIndexPosition(index)
      }else{
    setValueError(false)
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
    if (type == 'isPutonSale') {
      setShowSaleFields(data);
    } else if (type == 'isUnlockPurchased') {
      setShowPurchasedFields(data);
    } else if (type == 'isPutonAuction') {
      setShowAuctionFields(data);
    }
  };
  function resetProperties() {
    if(attributes?.length !== 0){
      let _attributes = attributes.map((item: any) => { return { ...item } });
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
  const handleClose = () => { resetProperties(); setShow(false); };
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
      <div className="container mx-auto">
        {' '}
        <form className="createnft-content" noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
          <h2 className="createnft-title">Create New NFT</h2>
          <hr className='top-seller-hr' />           
          <div className='grid lg:grid-cols-2'>
          {loading && 
            <div className="d-flex justify-content-center">
            <div className='loading-overlay'><div className="text-center image-container">
            <Image
                      className=""
                      src={loadimg}
                      alt=""
                    />
          </div></div>
          </div>
            ||<>
            <Col lg={6}>
              <Form.Label className="input-label upload-file">Upload file*</Form.Label>

              <div className="upload-doc-style mb-4 doc-style nft-upload-sec p-relative">
                {profile.logo && <Image src={profile?.logo} width="250" height="250" alt="" className="exp-nft-img" />}
                {profile?.logo && (
                  <span className="icon camera create-nft-cam c-pointer" onClick={(e) => deleteImage(e)}></span>
                )}
                {!profile.logo && (
                  <>
                    <div className="choose-image">
                      <span>{picloader && <Spinner size="sm" />} </span>
                      <div>
                        <Form.Control
                          required
                          className="d-none custom-btn active btn"
                          type="file"
                          ref={inputRef}
                          onChange={handlePicChange}
                        />
                        <span
                          className="icon upload-image-icon c-pointer"
                          onClick={() => inputRef.current?.click()}
                        ></span>
                        <p onClick={() => inputRef.current?.click()} className="c-pointer pt-3">
                          PNG, JPG, JPEG files are allowed
                        </p>
                        <p className="image-note-text mt-1">
                          Note: <span>For best view upload 550X370</span>
                        </p>

                        <Form.Control.Feedback type="invalid">Please provide a valid NFT image.</Form.Control.Feedback>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Col>
            <Col lg={6} className="ps-lg-4">
              <div className="collection-wrap">
                <InputGroup className="mb-4 input name-feild">
                  <Form.Label className="input-label">Name*</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="Name"
                    aria-label="Username"
                    className="input-style"
                    value={profile.name}
                    onChange={(e) => handleChange(e, 'name')}
                    isInvalid={!!nameError}
                    feedback={nameError}
                    maxLength={200}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid name.</Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-4">
                  <Form.Label className="input-label">External link</Form.Label>
                  <p className="note-text">
                    Minnapad will include a link to this URL on this item's detail page, so that users can click to learn
                    more about it. You are welcome to link to your own webpage with more details.
                  </p>
                  <Form.Control
                    placeholder="External link"
                    aria-label="External_link"
                    onChange={(e) => handleChange(e, 'external_Link')}
                    className="input-style"
                    isInvalid={!!externalLinkError}
                    feedback={externalLinkError}
                    maxLength={500}
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid content.</Form.Control.Feedback>
                </InputGroup>
                <InputGroup className="name-feild mb-4">
                  <Form.Label className="input-label">Description*</Form.Label>
                  <p className="note-text">
                    The description will be included on the item's detail page underneath its image.
                    {/* Markdown syntax is
                    supported. */}
                  </p>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    onChange={(e) => handleChange(e, 'description')}
                    className="input-style text-white"
                    placeholder="Description"
                    isInvalid={!!description}
                    feedback={description}
                    maxLength={4000}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid description.</Form.Control.Feedback>
                </InputGroup>

                <Form.Group className="mb-3 p-relative" controlId="formPlaintextEmail">
                  <Form.Label className="input-label">Collection*</Form.Label>
                  <p className="note-text">This is the collection where your item will appear.</p>
                  <Form.Select
                    required
                    aria-label="Default select example"
                    className="form-select select-coin c-pointer"
                    value={profile.collectionId}
                    onChange={(e) => handleChange(e, 'collectionId')}
                  >
                    <option value="">Select Collection</option>
                    {collectionsLu.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Select>
                  <span className="arrow-collect nft-dropdn-arrow c-pointer" onChange={(e) => handleChange(e, 'collectionId')}></span>
                  <Form.Control.Feedback type="invalid">Please select collection.</Form.Control.Feedback>
                </Form.Group>

                <div className="user-properties gradient-border mb-4">
                  <div className="p-4">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <span className="icon properties"></span>
                        <div className="ms-2">
                          <h6>Properties</h6>
                          <p className="small-text">Textual traits that show up as rectangles</p>
                        </div>
                      </div>
                      <span className="icon abb-btn c-pointer" onClick={handleShowModel}></span>
                    </div>
                    <div className="d-flex mb-2 row">
                      {attributes.map((field, index) => (
                        <Form.Group key={index} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                          <div className="avatar-box me-lg-2">
                            <label className="text-overflow-ellipse">{field.trait_type}</label>
                            <p className="text-overflow-ellipse">{field.value}</p>
                          </div>
                        </Form.Group>
                      ))}
                    </div>
                  </div>
                </div>

                <InputGroup className="mb-4 name-feild">
                  <Form.Label className="input-label">Royalties*</Form.Label>
                  <Form.Control
                    type="text"
                    className="input-style"
                    placeholder="Suggested: 10%, 20%, 30%"
                    onChange={(e) => handleChange(e, 'royaltifee')}
                    isInvalid={!!royaltiValidationError}
                    feedback={royaltiValidationError}
                    required
                    maxLength={13}
                  />
                  <Form.Control.Feedback type="invalid">Please provide valid royalties.</Form.Control.Feedback>
                </InputGroup>
                <div className="mb-4 sale-switch ">
                  <div className='toggle-switch c-pointer'>
                    <Form.Check
                      className="labl-space c-pointer"
                      type="switch"
                      id="custom-switch"
                      onClick={(e) => handleToggle(e, 'isPutonSale')}
                      disabled={showAuctionFields && true}
                    /> <Form.Label>Put on sale</Form.Label></div>

                  {showSaleFields && (
                    <>
                      {' '}
                      <p className="note-text">You'll receive bids on this item</p>
                      <div className="mb-3 input-group-style cust-suffix-left">
                        <div className='d-flex'>
                          <Form.Control
                            aria-label="Username"
                            type="text"
                            className="input-style  input-leftradius"
                            placeholder="Enter the price"
                            onChange={(e) => handleChange(e, 'salePrice')}
                            isInvalid={!!salevalidationError}
                            feedback={salevalidationError}
                            maxLength={13}
                            required
                          />
                          <InputGroup.Text id="basic-addon3" className="input-style input-rightradius8 px-3 ">
                            WMATIC
                          </InputGroup.Text>
                        </div>
                        {salevalidationError && <Form.Text className="cust-validmsg">Please provide valid Sale Price.</Form.Text>}
                      </div>

                    </>
                  )}
                </div>
                <div className="mb-4 sale-switch">
                  <div className='toggle-switch'>
                    <Form.Check
                      className="labl-space"
                      type="switch"
                      id="custom-switch"
                      onClick={(e) => handleToggle(e, 'isPutonAuction')}
                      disabled={showSaleFields && true}
                    /><Form.Label>Put on auction</Form.Label></div>
                  {showAuctionFields && (
                    <>
                      {' '}
                      <p className="note-text">You'll receive bids on this item</p>
                      <div className="mb-3 input-group-style d-flex cust-suffix-left">
                        <Form.Control
                          aria-label="Username"
                          type="text"
                          className="input-style  input-leftradius"
                          placeholder="Enter the price per one bid"
                          onChange={(e) => handleChange(e, 'auctionPrice')}
                          isInvalid={!!auctionValidationError}
                          feedback={auctionValidationError}
                          maxLength={13}
                          required
                        />
                        <InputGroup.Text id="basic-addon3" className="input-style input-rightradius8 px-3">
                          WMATIC
                        </InputGroup.Text>
                      </div>
                      {auctionValidationError && <Form.Text className="cust-validmsg">Please provide valid Sale Price.</Form.Text>}
                    </>
                  )}
                </div>
                <div className="mb-4 sale-switch">
                  <div className='toggle-switch'>
                    <Form.Check
                      className="labl-space"
                      type="switch"
                      id="custom-switch"
                      onClick={(e) => handleToggle(e, 'isUnlockPurchased')}
                    /><Form.Label>Unlock once purchased</Form.Label></div>
                  <p className="note-text">Content will be unlocked after successful transaction</p>
                </div>
                <div className="text-end mt-4">
                  <Button className="custom-btn" type="submit" disabled={loader}>
                    <span>{loader && <Spinner size="sm" />} </span>Create
                  </Button>
                </div>
                <Modal
                  show={show}
                  onHide={handleClose}
                  className="wallet-popup checkout-modal properties-modal add-properties"
                  centered

                >
                  <Modal.Header className="bglight">
                  <h2 className="section-title mt-0 mb-0">Add Properties </h2>
                    <span className="icon md close-icon c-pointer" onClick={handleClose}></span>
                  </Modal.Header>
                  <Modal.Body>
                  
                    <div>
                      {modalErrorMsg && (
                        // <Alert variant="danger">

                        //   <Image className='validation-error' src={validError} />
                        //   <span>{modalErrorMsg}</span>
                        // </Alert>
                        <div className='cust-error-bg'>
                        <div className='cust-crd-mr'><Image src={error} alt="" /></div>
                        <div>
                          <p className='error-title error-red'>Error</p>
                          <p className="error-desc">{modalErrorMsg}</p></div>
                      </div>
                      )}

                      {propertiesFields?.map((field, index) => (
                        <Form.Group key={index} className="d-flex mb-4">
                          <div className="me-lg-2 me-2">
                            <Form.Label className="input-label">Key*</Form.Label>
                            <Form.Control
                              aria-label="Username"
                              type="text"
                              className="input-style flex-1"
                              placeholder="Key"
                              value={field.trait_type}
                              onChange={(event) => handleFieldChange(index, event, 'avathar')}
                              maxLength={13}
                              required
                              isInvalid={!!ketError}
                              feedback={ketError}
                              
                            />
                            <Form.Control.Feedback type="invalid">{`${indexposition==index && ketError ? "Please provide valid content" : " " }`}</Form.Control.Feedback>
                          </div>
                          {'  '}
                          <div className="">
                            <Form.Label className="input-label">Value*</Form.Label>

                            <Form.Control
                              aria-label="Username"
                              type="text"
                              className="input-style"
                              placeholder="Value"
                              value={field.value}
                              onChange={(event) => handleFieldChange(index, event, 'avatharValue')}
                              maxLength={13}
                              required
                              isInvalid={!!valueError}
                              feedback={valueError}
                            />
                             <Form.Control.Feedback type="invalid">{`${valueIndexposition==index && valueError ? "Please provide valid content" : " " }`}</Form.Control.Feedback>
                          </div>
                          <div className="pop-delete-mt">
                            <span
                              className="icon delete ms-2 c-pointer"
                              onClick={() => handleRemoveFields(index)}
                            ></span>
                          </div>
                        </Form.Group>
                      ))}
                    </div>
                    <div className="nft-props justify-content-end d-flex">
                      <Button onClick={handleAddField} className="custom-btn  me-lg-2">
                        Add more
                      </Button>
                      <Button type='button' onClick={handleSaveAddField} className="custom-btn ms-2">
                        Save
                      </Button>
                    </div>
                  </Modal.Body>
                </Modal>
                {/* <Confirmations {...confirmations} /> */}
              </div>
            </Col>
            </>}
          </div>
        </form>
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
