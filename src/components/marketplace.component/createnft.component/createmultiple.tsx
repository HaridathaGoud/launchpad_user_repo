import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Spinner, Row, Col, Alert } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import {useNavigate} from 'react-router-dom';
import { ethers } from 'ethers';
import { get, post } from '../../utils/api';
import MintContract from '../../contracts/multiToken.json';
import UserContract from '../../contracts/user1155contract.json';
import { connect } from 'react-redux';
import apiUploadPost from '../../utils/apiUploadPost';
import Image from 'react-bootstrap/Image';
import { useCollectionDeployer } from '../../utils/useCollectionDeployer';
import { isErrorDispaly } from '../../utils/errorHandling';
import Confirmations from '../../components/confirmation.modal';
import error from '../../assets/images/error.svg';

function CreateMultiple(props: any) {
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<any>({});
  const [filePath, setFilePath] = useState<any>(null);
  const projectId = process.env.REACT_APP_PROJECTID;
  const projectSecret = process.env.REACT_APP_PROJECTSECRET;
  const authorization = 'Basic ' + btoa(projectId + ':' + projectSecret);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showSaleFields, setShowSaleFields] = useState();
  const [showPurchasedFields, setShowPurchasedFields] = useState();
  const [showAuctionFields, setShowAuctionFields] = useState();
  const { address } = useAccount();
  const [attributes, setAttributes] = useState([]);
  const [collectionsLu, setcollectionsLu] = useState([]);
  const router = useNavigate();
  const [validated, setValidated] = useState(false);
  const { setApprovalForAll, getSignatureForSale } = useCollectionDeployer();
  const [inputValue, setInputValue] = useState('');
  const [royaltiValidationError, setRoyaltiValidationError] = useState(null);
  const [salevalidationError, setSaleValidationError] = useState(null);
  const [auctionValidationError, setAuctionValidationError] = useState(null);
  const [suppliesValidationError, setSuppliesValidationError] = useState(null);
  const [validatedField, setValidatedField] = useState(false);

  const [confirmations, setConfirmations] = useState({
    showModal: false,
    titles: [
      { title: 'Approval', message: 'Please provide approval for NFT transfer' },
      { title: 'Mint', message: 'Send transaction to mint NFT' },
    ],
    main_title: 'Follow Steps',
    currentStep: 1,
    isShowSignature: false,
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
    supply: '',
    auctionPrice: '',
  });
  const handleChange = (e: any, key: any) => {
    const value = e.target.value;
    const isNumber = /^[0-9].*$/.test(value);
    if (key == 'royaltifee') {
      setInputValue(value);
      if (!isNumber) {
        setRoyaltiValidationError('Please enter only numbers');
      } else {
        setRoyaltiValidationError(null);
      }
    } else if (key == 'salePrice') {
      setInputValue(value);
      if (!isNumber) {
        setSaleValidationError('Please enter only numbers');
      } else {
        setSaleValidationError(null);
      }
    } else if (key == 'auctionPrice') {
      setInputValue(value);
      if (!isNumber) {
        setAuctionValidationError('Please enter only numbers');
      } else {
        setAuctionValidationError(null);
      }
    } else if (key == 'supply') {
      setInputValue(value);
      if (!isNumber) {
        setSuppliesValidationError('Please enter only numbers');
      } else {
        setSuppliesValidationError(null);
      }
    }
    let _obj: any = { ...profile };
    _obj[key] = value;
    setProfile(_obj);
  };
  const handlePicChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadToServer(file);
    }
  };
  const uploadToServer = async (file: any) => {
    setErrorMsg(null);
    const body: any = new FormData();
    body.append('file', file);
    let fileType = {
      'image/png': true,
      'image/jpg': true,
      'image/jpeg': true,
      'image/PNG': true,
      'image/JPG': true,
      'image/JPEG': true,
    };
    if (fileType[file.type]) {
      apiUploadPost(`/Upload/UploadFileNew`, body)
        .then((res) => res)
        .then((data) => {
          let _obj = { ...profile };
          _obj.logo = data[0];
          setProfile(_obj);
        })
        .catch((error) => {
          setErrorMsg(isErrorDispaly(error));
          window.scroll(0,0);
        });
      const result = await ipfs.add(file);
      setFilePath(result.path);
    } else {
      setErrorMsg('Please Upload only PNG and JPG Images');
      window.scroll(0,0);
    }
  };
  function _provider() {
    const _connector: any = window?.ethereum;
    const provider = new ethers.providers.Web3Provider(_connector);
    return provider;
  }

  const [propertiesFields, setPropertiesFields] = useState([{ Avathar: '', value: '' }]);
  useEffect(() => {
    getCollectionLu();
  }, []);

  const getCollectionLu = async () => {
    let id = props.auth.user.id;
    let res = await get(`User/CollectionLu/${id}/ERC-1155`);
    if (res) {
      setcollectionsLu(res.data);
      let _obj = { ...profile };
      setProfile(_obj);
    }
  };
  const ipfs = ipfsHttpClient({
    url: 'https://ipfs.infura.io:5001/api/v0',
    headers: {
      authorization,
    },
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    let selectedCollectionData = collectionsLu.find((item) => item.id == profile.collectionId);
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
      if (result.path && royaltiValidationError == null && salevalidationError == null) {
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
  };
  async function mint(result: any, selectedCollectionData: any) {
    let contractAddress: string;
    let mintonPlatform = false;
    if (selectedCollectionData) {
      contractAddress = selectedCollectionData?.contractAddress;
    } else {
      contractAddress = MintContract.contractAdress;
      mintonPlatform = true;
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
    setApprovalForAll(contractAddress, mintonPlatform ? MintContract.abi : UserContract.abi, async (re: any) => {
      if (re.ok) {
        if (mintonPlatform) {
          const nftContract = new ethers.Contract(contractAddress, MintContract.abi, signer);
          const {
            signature: { v, r, s },
            nonce,
          } = await getSign(process.env.REACT_APP_IPFS_PREFIX + `/${result.path}`);
          try {
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
              .mint(
                process.env.REACT_APP_IPFS_PREFIX + `/${result.path}`,
                profile.royaltifee,
                profile.supply,
                [v, r, s, nonce],
                {
                  gasLimit: 700000,
                  gasPrice: ethers.utils.parseUnits('50', 'gwei'),
                },
              )
              .then((res: any) => {
                _provider()
                  .waitForTransaction(res?.hash)
                  .then(async (resp) => {
                    const tokenID = parseInt(resp.logs[0].data.slice(0, 66));
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
                      signature = await getSignatureForSale(contractAddress, tokenID, 'ERC1155', profile.salePrice);
                    }
                    let obj = {
                      customerId: props.auth.user.id,
                      imageUrl: `ipfs://${filePath}`,
                      name: profile.name,
                      tokenId: tokenID,
                      description: profile.description,
                      externalLink: profile.external_Link,
                      collectionId: profile.collectionId,
                      properties: JSON.stringify(attributes),
                      supply: profile.supply,
                      royalities: profile.royaltifee,
                      isPutonSale: showSaleFields,
                      IsPutOnAuction: showAuctionFields,
                      salePrice: profile.salePrice || profile.auctionPrice,
                      isUnlockPurchased: showPurchasedFields,
                      saleToken: 'WMATIC',
                      saleType: showSaleFields ? 'sale' : showAuctionFields ? 'auction' : null,
                      collectionType: 'ERC-1155',
                      metadataUri: `ipfs/${result.path}`,
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
                      setConfirmations({ ...confirmations, showModal: false });
                      router(`/accounts/${address}`);
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
          } catch (error: any) {
            const err: any =
              error.code === 'ACTION_REJECTED'
                ? 'Transaction rejected by user'
                : 'Something went wrong. Please try again';
            setErrorMsg(err);
          }
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
          try {
            nftContract
              .mint(process.env.REACT_APP_IPFS_PREFIX + `/${result.path}`, profile.royaltifee, profile.supply, {
                gasLimit: 700000,
                gasPrice: ethers.utils.parseUnits('50', 'gwei'),
              })
              .then((res: any) => {
                _provider()
                  .waitForTransaction(res?.hash)
                  .then(async (resp) => {
                    const tokenID = parseInt(resp.logs[0].data.slice(0, 66));
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
                      signature = await getSignatureForSale(contractAddress, tokenID, 'ERC1155', profile.salePrice);
                    }
                    let obj = {
                      customerId: props.auth.user.id,
                      imageUrl: `ipfs://${filePath}`,
                      name: profile.name,
                      tokenId: tokenID,
                      description: profile.description,
                      externalLink: profile.external_Link,
                      collectionId: profile.collectionId,
                      properties: JSON.stringify(attributes),
                      supply: profile.supply,
                      royalities: profile.royaltifee,
                      isPutonSale: showSaleFields,
                      IsPutOnAuction: showAuctionFields,
                      isUnlockPurchased: showPurchasedFields,
                      salePrice: profile.salePrice || profile.auctionPrice,
                      saleToken: 'WMATIC',
                      saleType: showSaleFields ? 'sale' : showAuctionFields ? 'auction' : null,
                      collectionType: 'ERC-1155',
                      metadataUri: `ipfs/${result.path}`,
                      contractAttachment: null,
                      contractCoverProfile: null,
                      contractName: null,
                      contractSymbol: null,
                      contractDescription: null,
                      contractAddress: null,
                      isCreateOwn: true,
                    };
                    try {
                      setLoader(false);
                      let res = await post(`User/SaveNFT`, obj);
                      setConfirmations({ ...confirmations, showModal: false });
                      router(`/accounts/${address}`);
                    } catch (error) {}
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
          } catch (error: any) {
            const err: any =
              error.code === 'ACTION_REJECTED'
                ? 'Transaction rejected by user'
                : 'Something went wrong. Please try again';
            setErrorMsg(err);
          }
        }
      }
    });
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

  const handleAddField = () => {
    const newFields = [...propertiesFields, { Avathar: '', value: '' }];
    setPropertiesFields(newFields);
  };
  const handleShowModel = () => {
    setValidatedField(false);
    setShow(true);
  };
  const handleSaveAddField = () => {
    setShow(false);
    setAttributes(propertiesFields);
  };
  const handleFieldChange = (index, event, type) => {
    const newFields = [...propertiesFields];
    if (type == 'avathar') {
      newFields[index].Avathar = event.target.value;
    } else if (type == 'avatharValue') {
      newFields[index].value = event.target.value;
    }
    setPropertiesFields(newFields);
  };
  const handleRemoveFields = (index) => {
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
  const handleClose = () => setShow(false);
  const deleteImage = () => {
    let _obj = { ...profile };
    _obj.logo = null;
    setProfile(_obj);
  };
  return (
    <>
      <div className="container">
        {' '}
        <Form className="createnft-content" noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
          <h2 className="createnft-title">Create New NFT</h2>
          {errorMsg && (
            // <Alert variant="danger">
            // <Image className='validation-error' src={validError} />
            //   <span>{errorMsg}</span>
            // </Alert>
            <div className='cust-error-bg'>
            <div className='cust-crd-mr'><Image src={error} alt="" /></div>
            <div>
              <p className='error-title error-red'>Error</p>
              <p className="error-desc">{errorMsg}</p></div>
          </div>
          )}
          <Row>
            <Col lg={6}>
              <Form.Label className="input-label upload-file">Upload file</Form.Label>
              <div className="upload-doc-style mb-4 doc-style nft-upload-sec p-relative">
                {profile.logo && <Image src={profile?.logo} width="250" height="250" alt="" className="exp-nft-img" />}
                {profile?.logo && (
                  <span className="icon camera create-nft-cam c-pointer" onClick={(e) => deleteImage(e)}></span>
                )}
                {!profile.logo && (
                  <>
                    <div className="choose-image">
                      <Form.Control
                        required
                        className="d-none custom-btn active btn"
                        type="file"
                        ref={inputRef}
                        onChange={handlePicChange}
                      />
                      {/* <p onClick={() => inputRef.current?.click()} className="custom-btn active btn">
                          Choose File
                        </p> */}
                      <span
                        className="icon upload-image-icon c-pointer"
                        onClick={() => inputRef.current?.click()}
                      ></span>
                      <p onClick={() => inputRef.current?.click()} className="c-pointer pt-3">
                        PNG,JPG,JPEG files are allowed
                      </p>
                      <p className="image-note-text mt-1">
                        Note: <span>For best view upload 550X370</span>
                      </p>
                    </div>
                    <Form.Control.Feedback type="invalid">Please provide a valid NFT Image.</Form.Control.Feedback>
                  </>
                )}
              </div>
            </Col>
            <Col lg={6}>
              <div className="collection-wrap">
                <InputGroup className="mb-4 input name-feild">
                  <Form.Label className="input-label">Name *</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="Name"
                    aria-label="Username"
                    className="input-style"
                    value={profile.name}
                    onChange={(e) => handleChange(e, 'name')}
                    maxLength={13}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid name.</Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-4">
                  <Form.Label className="input-label">External link</Form.Label>
                  <p className="note-text">
                    Artha will include a link to this URL on this item's detail page, so that users can click to learn
                    more about it. You are welcome to link to your own webpage with more details.
                  </p>
                  {/* <Form.Control placeholder="Username" aria-label="Username" className="input-style" /> */}
                  <Form.Control
                    placeholder="External link"
                    aria-label="External_link"
                    onChange={(e) => handleChange(e, 'external_Link')}
                    className="input-style"
                  />
                </InputGroup>
                <InputGroup className="name-feild mb-4">
                  <Form.Label className="input-label">Description *</Form.Label>
                  <p className="note-text">
                    The description will be included on the item's detail page underneath its image. 
                    {/* Markdown syntax is
                    supported. */}
                  </p>
                  {/* <Form.Control as="textarea" aria-label="With textarea" className="input-style" /> */}
                  <Form.Control
                    as="textarea"
                    placeholder="Description"
                    aria-label="With textarea"
                    onChange={(e) => handleChange(e, 'description')}
                    className="input-style text-white"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid description.</Form.Control.Feedback>
                </InputGroup>
                <Form.Label className="input-label">Collection *</Form.Label>
                <p className="note-text">This is the collection where your item will appear.</p>
                <div className="p-relative">
                  <Form.Select
                    aria-label="Default select example"
                    className="form-select select-coin mb-4"
                    value={profile.collectionId}
                    onChange={(e) => handleChange(e, 'collectionId')}
                    required
                  >
                    <option value="">Select Collection</option>
                    {collectionsLu?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Please select collection.</Form.Control.Feedback>
                  <span className="icon select-arrow"></span>
                </div>

                <div className="user-properties gradient-border mb-4">
                  <div className="p-4">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <span className="icon properties c-pointer"></span>
                        <div className="ms-2">
                          <h6>Properties</h6>
                          <p className="small-text">Textual traits that show up as rectangles</p>
                        </div>
                      </div>
                      <span className="icon abb-btn c-pointer" onClick={handleShowModel}></span>
                    </div>
                    <div className="d-flex mb-2 align-center row">
                      {attributes?.map((field, index) => (
                        <Form.Group key={index} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                          <div className="avatar-box me-lg-2">
                            <label className="text-overflow-ellipse">{field.Avathar}</label>
                            <p className="text-overflow-ellipse">{field.value}</p>
                          </div>
                        </Form.Group>
                      ))}
                    </div>
                  </div>
                </div>
                <InputGroup className="mb-4 name-feild">
                  <Form.Label className="input-label">Number of copies *</Form.Label>
                  <p className="note-text">The number of items that can be minted. No gas cost to you!</p>
                  {/* <Form.Control aria-label="Username" className="input-style" placeholder="Number" /> */}

                  <Form.Control
                    type="text"
                    aria-label="Username"
                    className="input-style"
                    placeholder="Number of copies"
                    onChange={(e) => handleChange(e, 'supply')}
                    isInvalid={!!suppliesValidationError}
                    feedback={suppliesValidationError}
                    required
                    maxLength={13}
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid number.</Form.Control.Feedback>
                </InputGroup>
                  {/* <Form.Select aria-label="Default select example" className="form-select coin-select select-coin mb-3 ">
                <option>Ethereum</option>
                <option value="1">ETH</option>
              </Form.Select> */}
                <div className="p-relative">
                  <Form.Label className="input-label">Blockchain</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="form-select select-coin mb-3  nft-coin"
                    onChange={(e) => handleChange(e, 'blockchain')}
                  >
                    <option value="Matic">MATIC</option>
                  </Form.Select>
                  <span className="icon select-arrow block-chain"></span>
                  <span className="icon block-chain-select"></span>
                </div>
                <InputGroup className="mb-4 name-feild">
                  <Form.Label className="input-label">Royalties *</Form.Label>

                  <Form.Control
                    type="text"
                    aria-label="Username"
                    className="input-style"
                    placeholder="Suggested: 10%, 20%, 30%"
                    onChange={(e) => handleChange(e, 'royaltifee')}
                    isInvalid={!!royaltiValidationError}
                    feedback={royaltiValidationError}
                    required
                    maxLength={13}
                  />
                  <Form.Control.Feedback type="invalid">{`Please provide valid royalities.`}</Form.Control.Feedback>
                </InputGroup>
                <div className="mb-4 sale-switch c-pointer">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Put on sale"
                    className='c-pointer'
                    onClick={(e) => handleToggle(e, 'isPutonSale')}
                  />
                  {showSaleFields && (
                    <>
                      {' '}
                      <p className="note-text">You'll receive bids on this item</p>
                      {/* <Form.Control
                          aria-label="Username"
                          className="input-style flex-1"
                          placeholder="Enter the price per one bid"
                          onChange={(e) => handleChange(e, 'salePrice')}
                          required
                        /> */}
                      <Form.Control
                        aria-label="Username"
                        type="text"
                        className="input-style flex-1"
                        placeholder="Enter the price per one bid"
                        onChange={(e) => handleChange(e, 'salePrice')}
                        isInvalid={!!salevalidationError}
                        feedback={salevalidationError}
                        maxLength={13}
                        required
                      />
                      <Form.Control.Feedback type="invalid">Please provide valid Sale Price.</Form.Control.Feedback>
                    </>
                  )}
                </div>
                <div className="mb-4 sale-switch">
                  <Form.Check
                    className="labl-space"
                    type="switch"
                    id="custom-switch"
                    label="Put on auction "
                    onClick={(e) => handleToggle(e, 'isPutonAuction')}
                  />
                  {showAuctionFields && (
                    <>
                      {' '}
                      <p className="note-text">You'll receive bids on this item</p>
                      <Form.Control
                        aria-label="Username"
                        type="text"
                        className="input-style flex-1"
                        placeholder="Enter the price per one bid"
                        onChange={(e) => handleChange(e, 'auctionPrice')}
                        isInvalid={!!auctionValidationError}
                        feedback={auctionValidationError}
                        maxLength={13}
                        required
                      />
                      <Form.Control.Feedback type="invalid">Please provide valid Auction Price.</Form.Control.Feedback>
                    </>
                  )}
                </div>
                <div className="mb-4 sale-switch">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Unlock once purchased"
                    onClick={(e) => handleToggle(e, 'isUnlockPurchased')}
                  />

                  <p className="note-text">Content will be unlocked after successful transaction</p>

                  {/* {showPurchasedFields && (
                <div className="d-flex unlock-input">
                  <Form.Control
                    aria-label="Username"
                    className="input-style flex-1"
                    placeholder="Enter the price per one piece"
                  />
                  <div className="p-relative">
                    <Form.Select aria-label="Default select example" className="form-select select-coin">
                      <option>WETH</option>
                      <option value="1">WETH</option>
                    </Form.Select>
                    <span className="icon select-arrow"></span>
                  </div>
                </div>
              )} */}
                </div>
                {/* <div className="mb-4 sale-switch">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Unlock once purchased"
                onClick={(e) => handleToggle(e, 'purchasedDes')}
              />
              <p className="note-text">Content will be unlocked after successful transaction</p>
              {showDescriptionFields && (
                <Form.Control
                  aria-label="Username"
                  className="input-full-width input-style"
                  placeholder="Enter Unlock Description"
                />
              )}
            </div> */}
                {/* <div className="check-box mb-4">
              <h4 className="mb-2">Choose Collection</h4>
              <div className="d-flex align-center">
                <div className="d-flex align-center">
                 
                  <Form.Check
                    inline
                    label="ERC-1155"
                    name="collection"
                    type="checkbox"
                    value="ERC-1155"
                    onChange={(e) => handleChange(e, 'collectionType')}
                  />
                </div>
                <div className="d-flex align-center ms-5">
                  
                  <Form.Check
                    inline
                    label="NFT"
                    name="collection"
                    type="checkbox"
                    value="NFT"
                    onChange={(e) => handleChange(e, 'collectionType')}
                  />
                </div>
              </div>
            </div> */}
                <div className="text-end mt-4">
                  <Button className="custom-btn active" type="submit">
                    <span>{loader && <Spinner size="sm" />} </span>Create
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
        <Modal show={show} onHide={handleClose} className="wallet-popup checkout-modal properties-modal">
          <Modal.Header className="p-0">
            <span></span>
            <span className="icon md close-icon c-pointer" onClick={handleClose}></span>
          </Modal.Header>
          <Modal.Body>
            <h2 className="section-title text-center mt-0">Add Properties </h2>
            <div>
              {propertiesFields?.map((field, index) => (
                <Form.Group key={index} className="d-flex mb-4">
                  <div className="me-lg-2 me-2">
                    <Form.Label className="input-label">Key</Form.Label>
                    <Form.Control
                      type="text"
                      className="input-style"
                      value={field.trait_type}
                      placeholder="Key"
                      maxLength={13}
                      onChange={(event) => handleFieldChange(index, event, 'avathar')}
                    />
                  </div>
                  {'  '}
                  <div className="">
                    <Form.Label className="input-label">Value</Form.Label>
                    <Form.Control
                      type="text"
                      className="input-style"
                      value={field.value}
                      placeholder="Value"
                      maxLength={13}
                      onChange={(event) => handleFieldChange(index, event, 'avatharValue')}
                    />
                  </div>
                  <div className="pop-delete-mt">
                    <span className="icon delete ms-2 c-pointer" onClick={() => handleRemoveFields(index)}></span>
                  </div>
                </Form.Group>
              ))}
            </div>
            <div className="banner-btns nft-props justify-content-md-end justify-content-start">
              <Button onClick={handleAddField} className="custom-btn  me-lg-2">
                Add more
              </Button>
              <Button onClick={handleSaveAddField} className="custom-btn">
                Save
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <Confirmations {...confirmations} />
      </div>
    </>
  );
}
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(CreateMultiple);
