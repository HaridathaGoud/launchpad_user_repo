import React from 'react';
import { Row, Col, Form, Container, InputGroup, Alert, Button } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import { get, post,getCustomer } from '../../utils/api';
import Image from 'react-bootstrap/Image';
import apiUploadPost from '../../utils/apiUploadPost';
import {useNavigate, useParams} from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { setUserID } from '../../reducer/rootReducer';
import { useAccount } from 'wagmi';
import { store } from '../../store';
import { connect } from 'react-redux';
import { useCollectionDeployer } from '../../utils/useCollectionDeployer';
import { ethers } from 'ethers';
import error from '../../assets/images/error.svg';
import validSuccess from '../../assets/images/success.png';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
function CreateCollection(props: any) {
  const router = useNavigate();
  const { token } = useParams();
  const profileRef = useRef<HTMLInputElement>(null);
  const bannarRef = useRef<HTMLInputElement>(null);
  const featureRef = useRef<HTMLInputElement>(null);
  const [catgeryLu, setCatogeryLu] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loader, setLoader] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [validated, setValidated] = useState(false);
  const [picLoader,setPicLoader]=useState(false);
  const [collectionType, setCollectionType] = useState<any>();
  const [featurePicLoader,setFeaturePicLoader]=useState(false);
  const [bannarpicLoader,setBannerPicLoader]=useState(false);
  const [nameError,setNameError]=useState(null);
  const [descriptionError,setDescriptionError]=useState(null);
  const [success, setSuccess] = useState(null);
  const [scuess, setSucess] = useState(false);
  const [checkCollection,setCheckCollection]=useState(false)
  const [profile, setProfile] = useState({
    collectionName: '',
    description: '',
    category: '',
    blockchain: '',
    logo: '',
    bannerImage: '',
    featuredImage: '',
    customerId: '',
    status: '',
    id: ' 00000000-0000-0000-0000-000000000000',
    web_url: '',
    fb_url: '',
    tele_url: '',
    lin_url:'',
    urls: '',
  });
  const { createonChainErc721Collection, createonChainErc1155Collection } = useCollectionDeployer();
  const { address } = useAccount();

  const getCustomerDetails = async () => {
    setLoader(true);
    let response = await getCustomer(`User/CustomerDetails/${address}`);
    if (response) {
      setCustomerDetails(response.data);
      store.dispatch(setUserID(response.data));
      setLoader(false);
    } else {
      setErrorMsg(isErrorDispaly(response));
    }
  };

  const handleChange = (e: any, key: any) => {
    const value = e.target.value;
    const reg = /<(.|\n)*?>/g;
    const emojiRejex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\u2010-\u2017])/g;
    // const containsHTMLTags = /<\/?[a-z][\s\S]*>/i.test(value);
    // const containsEmoji = /[\u{1F300}-\u{1F6FF}]/u.test(value);
    // const containsNonAlphabetic = !/^[\p{L} ]+$/u.test(value);
    const containsHTMLTags = /<\/?[a-z][\s\S]*>/i.test(value);
    const containsEmoji = /[\u{1F300}-\u{1F6FF}]/u.test(value);
    const containsNonAlphabetic = !/^[\p{L} ,.;]+$/u.test(value);
    if (key == "collectionName") {
      getCollectioncheck(e)
      if(containsHTMLTags || containsEmoji || containsNonAlphabetic){
        setCheckCollection(false)
      setNameError('Please enter valid content');
      }else{
        setCheckCollection(false)
        setNameError(null)
      }
  }
 else if (key == "description") {
  if (value &&(reg.test(value) || value.match(emojiRejex))) {
      setDescriptionError('Please enter valid content');
    }else{
      setDescriptionError(null)
    }
}
//  else if (key == "urls") {
//   if (value &&(reg.test(value) || value.match(emojiRejex))) {
//     setUrlError('Please enter valid content');
//   }else{
//     setUrlError(null)
//   }
// }
    let _obj: any = { ...profile };
    _obj[key] = value;
    setProfile(_obj);
  };

  useEffect(() => {
    setCollectionType(token);
    if (props.auth.selectedCollection) {
      getEditedCollection();
    }
    getCatogeryLu();
    getCustomerDetails();
  }, []);

  const getEditedCollection = () => {
    let data = props.auth.selectedCollection;
    setProfile(data);
  };
  const getCatogeryLu = async () => {
    let res = await get(`User/CategoriesLU`);
    if (res) {
      setCatogeryLu(res.data);
    } else {
      setErrorMsg(isErrorDispaly(res));
    }
  };
  const getCollectioncheck = async (e : any) => {
    let name = e.target.value
    let res = await get(`User/iscollectionexist/${name}/${customerDetails?.id}`);
    if (res) {
      setCheckCollection(res.data);    
    } else {
      setErrorMsg(isErrorDispaly(res));
    }
  };
  const isErrorDispaly = (objValue: any) => {
    if (objValue.data && typeof objValue.data === 'string'||objValue?.reason||objValue.response.data) {
      return objValue.data || objValue?.reason || objValue.response?.data?.title;
    } else if (objValue.originalError && typeof objValue.originalError.message === 'string') {
      return objValue.originalError.message;
    } else {
      window.scroll({
        top: 150,
        left: 100,
        behavior: 'smooth',
      });
      return 'Something went wrong please try again!';
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    const form = e.currentTarget;
    let obj = {
      collectionName: profile.collectionName,
      description: profile.description,
      category: profile.category,
      blockchain: 'WMATIC',
      logo: profile.logo,
      bannerImage: profile.bannerImage,
      featuredImage: profile.featuredImage,
      customerId: customerDetails?.id,
      status: '',
      id: ' 00000000-0000-0000-0000-000000000000',
      urls: profile.urls,
      websiteUrl: profile.web_url,
      facebook: profile.fb_url,
      twitter: profile.tele_url,
      linkedIn:profile.lin_url,
      collectionType: collectionType,
    };
    if(checkCollection){
      setLoader(false);
      setNameError('Collection name already exsits');
    }else{
      if(nameError==null && descriptionError==null){
    if (form.checkValidity() === true) {
      if (token == 'ERC-721') {
        createonChainErc721Collection(
          obj.collectionName,
          `ART_${obj.collectionName.slice(0, 3).toUpperCase()}`,
          'https://ybsmarketplace.vercel.app',
        )
          .then(async (collectionRes) => {
            const provider = new ethers.providers.Web3Provider(window?.ethereum);
            provider.waitForTransaction(collectionRes.hash).then(async (receipt) => {
              obj["contractAddress"] = receipt.logs[0].address;
              let response = await post(`User/SaveCollection`, obj);
              if (response) {
                setLoader(false);
                setSucess(true)
                setSuccess("Collection has been successfully created")
                 setTimeout(() => {
                  setSucess(false)
                  router('/mycollections');
                }, 2000);
              } else {
                setErrorMsg(isErrorDispaly(response));
                setLoader(false);
                window.scroll({
                  top: 150,
                  left: 100,
                  behavior: 'smooth',
                });
              }
            })
            .catch((error) => {
              setLoader(false);
              setErrorMsg(isErrorDispaly(error));
            });
          })
          .catch((error) => {
            setLoader(false);
            window.scroll({
              top: 150,
              left: 100,
              behavior: 'smooth',
            });
            setErrorMsg(isErrorDispaly(error));
          });
      } else if (token == 'ERC-1155') {
        createonChainErc1155Collection(
          obj.collectionName,
          `ART_${obj.collectionName.slice(0, 3).toUpperCase()}`,
          'https://ybsmarketplace.vercel.app',
        )
          .then(async (collectionRes) => {
            const provider = new ethers.providers.Web3Provider(window?.ethereum);
            provider.waitForTransaction(collectionRes.hash).then(async (receipt) => {
              obj["contractAddress"] = receipt.logs[0].address;
              let response = await post(`User/SaveCollection`, obj);
              if (response) {  
                setLoader(false);
                setSucess(true)
                setSuccess("Collection has been successfully created")
                 setTimeout(() => {
                  setSucess(false)
                  router('/mycollections');
                }, 2000);
              } else {
                setErrorMsg(isErrorDispaly(response));
                setLoader(false);
                window.scroll({
                  top: 150,
                  left: 100,
                  behavior: 'smooth',
                });
              }
            });
            // .catch((error) => {
            //   setLoader(false);
            //   setErrorMsg(isErrorDispaly(error));
            // });
          })
          .catch((error) => {
            setLoader(false);
            setErrorMsg(isErrorDispaly(error));
          });
      }
    } else {
      setValidated(true);
      setLoader(false);
      window.scroll({
        top: 150,
        left: 100,
        behavior: 'smooth',
      });
    }}else{
      setLoader(false);
    }
  }
  };
  const handlePicChange = (e: any, type: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadToServer(file, type);
    }
  };
  const uploadToServer = async (file: any, type: any) => {
    setPicLoader(type=="profile" && true)
    setFeaturePicLoader(type=="feature" && true)
    setBannerPicLoader(type=="bannar" && true)
    const body: any = new FormData();
    let fileType = {
      'image/png': true,
      'image/jpg': true,
      'image/jpeg': true,
      'image/PNG': true,
      'image/JPG': true,
      'image/JPEG': true,
    };
    body.append('file', file);
    if (fileType[file.type]) {
    apiUploadPost(`/Upload/UploadFileNew`, body)
      .then((res) => res)
      .then((data) => {
        setPicLoader(false)
        setErrorMsg(null)
        setFeaturePicLoader(false)
        setBannerPicLoader(type=="bannar" && true)
        let _obj = { ...profile };
        if (type == 'profile') {
          _obj.logo = data[0];
        } else if (type == 'bannar') {
          _obj.bannerImage = data[0];
        } else if (type == 'feature') {
          _obj.featuredImage = data[0];
        }
        setProfile(_obj);
      })
      .catch((error) => {
        setPicLoader(false);
        setFeaturePicLoader(false)
        setBannerPicLoader(false);
        setErrorMsg(isErrorDispaly(error));
        window.scroll(0,0)
      });
    }
    else {
      setPicLoader(false)
      setFeaturePicLoader(false)
      setBannerPicLoader(false)
      setErrorMsg('File is not allowed. You can upload jpg, png, jpeg files');
      window.scroll(0,0)
    }
  };
  const handleBack = () => {
    router('/mycollections');
  };
  return (
    <>
      <div>
        <Container>
          <div className="d-flex align-items-center mb-2">
            <span className="icon back-arrow me-2 me-lg-4 c-pointer mt-lg-2" onClick={handleBack}></span>{' '}
            <div>
            <h1 className="section-title">Create collection</h1>
            <hr className='create-collection-hr' />
            </div>
          </div>
          {errorMsg && (
            // <Alert variant="danger">
            //   <Image className='validation-error' src={validError} />
            //   <span>{errorMsg}</span>
            // </Alert>
            <div className='cust-error-bg'>
              <div className='cust-crd-mr'><Image src={error} alt="" /></div>
              <div>
                <p className='error-title error-red'>Error</p>
                <p className="error-desc">{errorMsg}</p></div>
            </div>
          )}
          <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)} className="create-collections">
            <section className="banner-img-upload upload-doc-style doc-style upload-creation">
              <div>
                <div>
                  <div className="upload-image upload-doc-style doc-style your-logo">
                    <Form.Group>
                    <span>{picLoader && <Spinner size="sm" />} </span>
                      {profile.logo && (<>
                        <Image
                          src={profile?.logo}
                          width="250"
                          height="250"
                          alt=""
                          className="create-profile-image coll-image "
                        /></>
                      )}
                      {!profile.logo && (
                        <>
                          <div >
                            <span className="icon upload-image-icon c-pointer" onClick={() => profileRef.current?.click("p")}></span>
                            <p className="c-pointer"  onClick={() => profileRef.current?.click("p")}>
                              Your Logo <br />
                            </p>
                            <p className="image-note-text">
                              Note: <span>For best view upload 250X250</span>
                            </p>
                            <Form.Control
                              className="d-none btn c-pointer"
                              required
                              type="file"
                              ref={profileRef}
                              onChange={(e) => handlePicChange(e, 'profile')}
                            />{' '}
                            <Form.Control.Feedback type="invalid" className="mb-validation ">
                              Please provide a valid profile image.
                            </Form.Control.Feedback>
                          </div>
                        </>
                      )}
                      <div className="text-lg-center profile-icons cust-pf-icons">
                        <input
                          type="file"
                          name="myImage"
                          className="icon camera  cam-transform"
                          onChange={(e) => handlePicChange(e, 'profile')}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="banner-upload">
                  <Form.Group>
                    {profile.bannerImage && (
                      <Image
                        src={profile?.bannerImage}
                        width="1000"
                        height="350"
                        alt=""
                        className="create-banner-image collect-bnner"
                      />
                    )}
                    {!profile.bannerImage && (
                      <>
                        <div className="banner-placeholder">
                          <span
                            className="icon upload-image-icon c-pointer"
                            onClick={() => bannarRef.current?.click()}
                          ></span>
                           <span>{bannarpicLoader && <Spinner size="sm" />} </span>
                          <Form.Control
                            className="d-none btn"
                            type="file"
                            required
                            ref={bannarRef}
                            onChange={(e) => handlePicChange(e, 'bannar')}
                          />
                          <p onClick={() => bannarRef.current?.click()} className="c-pointer">
                            Upload Banner
                            <br />
                          </p>
                          <p className="image-note-text">
                            Note: <span>For best view upload 1100X350</span>
                          </p>
                          <Form.Control.Feedback type="invalid">
                            Please provide a valid banner image.
                          </Form.Control.Feedback>
                        </div>
                      </>
                    )}
                    <div className="text-lg-center profile-icons cust-pf-icons">
                      <input
                        type="file"
                        name="myImage"
                        className="icon camera"
                        onChange={(e) => handlePicChange(e, 'bannar')}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
            </section>
            <section className="featured-sec create-collect">
              <Row className="">
                <Col lg={5} sm={12}>
                  <div className="featured-image upload-doc-style doc-style left-creation-upload">
                    <Form.Group>
                      {profile.featuredImage && (
                        <Image
                          src={profile?.featuredImage}
                          width="350"
                          height="450"
                          alt=""
                          className="create-feature-image"
                        />
                      )}
                      {!profile.featuredImage && (
                        <>
                          <div className="" >
                            <span className="icon upload-image-icon c-pointer" onClick={() => featureRef.current?.click()}></span>
                            <span>{featurePicLoader && <Spinner size="sm" />} </span>
                            <Form.Control
                              className="d-none btn"
                              type="file"
                              required
                              ref={featureRef}
                              onChange={(e) => handlePicChange(e, 'feature')}
                            />
                            <p className="c-pointer" onClick={() => featureRef.current?.click()}>
                              Featured image
                              <br />
                            </p>
                            <p className="image-note-text">
                              Note: <span>For best view upload 550X450</span>
                            </p>
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid feature image.
                            </Form.Control.Feedback>
                          </div>
                        </>
                      )}
                      <div className="text-lg-center profile-icons cust-pf-icons">
                        <input
                          type="file"
                          name="myImage"
                          className="icon camera"
                          onChange={(e) => handlePicChange(e, 'feature')}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </Col>
                <Col lg={7} sm={12}>
                  <div className="collection-wrap">
                    <Form.Group className="mb-3" controlId="formPlaintextEmail">
                      <Form.Label className="input-label">Name*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        className="profile-input input-style"
                        required
                        value={profile.collectionName}
                        isInvalid={!!nameError}
                        feedback={nameError}
                        maxLength={200}
                        onChange={(e) => handleChange(e, 'collectionName')}
                      />
                      {<Form.Control.Feedback type="invalid">{`${checkCollection && "Collection name already exists" || "Please provide a valid name."}`}</Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPlaintextEmail">
                      <Form.Label className="input-label">Description*</Form.Label>
                      {/* <p className="note-text">Markdown syntax is supported. 0 of 1000 characters used</p> */}
                      <Form.Control
                        as="textarea"
                        placeholder="Description"
                        rows={5}
                        className="profile-input input-style"
                        value={profile.description}
                        required
                        isInvalid={!!descriptionError}
                        feedback={descriptionError}
                        maxLength={500}
                        onChange={(e) => handleChange(e, 'description')}
                      />
                      <Form.Control.Feedback type="invalid">Please provide a valid description.</Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formPlaintextEmail">
                      <Form.Label className="input-label">URLs</Form.Label>
                      <p className="note-text">
                        Customize your URL on OpenSea. Must only contain lowercase letters, numbers, and hyphens.
                      </p>
                      <Form.Control
                        type="text"
                        placeholder="Example : Treasures of the sea"
                        className="profile-input input-style"
                        onChange={(e) => handleChange(e, 'urls')}
                      />
                    </Form.Group> */}
                    <Form.Group className="mb-3 p-relative" controlId="formPlaintextEmail">
                      <Form.Label className="input-label">Category*</Form.Label>
                      <p className="note-text">Make your items more discoverable on Minnapad by adding category.</p>
                      <Form.Select
                        aria-label="Default select example"
                        className="form-select select-coin select-category c-pointer"
                        value={profile.category}
                        onChange={(e) => handleChange(e, 'category')}
                        required
                      >
                        <option value="">Select Category</option>
                        {catgeryLu.map((item) => (
                          <option value={item.id}>{item.name}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">Please select category.</Form.Control.Feedback>

                      <span className="icon select-arrow arrow-collect createcol-arrow c-pointer" onChange={(e) => handleChange(e, 'category')}></span>
                    </Form.Group>
                   
                    <Form.Group className="mb-3 p-relative smm-links" controlId="formPlaintextEmail">
                      <Form.Label className="input-label">Links</Form.Label>
                      <InputGroup className="mb-3 input-group-style">
                        <InputGroup.Text id="basic-addon3" className="input-style links-input collect-icons">
                          <span className="icon globe"></span>
                        </InputGroup.Text>
                        <Form.Control
                          id="web-url"
                          placeholder="Your site.io"
                          aria-describedby="basic-addon3"
                          className="input-style links-input"
                          onChange={(e) => handleChange(e, 'web_url')}
                          maxLength={100}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3 input-group-style">
                        <InputGroup.Text id="basic-addon3" className="input-style links-input collect-icons">
                          <span className="icon icon-fb"></span>
                        </InputGroup.Text>
                        <Form.Control
                          id="icon-fb"
                          placeholder="https://"
                          aria-describedby="basic-addon3"
                          className="input-style links-input"
                          onChange={(e) => handleChange(e, 'fb_url')}
                          maxLength={100}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3 input-group-style">
                        <InputGroup.Text id="basic-addon3" className="input-style links-input collect-icons">
                          <span className="icon icon-twitter"></span>
                        </InputGroup.Text>
                        <Form.Control
                          id="icon-twitter"
                          placeholder="https://"
                          aria-describedby="basic-addon3"
                          className="input-style links-input"
                          onChange={(e) => handleChange(e, 'tele_url')}
                          maxLength={100}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3 input-group-style">
                        <InputGroup.Text id="basic-addon3" className="input-style links-input collect-icons">
                          <span className="icon icon-linkedIn"></span>
                        </InputGroup.Text>
                        <Form.Control
                          id="icon-linkedIn"
                          placeholder="https://"
                          aria-describedby="basic-addon3"
                          className="input-style links-input"
                          onChange={(e) => handleChange(e, 'lin_url')}
                          maxLength={100}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="text-end mt-4">
                      <Button className="custom-btn " type="submit" disabled={loader}>
                        <span>{loader && <Spinner size="sm" />} </span>Create
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>
          </Form>
        </Container>
      </div>
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
}
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(CreateCollection);
