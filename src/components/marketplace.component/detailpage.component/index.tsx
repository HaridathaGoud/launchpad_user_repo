import "react-multi-carousel/lib/styles.css";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { getMarketplace, postMarketplace } from "../../../utils/api";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import { useBalance, useAccount } from "wagmi";
import PutOnSale from "../../../utils/putonsale";
import BuyComponent from "../../../utils/buyNow";
import defaultlogo from "../../../assets/images/default-bg.png";
import useCopyToClipboard from "../../../hooks/useCopytoClipboard";
import Button from "../../../ui/Button";
import DetailpageShimmer from "../loaders/detailpageShimmer";
import { modalActions } from "../../../ui/Modal";
import DropdownMenus from "../../../ui/DropdownMenus";
import Details from "./details";
import BiddingDetails from "./biddingDetails";
import MoreFromCollection from "./moreFromCollection";
import PlaceBid from "./placeBid";
import PutOnAuction from "./putOnAuction";
import CancelSaleOrAuction from "./cancelSaleOrAuction";
import { setError } from "../../../reducers/layoutReducer";

const DetailPage = (props: any) => {
  const rootDispatch = useDispatch();
  const [drawerToOpen, setDrawerToOpen] = useState("");
  const [nftDetails, setNftDetails] = useState<any>();
  const [loader, setLoader] = useState(true);
  const [favCount, setfavCount] = useState();
  const [viewsCount, setviewsCount] = useState();
  const [nftcontractDetails, setNFTContractdetails] = useState<any>();
  const [moreCollection, setmoreCollection] = useState<any[]>([]);
  const [fav, setFav] = useState(false);
  const { address, isConnected } = useAccount();
  const { data } = useBalance({ address: address });
  const router = useNavigate();
  const [bidData, setBidData] = useState([]);
  const { tokenId, collectionAddress, nftId } = useParams();
  const { isCopied, handleCopy } = useCopyToClipboard();
  const [percentageValue, setPercentageValue] = useState();
  const [totalBuyValue, setTotalBuyValue] = useState();
  const [count, setCount] = useState(1);
  const scrollableRef = useRef<any>(null);
  const handleDrawerToOpen = (
    drawer: string,
    shouldConnect: boolean = true
  ) => {
    if ((!isConnected || !props?.auth.user?.id) && shouldConnect) {
      modalActions("walletConnectModal", "open");
      return;
    }
    if (drawer) {
      setDrawerToOpen(drawer);
      return;
    }
    setDrawerToOpen("");
  };
  const updateCounter = () => {
    setCount(count + 1);
  };
  const deCounter = () => {
    setCount(count - 1);
  };
  function initialize() {
    loadNftDetails();
    loadFavoritesCount();
    loadNFTViewsCount();
    getNFTContractdetails();
    // getNFTProperties();
    getbidData();
    // setMetaConnectionError(null);
  }
  useEffect(() => {
    if (tokenId && collectionAddress && nftId) {
      initialize();
    }
  }, [tokenId, collectionAddress, nftId, isConnected]);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const loadNftDetails = async () => {
    setLoader(true);
    await getMarketplace(`User/NFTDetails/${nftId}/${props.auth.user.id || ""}`)
      .then((response: any) => {
        const { properties, ...data } = response.data;
        const propertiesToUpdate = properties ? JSON.parse(properties) : [];
        setNftDetails({ ...data, properties: propertiesToUpdate });
        percentage(response.data);
        setFav(response.data.isFavorite);
        setLoader(false);
        getMoreNftsCollection(response.data);
      })
      .catch((error: any) => {
        setLoader(false);
        rootDispatch(setError(error));
      });
  };
  const percentage = (details) => {
    const buyValue = details.price;
    let percentage = (buyValue * 1) / 100;
    setPercentageValue(percentage);
    let totalValue = buyValue + percentage;
    setTotalBuyValue(totalValue);
  };
  const getMoreNftsCollection = async (data: any) => {
    let morenftRes = await getMarketplace(
      `User/GetMoreNftsByCollection/${data.collectionId}/${data.creatorId}/${tokenId}/${props?.auth?.user?.id}`
    );
    if (morenftRes) {
      setmoreCollection(morenftRes.data);
      scrollableRef.current?.scrollIntoView(0, 0);
    } else {
      rootDispatch(setError({message:morenftRes}));
      scrollableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const loadFavoritesCount = async () => {
    let response = await getMarketplace(`User/NftFavoritesCount/${nftId}`);
    if (response) {
      setfavCount(response.data);
    } else {
      rootDispatch(setError(response));
    }
  };
  const loadNFTViewsCount = async () => {
    let response = await getMarketplace(`User/getviewerscount/${nftId}`);
    if (response) {
      setviewsCount(response.data);
    } else {
      rootDispatch(setError(response));
    }
  };
  const getNFTContractdetails = async () => {
    let response = await getMarketplace(
      `User/GetNFTContractDetails/${tokenId}/${collectionAddress}`
    );
    if (response) {
      setNFTContractdetails(response.data);
    } else {
      rootDispatch(setError(response));
    }
  };
  const getDate = (date: any) => {
    var dateIn = moment(date, "YYYY/MM/DD");
    return dateIn.format("DD/MM/YYYY");
  };
  const gotoFavorite = (val: any) => {
    if (isConnected) {
      savefavroite(val);
    } else {
    }
  };
  const gotoFev = (item: any) => {
    if (isConnected) {
      moreCollectionSavefavroite(item);
    } else {
    }
  };
  const savefavroite = async (val: any) => {
    let obj = {
      nftId: nftId,
      customerId: props.auth.user?.id,
      isFavourite: val ? false : true,
    };
    let response = await postMarketplace(`User/SaveFavorite`, obj);
    if (response) {
      loadNftDetails();
      loadFavoritesCount();
    } else {
      rootDispatch(setError(response));
    }
  };
  const moreCollectionSavefavroite = async (item: any) => {
    let obj = {
      nftId: item.id,
      customerId: props.auth.user?.id,
      isFavourite: item.isFavourite ? false : true,
    };
    let response = await postMarketplace(`User/SaveFavorite`, obj);
    if (response) {
      loadNftDetails();
      loadFavoritesCount();
    } else {
      rootDispatch(setError(response));
    }
  };
  const getNFTImageUrl = (file: any) => {
    const filePath = file?.replace("ipfs://", "");
    return process.env.REACT_APP_IPFS_PREFIX + `${filePath}`;
  };

  const getbidData = async () => {
    let response = await getMarketplace(`User/biddata/${nftId}/${10}/${0}`);
    if (response) {
      setBidData(response.data);
    } else {
      rootDispatch(setError(response));
    }
  };

  const goToAccount = (item: any, type: any) => {
    if (type == "creator") {
      router(`/accounts/${item?.creatorWalletAddress || address}`);
    } else if (type == "currentOwner") {
      router(`/accounts/${item?.ownerAddress || address}`);
    }
  };

  const moreCollectionClick = async (item) => {
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
        scrollableRef.current.scrollIntoView(0, 0);
      })
      .catch((error: any) => {
        rootDispatch(setError(error));
      });
  };

  const notConnectCollectionClick = (item) => {
    scrollableRef.current.scrollIntoView(0, 0);
    router(
      `/marketplace/nft/${item.tokenId}/${
        item?.collectionContractAddress || item?.creatorWalletAddress
      }/${item.id}`
    );
  };
  const dropdownList = useMemo(() => {
    let list: any[] = [];
    if (nftDetails?.isPutonSale) {
      list = [
        {
          name: "Cancel sale",
          action: () => handleDrawerToOpen("cancelSaleOrAuction"),
          isActive: false,
        },
      ];
    }
    if (nftDetails?.isPutOnAuction) {
      list = [
        {
          name: "Cancel auction",
          action: () => handleDrawerToOpen("cancelSaleOrAuction"),
          isActive: false,
        },
      ];
    }
    if (!nftDetails?.isPutonSale && !nftDetails?.isPutOnAuction) {
      list = [
        {
          name: "Put on sale",
          action: () => handleDrawerToOpen("putOnSale"),
          isActive: false,
        },
        {
          name: "Put on auction",
          action: () => handleDrawerToOpen("putOnAuction"),
          isActive: false,
        },
      ];
    }

    return list;
  }, [nftDetails]);
  return (
    <>
      <div ref={scrollableRef}></div>
      <div className="container nft-detailview mx-auto px-3 lg-px-0">
        {loader && <DetailpageShimmer />}
        {!loader && (
          <>
            <section className="mt-5">
              <div className="grid lg:grid-cols-12 gap-[40px]">
                <div className="lg:col-span-5">
                  <div className="relative">
                    <div className="flex justify-between items-center absolute top-5 w-full px-5">
                      <div>
                        <span className="icon matic-detail "></span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-black cursor-pointer rounded-full px-2">
                          <span className="text-white align-middle">
                            {favCount}
                          </span>
                          <Button
                            type="plain"
                            handleClick={() =>
                              gotoFavorite(nftDetails?.isFavorite)
                            }
                          >
                            <span
                              className={`icon like-white ${
                                nftDetails?.isFavorite ? "active" : ""
                              }`}
                            ></span>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <img
                        src={
                          nftDetails?.image &&
                          !nftDetails?.image?.includes("null")
                            ? `${getNFTImageUrl(nftDetails?.image)}`
                            : defaultlogo
                        }
                        //src={nftDetails?.image ? nftDetails?.image: defaultlogo }
                        alt=""
                        // className="detail-image"
                        className={` h-[516px] ${
                          nftDetails?.isUnlockPurchased &&
                          address?.toLowerCase() !==
                            nftDetails?.creatorWalletAddress?.toLowerCase()
                            ? "w-full object-cover rounded-2xl blur"
                            : "w-full object-cover rounded-2xl"
                        }`}
                      />
                    </div>
                  </div>
                  <Details
                    nftDetails={nftDetails}
                    nftcontractDetails={nftcontractDetails}
                    isCopied={isCopied}
                    handleCopy={handleCopy}
                    getDate={getDate}
                    collectionAddress={collectionAddress}
                  />
                </div>
                <div className="lg:col-span-7">
                  <div className="p-0">
                    <div className="">
                      <div className="flex justify-between items-start mb-3 sm:mt-2">
                        <h1 className="text-3xl text-secondary font-semibold mb-3">
                          {nftDetails?.name || "--"}
                        </h1>

                        {nftDetails?.ownerAddress?.toLowerCase() ===
                          address?.toLowerCase() && (
                          <DropdownMenus
                            dropdownClass="dropdown-end"
                            btnContent={
                              <span className="icon dots transform rotate-90"></span>
                            }
                            dropdownList={dropdownList}
                          />
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h1 className="font-semibold text-secondary">
                            Creator
                          </h1>
                          <div className="">
                            <Button
                              handleClick={() =>
                                goToAccount(nftDetails, "creator")
                              }
                              type="plain"
                            >
                              <span className="text-neutral font-semibold cursor-pointer">
                                {nftDetails?.creatorName ||
                                  (nftDetails?.creatorWalletAddress
                                    ? nftDetails?.creatorWalletAddress?.slice(
                                        0,
                                        4
                                      ) +
                                      "...." +
                                      nftDetails?.creatorWalletAddress?.substring(
                                        nftDetails?.creatorWalletAddress
                                          ?.length - 4
                                      )
                                    : "Un named")}
                              </span>
                            </Button>
                          </div>
                        </div>
                        <div>
                          <h1 className="font-semibold text-secondary">
                            Current Owner
                          </h1>
                          <div className="">
                            <Button
                              type="plain"
                              handleClick={() =>
                                goToAccount(nftDetails, "currentOwner")
                              }
                            >
                              <span className="text-neutral font-semibold cursor-pointer">
                                {" "}
                                {nftDetails?.ownerName ||
                                  (nftDetails?.ownerAddress
                                    ? nftDetails?.ownerAddress?.slice(0, 4) +
                                      "...." +
                                      nftDetails?.ownerAddress?.substring(
                                        nftDetails?.ownerAddress?.length - 4
                                      )
                                    : "Un named")}
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-6 mt-8">
                      <div>
                        <span className="icon eye"> </span>
                        <span className="text-secondary font-semibold opacity-60">
                          {viewsCount} views
                        </span>
                      </div>
                      <div>
                        <span className="icon gray-love"></span>
                        <span className="text-secondary font-semibold opacity-60">
                          {favCount} favorites
                        </span>
                      </div>
                      <div>
                        <span className="icon art"></span>
                        <span className="text-secondary font-semibold opacity-60">
                          {nftDetails?.categoryName || "-"}
                        </span>
                      </div>
                    </div>
                    <hr className="mt-[18px] mb-2.5" />
                    <div className="md:flex justify-between gap-4">
                      {nftDetails?.price && (
                        <div>
                          <h3 className="text-secondary text-2xl mb-3 opacity-60">
                            Current Price
                          </h3>
                          <h1 className="text-3xl text-secondary font-semibold mb-5 break-all">
                            {nftDetails?.price}{" "}
                            {nftDetails?.currency?.toUpperCase()}
                          </h1>
                          <p className="text-secondary mt-7 text-base opacity-60">
                            {/* $1,072.29 */}
                          </p>
                        </div>
                      )}
                      {/* <div className="max-sm:mt-4">
                        <p className="font-semibold text-secondary break-all">
                          View proof of authenticity
                        </p>
                        <p className="text-neutral my-3 break-all">
                          View on Maticscan
                        </p>
                        <p className="text-neutral break-all">View on IPFS</p>
                        <p></p>
                      </div> */}
                    </div>
                  </div>

                  <div className="md:flex items-center justify-between">
                    {nftDetails?.ownerAddress !== address && (
                      <div className="mt-4">
                        {nftDetails?.saleType &&
                          nftDetails?.saleType === "Sale" &&
                          nftDetails?.ownerAddress?.toLowerCase() !==
                            address?.toLowerCase() && (
                            <Button
                              type="secondary"
                              btnClassName="mr-2.5"
                              handleClick={() => handleDrawerToOpen("buyNow")}
                            >
                              Buy Now
                            </Button>
                          )}
                        {nftDetails?.saleType &&
                          nftDetails?.ownerAddress?.toLowerCase() !==
                            address?.toLowerCase() && (
                            <Button
                              type="cancel"
                              handleClick={() => handleDrawerToOpen("placeBid")}
                              btnClassName="ml-2.5"
                            >
                              Place a bid
                            </Button>
                          )}
                      </div>
                    )}
                    {/* <div
                      className={`max-sm:mt-4 border-[2px] rounded-[28px] justify-between md:min-w-[132px] px-3 py-2 flex gap-3 items-center`}
                    >
                      <span
                        className={`detail-minus icon cursor-pointer`}
                        onClick={deCounter}
                      ></span>
                      <p className="font-semibold text-secondary">{count}</p>
                      <span
                        className={`detail-plus icon cursor-pointer`}
                        onClick={updateCounter}
                      ></span>
                    </div> */}
                  </div>
                  <h2 className="text-base font-semibold text-secondary mt-9 mb-3.5">
                    Properties
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nftDetails.properties?.map((property: any) => {
                      return (
                        <div
                          key={property.trait_type + property.value}
                          className="border border-[#939393] px-5 py-4 text-center rounded-lg"
                        >
                          <p className="text-neutral font-semibold">
                            {property.trait_type}
                          </p>
                          <p className="text-secondary font-semibold my-1">
                            {property.value}
                          </p>
                          <p className="text-secondary">
                            {property.used || "--"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
            {/* place a bid drawer start  */}
            {drawerToOpen === "placeBid" && (
              <PlaceBid
                nftDetails={nftDetails}
                nftId={nftId}
                collectionAddress={collectionAddress}
                show={drawerToOpen === "placeBid"}
                setShow={handleDrawerToOpen}
                data={data}
                percentageValue={percentageValue}
                totalBuyValue={totalBuyValue}
                tokenId={tokenId}
              />
            )}

            <BiddingDetails
              nftDetails={nftDetails}
              bidData={bidData}
              nftId={nftId}
              collectionAddress={collectionAddress}
              tokenId={tokenId}
            />
            <MoreFromCollection
              gotoFev={gotoFev}
              getNFTImageUrl={getNFTImageUrl}
              moreCollection={moreCollection}
              moreCollectionClick={moreCollectionClick}
              notConnectCollectionClick={notConnectCollectionClick}
            />
            <PutOnSale
              refresh={loadNftDetails}
              nftDetails={nftDetails}
              setShow={handleDrawerToOpen}
              show={drawerToOpen === "putOnSale"}
              reqFields={{
                tokenId: tokenId,
                data: data,
                auth: props.auth,
                collectionAddress: collectionAddress,
              }}
            ></PutOnSale>

            {nftDetails && drawerToOpen === "buyNow" && (
              <BuyComponent
                isOpen={drawerToOpen === "buyNow"}
                setIsOpen={handleDrawerToOpen}
                handleClose={handleDrawerToOpen}
                nftDetails={nftDetails}
                collectionAddress={collectionAddress}
                getNFTImageUrl={getNFTImageUrl}
              />
            )}
            {/* putonauction drawer start  */}
            <PutOnAuction
              refresh={loadNftDetails}
              nftDetails={nftDetails}
              setShow={handleDrawerToOpen}
              show={drawerToOpen === "putOnAuction"}
              tokenId={tokenId}
              collectionAddress={collectionAddress}
            />
            {/* putonauction drawer end  */}
            {/* cancel sale or autction drawer start  */}
            <CancelSaleOrAuction
              type={nftDetails?.isPutonSale ? "Sale" : "Auction"}
              show={drawerToOpen === "cancelSaleOrAuction"}
              setShow={handleDrawerToOpen}
              nftDetails={nftDetails}
              nftId={nftId}
              refresh={loadNftDetails}
            />
            {/* cancel sale or auction drawer end  */}
          </>
        )}
      </div>
    </>
  );
};
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(DetailPage);
