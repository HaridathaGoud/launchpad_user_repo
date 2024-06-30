import React, { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import defaultlogo from "../../../assets/images/default-bg.png";
import NoDataFound from "../../../ui/noData";
import Button from "../../../ui/Button";
import { getMarketplace, postMarketplace } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../../reducers/layoutReducer";
import { modalActions } from "../../../ui/Modal";
import Spinner from "../../loaders/spinner";
import FoundingMemberSimmer from "../../loaders/projects/foundingmembersshimmer";
import { useNavigate } from "react-router-dom";
const MoreFromCollection = ({ nftDetails, tokenId }) => {
  const rootDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store: any) => store.auth.user);
  const [isLoading, setIsLoading] = useState("");
  const [data, setData] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    getData(nftDetails);
  }, []);
  const handleSlideActions = (action) => {
    if (action === "previous") {
      const newIndex = (currentIndex + 1) % data?.length;
      setCurrentIndex(newIndex);
    } else {
      const newIndex = (currentIndex - 1 + data?.length) % data?.length;
      setCurrentIndex(newIndex);
    }
  };
  const getData = async (data: any) => {
    setIsLoading("fetchingData");
    try {
      const morenftRes = await getMarketplace(
        `User/GetMoreNftsByCollection/${data.collectionId}/${data.creatorId}/${tokenId}/${user?.id}`
      );
      if (morenftRes.statusText.toLowerCase() === "ok") {
        setData(morenftRes.data);
      } else {
        rootDispatch(setError({ message: morenftRes }));
      }
    } catch (error) {
      rootDispatch(setError({ message: error }));
    } finally {
      setIsLoading("");
    }
  };
  const saveFavorite = async (item: any) => {
    if (!user || !user?.id) {
      modalActions("walletConnectModal", "open");
      return;
    }
    setIsLoading(item?.id);
    try {
      const obj = {
        nftId: item.id,
        customerId: user?.id,
        isFavourite: !item.isFavourite,
      };
      const response = await postMarketplace(`User/SaveFavorite`, obj);
      if (response.statusText.toLowerCase() === "ok") {
        const dataToUpdate = data?.map((nft: any) => {
          if (nft.id === item.id) {
            nft.isFavourite = !item.isFavourite;
          }
          return nft;
        });
        setData(dataToUpdate);
      } else {
        rootDispatch(setError(response));
      }
    } catch (errorMsg) {
      rootDispatch(setError({ message: errorMsg }));
    } finally {
      setIsLoading("");
    }
  };
  const { isConnected, address } = useAccount();
  const visibleNfts = useMemo(() => {
    return data && data?.length > 0
      ? [...data.slice(currentIndex), ...data.slice(0, currentIndex)].slice(
          0,
          5
        )
      : [];
  }, [data, currentIndex]);
  const navigateToNft = async (nft: any) => {
    if (!user?.id) {
      navigate(
        `/marketplace/nft/${nft.tokenId}/${
          nft?.collectionContractAddress || nft?.creatorWalletAddress
        }/${nft.id}`
      );
      return;
    }
    try {
      setIsLoading("fetchingData");
      const obj = {
        nftId: nft.id,
        customerId: user.id,
      };
      await postMarketplace(`User/SaveViewer`, obj);
    } catch (errorMsg) {
      rootDispatch(setError({ message: errorMsg }));
    } finally {
      setIsLoading("");
      navigate(
        `/marketplace/nft/${nft.tokenId}/${
          nft?.collectionContractAddress || nft?.creatorWalletAddress
        }/${nft.id}`
      );
    }
  };
  return (
    <section className="mt-5">
      <h2 className="text-[24px] font-semibold text-secondary mb-5 mt-6">
        More from this collection
      </h2>
      <div className="min-h-[250px]">
        <div className="relative container">
          <div className="carousel gap-4 flex py-2 px-2 md:px-14">
            {isLoading !== "fetching" &&
              data &&
              data?.length > 0 &&
              visibleNfts?.map((item) => (
                <div
                  className="carousel-item more-collection mt-3 shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]"
                  key={item.id}
                >
                  <div className="cursor-pointer">
                    <Button
                      handleClick={() => navigateToNft(item)}
                      type="plain"
                      btnClassName="w-full"
                    >
                      <img
                        src={item?.image || defaultlogo}
                        alt=""
                        className={`h-[255px] w-full object-cover rounded-tl-lg rounded-tr-lg  ${
                          item?.isUnlockPurchased &&
                          address !== item?.walletAddress
                            ? "blur-image"
                            : ""
                        }`}
                      />
                    </Button>
                    <div className="bg-black top-3 absolute cursor-pointer right-3 rounded-full">
                      <Button
                        type="plain"
                        handleClick={() => saveFavorite(item)}
                        btnClassName=""
                        disabled={isLoading}
                      >
                        {isLoading === item?.id && (
                          <span className="text-white">
                            <Spinner size="loading-sm" />
                          </span>
                        )}
                        {isLoading !== item?.id && (
                          <span
                            className={`icon like-white  ${
                              item?.isFavourite ? "active" : ""
                            }`}
                          ></span>
                        )}
                      </Button>
                    </div>
                    <Button
                      handleClick={() => navigateToNft(item)}
                      type="plain"
                      btnClassName="w-[100%]"
                    >
                      <div className="px-2 py-2.5">
                        <p className="text-xs text-secondary truncate text-left font-medium">
                          {item.creator || item.walletAddress || "--"}
                        </p>
                        <h1 className="mb-2.5 text-left text-base font-semibold truncate text-secondary">
                          {" "}
                          {item.name}{" "}
                        </h1>

                        <div className="flex justify-between truncate mb-3 gap-2">
                          <p className="opacity-60 truncate text-secondary">
                            Price
                          </p>
                          <p className="font-semibold text-secondary flex-1 truncate text-right">
                            {item.price ? item.price : "--"}{" "}
                            {item.currency && item.price
                              ? item.currency.toUpperCase()
                              : " "}
                          </p>
                        </div>
                        <div className="flex justify-between gap-2">
                          <p className="opacity-60 truncate text-secondary">
                            Highest bid
                          </p>
                          <p className="font-semibold text-secondary flex-1 truncate text-right">
                            {item.highestBid ? item.highestBid : "--"}{" "}
                            {item.currency && item.highestBid
                              ? item.currency.toUpperCase()
                              : " "}
                          </p>
                        </div>
                      </div>
                    </Button>
                    <hr />
                    <div
                      className={`px-2.5 py-4 flex  ${
                        item?.walletAddress !== address
                          ? "justify-center"
                          : "justify-between"
                      }`}
                    >
                      {!item?.isPutOnSale &&
                        !item?.isPutOnAuction &&
                        item?.walletAddress === address && (
                          <div className=" flex justify-center">
                            <div className="flex shop-card cursor-pointer">
                              <span className="icon square-arrow"></span>
                              <Button
                                btnClassName="font-semibold !p-0 min-h-min h-auto !shadow-none !bg-transparent text-secondary ml-1 whitespace-nowrap hover:text-primary"
                                handleClick={() => navigateToNft(item)}
                              >
                                Put On Sale
                              </Button>
                            </div>
                          </div>
                        )}
                      {!item?.isPutOnSale &&
                        !item?.isPutOnAuction &&
                        item?.walletAddress === address && (
                          <div className=" flex justify-center">
                            <div className="flex shop-card cursor-pointer">
                              <span className="icon square-arrow"></span>
                              <Button
                                btnClassName="font-semibold !p-0 min-h-min h-auto !shadow-none !bg-transparent text-secondary ml-1 whitespace-nowrap hover:text-primary"
                                handleClick={() => navigateToNft(item)}
                              >
                                Put On Auction
                              </Button>
                            </div>
                          </div>
                        )}
                      {/* <div className="w-px border"></div> */}
                      {item?.isPutOnSale && item?.walletAddress !== address && (
                        <div className="flex shop-card cursor-pointer">
                          <span className="icon square-arrow"></span>
                          <Button
                            btnClassName="font-semibold !p-0 min-h-min h-auto !shadow-none !bg-transparent text-secondary ml-1 whitespace-nowrap hover:text-primary"
                            handleClick={() => navigateToNft(item)}
                          >
                            Buy Now
                          </Button>
                        </div>
                      )}
                      {item?.isPutOnAuction &&
                        item?.walletAddress !== address && (
                          <div className="flex shop-card cursor-pointer">
                            <span className="icon square-arrow"></span>
                            <Button
                              btnClassName="font-semibold !p-0 min-h-min h-auto !shadow-none !bg-transparent text-secondary ml-1 whitespace-nowrap hover:text-primary"
                              handleClick={() => navigateToNft(item)}
                            >
                              Place a Bid
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            {isLoading === "fetching" &&
              Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="more-collection mt-3">
                  <FoundingMemberSimmer />
                </div>
              ))}
          </div>
          {visibleNfts?.length >= 5 && (
            <div className="md:flex md:absolute md:w-full justify-between md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 max-sm:mt-4">
              <Button
                type="plain"
                handleClick={() => handleSlideActions("previous")}
              >
                <span className="icon carousal-left-arrow cursor-pointer lg:scale-[1.4] mr-1"></span>
              </Button>
              <Button
                type="plain"
                handleClick={() => handleSlideActions("next")}
              >
                <span className="icon carousal-right-arrow cursor-pointer lg:scale-[1.4]"></span>
              </Button>
            </div>
          )}
        </div>
        {data?.length === 0 && <NoDataFound text={""} />}
      </div>
    </section>
  );
};

export default React.memo(MoreFromCollection);
