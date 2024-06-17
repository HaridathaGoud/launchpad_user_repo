import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMarketplace, postMarketplace } from "../../../utils/api";
import defaultbg from "../../../assets/images/default-bg.png";
import defaultlogo from "../../../assets/images/default-logo.png";
import "react-multi-carousel/lib/styles.css";
import BuyComponent from "../../../utils/buyNow";
import { useAccount } from "wagmi";
import { connect, useDispatch } from "react-redux";
import Button from "../../../ui/Button";
import { setError } from "../../../reducers/layoutReducer";
import NoDataFound from "../../../ui/nodatafound";
import { trendingNFTSReducer, trendingNftState } from "./reducer";
function TrendingNfts(props) {
  const rootDispatch = useDispatch();
  const router = useNavigate();
  const { address, isConnected } = useAccount();
  const [localState, localDispatch] = useReducer(trendingNFTSReducer, trendingNftState);
  useEffect(() => {
    localDispatch({ type: 'setCurrentIndex', payload: 0 });
    getTodayTrending();
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps


  const getTodayTrending = async () => {
    try {
      localDispatch({ type: 'setLoader', payload: true });
      const response = await getMarketplace("User/todaytrending");
      if (response.status === 200) {
        localDispatch({type:'setTodayTrending',payload:response.data});
      }
      else {
        rootDispatch(setError({ message: response }));
      }
    } catch (error) {
      rootDispatch(setError({ message: error }));
    }
    finally {
      localDispatch({ type: 'setLoader', payload: false });
    }
  };

  const handleProfileRedirect = (item: any) => {
    router(`/marketplace/accounts/${item.creatorWalletAddress || address}`);
  };

  const handleBuyModal = (item: any) => {
    if (isConnected) {
      rootDispatch(setError({ message: "" }))
      localDispatch({ type: 'setTrendingData', payload: item })
      localDispatch({ type: 'showBuyModal', payload: true });
      loadNftDetails(item);
    } else {
      rootDispatch(setError({ message: "Please connect your wallet!", type: 'warning' }))
    }
  };
  const loadNftDetails = async (item) => {
    await getMarketplace(
      `User/NFTDetails/${item?.tokenId}/${item?.collectionContractAddress}/${props.auth.user.id}`
    )
      .then((response: any) => {
        localDispatch({type:'setNftDetails',payload:response.data});
      })
      .catch((error: any) => {
        rootDispatch(setError({ message: error }))
      });
  };
  const handleDeatailPage = async (item) => {
    let obj = {
      nftId: item.id,
      customerId: props.auth.user.id,
    };
    await postMarketplace(`User/SaveViewer`, obj)
      .then((response: any) => {
        router(
          `/marketplace/nft/${item.tokenId}/${item?.collectionContractAddress || item?.creatorWalletAddress
          }/${item.id}`
        );
      })
      .catch((error: any) => {
        rootDispatch(setError({ message: error }))
      });
  };

  const connectHandlePage = (item) => {
    router(
      `/marketplace/nft/${item.tokenId}/${item?.collectionContractAddress || item?.creatorWalletAddress
      }/${item.id}`
    );
  };
  const handleSlideActions = (action) => {
    if (action === 'previous') {
      const newIndex = (localState.currentIndex + 1) % localState.todaytrending?.length;
      localDispatch({ type: 'setCurrentIndex', payload: newIndex });
    }
    else {
      const newIndex = (localState.currentIndex - 1 + localState.todaytrending?.length) % localState.todaytrending?.length;
      localDispatch({ type: 'setCurrentIndex', payload: newIndex });
    }
  };
  const visibleItems = localState.todaytrending ? [...localState.todaytrending?.slice(localState.currentIndex), ...localState.todaytrending?.slice(0, localState.currentIndex)].slice(0, 3) : [];
  return (
    <>
      {localState.todaytrending.length > 0 && (
        <>
          <div className="container mx-auto mt-5 relative">
            <h2 className="text-center text-2xl font-semibold text-secondary mb-3">
              Today Trending <span className="text-primary">NFTs</span>
            </h2>
            {!localState.loader && (
              <div className="carousel justify-center gap-14 flex md:py-[80px]">
                {localState.todaytrending.length > 0 ? (
                  visibleItems?.map((item: any, idx: any) => (
                    <div
                      className="carousel-item w-full md:w-[340px]"
                      key={item.creatorWalletAddress}
                    >
                      <div
                        className={`card bg-primary-content border border-slate-200 w-full ${visibleItems?.length === 3 &&
                            idx === localState.previosImageChagne + 1
                            ? "trending-card centerd-card lg:scale-[1.2]"
                            : "trending-card"
                          }`}
                      >
                        <div className="p-2">

                          <div className="relative">
                            <img
                              src={item?.logo || defaultbg}
                              alt=""
                              className={`w-full object-cover h-[400px] rounded-[16px] ${item?.isUnlockPurchased &&
                                  address?.toLowerCase() !==
                                  item?.creatorWalletAddress.toLowerCase()
                                  ? "trend-image blur-image"
                                  : "trend-image"
                                }`}
                              onClick={
                                isConnected
                                  ? () => handleDeatailPage(item)
                                  : () => connectHandlePage(item)
                              }
                            />
                            <img
                              src={item?.creatorProfilePicUrl || defaultlogo}
                              alt=""
                              className="w-[68px] h-[68px] object-cover rounded-[16px] absolute bottom-[-36px] left-3.5"
                            />
                            {item.isPutOnSale &&
                              item.creatorWalletAddress != address && (
                                <div className="text-right absolute right-5 bottom-2">
                                  <Button
                                    btnClassName="trend-btn opacity-100"
                                    type="primary"
                                    handleClick={() => handleBuyModal(item)}
                                  >
                                    Buy Now
                                  </Button>
                                </div>
                              )}
                            <div className="bg-black top-3 absolute cursor-pointer right-3 rounded-full">
                              <span className="icon like-white "></span>
                            </div>
                          </div>

                        </div>
                        <div className="px-5 pt-10">
                          <div
                            className=" truncate"
                            onClick={() => handleProfileRedirect(item)}
                          >
                            <label className="text-secondary text-base">
                              {item?.creatorName || item?.creatorWalletAddress}
                            </label>
                            <p className="text-lg text-secondary font-semibold truncate">
                              {" "}
                              {item.nftName}{" "}
                            </p>
                          </div>
                          <div className="mt-4 pb-5">
                            <div className="flex justify-between items-center">
                              <label className="text-secondary text-base">
                                Price
                              </label>
                              <p className="text-base font-semibold text-secondary">
                                {item?.value ? item?.value : "--"}{" "}
                                {item?.value
                                  ? process.env.REACT_APP_CURRENCY_SYMBOL
                                  : ""}{" "}
                              </p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <label className="text-secondary text-base">
                                Highest bid
                              </label>
                              <p className="text-base font-semibold text-secondary ">
                                {item?.highestBid ? item?.highestBid : "--"}{" "}
                                {item?.highestBid
                                  ? process.env.REACT_APP_CURRENCY_SYMBOL
                                  : ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <NoDataFound text={''} />
                )}
              </div>
            )}
            <div className="md:flex md:absolute md:w-full justify-between md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 max-sm:mt-4">
              <span className="icon carousal-left-arrow cursor-pointer lg:scale-[1.4] mr-1" onClick={() => handleSlideActions("previous")} ></span>
              <span className="icon carousal-right-arrow cursor-pointer lg:scale-[1.4]" onClick={() => handleSlideActions("next")}></span>
            </div>
          </div>
          {localState.showBuyModal && (
            <BuyComponent
              showModal={localState.showBuyModal}
              handleClose={() => localDispatch({type:'showBuyModal',payload:false})}
              nftDetails={localState.nftDetails}
              collectionAddress={
                localState.nftDetails?.creatorWalletAddress ||
                localState.trendingData?.collectionContractAddress
              }
            ></BuyComponent>
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
