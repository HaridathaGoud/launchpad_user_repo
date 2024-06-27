import React, { useEffect, useRef, useReducer } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCollections, fetchCollections} from "../../../reducers/marketPlaceReducer";
import { store } from "../../../store";
import Button from "../../../ui/Button";
import { nftsReducer, nftsState } from "./reducers";
import FoundingMemberSimmer from "../../loaders/projects/foundingmembersshimmer";
import WalletConnect from "../../../layout/Login";
import { Modal, modalActions } from "../../../ui/Modal";
import { setError } from "../../../reducers/layoutReducer";
import BreadCrumb from "../../../ui/breadcrumb";
import NoDataFound from "../../../ui/noData";
const pageSize = 10;
const search = null;
function MyCollections(props: any) {
  const [localState, localDispatch] = useReducer(nftsReducer, nftsState);
  const navigate = useNavigate();
  const location = useLocation();
  const user = store.getState().auth;
  const scrollableRef = useRef<any>(null);
  const collections = useSelector(
    (store: any) => store.collections
  );
  const { loading:loader, error, data, nextPage }=collections[props?.screen]

  const rootDispatch = useDispatch();
  useEffect(() => {
    store.dispatch(fetchCollections(data, 1, search,props?.screen,user?.user?.id ));
    scrollableRef?.current?.scrollIntoView(0, 0);
    return () => {
      store.dispatch(clearCollections(props?.screen));
    };
  }, [props.auth.user?.id,location?.pathname,props?.screen]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() =>{
    if (error) rootDispatch(setError({message:error,onCloseCallback:() =>clearCollections(props?.screen,{loading:loader,data,nextPage,error:''})}))
  },[error,props?.screen,loader,data,nextPage])
  const loadmore = () => {
    store.dispatch(fetchCollections(data, nextPage, search,props?.screen,user?.user?.id ));
  };

  const handleButtonClick = () => {
    navigate('/marketplace/collection/create');
  };
  const handleCardView = (item) =>{
    navigate(`/marketplace/collection/${item.id}/view`
    );
  }
  return (
    <>
      <div ref={scrollableRef}></div>
      <div className="container mx-auto pt-5 px-3 lg:px-0">
        <BreadCrumb/>
       <div className="flex justify-between items-center mb-[28px]">
        <div>
        <h2 className="text-[24px] text-secondary font-semibold mb-3">
        {location?.pathname === "/marketplace/mycollections" ? "My Collections" : "Collections"}
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
              <div className="card bg-primary-content cursor-pointer" onClick={() => handleCardView(item)}>
                <div className="">
                  <img src={item.logo} alt="" className="h-[300px] object-cover rounded-[16px] w-full" />
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-2xl capitalize text-secondary truncate" title={item.collectionName}>{item.collectionName}</h4>
                  <div className="flex justify-between">
                  <label className="text-secondary text-base flex-1">Category - </label>
                  <h4 className="font-semibold text-2xl capitalize text-secondary truncate" title={item.category}>{item.category}</h4>
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
              <NoDataFound text ={''}/>
            </div>
          )}
        </div>
        {data?.length === (nextPage - 1) * pageSize && (
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
