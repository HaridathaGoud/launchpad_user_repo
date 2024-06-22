import React, { useEffect, useRef, useReducer, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import defaultlogo from "../../../assets/images/default-logo.png";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { clearNfts, fetchNfts } from "../../../reducers/marketPlaceReducer";
import { store } from "../../../store";
import { saveFavorite, saveViews } from "./services";
import Button from "../../../ui/Button";
import { nftsReducer, nftsState } from "./reducers";
import Spinner from "../../loaders/spinner";
import FoundingMemberSimmer from "../../loaders/projects/foundingmembersshimmer";
import WalletConnect from "../../../layout/Login/index";
import { Modal, modalActions } from "../../../ui/Modal";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import NoDataFound from "../../../ui/noData";
import FilterComponent from "../filtercomponent";
import StatusDetailview from "../hotcollections.component/detailviewstatus";
import BreadCrumb from "../../../ui/breadcrumb";
import SearchBar from "../../../ui/searchBar";
import ListView from "../hotcollections.component/listview";
import Nfts from '../../nfts.component'
const pageSize = 6;
function ExploreNfts(props: any) {
  const { address, isConnected } = useAccount();
  const [localState, localDispatch] = useReducer(nftsReducer, nftsState);
  const navigate = useNavigate();
  const scrollableRef = useRef<any>(null);
  const searchInputRef=useRef<any>(null)
  const [searchInput, setSearchInput] = useState(null);
  const [activeContent, setActiveContent] = useState<any>('content1');
  const { loader, error, data, pageNo } = useSelector(
    (store: any) => store.exploreNfts
  );
  const nftDetails = useSelector((storage:any)=>storage.exploreNfts)
  const errorMessage=useSelector(((store:any)=>store.layoutReducer.error.message))
  const rootDispatch = useDispatch();
  useEffect(() => {
    store.dispatch(fetchNfts({
      pageNo:pageNo,
      take:pageSize,
      categoryName:'all',
      searchBy:searchInput,
      price:localState.selection.minMaxCategory||localState.selectedPriceLevel,
      quatity:'all%20items',
      currency:localState.selectedCurrency,
      status:localState.selectedStatus,
      customerId:props.auth.user?.id,
      data:data,
    }));
    scrollableRef?.current?.scrollIntoView(0, 0);
    if (error) rootDispatch(setError({message:error}))

    return () => {
      store.dispatch(clearNfts());
    };
  }, [props.auth.user?.id,searchInput,localState.selectedStatus,localState.selection.minMaxCategory]); // eslint-disable-line react-hooks/exhaustive-deps
  const loadmore = () => {
    store.dispatch(fetchNfts({
      pageNo:pageNo,
      take:pageSize,
      categoryName:'all',
      searchBy:searchInput,
      price:localState.selection.minMaxCategory||localState.selectedPriceLevel,
      quatity:'all%20items',
      currency:localState.selectedCurrency,
      status:localState.selectedStatus,
      customerId:props.auth.user?.id,
      data:data,
    }));
    // store.dispatch(fetchNfts(data, pageNo, "all", searchInput, props.auth.user?.id));
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
        store.dispatch(fetchNfts({
          pageNo:pageNo,
          take:pageSize,
          categoryName:'all',
          searchBy:searchInput,
          price:localState.selection.minMaxCategory||localState.selectedPriceLevel,
          quatity:'all%20items',
          currency:localState.selectedCurrency,
          status:localState.selectedStatus,
          customerId:props.auth.user?.id,
          data:data,
        }));
        // store.dispatch(
        //   fetchNfts(data, 1, "all", null, props.auth.user?.id, data.length)
        // );
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
  const handlePriceRangeSelection = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, type: string) => {
    debugger
    event.preventDefault();
    const minMaxCategory = type === 'high2low' ? 'max to min' : 'min to max';
    localDispatch({ type: 'update', payload: { minMaxCategory } });
  };

  const handleChange = (event: any) => {
    const newStatus = event.target.value;
    localDispatch({ type: 'setSelectedStatus', payload: newStatus });
  };
  const handleDropdownChange = (value: any) => {
    localDispatch({ type: 'setSelectedCurrency', payload: value });
  };
  const sendSelectedValue = (value:any) => {
    localDispatch({ type: 'setSelectedPriceLevel', payload: value });
  };
  const handleApplyClick = () => {
    store.dispatch(fetchNfts({
      pageNo:pageNo,
      take:pageSize,
      categoryName:'all',
      searchBy:searchInput,
      price:localState.selection.minMaxCategory||localState.selectedPriceLevel,
      quatity:'all%20items',
      currency:localState.selectedCurrency,
      status:localState.selectedStatus,
      customerId:props.auth.user?.id,
      data:data,
    }));
    // store.dispatch(fetchNfts(data, pageNo, "all", searchInput, props.auth.user?.id));
  };
  const showContent1 = () => {
    setActiveContent('content1');
  };
  const showContent2 = () => {
    setActiveContent('content2');
  };
  return (
    <>
      <div ref={scrollableRef}></div>
      <div className="container mx-auto pt-5 px-3 lg:px-0">
      <BreadCrumb/>
        <h2 className="text-[24px] text-secondary font-semibold mb-3">
          Explore NFTs
        </h2>
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
        {/* <FilterComponent/> */}
        <Nfts type="explorenfs" customerId={props.auth.user?.id}/>
      </div>
    </>
  );
}
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(ExploreNfts);
