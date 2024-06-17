import React,{ useEffect, useState } from "react";
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
function TrendingNfts(props) {
  const rootDispatch=useDispatch();
  const [previosImageChagne, setPreviosImageChange] = useState(0);
  const [loader, setLoader] = useState<boolean>(false);
  const [todaytrending, setTodayTrending] = useState<any>([]);
  const router = useNavigate();
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [trendingData, setTrendingData] = useState<any>({});
  const { address, isConnected } = useAccount();
  const [nftDetails, setNftDetails] = useState<any>();
  useEffect(() => {
    getTodayTrending();
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps

  const getTodayTrending = async () => {
    setLoader(true);
    await getMarketplace("User/todaytrending")
      .then((response: any) => {
        setTodayTrending(response.data);
        setLoader(false);
      })
      .catch((error: any) => {
        rootDispatch(setError({message:error}))
        setLoader(false);
      });
  };

  const convertImageUrl = (file: any) => {
    const filePath = file?.replace("ipfs://", "");
    return process.env.REACT_APP_IPFS_PREFIX + `${filePath}`;
  };

  const handleProfileRedirect = (item: any) => {
    router(`/marketplace/accounts/${item.creatorWalletAddress || address}`);
  };

  const handleBuyModal = (item: any) => {
    if (isConnected) {
      rootDispatch(setError({message:""}))
      setTrendingData(item);
      setShowBuyModal(true);
      loadNftDetails(item);
    } else {
      rootDispatch(setError({message:"Please connect your wallet!",type:'warning'}))
    }
  };
  const loadNftDetails = async (item) => {
    await getMarketplace(
      `User/NFTDetails/${item?.tokenId}/${item?.collectionContractAddress}/${props.auth.user.id}`
    )
      .then((response: any) => {
        setNftDetails(response.data);
      })
      .catch((error: any) => {
        rootDispatch(setError({message:error}))
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
          `/marketplace/nft/${item.tokenId}/${
            item?.collectionContractAddress || item?.creatorWalletAddress
          }/${item.id}`
        );
      })
      .catch((error: any) => {
        rootDispatch(setError({message:error}))
      });
  };

  const connectHandlePage = (item) => {
    router(
      `/marketplace/nft/${item.tokenId}/${
        item?.collectionContractAddress || item?.creatorWalletAddress
      }/${item.id}`
    );
  };
  return (
    <>
      {todaytrending.length > 0 && (
        <>
          <div className="container mx-auto mt-5 relative">
            <h2 className="text-center text-2xl font-semibold text-secondary mb-3">
              Today Trending <span className="text-primary">NFTs</span>
            </h2>
            {!loader && (
              <div className={`carousel justify-center flex md:py-[80px] ${todaytrending?.length === 3 ? 'gap-14':'gap-4'} `}>
                {todaytrending.length > 0 ? (
                  todaytrending?.map((item: any, idx: any) => (
                    <div
                      className="carousel-item w-full md:w-[340px]"
                      key={item.creatorWalletAddress}
                    >
                      <div
                        className={`card bg-primary-content border border-slate-200 w-full ${
                          todaytrending?.length === 3 &&
                          idx === previosImageChagne + 1
                            ? "trending-card centerd-card lg:scale-[1.2]"
                            : "trending-card"
                        }`}
                      >
                        <div className="p-2">
                         
                            <div className="relative">
                              <img
                                src={
                                  item?.logo
                                    ? `${convertImageUrl(item?.logo)}`
                                    : defaultbg
                                }
                                //src={item?.logo ? item?.logo : defaultbg}
                                alt=""                               
                                className={`w-full object-cover h-[400px] rounded-[16px] ${
                                  item?.isUnlockPurchased &&
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
                                      btnClassName="trend-btn opacity-100 min-w-[180px]"
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
                  <NoDataFound text ={''}/>
                )}
              </div>
            )}
            <div className="md:flex md:absolute md:w-full justify-between md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 max-sm:mt-4">
              <span className="icon carousal-left-arrow cursor-pointer lg:scale-[1.4] mr-1"></span>
              <span className="icon carousal-right-arrow cursor-pointer lg:scale-[1.4]"></span>
            </div>
          </div>
          {showBuyModal && (
            <BuyComponent
              showModal={showBuyModal}
              handleClose={() => setShowBuyModal(false)}
              nftDetails={nftDetails}
              collectionAddress={
                nftDetails?.creatorWalletAddress ||
                trendingData?.collectionContractAddress
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
