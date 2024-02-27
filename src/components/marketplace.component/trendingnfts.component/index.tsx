import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { getMarketplace,postMarketplace } from '../../../utils/api';
import Image from 'react-bootstrap/Image';
import defaultbg from '../../../assets/images/default-bg.png';
import defaultlogo from '../../../assets/images/default-logo.png';
import error from '../../../assets/images/error.svg';
// import Button from 'react-bootstrap/Button';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { isErrorDispaly } from '../../../utils/errorHandling';
import nodata from '../../../assets/images/no-data.png';
import BuyComponent from '../../../utils/buyNow';
import { useAccount } from 'wagmi';
import { connect } from 'react-redux';
import Button from '../../../ui/Button';
function TrendingNfts(props) {
  const [previosImageChagne, setPreviosImageChange] = useState(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [todaytrending, setToDayTrending] = useState<any>([]);
  const router = useNavigate();
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [trendingData, setTrendingData] = useState<any>({});
  const { address,isConnected} = useAccount();
  const [nftDetails, setNftDetails] = useState<any>();
  useEffect(() => {
    getTodayTrending();
    setErrorMessage(null);
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps

  const getTodayTrending = async () => {
    setLoader(true);
   await getMarketplace('User/todaytrending')
      .then((response: any) => {
        setToDayTrending(response.data);
        setLoader(false);
      })
      .catch((error: any) => {
        setErrorMessage(isErrorDispaly(error));
        setLoader(false);
      });
  };

  const convertImageUrl = (file: any) => {
    const filePath = file?.replace('ipfs://', '');
    return process.env.REACT_APP_IPFS_PREFIX + `${filePath}`;
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  const handlerSlider = (previousSlide: any, _ref: any) => {
    setPreviosImageChange(previousSlide);
  };

  const handleProfileRedirect = (item: any) => {
    router(`/marketplace/accounts/${item.creatorWalletAddress || address}`);
  };

  const handleBuyModal = (item: any) => { 
    if(isConnected){
      setErrorMessage(null)
      setTrendingData(item);
      setShowBuyModal(true);
      loadNftDetails(item);
    }else{
      setErrorMessage("Please connect your wallet");
    }
   
  };
  const loadNftDetails = async (item) => {
     await getMarketplace(
      `User/NFTDetails/${item?.tokenId}/${item?.collectionContractAddress}/${props.auth.user.id}`,
    )
      .then((response: any) => {
        setNftDetails(response.data);
      })
      .catch((error: any) => { setErrorMessage(isErrorDispaly(error))});
  };
  const handleDeatailPage = async (item) => {
    let obj = {
      nftId: item.id,
      customerId: props.auth.user.id,
    };
    await postMarketplace(`User/SaveViewer`, obj)
      .then((response: any) => {
        router(
          `/marketplace/assets/${item.tokenId}/${item?.collectionContractAddress || item?.creatorWalletAddress}/${item.id}`,
        );
      })
      .catch((error: any) => {
        setErrorMessage(isErrorDispaly(error));
      });
  };

  const connectHandlePage = (item)=>{
    router(
      `/marketplace/assets/${item.tokenId}/${item?.collectionContractAddress || item?.creatorWalletAddress}/${item.id}`,
    );
  }
  return (
    <>
      {todaytrending.length > 0 && (
        <>
          <div className="container mx-auto mt-5 relative">
            <h2 className="text-center text-2xl font-semibold text-secondary mb-3">Today Trending <span className='text-primary'>NFTs</span></h2>
           
            {errorMessage && (
              <div className='cust-error-bg'>
              <div className='mr-4'><img src={error} alt="" /></div>
              <div>
              <p className='error-title error-red'>Error</p>
              <p className="error-desc">{errorMessage}</p></div>
         </div>
            )}
            {!loader && (
              // <Carousel pauseOnHover infinite 
              //   responsive={responsive}
              //   beforeChange={(e, event) => handlerSlider(e, event)}
              //   className="nodata-found pb-3"
              // >
              //   {todaytrending.length > 0 ? (
              //     todaytrending?.map((item: any, idx: any) => (
              //       <div
              //         className={
              //           todaytrending?.length === 3
              //             ? idx === previosImageChagne + 1
              //               ? 'trending-card centerd-card'
              //               : 'trending-card'
              //             : 'trending-card'
              //         }
              //         key={idx}
              //       >
              //         <div className="sub-div">
              //           <div className="trend-bg">
              //             <div className="trend-image-width">
              //               <Image
              //                  src={item?.logo ? `${convertImageUrl(item?.logo)}` : defaultbg}
              //                 //src={item?.logo ? item?.logo : defaultbg}
              //                 alt=""
              //                 height="10"
              //                 width="10"
              //                 className={`${
              //                   item?.isUnlockPurchased && address?.toLowerCase() !== item?.creatorWalletAddress.toLowerCase()
              //                     ? 'trend-image blur-image'
              //                     : 'trend-image'
              //                 }`}
              //                 onClick={isConnected ? () => handleDeatailPage(item) : ()=> connectHandlePage(item)}
              //               />
              //             </div>
              //             <div className="profile-position">
              //               <div className="profile-image">
              //                 <Image src={item?.creatorProfilePicUrl || defaultlogo} alt="" height="10" width="10" />
              //               </div>
              //             </div>
              //             {(item.isPutOnSale && item.creatorWalletAddress != address) &&(
              //               <div className="trend-btn-position">
              //                 <Button className="trend-btn" onClick={() => handleBuyModal(item)}>
              //                   Buy Now
              //                 </Button>
              //               </div>
              //             )}
              //           </div>
              //           <div className="trend-title-section mt-5" onClick={() => handleProfileRedirect(item)}>
              //             <div className="d-flex align-items-center pe-4">
              //               <label className="trend-label pe-0">
              //                 {item?.creatorName || item?.creatorWalletAddress}
              //               </label>
              //             </div>
              //             <h3 className="trend-title">
              //               {item.nftName} 
              //             </h3>
              //           </div>
              //         </div>
              //         <div className="trend-bottom row">
              //           <div className="col-6">
              //             <label className="price-label">Price</label>
              //             <p className="price-value">
              //               {item?.value ? item?.value : "--"} {item?.value ? process.env.REACT_APP_CURRENCY_SYMBOL : ''}{' '}
              //             </p>
              //           </div>
              //           <div className="col-6">
              //             <label className="price-label">Highest bid</label>
              //             <p className="price-value">
              //               {item?.highestBid ? item?.highestBid  : "--"} { item?.highestBid ? process.env.REACT_APP_CURRENCY_SYMBOL :""}
              //             </p>
              //           </div>
              //         </div>
              //       </div>
              //     ))
              //   ) : (
              //     <div className="nodata-text db-no-data">
              //       <Image src={nodata} alt=""></Image>
              //       <h3 className="text-center">No data found</h3>
              //     </div>
              //   )}
              // </Carousel>

          <div className="carousel justify-center gap-14 flex md:py-[80px]">
           {todaytrending.length > 0 ? (
                  todaytrending?.map((item: any, idx: any) => (
                   <div className='carousel-item w-full md:w-[340px]'>
                     <div
                      className={`card bg-primary-content border border-slate-200 w-full ${todaytrending?.length === 3
                        ? idx === previosImageChagne + 1
                          ? 'trending-card centerd-card lg:scale-[1.2]'
                          : 'trending-card '
                        : 'trending-card'}`
                        
                      }
                      key={idx}
                    >
                      <div className="p-2">
                        <div className="">
                          <div className="relative">
                            <img
                               src={item?.logo ? `${convertImageUrl(item?.logo)}` : defaultbg}
                              //src={item?.logo ? item?.logo : defaultbg}
                              alt=""
                              height="10"
                              width="10"
                              className={`w-full rounded-[16px] ${
                                item?.isUnlockPurchased && address?.toLowerCase() !== item?.creatorWalletAddress.toLowerCase()
                                  ? 'trend-image blur-image'
                                  : 'trend-image'
                              }`}
                              onClick={isConnected ? () => handleDeatailPage(item) : ()=> connectHandlePage(item)}
                            />
                             <img src={item?.creatorProfilePicUrl || defaultlogo} alt="" className='w-[68px] h-[68px] object-cover rounded-[16px] absolute bottom-[-36px] left-3.5' />
                             {(item.isPutOnSale && item.creatorWalletAddress != address) &&(
                            <div className="text-right absolute right-5 bottom-2">
                              <Button btnClassName="trend-btn opacity-100" type='primary' handleClick={() => handleBuyModal(item)}>
                                Buy Now
                              </Button>
                            </div>
                          )}
                          <div className='bg-black top-3 absolute cursor-pointer right-3 rounded-full'>
                            <span className='icon like-white '></span>
                          </div>
                          </div>
                        </div>
                        
                      </div>
                      <div className="px-5 pt-10">
                      <div className="" onClick={() => handleProfileRedirect(item)}>                          
                            <label className="text-secondary text-base">
                              {item?.creatorName || item?.creatorWalletAddress}
                            </label>                         
                          <p className="text-lg text-secondary font-semibold">    {item.nftName}   </p>
                      </div>
                      <div className="mt-4 pb-5">
                        <div className="flex justify-between items-center">
                          <label className="text-secondary text-base">Price</label>
                          <p className="text-base font-semibold text-secondary">
                            {item?.value ? item?.value : "--"} {item?.value ? process.env.REACT_APP_CURRENCY_SYMBOL : ''}{' '}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <label className="text-secondary text-base">Highest bid</label>
                          <p className="text-base font-semibold text-secondary ">
                            {item?.highestBid ? item?.highestBid  : "--"} { item?.highestBid ? process.env.REACT_APP_CURRENCY_SYMBOL :""}
                          </p>
                        </div>
                      </div>
                      </div>
                    </div>
                   </div>
                  ))
                ) : (
                  <div>
                    <img src={nodata} alt="" className='mx-auto w-[95px]' />
                    <h3 className="text-center text-secondary mt-2">No data found</h3>
                  </div>
                )}

          </div>
            )}
            <div className='md:flex md:absolute md:w-full justify-between md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 max-sm:mt-4'>
              <span className='icon carousal-left-arrow cursor-pointer lg:scale-[1.4] mr-1'></span>
              <span className='icon carousal-right-arrow cursor-pointer lg:scale-[1.4]'></span>
            </div>
          </div>
          {showBuyModal && (
            <>
              <BuyComponent
                showModal={showBuyModal}
                handleClose={() => setShowBuyModal(false)}
                nftDetails={nftDetails}
                collectionAddress={nftDetails?.creatorWalletAddress || trendingData?.collectionContractAddress}
              ></BuyComponent>
            </>
          )}
        </>
      )}
    </>
  );
}
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(TrendingNfts);
