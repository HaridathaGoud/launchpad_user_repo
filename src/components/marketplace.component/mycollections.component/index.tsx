import React, { useEffect, useRef, useReducer } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import defaultlogo from "../../../assets/images/default-logo.png";
import { useAccount } from "wagmi";
import { useLocation, useNavigate } from "react-router-dom";
import { clearNfts, fetchNfts ,fetchCollections} from "../../../reducers/marketPlaceReducer";
import { store } from "../../../store";
import { saveFavorite, saveViews } from "./services";
import Button from "../../../ui/Button";
import { nftsReducer, nftsState } from "./reducers";
import Spinner from "../../loaders/spinner";
import FoundingMemberSimmer from "../../loaders/projects/foundingmembersshimmer";
import WalletConnect from "../../../layout/Login";
import { Modal, modalActions } from "../../../ui/Modal";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import BreadCrumb from "../../../ui/breadcrumb";
import NoDataFound from "../../../ui/noData";
const pageSize = 10;
const search = null;
function MyCollections(props: any) {
  const { address, isConnected } = useAccount();


  const [localState, localDispatch] = useReducer(nftsReducer, nftsState);
  const navigate = useNavigate();
  const location = useLocation();
  const user = store.getState().auth;
  const scrollableRef = useRef<any>(null);
  const { loader, error, data, pageNo } = useSelector(
    (store: any) => store.exploreNfts
  );
  const errorMessage=useSelector(((store:any)=>store.layoutReducer.error.message))
  const rootDispatch = useDispatch();
  useEffect(() => {
    // store.dispatch(fetchNfts(data, 1, "all", search, props.auth.user?.id));
    store.dispatch(fetchCollections(data, 1, search,location?.pathname,user?.user?.id ));
    scrollableRef?.current?.scrollIntoView(0, 0);
    if (error) rootDispatch(setError({message:error}))

    return () => {
      store.dispatch(clearNfts());
    };
  }, [props.auth.user?.id,location?.pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  const loadmore = () => {
    store.dispatch(fetchCollections(data, pageNo, search,location?.pathname,user?.user?.id ));
  };
  const addToFavorites = (item: any) => {
    if (isConnected) {
      saveFavoriteNft(item);
    } else {
      modalActions("connect-wallet-model-exploreNfts", "open");
    }
  };
  const saveFavoriteNft = async (item: any) => {
    errorMessage && rootDispatch(setError({message:''}))
    localDispatch({
      type: "setFavoriteLoader",
      payload: { id: item.id, loading: true },
    });
    try {
      let obj = {
        nftId: item.id,
        customerId: props.auth.user?.id,
        isFavourite: !item.isFavourite,
      };
      const { status, error } = await saveFavorite(obj);
      if (status) {
        rootDispatch(
          setToaster({
            message: `Nft ${
              item.isFavourite ? "removed from" : "added to"
            } Favorites!`,
          })
        );
        store.dispatch(
          fetchCollections(data, 1, null, data.length)
        );
      }
      if (error) rootDispatch(setError({message:error}));
    } catch (error) {
      rootDispatch(setError({message:"Something went wrong, please try again!"}))
    } finally {
      localDispatch({
        type: "setFavoriteLoader",
        payload: { id: "", loading: false },
      });
    }
  };

  const navigateToAsset = (item) => {
    navigate(
      `/marketplace/nft/${item.tokenId}/${item.collectionContractAddress}/${item.id}`
    );
  };
  const saveView = async (item) => {
    localDispatch({
      type: "setLoader",
      payload: true,
    });
    try {
      let obj = {
        nftId: item.id,
        customerId: props.auth.user?.id,
      };
      const { status, error } = await saveViews(obj);
      if (status) navigateToAsset(item);
      if (error) rootDispatch(setError({message:error}));
    } catch (_) {
      rootDispatch(setError({message:"Something went wrong, please try again!"}))
    } finally {
      localDispatch({
        type: "setLoader",
        payload: false,
      });
    }
  };
  const handleButtonClick = () => {
    navigate('/marketplace/collection/create');
  };
  return (
    <>
      <div ref={scrollableRef}></div>
      <div className="container mx-auto pt-5 px-3 lg:px-0">
        <BreadCrumb/>
       <div className="flex justify-between items-center mb-[28px]">
        <div>
        <h2 className="text-[24px] text-secondary font-semibold mb-3">
        View {location?.pathname === "/marketplace/mycollections" ? "my collections" : "collections"}
        </h2>
        <p className="text-secondary opacity-60">Create, curate, and manage collections of unique NFTs to share and sell.</p>
        </div>
      { location?.pathname === "/marketplace/mycollections" &&  <Button handleClick={handleButtonClick} type="primary" btnClassName="min-w-[180px]">Create</Button>}
       </div>
        {
          <Modal id={"connect-wallet-model-exploreNfts"}>
            <WalletConnect
              onWalletConect={() => {}}
              onWalletClose={() => {
                modalActions("connect-wallet-model-exploreNfts", "close");
              }}
            />
          </Modal>
        }
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3">
          {data &&
            !localState?.loader &&
            data?.map((item: any) => (
              <div className="">

              <div className="card bg-primary-content lg:w-[300px] " onClick={() => saveView(item)}>
                <div className="">
                  <img src={item.logo} alt="" className="h-[300px] object-cover rounded-[16px]" />
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-2xl capitalize text-secondary">{item.collectionName}</h4>
                  <div className="">

                    <div className="flex justify-between items-center mt-[18px]">
                      <label className="text-secondary text-base">Floor</label>
                      {item.flourValue && (
                        <>
                          <p className="text-secondary text-lg font-semibold flex-1 text-right break-all">
                            {item.flourValue} {process.env.REACT_APP_TOKENNAME}
                          </p>
                        </>
                      )}
                      {!item.flourValue && (
                        <>
                          <p className=" text-secondary text-lg font-semibold flex-1 text-right break-all">{item.flourValue || '-'}</p>
                        </>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <label className="text-secondary text-base flex-1">Total Valume</label>
                      <p className="text-secondary text-lg font-semibold flex-1 text-right break-all">
                        {item.totalVolume} {process.env.REACT_APP_TOKENNAME}
                      </p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
              // <div
              //   className="mt-3 shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]"
              //   key={item.id}
              // >
              //   <div className="cursor-pointer">
              //     <Button
              //       handleClick={
              //         isConnected
              //           ? () => saveView?.(item)
              //           : () => navigateToAsset(item)
              //       }
              //       type="plain" btnClassName="w-full"
              //     >
              //       <div className="">
              //         {" "}
              //         <img
              //           src={
              //             item?.logo && !item?.logo?.includes("null")
              //               ? item.logo.replace(
              //                   "ipfs://",
              //                   "https://ipfs.io/ipfs/"
              //                 )
              //               : defaultlogo
              //           }
              //           alt=""
              //           className={`h-[255px] w-full object-cover rounded-tl-lg rounded-tr-lg  ${
              //             item?.isUnlockPurchased &&
              //             address !== item?.walletAddress
              //               ? "blur-image"
              //               : ""
              //           }`}
              //         />
              //       </div>
              //     </Button>
              //     <div className="bg-black top-3 absolute cursor-pointer right-3 rounded-full">
              //       <Button
              //         type="plain"
              //         handleClick={() => addToFavorites(item)}
              //         btnClassName=""
              //       >
              //         {localState?.favoriteLoader?.id !== item.id && (
              //           <span
              //             className={`icon like-white ${
              //               item?.isFavourite ? "active" : ""
              //             }`}
              //           ></span>
              //         )}
              //         {localState?.favoriteLoader?.id === item.id &&
              //           localState?.favoriteLoader?.loading && (
              //             <span>
              //               <Spinner />
              //             </span>
              //           )}
              //       </Button>
              //     </div>
              //     <Button
              //       handleClick={
              //         isConnected
              //           ? () => saveView(item)
              //           : () => navigateToAsset(item)
              //       }
              //       type="plain"
              //       btnClassName="w-[100%]"
              //     >
              //       <div className="px-2 py-2.5">
              //         <p className="text-xs text-left text-secondary truncate">
              //           {item.creator}
              //         </p>
              //         <h1 className="mb-2.5 text-left text-base font-semibold truncate text-secondary">
              //           {" "}
              //           {item.collectionName}{" "}
              //         </h1>

              //         <div className="flex justify-between truncate mb-3 gap-2">
              //           <p className="opacity-60 truncate text-secondary">
              //             Price
              //           </p>
              //           <p className="font-semibold text-secondary flex-1 truncate text-right">
              //             {item.price ? item.price : "--"}{" "}
              //             {item.currency && item.price
              //               ? item.currency.toUpperCase()
              //               : " "}
              //           </p>
              //         </div>
              //         <div className="flex justify-between gap-2">
              //           <p className="opacity-60 truncate text-secondary">
              //             Highest bid
              //           </p>
              //           <p className="font-semibold text-secondary flex-1 truncate text-right">
              //             {item.highestBid ? item.highestBid : "--"}{" "}
              //             {item.currency && item.highestBid
              //               ? item.currency.toUpperCase()
              //               : " "}
              //           </p>
              //         </div>
              //       </div>
              //     </Button>
              //     <hr />
              //     <div className="px-2.5 py-4 flex justify-between">
              //       <div className="flex add-cart cursor-pointer">
              //         <span className="icon card-cart"></span>
              //         <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
              //           Add to Cart
              //         </span>
              //       </div>
              //       <div className="w-px border"></div>
              //       <div className="flex shop-card cursor-pointer">
              //         <span className="icon card-shop"></span>
              //         <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
              //           Buy Now
              //         </span>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            ))}
          {(loader || localState?.loader) &&
            Array.from({ length: pageSize }, (_, index) => (
              <div key={index}>
                <FoundingMemberSimmer />
              </div>
            ))}
          {data?.length === 0 && !loader && (
            <div className="col-span-5">
              <NoDataFound text ={''}/>
            </div>
          )}
        </div>
        {data?.length === (pageNo - 1) * pageSize && (
          <div className="category-more">
            <div className="text-center mt-5">
              <span
                onClick={loadmore}
                className="cursor-pointer text-base text-primary font-semibold"
              >
                See More
              </span>
              <i
                className="icon block mx-auto see-more cursor-pointer"
                onClick={loadmore}
              ></i>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(MyCollections);
