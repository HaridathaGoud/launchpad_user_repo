import React, { useEffect, useReducer, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
// import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import { getMarketplace, getTopNft } from '../../../utils/api';
import Modal from 'react-bootstrap/Modal';
import { useAccount } from 'wagmi';
import WalletConnect from '../../shared/connect.wallet';
import Button from '../../../ui/Button';
import Carousel from '../../../ui/Carousel';
import DashboardShimmer from '../loaders/carouselShimmer';
import { bannerReducer, bannerState } from './reducer';
import { setError } from "../../../reducers/layoutReducer";
import { useDispatch } from 'react-redux';
const Banner = () => {
    const rootDispatch = useDispatch();
    const [localState, localDispatch] = useReducer(bannerReducer, bannerState);
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const { isConnected } = useAccount();
    const router = useNavigate();
    useEffect(() => {
        getTopNftDetails();
    }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps


    const getTopNftDetails = async () => {
        try {
            localDispatch({ type: 'setLoader', payload: true });
            let response = await getTopNft('User/topnfts');
            if (response.status === 200) {
                localDispatch({ type: 'setTopNftDetails', payload: response.data });
            }
            else {
                rootDispatch(setError({ message: response }));
            }
        }
        catch (error) {
            rootDispatch(setError({ message: error }));
        }
        finally {
            localDispatch({ type: 'setLoader', payload: false });
        }
    }

    const handleExplore = () => {
        router(`/marketplace/explorenfts`);
    };
    const handleClose = () => setShow(false);
    const getNFTImageUrl = (file: any) => {
        return file
    };
    // ---We Need To ConnectMetamask in Feature-------
    // const metaMaskConnect =async() => {
    //   if(isConnected){
    //     router("/create/single");
    //   }else{
    //     setModalShow(true)
    //   }
    // }


    return (
        <>
            {localState.loader &&
                <DashboardShimmer />
                || <>
                    <div className="container mx-auto pt-5">
                        <div className="grid gap-4 max-sm:flex md:grid-cols-2 max-sm:flex-col-reverse	items-center">
                            <div className="">
                                <h4 className="text-[18px] font-semibold text-primary">Built on your own NFTs </h4>
                                <h2 className="text-[52px] font-bold leading-[1.2] text-secondary">Rock the world <br />
                                    Explore, collect & sell
                                </h2>

                                <h1 className="text-[62px] font-semibold text-primary leading-[1.1]">NFTs</h1>
                                <div className="flex gap-[30px] items-center my-6">
                                    <div>
                                        <h2 className='text-[30px] text-secondary font-semibold leading-none'>200+</h2>
                                        <p className='text-base font-medium text-primary'>User Active</p>
                                    </div>
                                    <div>
                                        <h2 className='text-[30px] text-secondary font-semibold leading-none'>40+</h2>
                                        <p className='text-base font-medium text-primary'>Art Works</p>
                                    </div>
                                    <div>
                                        <h2 className='text-[30px] text-secondary font-semibold leading-none'>32+</h2>
                                        <p className='text-base font-medium text-primary'>Artist</p>
                                    </div>
                                </div>
                                <div className="banner-btns">
                                    <WalletConnect showWalletModal={modalShow} onWalletConect={(addr) => { }} onWalletClose={() => setModalShow(false)} />
                                    <Button type='primary' btnClassName='!px-12' handleClick={handleExplore}>
                                        Explore
                                    </Button>{' '}
                                    <Button type='cancel' btnClassName='!px-12 !h-[42px] ml-[18px]' handleClick={handleExplore}>
                                        Create
                                    </Button>
                                </div>
                                <Modal size="lg" centered show={show} onHide={handleClose} className="wallet-popup create-item-modal">
                                    <Modal.Header className="p-0">
                                        <span></span>
                                        <span className="icon close c-pointer" onClick={handleClose}></span>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <h2 className="section-title text-center mt-0 mb-3">Create single or multiple item</h2>
                                        <div className="d-flex justify-content-around create-sel">
                                            <Link className="me-2" to={'/create/single'}>
                                                <div className="create-item text-center">
                                                    <h4 className="mb-0">Create</h4>
                                                    <h3 className="mb-0">Single</h3>
                                                </div>
                                            </Link>
                                            <Link className="" to={'/create/multiple'}>
                                                <div className="create-item text-center">
                                                    <h4 className="mb-0">Create</h4>
                                                    <h3 className="mb-0">Multiple</h3>
                                                </div>
                                            </Link>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </div>
                            <div className='lg:w-[400px] mx-auto'>
                                <Carousel data={localState.topNftDetails}>
                                    {localState.topNftDetails?.map((item) => (
                                        <div>
                                            <div className='new-banner'>
                                                <div className="banner-image">
                                                    <img className='h-[594px]'
                                                        src={
                                                            item?.image && !item?.image?.includes('null')
                                                            && `${getNFTImageUrl(item?.image)}`
                                                        }
                                                        alt="" />
                                                </div>
                                                <div className="offer-card">
                                                    <div>
                                                        <label>Name</label>
                                                        <h3>{item.nftName}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </Carousel>
                            </div>
                        </div>
                    </div>
                </>}
        </>
    );
}

export default Banner