import React, { useEffect, useReducer, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import BreadCrumb from '../../../ui/breadcrumb';
import Button from '../../../ui/Button';
import { store } from "../../../store";
import { formReducer, formState } from './reducer';
import Spinner from '../../loaders/spinner';
import { apiUploadPost, getMarketplace, postMarketplace } from '../../../utils/api';
import { isErrorDispaly } from '../../../utils/errorHandling';
import { useCollectionDeployer } from '../../../utils/useCollectionDeployer';
import { useNavigate, useParams } from 'react-router-dom';
import { guid } from "../../../utils/constants";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import { validationRules, urlRegex, emojiRegex } from './service';
import { ethers } from "ethers/lib";
import CustomSelect from '../createnft.component/customSelect';
const CreateCollection = (props: any) => {
    const { token } = useParams();
    const rootDispatch = useDispatch();
    const router = useNavigate();
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
            if (categories && categories.status === 200 && networks && networks.status === 200) {
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
                rootDispatch(setError({ message: response }));
            }
        } catch (error) {
            rootDispatch(setError({ message: error }));
        }
    };

    const getNetworks = async () => {
        try {
            const response = await getMarketplace(`User/networkslu`);
            if (response.status === 200) {
                return response;
            } else {
                rootDispatch(setError({ message: response }));
            }
        } catch (error) {
            rootDispatch(setError({ message: error }));
        }
    };
    const { createonChainErc721Collection, createonChainErc1155Collection } = useCollectionDeployer();

    const validateFields = (val) => {
        let isValid = true;
        const urlFields = ['urls', 'websiteUrl', 'linkedIn', 'facebook', 'twitter'];
        urlFields.forEach(field => {
            validationRules[field] = {
                required: false,
                validateContent: (value) => value && !urlRegex.test(value),
                validateNoEmojis: (value) => value && emojiRegex.test(value),
                contentErrorMsg: "Please provide a valid URL.",
                emojiErrorMsg: "Please enter valid content.",
            };
        });

        let errors = { ...localState.errors };
        Object.keys(validationRules).forEach(field => {
            const rule = validationRules[field];
            if (rule.required && !val[field]) {
                errors[field] = rule.errorMsg;
                isValid = false;
            } else if (rule.validateContent && rule.validateContent(val[field])) {
                errors[field] = rule.contentErrorMsg;
                isValid = false;
            } else if (rule.validateNoEmojis && rule.validateNoEmojis(val[field])) {
                errors[field] = rule.emojiErrorMsg;
                isValid = false;
            } else {
                errors[field] = "";
            }
        });
        return [isValid, errors];
    }

    const handleSubmit = async (e: any) => {
        let modelStep = 0;
        localState.errors && rootDispatch(setError({ message: '' }))
        let obj = {
            ...localState.values,
            customerId: user?.user?.id || guid,
            id: guid,
            blockChain: localState.values?.blockChain?.name || localState.values?.blockChain,
            contractAddress: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS
        };
        const [isValidate, errors] = validateFields(obj);
        if (!isValidate) {
            localDispatch({ type: 'setErrors', payload: errors });
            window.scrollTo(0, 0);
            return;
        } else {
            localDispatch({ type: 'setErrors', payload: {} });
        }
        try {
            rootDispatch(setError({ message: '' }));
            localDispatch({ type: 'setIsLoading', payload: 'save' });
            // if(token === 'ERC-721')
            const collectionRes = await createonChainErc721Collection(
                obj.collectionName,
                `ART_${obj.collectionName.slice(0, 3).toUpperCase()}`,
                process.env.REACT_APP_URL
                // 'https://ybdott.azurewebsites.net/'
            );
            const provider = new ethers.providers.Web3Provider(window?.ethereum);
            const receipt = await provider.waitForTransaction(collectionRes.hash);
            modelStep = 1;
            obj["contractAddress"] = receipt.logs[0].address;
            const response = await postMarketplace(`User/SaveCollection`, obj);
            if (response.statusText.toLowerCase() === 'ok') {
                rootDispatch(setToaster({ message: "Collection has been successfully created" }));
                handleBack();
            }
            else {
                rootDispatch(setError({ message: response }));
            }
        }
        catch (error) {
            console.log(modelStep)
            if (modelStep > 0){   rootDispatch(setError({ message: error }));}
            else{  rootDispatch(setError({ message: error, from: 'contract' }));}
        }
        finally {
            localDispatch({ type: 'setIsLoading', payload: '' });
        }
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
        let errors = { ...localState.errors }
        localDispatch({ type: 'setIsLoading', payload: type });
        const body: any = new FormData();
        let fileType = {
            'image/png': true,
            'image/jpg': true,
            'image/jpeg': true,
            'image/PNG': true,
            'image/JPG': true,
            'image/JPEG': true,
            'image/gif': true,
            'image/GIF': true
        };
        body.append('file', file);
        if (fileType[file.type]) {
            try {
                let response = await apiUploadPost(`/Upload/UploadFileNew`, body);
                if (response.status === 200) {
                    let _obj = { ...localState.values };
                    _obj[type] = response.data[0];
                    localDispatch({ type: 'setValues', payload: _obj });
                    localDispatch({ type: 'setErrors', payload: errors })
                } else {
                    rootDispatch(setError({ message: response }));
                }
            }
            catch (error) {
                rootDispatch(setError({ message: error }));
            }
            finally {
                localDispatch({ type: 'setIsLoading', payload: '' });
            }
        }
        else {
            errors[type] = "File is not allowed. You can upload jpg, png, jpeg files."
            localDispatch({ type: 'setIsLoading', payload: '' });
            localDispatch({ type: 'setErrors', payload: errors })
            window.scroll(0, 0)
        }
    };
    const handleChange = (e: any, key: any) => {
        const value = key === 'blockChain' ? e : e.target.value;
        let _obj = { ...localState.values };
        _obj[key] = value;
        localDispatch({ type: 'setValues', payload: _obj })
    }
    const handleBack = () => {
        router('/marketplace/mycollections');
    };

    return (
        <div>
            <div className='container mx-auto mt-4 px-3 lg:px-0'>
                <BreadCrumb />
                <form className="create-collections">
                    <section className="px-9 py-12 h-[350px] border-dashed border border-[#A5A5A5] relative rounded-[28px]">
                        <div>
                            <div className='z-50 absolute max-sm:bottom-[-100px] md:relative'>
                                <div className=" flex justify-center items-center text-center border-dashed  border border-[#A5A5A5] relative rounded-[12px] h-[250px] w-[250px] overflow-hidden">
                                    {localState.values.logo && (
                                        <img
                                            src={localState.values.logo}

                                            alt=""
                                            className="rounded-[12px] h-full w-full object-cover"
                                        />
                                    )}
                                    <div>
                                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center '>{localState.isLoading === 'logo' && <Spinner size="sm" />} </div>
                                        {!localState.values.logo && (
                                            <div >
                                                <Button type='plain' btnClassName="icon image-upload c-pointer" handleClick={() => profileRef.current?.click("p")}></Button>
                                                <p><Button type='plain' btnClassName="text-base !text-secondary font-normal cursor-pointer mt-5" handleClick={() => profileRef.current?.click("p")}>  Your Logo<span className='text-[#ff0000]'>*</span></Button></p>
                                                <p className="text-sm opacity-60 mb-4 text-neutral"><span className="font-semibold">Note: </span>For Better Appearance Upload 250 * 250 Resolution</p>
                                                {localState.errors.logo && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.logo}</span>}
                                                <input
                                                    className="hidden cursor-pointer"
                                                    required
                                                    type="file"
                                                    ref={profileRef}
                                                    onChange={(e) => handlePicChange(e, 'logo')}
                                                />{' '}
                                            </div>
                                        )}
                                        {localState.values.logo && <div className="absolute top-3 right-3">
                                            <input
                                                type="file"
                                                name="myImage"
                                                className="icon camera"
                                                onChange={(e) => handlePicChange(e, 'logo')}
                                            />
                                        </div>}
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
                                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center '>{localState.isLoading === 'bannerImage' && <Spinner size="sm" />} </div>
                                    {!localState.values.bannerImage && (
                                        <div className="text-center absolute top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2" >
                                            <Button type='plain' btnClassName="icon image-upload cursor-pointer" handleClick={() => bannarRef.current?.click("b")}></Button>

                                            <input
                                                className="hidden"
                                                type="file"
                                                required
                                                ref={bannarRef}
                                                onChange={(e) => handlePicChange(e, 'bannerImage')}
                                            />
                                            <p><Button type='plain' btnClassName="text-base !text-secondary font-normal cursor-pointer mt-5" handleClick={() => bannarRef.current?.click("b")}>  Upload Banner<span className='text-[#ff0000]'>*</span> </Button></p>
                                            <p className="text-sm opacity-60 mb-4 text-neutral"><span className="font-semibold">Note: </span>For Better Appearance Upload 1100 * 350 Resolution</p>
                                            {localState.errors.bannerImage && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.bannerImage}</span>}
                                        </div>
                                    )}
                                    {localState.values.bannerImage && <div className="absolute top-3 right-3">
                                        <input
                                            type="file"
                                            name="myImage"
                                            className="icon camera"
                                            onChange={(e) => handlePicChange(e, 'bannerImage')}
                                        />
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mt-36 md:mt-9">
                        <div className="grid lg:grid-cols-2 gap-6">
                            <div>
                                <div className="flex justify-center items-center text-center border-dashed border border-[#A5A5A5] relative rounded-[12px] h-[500px] overflow-hidden">
                                    {localState.values.featuredImage && (
                                        <img
                                            src={localState.values?.featuredImage}

                                            alt=""
                                            className="object-cover h-full w-full"
                                        />
                                    )}
                                    <div>
                                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center '>{localState.isLoading === 'featuredImage' && <Spinner size="sm" />} </div>
                                        {!localState.values.featuredImage && (
                                            <div className="" >
                                                <Button type='plain' btnClassName="icon image-upload cursor-pointer" handleClick={() => featureRef.current?.click()}></Button>
                                                <input
                                                    className="hidden"
                                                    type="file"
                                                    required
                                                    ref={featureRef}
                                                    onChange={(e) => handlePicChange(e, 'featuredImage')}
                                                />
                                                <p><Button type='plain' btnClassName="text-base !text-secondary font-normal cursor-pointer mt-5" handleClick={() => featureRef.current?.click()}> Featured image<span className='text-[#ff0000]'>*</span></Button></p>
                                                <p className="text-sm opacity-60 mb-4 text-neutral"><span className="font-semibold">Note: </span>For Better Appearance Upload 550 * 450 Resolution</p>
                                                {localState.errors.featuredImage && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.featuredImage}</span>}
                                            </div>
                                        )}
                                        {localState.values.featuredImage && <div className="absolute top-3 right-3">
                                            <input
                                                type="file"
                                                name="myImage"
                                                className="icon camera"
                                                onChange={(e) => handlePicChange(e, 'featuredImage')}
                                            />
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div >
                                    <div className="mb-6">
                                        <label className="text-secondary text-sm font-normal p-0 mb-2 label block ml-3">Name<span className='text-[#ff0000]'>*</span></label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="input input-bordered text-secondary bg-transparent w-full rounded-[12px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                                            required
                                            value={localState.values.collectionName}
                                            maxLength={250}
                                            onChange={(e) => handleChange(e, 'collectionName')}
                                        />
                                        {localState.errors.collectionName && <span className="text-sm font-normal text-red-600 mt-4 ml-3">{localState.errors.collectionName}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="text-secondary text-sm font-normal p-0 mb-2 label block ml-3">Description<span className='text-[#ff0000]'>*</span></label>
                                        <p className="text-secondary opacity-60 mb-2 text-sm ml-3">Markdown syntax is supported. 0 of 1000 characters used</p>
                                        <textarea
                                            as="textarea"
                                            placeholder="Description"
                                            className="textarea bg-transparent border-[#343434] textarea-bordered w-full resize-none leading-4 rounded-[12px] pl-5 pt-3 focus:outline-none"
                                            rows={5}
                                            value={localState.values.description}
                                            required
                                            maxLength={1000}
                                            onChange={(e) => handleChange(e, 'description')}
                                        />
                                        {localState.errors.description && <span className="text-sm font-normal text-red-600 mt-4 ml-3">{localState.errors.description}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="text-secondary text-sm font-normal p-0 mb-2 label block ml-3">URLs</label>
                                        <p className="text-secondary opacity-60 mb-2 text-sm ml-3">
                                            Customize your URL on OpenSea. Must only contain lowercase letters, numbers, and hyphens.
                                        </p>
                                        <input
                                            type="text"
                                            value={localState.values.urls}
                                            placeholder="Example : Treasures of the sea"
                                            className="input input-bordered text-secondary bg-transparent w-full rounded-[12px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                                            onChange={(e) => handleChange(e, 'urls')}
                                        />
                                        {localState.errors.urls && <span className="text-sm font-normal text-red-600 mt-4 ml-3">{localState.errors.urls}</span>}
                                    </div>
                                    <div className="mb-6" >
                                        <label className="text-secondary text-sm font-normal p-0 mb-2 label block ml-3">Category and tags <span className='text-[#ff0000]'>*</span></label>
                                        <p className="text-secondary opacity-60 mb-2 text-sm ml-3">Make your items more discoverable on Minnapad by adding category.</p>
                                        <select
                                            aria-label="Default select example"
                                            className="input input-bordered text-secondary text-secondary w-full rounded-[12px] border-[#A5A5A5] focus:outline-none pl-4 h-10 cursor-pointer"
                                            value={localState.values.category}
                                            onChange={(e) => handleChange(e, 'category')}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {localState.lookups?.collections?.map((item) => (
                                                <option value={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                        {localState.errors.category && <span className="text-sm font-normal text-red-600 mt-4 ml-3">{localState.errors.category}</span>}
                                    </div>
                                    <div className="mb-6 mt-6 p-relative">
                                        <p className="text-secondary text-sm font-normal p-0 mb-2 label block ml-3">
                                            Network <span className="text-[#ff0000]">*</span>
                                        </p>
                                        <CustomSelect
                                            selectedValue={localState.lookups?.networks[0]}
                                            valueField={"name"}
                                            imageField={"icon"}
                                            optionKey={"name"}
                                            hasImage={true}
                                            options={localState.lookups?.networks || []}
                                            onSelect={(value: any) => handleChange(value, 'blockChain')}
                                            placeholder={"Select Network"}
                                            disabled={false}
                                        />
                                        {localState.errors.blockChain && <span className="text-sm font-normal text-red-600 mt-4 ml-3">{localState.errors.blockChain}</span>}
                                    </div>
                                    <div className="mb-2" >
                                        <label className="text-secondary text-sm font-normal p-0 mb-2 label block ml-3">Payment tokens</label>
                                    </div>
                                    <div className="mb-6">
                                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                                            <div className='flex gap-[14px] bg-base-300 p-[6px] rounded-[28px] border border-[#A5A5A5]'>
                                                <span className='matic-purple icon'></span>
                                                <div>
                                                    <p className='text-base text-secondary font-bold'>Matic</p>
                                                    <p className='text-xs text-secondary font-light'>Matic</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6 relative" >
                                        <label className="text-secondary text-sm font-normal p-0 mb-2 label block ml-3">Links</label>
                                        <div className="mb-6 relative">
                                            <div className='border-r border-[#6D6871] pr-4 absolute left-2 top-[6px]'>
                                                <span className="icon globe-icon "></span>
                                            </div>
                                            <input
                                                id="web-url"
                                                placeholder="Website Link"
                                                aria-describedby="basic-addon3"
                                                className="input pl-16 input-bordered bg-transparent text-secondary w-full rounded-[12px] border-[#A5A5A5] focus:outline-none h-10"
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
                                                placeholder="Facebook Link"
                                                aria-describedby="basic-addon3"
                                                className="input pl-16 input-bordered bg-transparent text-secondary w-full rounded-[12px] border-[#A5A5A5] focus:outline-none h-10"
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
                                                placeholder="Twitter Link"
                                                aria-describedby="basic-addon3"
                                                className="input pl-16 input-bordered bg-transparent text-secondary w-full rounded-[12px] border-[#A5A5A5] focus:outline-none h-10"
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
                                                placeholder="Linkedin Link"
                                                aria-describedby="basic-addon3"
                                                className="input pl-16 input-bordered bg-transparent text-secondary w-full rounded-[12px] border-[#A5A5A5] focus:outline-none h-10"
                                                onChange={(e) => handleChange(e, 'linkedIn')}
                                                maxLength={100}
                                            />
                                            {localState.errors.linkedIn && <span className="text-sm font-normal text-red-600 mt-4">{localState.errors.linkedIn}</span>}
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-4 items-center">
                                        <Button btnClassName='min-w-[128px] h-[48px]' type="cancel" handleClick={handleBack} disabled={localState.isLoading === 'save'}>
                                            <span>{localState.isLoading === 'cancel' && <Spinner size="sm" />} </span>Cancel
                                        </Button>
                                        <Button btnClassName='min-w-[128px]' type="primary" handleClick={(e) => handleSubmit(e)} disabled={localState.isLoading === 'save'}>
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
    );
}
const connectStateToProps = ({ auth }) => {
    return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
    return { dispatch };
})(CreateCollection);


