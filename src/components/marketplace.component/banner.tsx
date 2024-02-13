import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
// import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import { getMarketplace, getTopNft } from '../../utils/api';
import Modal from 'react-bootstrap/Modal';
import { isErrorDispaly } from '../../utils/errorHandling';
import { useAccount } from 'wagmi';
import error from '../../assets/images/error.svg';
import WalletConnect from '../shared/connect.wallet';
import loadimg from '../../assets/images/loader.svg';
import Button from '../../ui/Button';
import Carousel from '../../ui/Carousel';

export default function Banner() {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [nftDetails, setNftDetails] = useState<any>({});
  const [topNftDetails, setTopNftDetails] = useState<any>([]);
  const { isConnected } = useAccount();
  const [loader, setLoader] = useState(true);
  const router = useNavigate();
  useEffect(() => {
    setErrorMessage(null);
    getNftDetails();
    getTopNftDetails();
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps

  const getNftDetails = async () => {
    setLoader(true)
    await getMarketplace('User/Users')
      .then((response: any) => {
        setNftDetails(response.data);
        setLoader(false)
      })
      .catch((error: any) => {
        setLoader(false)
        setErrorMessage(isErrorDispaly(error));
      });
  };

  const getTopNftDetails = async () => {
    await getTopNft('User/topnfts')
      .then((response: any) => {
        setTopNftDetails(response.data);
      })
      .catch((error: any) => {
        setErrorMessage(isErrorDispaly(error));
      })
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
     {loader && 
       <div className="flex justify-center">
       <div className='loading-overlay'>
        <div className="text-center image-container">
       <img
                 className=""
                 src={loadimg}
                 alt=""
               />
     </div></div>
     </div>
     || <>
      <div className="container mx-auto pt-5">
        <div className="grid gap-4 max-sm:flex md:grid-cols-2 max-sm:flex-col-reverse	items-center">
          {errorMessage && (
            <div className='cust-error-bg'>
                 <div className='mr-4'><Image src={error} alt="" /></div>
                 <div>
                 <p className='error-title error-red'>Error</p>
                 <p className="error-desc">{errorMessage}</p></div>
            </div>
          )}
          <div className="">
            <h4 className="text-[18px] font-semibold text-primary">Built on your own NFTs </h4>
            <h2 className="text-[52px] font-bold leading-[1.2]">Rock the world <br />
               Explore, collect & sell 
            </h2>
          
            <h1 className="text-[62px] font-semibold text-secondary leading-[1.1]">NFTs</h1>
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
            <WalletConnect showWalletModal={modalShow} onWalletConect={(addr) => {}} onWalletClose={() => setModalShow(false)} />
              <Button type='primary' btnClassName='!px-12' handleClick={handleExplore}>
                Explore
              </Button>{' '}
              <Button type='create' btnClassName='!px-12 !h-[42px] ml-[18px]' handleClick={handleExplore}>
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
            <Carousel data={topNftDetails}>
              {topNftDetails?.map((item) => (
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
      </> }
    </>
  );
}
