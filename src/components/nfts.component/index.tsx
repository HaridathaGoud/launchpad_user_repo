import React, { useEffect, useRef, useReducer} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { useNavigate, useParams } from "react-router-dom";
import { clearNfts, fetchNfts } from "../../reducers/marketPlaceReducer";
import { store } from "../../store";
import { saveFavorite, saveViews } from "./services";
import Button from "../../ui/Button";
import { nftsReducer, nftsState } from "./reducers";
import Spinner from "../loaders/spinner";
import FoundingMemberSimmer from "../loaders/projects/foundingmembersshimmer";
import { modalActions } from "../../ui/Modal";
import { setError, setToaster } from "../../reducers/layoutReducer";
import NoDataFound from "../../ui/noData";
import StatusDetailview from "../marketplace.component/hotcollections.component/detailviewstatus";
import SearchBar from "../../ui/searchBar";
import ListView from "../marketplace.component/hotcollections.component/listview";
import { guid } from "../../utils/constants";
import defaultlogo from '../../assets/images/default-logo.png';
const pageSize = 6;
function Nfts(props: any) {
    const { address, isConnected } = useAccount();
    const params = useParams();
    console.log(params,"23");
    const [localState, localDispatch] = useReducer(nftsReducer, nftsState);
    const navigate = useNavigate();
    const scrollableRef = useRef<any>(null);
    const searchInputRef = useRef<any>(null)
    const { loader, error, data, pageNo } = useSelector(
        (store: any) => store.exploreNfts
    );
    console.log(loader, error, data, pageNo )
    const nftDetails = useSelector((storage: any) => storage.exploreNfts)
    const errorMessage = useSelector(((store: any) => store.layoutReducer.error.message))
    const user = useSelector((state: any) => state.auth.user);
    const rootDispatch = useDispatch();

    useEffect(() => {
        debugger
        let obj = { ...localState.values };
        obj.data = data;
        obj.collectionid = params?.collectionid;
        obj.customerId = user?.id || guid;
        obj.walletAddress = params?.walletAddress;
        obj.activeTab = props?.selectTabs || "GetNfts"
        store.dispatch(fetchNfts(obj, props?.type));
        scrollableRef?.current?.scrollIntoView(0, 0);
        if (error) {
            rootDispatch(setError({ message: error }));
        }
        return () => {
            store.dispatch(clearNfts());
        };
    }, [ localState.values,props?.selectedTabs,props?.type]); // eslint-disable-line react-hooks/exhaustive-deps

    const loadmore = () => {
        let obj = { ...localState.values };
        obj.data = data;
        obj.pageNo = pageNo;
        obj.collectionid = params?.collectionid;
        obj.walletAddress = params?.walletAddress;
        obj.customerId = user?.id || guid;
        store.dispatch(fetchNfts(obj,props?.type));
    };
    const addToFavorites = (item: any) => {
        if (isConnected) {
            saveFavoriteNft(item);
        } else {
            modalActions("connect-wallet-model-exploreNfts", "open");
        }
    };
    const saveFavoriteNft = async (item: any) => {
        debugger
        errorMessage && rootDispatch(setError({ message: '' }))
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
                        message: `Nft ${item.isFavourite ? "removed from" : "added to"
                            } Favorites!`,
                    })
                );
                let obj = { ...localState.values };
                // obj.data = data;
                obj.collectionid = params?.collectionid;
                obj.customerId = user?.id || guid;
                obj.walletAddress = params?.walletAddress;
                obj.activeTab = props?.selectTabs || "GetNfts"
                store.dispatch(fetchNfts(obj,props?.type));
            }
            if (error) rootDispatch(setError({ message: error }));
        } catch (error) {
            rootDispatch(setError({ message: "Something went wrong, please try again!" }))
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
            if (error) rootDispatch(setError({ message: error }));
        } catch (_) {
            rootDispatch(setError({ message: "Something went wrong, please try again!" }))
        } finally {
            localDispatch({
                type: "setLoader",
                payload: false,
            });
        }
    };
    const handlePriceRangeSelection = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string) => {
        event.preventDefault();
        const minMaxCategory = type === 'high2low' ? 'max to min' : 'min to max';
        let obj = { ...localState.values }
        obj.price = minMaxCategory
        localDispatch({ type: 'setValues', payload: obj });
    };

    const handleChange = (event: any) => {
        let obj = { ...localState.values }
        const newStatus = event.target.value;
        obj.status = newStatus
        localDispatch({ type: 'setValues', payload: obj });
    };
    const showContent1 = () => {
        localDispatch({ type: 'setActiveContent', payload: 'content1' });
    };
    const showContent2 = () => {
        localDispatch({ type: 'setActiveContent', payload: 'content2' });
    };
    const handleQuantity = (quantity) => {
        let obj = { ...localState.values }
        obj.quantity = quantity
        localDispatch({ type: 'setValues', payload: obj })
    }
    const handleCurrency = (currency) => {
        let obj = { ...localState.values }
        obj.currency = currency
        localDispatch({ type: 'setValues', payload: obj })
    }
    const handleSearch = (event) => {
        let obj = { ...localState.values }
        obj.searchBy = event
        localDispatch({ type: 'setValues', payload: obj })
    }
    return (
        <>
            <div ref={scrollableRef}></div>
            <div className="container mx-auto pt-5 px-3 lg:px-0">
                <div className="mt-7 mb-[42px]">
                    <div className="md:flex justify-between gap-4">
                        <SearchBar searchBarClass='xl:w-[42rem] md:w-96 relative' onSearch={handleSearch} inputRef={searchInputRef} placeholder="Search Movie, NFT Name,  Category...... " />
                        <div className="flex items-center max-sm:mt-2">
                            <div className="dropdown mr-2.5">
                                <div tabIndex={0} role="button" className=" m-1 bg-accent px-4 py-2.5 rounded-[28px] text-sm font-medium border-0 hover:bg-accent">Price: {localState.values?.price} <span className="icon drop-arrow"></span></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li onClick={(event) => handlePriceRangeSelection(event, 'low2high')} ><a>Low</a></li>
                                    <li onClick={(event) => handlePriceRangeSelection(event, 'high2low')}><a>High</a></li>
                                </ul>
                            </div>
                            <span className={` p-2.5 rounded cursor-pointer ${localState?.activeContent === 'content1' ? 'bg-primary':'bg-accent'}`} onClick={showContent1}>
                            <span className={`icon filter-squre ${localState?.activeContent === 'content1' ? 'invert':''}`}></span>
                            </span>
                            <span className={`mx-4 bg-accent p-2.5 rounded cursor-pointer ${localState?.activeContent === 'content2' ? 'bg-primary':'bg-accent'}`} onClick={showContent2}>
                            <span className={`icon properties ${localState?.activeContent === 'content2' ? 'invert':''}`}></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='grid md:grid-cols-12 lg:gap-[45px]'>
                    <div className='col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3'>
                        <StatusDetailview
                            handleChange={handleChange}
                            selectedObj={localState.values}
                            handleQuantity={handleQuantity}
                            handleCurrency={handleCurrency}
                        />
                    </div>
                    <div className={`col-span-12 md:col-span-8 lg:col-span-8 xl:col-span-9 ${localState?.activeContent === 'content1' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-[16px]' : ''} `}>
                        {localState?.activeContent === 'content1' && <>
                            {data &&
                                !localState?.loader &&
                                data?.map((item: any) => (
                                    <div
                                        className="mt-3 shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]"
                                        key={item.id}
                                    >
                                        <div className="cursor-pointer">
                                            <Button
                                                handleClick={
                                                    isConnected
                                                        ? () => saveView?.(item)
                                                        : () => navigateToAsset(item)
                                                }
                                                type="plain" btnClassName="w-full"
                                            >
                                                <img
                                                    src={
                                                        item?.image && !item?.image?.includes("null")
                                                            ? item.image.replace(
                                                                "ipfs://",
                                                                "https://ipfs.io/ipfs/"
                                                            )
                                                            : defaultlogo
                                                    }
                                                    alt=""
                                                    className={`h-[255px] w-full object-cover rounded-tl-lg rounded-tr-lg  ${item?.isUnlockPurchased &&
                                                        address !== item?.walletAddress
                                                        ? "blur-image"
                                                        : ""
                                                        }`}
                                                />
                                            </Button>
                                            <div className="bg-black top-3 absolute cursor-pointer right-3 rounded-full">
                                                <Button
                                                    type="plain"
                                                    handleClick={() => addToFavorites(item)}
                                                    btnClassName=""
                                                >
                                                    {localState?.favoriteLoader?.id !== item.id && (
                                                        <span
                                                            className={`icon like-white ${item?.isFavourite ? "active" : ""
                                                                }`}
                                                        ></span>
                                                    )}
                                                    {localState?.favoriteLoader?.id === item.id &&
                                                        localState?.favoriteLoader?.loading && (
                                                            <span>
                                                                <Spinner />
                                                            </span>
                                                        )}
                                                </Button>
                                            </div>
                                            <Button
                                                handleClick={
                                                    isConnected
                                                        ? () => saveView(item)
                                                        : () => navigateToAsset(item)
                                                }
                                                type="plain"
                                                btnClassName="w-[100%]"
                                            >
                                                <div className="px-2 py-2.5">
                                                    <p className="text-xs text-secondary truncate text-left">
                                                        {item.creator}
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
                                            <div className="px-2.5 py-4 flex justify-between">
                                                {/* <div className="flex add-cart cursor-pointer">
                                                    <span className="icon card-cart"></span>
                                                    <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
                                                        Add to Cart
                                                    </span>
                                                </div> */}
                                                <div className="w-px border"></div>
                                                <div className="flex shop-card cursor-pointer">
                                                    <span className="icon card-shop"></span>
                                                    <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
                                                        Buy Now
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            {(loader || localState?.loader) &&
                                Array.from({ length: pageSize }, (_, index) => (
                                    <div key={index}>
                                        <FoundingMemberSimmer />
                                    </div>
                                ))}
                            {data?.length === 0 && !loader && (
                                <div className="col-span-5">
                                    <NoDataFound text={''} />
                                </div>
                            )}
                        </>}

                        {localState.activeContent === 'content2' && (
                            <ListView data={nftDetails} />)}

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
                </div>
            </div>
        </>
    );
}
const connectStateToProps = ({ auth }: any) => {
    return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
    return { dispatch };
})(Nfts);
