import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { connect } from 'react-redux';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import BreadCrumb from '../../../ui/breadcrumb';
import Button from '../../../ui/Button';
import { store } from "../../../store";
import { formReducer, formState } from './reducer';
import Spinner from '../../loaders/spinner';
import { apiUploadPost, getMarketplace, post, } from '../../../utils/api';
import { useCollectionDeployer } from '../../../utils/useCollectionDeployer';
import { useParams } from 'react-router-dom';

const CreateCollection = (props: any) => {
  const { token } = useParams();
  const user = store.getState().auth;
  const [localState, localDispatch] = useReducer(formReducer, formState)
  const profileRef = useRef<HTMLInputElement>(null);
  const bannarRef = useRef<HTMLInputElement>(null);
  const featureRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const getLookups = async () => {
      const categoriesPromise = await getCategories();
      const networksPromise = await getNetworks();
      const [categories, networks] = await Promise.all([categoriesPromise, networksPromise]);

      if (categories.status === 200 && networks.status === 200) {
        let _obj = { ...localState.lookups };
        _obj.collections = categories.data;
        _obj.networks = networks.data;
        localDispatch({ type: 'setLookups', payload: _obj });
      }
    }

    getLookups();
  }, []);
  const getCategories = async () => {
    try {
      const response = await getMarketplace(`User/CategoriesLU`);
      if (response.status === 200) {
        return response;
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error) {
      return { status: 500, data: [], error: error.message };
    }
  };

  const getNetworks = async () => {
    try {
      const response = await getMarketplace(`User/networkslu`);
      if (response.status === 200) {
        return response;
      } else {
        throw new Error('Failed to fetch networks');
      }
    } catch (error) {
      return { status: 500, data: [], error: error.message };
    }
  };
  const { createonChainErc721Collection, createonChainErc1155Collection } = useCollectionDeployer();
  const { address } = useAccount();



  //   const handleChange = (e: any, key: any) => {
  //     const value = e.target.value;
  //     const reg = /<(.|\n)*?>/g;
  //     const emojiRejex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\u2010-\u2017])/g;
  //     const containsHTMLTags = /<\/?[a-z][\s\S]*>/i.test(value);
  //     const containsEmoji = /[\u{1F300}-\u{1F6FF}]/u.test(value);
  //     const containsNonAlphabetic = !/^[\p{L} ]+$/u.test(value);
  //     const containsHTMLTags = /<\/?[a-z][\s\S]*>/i.test(value);
  //     const containsEmoji = /[\u{1F300}-\u{1F6FF}]/u.test(value);
  //     const containsNonAlphabetic = !/^[\p{L} ,.;]+$/u.test(value);
  //     if (key == "collectionName") {
  //       getCollectioncheck(e)
  //       if(containsHTMLTags || containsEmoji || containsNonAlphabetic){
  //         setCheckCollection(false)
  //       setNameError('Please enter valid content');
  //       }else{
  //         setCheckCollection(false)
  //         setNameError(null)
  //       }
  //   }
  //  else if (key == "description") {
  //   if (value &&(reg.test(value) || value.match(emojiRejex))) {
  //       setDescriptionError('Please enter valid content');
  //     }else{
  //       setDescriptionError(null)
  //     }
  // }
  //  else if (key == "urls") {
  //   if (value &&(reg.test(value) || value.match(emojiRejex))) {
  //     setUrlError('Please enter valid content');
  //   }else{
  //     setUrlError(null)
  //   }
  // }
  //     let _obj: any = { ...profile };
  //     _obj[key] = value;
  //     setProfile(_obj);
  //   };

  //   useEffect(() => {
  //     setCollectionType(token);
  //     if (props.auth.selectedCollection) {
  //       getEditedCollection();
  //     }
  //     getCatogeryLu();
  //     getCustomerDetails();
  //   }, []);

  //   const getEditedCollection = () => {
  //     let data = props.auth.selectedCollection;
  //     setProfile(data);
  //   };
  //   const getCatogeryLu = async () => {
  //     let res = await get(`User/CategoriesLU`);
  //     if (res) {
  //       setCatogeryLu(res.data);
  //     } else {
  //       setErrorMsg(isErrorDispaly(res));
  //     }
  //   };
  //   const getCollectioncheck = async (e : any) => {
  //     let name = e.target.value
  //     let res = await get(`User/iscollectionexist/${name}/${customerDetails?.id}`);
  //     if (res) {
  //       setCheckCollection(res.data);
  //     } else {
  //       setErrorMsg(isErrorDispaly(res));
  //     }
  //   };
  //   const isErrorDispaly = (objValue: any) => {
  //     if (objValue.data && typeof objValue.data === 'string'||objValue?.reason||objValue.response.data) {
  //       return objValue.data || objValue?.reason || objValue.response?.data?.title;
  //     } else if (objValue.originalError && typeof objValue.originalError.message === 'string') {
  //       return objValue.originalError.message;
  //     } else {
  //       window.scroll({
  //         top: 150,
  //         left: 100,
  //         behavior: 'smooth',
  //       });
  //       return 'Something went wrong please try again!';
  //     }
  //   };
  const validateFields = (val) => {
    let isValid = true;
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/u;
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    let errors = {...localState.errors}
            if (!val.logo) {
                errors.logo = "Please provide logo image."
                isValid = false
            }
            else{
              errors.logo = ""
              isValid = true
            }
            if (!val.bannerImage) {
              errors.bannerImage = "Please provide banner image."
              isValid = false
            }
            else{
              errors.bannerImage = ""
              isValid = true
            }
            if (!val.featuredImage) {
              errors.featuredImage = "Please provide feature image."
              isValid = false
            }
            else{
              errors.bannerImage = ""
              isValid = true
            }
            if (!val.collectionName) {
              errors.collectionName = "Please provide Name"
                isValid = false
            }
            else if (emojiRegex.test(val.collectionName)) {
              errors.collectionName = "Name cannot contain emojis.";
              isValid = false;
            } else if (val.collectionName.length > 250) {
              errors.collectionName = "Name cannot exceed 250 characters.";
              isValid = false;
            }
            else{
              errors.collectionName = ""
              isValid = true
            }
            if (!val.description) {
              errors.description = "Please provide Description"
                isValid = false
            }
            else if (emojiRegex.test(val.description)) {
              errors.description = "Description cannot contain emojis.";
              isValid = false;
            } else if (val.description.length > 1000) {
              errors.description = "Description cannot exceed 1000 characters.";
              isValid = false;
            }
            else{
              errors.description = ""
              isValid = true
            }
            if (!val.category) {
              errors.category = "Please select Category"
                isValid = false
            }
            else{
              errors.category = ""
              isValid = true
            }
            if (val.urls && !urlRegex.test(val.urls)) {
              errors.urls = "Please provide a valid URL.";
              isValid = false;
            } else {
              errors.urls= "";
            }
            if (val.websiteUrl && !urlRegex.test(val.websiteUrl)) {
              errors.websiteUrl = "Please provide a valid URL.";
              isValid = false;
            } else {
              errors.websiteUrl= "";
            }
            if (val.linkedIn && !urlRegex.test(val.linkedIn)) {
              errors.linkedIn = "Please provide a valid URL.";
              isValid = false;
            } else {
              errors.linkedIn= "";
            }
            if (val.facebook && !urlRegex.test(val.facebook)) {
              errors.facebook = "Please provide a valid URL.";
              isValid = false;
            } else {
              errors.facebook= "";
            }
            if (val.twitter && !urlRegex.test(val.twitter)) {
              errors.twitter = "Please provide a valid URL.";
              isValid = false;
            } else {
              errors.twitter= "";
            }
        return [isValid, errors]
}
  const handleSubmit = async (e: any) => {
    debugger
    // e.preventDefault();
    // setLoader(true);
    let obj = {
      ...localState.values,
      customerId: user?.user?.id,
      id: '00000000-0000-0000-0000-000000000000'
    };
    const [isValidate, errors] = validateFields(obj);
    if (!isValidate) {
      localDispatch({ type: 'setErrors', payload: errors });
      window.scrollTo(0, 0);
      return;
    } else {
      localDispatch({ type: 'setErrors', payload: {} });
    }

    // if(checkCollection){
    //   setLoader(false);
    //   setNameError('Collection name already exsits');
    // }
    // else{
    //   if(nameError==null && descriptionError==null){
    // if (form.checkValidity() === true) {
    // if (token == 'ERC-721') {
    createonChainErc721Collection(
      obj.collectionName,
      `ART_${obj.collectionName.slice(0, 3).toUpperCase()}`,
      'https://ybdott.azurewebsites.net/',
    )
      .then(async (collectionRes) => {
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        provider.waitForTransaction(collectionRes.hash).then(async (receipt) => {
          obj["contractAddress"] = receipt.logs[0].address;
          let response = await post(`User/SaveCollection`, obj);
          if (response) {
            console.log("success");
          }
          else {
            console.log("failed");
          }
          // if (response) {
          //   setLoader(false);
          //   setSucess(true)
          //   setSuccess("Collection has been successfully created")
          //    setTimeout(() => {
          //     setSucess(false)
          //     router('/mycollections');
          //   }, 2000);
          // } else {
          //   setErrorMsg(isErrorDispaly(response));
          //   setLoader(false);
          //   window.scroll({
          //     top: 150,
          //     left: 100,
          //     behavior: 'smooth',
          //   });
          // }
        })

        window.scroll({
          top: 150,
          left: 100,
          behavior: 'smooth',
        });


      });
    // } else if (token == 'ERC-1155') {
    // createonChainErc1155Collection(
    //   obj.collectionName,
    //   `ART_${obj.collectionName.slice(0, 3).toUpperCase()}`,
    //   'https://ybsmarketplace.vercel.app',
    // )
    //   .then(async (collectionRes) => {
    //     const provider = new ethers.providers.Web3Provider(window?.ethereum);
    //     provider.waitForTransaction(collectionRes.hash).then(async (receipt) => {
    //       obj["contractAddress"] = receipt.logs[0].address;
    //       let response = await post(`User/SaveCollection`, obj);
    //       if (response) {
    //         // setLoader(false);
    //         // setSucess(true)
    //         // setSuccess("Collection has been successfully created")
    //         //  setTimeout(() => {
    //         //   setSucess(false)
    //         //   router('/mycollections');
    //         // }, 2000);
    //       } else {
    //         // setErrorMsg(isErrorDispaly(response));
    //         // setLoader(false);
    //         // window.scroll({
    //         //   top: 150,
    //         //   left: 100,
    //         //   behavior: 'smooth',
    //         // });
    //       }
    //     });
    //     // .catch((error) => {
    //     //   setLoader(false);
    //     //   setErrorMsg(isErrorDispaly(error));
    //     // });
    //   })
    // }
    // } else {
    //   setValidated(true);
    //   setLoader(false);
    //   window.scroll({
    //     top: 150,
    //     left: 100,
    //     behavior: 'smooth',
    //   });
    // }
    // }
    // else{
    //     setLoader(false);
    //   }
    // }
  };
  const handlePicChange = (e: any, type: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadToServer(file, type);
    }
  };
  const uploadToServer = async (file: any, type: any) => {
    let errors = {...localState.errors}
    localDispatch({ type: 'setIsLoading', payload: type });
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
      try {
        let response = await apiUploadPost(`/Upload/UploadFileNew`, body);
        if (response.status === 200) {
          let _obj = { ...localState.values };
          if (type == 'profile') {
            _obj.logo = response.data[0];
          } else if (type == 'bannar') {
            _obj.bannerImage = response.data[0];
          } else if (type == 'feature') {
            _obj.featuredImage = response.data[0];
          }
          localDispatch({ type: 'setValues', payload: _obj })
        } else {
          localDispatch({ type: 'setErrors', payload: response })
        }
      }
      catch (error) {
        localDispatch({ type: 'setErrors', payload: error })
      }
      finally {
        localDispatch({ type: 'setIsLoading', payload: '' });
      }
    }
    else {
      errors.logo = "File is not allowed. You can upload jpg, png, jpeg files."
      localDispatch({ type: 'setIsLoading', payload: '' });
      localDispatch({ type: 'setErrors', payload: errors })
      window.scroll(0, 0)
    }
  };
  const handleChange = (e: any, key: any) => {
    const value = e.target.value;
    let _obj = { ...localState.values };
    _obj[key] = value;
    localDispatch({ type: 'setValues', payload: _obj })
  }
  //   const handleBack = () => {
  //     router('/mycollections');
  //   };

  console.log(localState.lookups)
  return (
    <>
      <div>
        <div className='container mx-auto mt-4 px-3 lg:px-0'>
          <BreadCrumb />
          {/* {errorMsg && (
            <div className='cust-error-bg'>
              <div className='cust-crd-mr'><Image src={error} alt="" /></div>
              <div>
                <p className='error-title error-red'>Error</p>
                <p className="error-desc">{errorMsg}</p></div>
            </div>
          )} */}
          <form className="create-collections">
            <section className="px-9 py-12 h-[350px] border-dashed border border-[#A5A5A5] relative rounded-[28px]">
              <div>
                <div className='z-50 absolute max-sm:bottom-[-100px] md:relative'>
                  <div className=" flex justify-center items-center text-center p-4 border-dashed border border-[#A5A5A5] relative rounded-[28px] h-[250px] w-[250px]">
                    <div>
                      <span>{localState.isLoading === 'profile' && <Spinner size="sm" />} </span>
                      {localState.values.logo && (
                        <img
                          src={localState.values.logo}
                          width="250"
                          height="250"
                          alt=""
                          className="rounded-[28px]"
                        />
                      )}
                      {!localState.values.logo && (
                        <div >
                          <Button type='plain' btnClassName="icon image-upload c-pointer" handleClick={() => profileRef.current?.click("p")}></Button>
                          <Button type='plain' btnClassName="text-base text-secondary font-normal cursor-pointer mt-5" handleClick={() => profileRef.current?.click("p")}>  Your Logo </Button>
                          <p className="text-base text-secondary font-normal">  250 X 250  </p>
                          {localState.errors.logo && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.logo}</span>}
                          <input
                            className="hidden cursor-pointer"
                            required
                            type="file"
                            ref={profileRef}
                            onChange={(e) => handlePicChange(e, 'profile')}
                          />{' '}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="lg:w-[1000px]">
                  <div>
                    {localState.values.bannerImage && (
                      <img
                        src={localState.values.bannerImage}
                        width="1000"
                        height="350"
                        alt=""
                        className="object-cover absolute top-0 left-0 h-full w-full rounded-[28px]"
                      />
                    )}
                    {!localState.values.bannerImage && (
                      <div className="text-center absolute top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2" >
                        <Button type='plain' btnClassName="icon image-upload cursor-pointer" handleClick={() => bannarRef.current?.click()}></Button>
                        <span>{localState.isLoading === 'bannar' && <Spinner size="sm" />} </span>
                        <input
                          className="hidden"
                          type="file"
                          required
                          ref={bannarRef}
                          onChange={(e) => handlePicChange(e, 'bannar')}
                        />
                        <Button type='plain' btnClassName="text-base text-secondary font-normal cursor-pointer mt-5" handleClick={() => bannarRef.current?.click()}>  Upload Banner </Button>
                        <p className="text-base text-secondary font-normal">1100 X 350</p>
                        {localState.errors.bannerImage && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.bannerImage}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-36 md:mt-9">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-center items-center text-center p-4 border-dashed border border-[#A5A5A5] relative rounded-[28px] h-[500px]">
                    <div>
                      {localState.values.featuredImage && (
                        <img
                          src={localState.values?.featuredImage}
                          width="350"
                          height="450"
                          alt=""
                          className=""
                        />
                      )}
                      {!localState.values.featuredImage && (
                        <div className="" >
                          <Button type='plain' btnClassName="icon image-upload cursor-pointer" handleClick={() => featureRef.current?.click()}></Button>
                          <span>{localState.isLoading === 'feature' && <Spinner size="sm" />} </span>
                          <input
                            className="hidden"
                            type="file"
                            required
                            ref={featureRef}
                            onChange={(e) => handlePicChange(e, 'feature')}
                          />
                          <Button type='plain' btnClassName="text-base text-secondary font-normal cursor-pointer mt-5" handleClick={() => featureRef.current?.click()}> Featured image </Button>
                          <p className="text-base text-secondary font-normal">550X450</p>
                          {localState.errors.featuredImage && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.featuredImage}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div >
                    <div className="mb-6">
                      <label className="text-dark text-sm font-normal p-0 mb-2 label block">Name<span className='text-[#ff0000]'>*</span></label>
                      <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                        required
                        value={localState.values.collectionName}
                        // isInvalid={!!nameError}
                        // feedback={nameError}
                        maxLength={200}
                        onChange={(e) => handleChange(e, 'collectionName')}
                      />
                      {localState.errors.collectionName && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.collectionName}</span>}
                    </div>
                    <div className="mb-6">
                      <label className="text-dark text-sm font-normal p-0 mb-2 label block">Description<span className='text-[#ff0000]'>*</span></label>
                      <p className="text-secondary opacity-60 mb-2 text-sm">Markdown syntax is supported. 0 of 1000 characters used</p>
                      <textarea
                        as="textarea"
                        placeholder="Description"
                        className="textarea textarea-bordered w-full resize-none leading-4 rounded-[28px] pl-5 pt-3 focus:outline-none"
                        rows={5}
                        value={localState.values.description}
                        required
                        // isInvalid={!!descriptionError}
                        // feedback={descriptionError}
                        maxLength={500}
                        onChange={(e) => handleChange(e, 'description')}
                      />
                  {localState.errors.description && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.description}</span>}
                    </div>
                    <div className="mb-6">
                      <label className="text-dark text-sm font-normal p-0 mb-2 label block">URLs</label>
                      <p className="text-secondary opacity-60 mb-2 text-sm">
                        Customize your URL on OpenSea. Must only contain lowercase letters, numbers, and hyphens.
                      </p>
                      <input
                        type="text"
                        value={localState.values.urls}
                        placeholder="Example : Treasures of the sea"
                        className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                        onChange={(e) => handleChange(e, 'urls')}
                      />
                       {localState.errors.urls && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.urls}</span>}
                    </div>
                    <div className="mb-6" >
                      <label className="text-dark text-sm font-normal p-0 mb-2 label block">Category and tags <span className='text-[#ff0000]'>*</span></label>
                      <p className="text-secondary opacity-60 mb-2 text-sm">Make your items more discoverable on Minnapad by adding category.</p>
                      <select
                        aria-label="Default select example"
                        className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10 cursor-pointer"
                        value={localState.values.category}
                        onChange={(e) => handleChange(e, 'category')}
                        required
                      >
                        <option value="">Select Category</option>
                        {localState.lookups?.collections?.map((item) => (
                          <option value={item.imageUrl}>{item.name}</option>
                        ))}
                        </select>
                   {localState.errors.category && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.category}</span>}
                    </div>

                    <div className="mb-6" >
                      <label className="text-dark text-sm font-normal p-0 mb-2 label block">Network</label>
                      <p className="text-secondary opacity-60 mb-2 text-sm">Select the blockchain where you'd like new items from this collection to be added by default.</p>
                      <select
                        aria-label="Default select example"
                        className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10 cursor-pointer"
                        value={localState.values.blockChain}
                        onChange={(e) => handleChange(e, 'blockChain')}
                        required
                      >
                        <option value="">Select</option>
                        {localState.lookups?.networks.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-6" >
                      <label className="text-dark text-sm font-normal p-0 mb-2 label block">Payment tokens</label>
                    </div>
                    <div className="mb-6">
                      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                        <div className='flex gap-[14px] bg-base-300 p-[6px] rounded-[28px] border border-[#A5A5A5]'>
                          <span className='matic-purple icon'></span>
                          <div>
                            <p className='text-base font-bold'>Matic</p>
                            <p className='text-xs font-light'>Matic</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6 relative" >
                      <label className="text-dark text-sm font-normal p-0 mb-2 label block">Links</label>
                      <div className="mb-6 relative">
                        <div className='border-r border-[#6D6871] pr-4 absolute left-2 top-[6px]'>
                          <span className="icon globe-icon "></span>
                        </div>
                        <input
                          id="web-url"
                          placeholder="Your site.io"
                          aria-describedby="basic-addon3"
                          className="input pl-16 input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none h-10"
                          onChange={(e) => handleChange(e, 'websiteUrl')}
                          maxLength={100}
                        />
                          {localState.errors.websiteUrl && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.websiteUrl}</span>}
                      </div>
                      <div className="mb-6 relative">
                        <div className='border-r border-[#6D6871] pr-4 absolute left-2 top-[6px]'>
                          <span className="icon icon-fb"></span>
                        </div>
                        <input
                          id="icon-fb"
                          placeholder="https://"
                          aria-describedby="basic-addon3"
                          className="input pl-16 input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none h-10"
                          onChange={(e) => handleChange(e, 'facebook')}
                          maxLength={100}
                        />
                           {localState.errors.facebook && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.facebook}</span>}
                      </div>
                      <div className="mb-6 relative">
                        <div className='border-r border-[#6D6871] pr-4 absolute left-2 top-[6px]'>
                          <span className="icon icon-twitter"></span>
                        </div>
                        <input
                          id="icon-twitter"
                          placeholder="https://"
                          aria-describedby="basic-addon3"
                          className="input pl-16 input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none h-10"
                          onChange={(e) => handleChange(e, 'twitter')}
                          maxLength={100}
                        />
                            {localState.errors.twitter && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.twitter}</span>}
                      </div>
                      <div className="mb-6 relative">
                        <div className='border-r border-[#6D6871] pr-4 absolute left-2 top-[6px]'>
                          <span className="icon icon-linkedIn"></span>
                        </div>
                        <input
                          id="icon-linkedIn"
                          placeholder="https://"
                          aria-describedby="basic-addon3"
                          className="input pl-16 input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none h-10"
                          onChange={(e) => handleChange(e, 'linkedIn')}
                          maxLength={100}
                        />
                            {localState.errors.linkedIn && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.linkedIn}</span>}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-4 items-center">
                      <Button btnClassName='min-w-[128px] h-[48px]' type="cancel" >
                        <span>{localState.isLoading === 'cancel' && <Spinner size="sm" />} </span>Cancel
                      </Button>
                      <Button btnClassName='min-w-[128px]' type="primary" handleClick={(e) => handleSubmit(e)}>
                        <span>{localState.isLoading === 'save' && <Spinner size="sm" />} </span>Create
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
      <div className='p-absolute toaster-center'>
        <ToastContainer className="p-3 cust-nametoster position-fixed bottom-0" >
          {/* <Toast show={scuess} className="text-center toster-component"> */}
          <Toast.Body className="toaster-cust">
            {/* <Image src={validSuccess} className='svalidation-error' /> <span>{success}</span>  */}
          </Toast.Body>
          {/* </Toast> */}
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


