import React, { useEffect, useRef, useReducer } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import defaultlogo from "../../../assets/images/default-logo.png";
import { useAccount } from "wagmi";
import { useLocation, useNavigate } from "react-router-dom";
import { clearNfts, fetchCollections} from "../../../reducers/marketPlaceReducer";
import { store } from "../../../store";
import { saveFavorite } from "./services";
import Button from "../../../ui/Button";
import { nftsReducer, nftsState } from "./reducers";
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
              <div className="card bg-primary-content" onClick={() => handleCardView(item)}>
                <div className="">
                  <img src={item.logo} alt="" className="h-[300px] object-cover rounded-[16px] w-full" />
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-2xl capitalize text-secondary truncate" title={item.collectionName}>{item.collectionName}</h4>
                  <div className="">

                    <div className="flex justify-between items-center mt-[18px]">
                      <label className="text-secondary text-base flex-1">Floor</label>
                      {item.flourValue && (
                        <>
                          <p className="text-secondary text-lg font-semibold flex-1 text-right truncate" title={item.flourValue}>
                            {item.flourValue} {process.env.REACT_APP_TOKENNAME}
                          </p>
                        </>
                      )}
                      {!item.flourValue && (
                        <>
                          <p className=" text-secondary text-lg font-semibold flex-1 text-right truncate">{item.flourValue || '-'}</p>
                        </>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <label className="text-secondary text-base flex-1">Total Volume</label>
                      <p className="text-secondary text-lg font-semibold flex-1 text-right truncate" title={item.totalVolume}>
                        {item.totalVolume} {process.env.REACT_APP_TOKENNAME}
                      </p>
                    </div>
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
