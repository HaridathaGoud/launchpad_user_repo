import React, { useEffect, useReducer } from "react";
import defaultlogo from "../../../assets/images/default-logo.png";
import { topsellerreducer, dashboardState } from "./reducer";
import { store } from "../../../store";
import { useSelector ,useDispatch} from "react-redux";
import Button from "../../../ui/Button";
import NaviLink from "../../../ui/NaviLink";
import { fetchTopSellers } from "../../../reducers/dashboardreducer";
import { setError } from "../../../reducers/layoutReducer";
const pageSize = 10;
const TopSeller = () => {
  const rootDispatch = useDispatch();
    const [localState, localDispatch] = useReducer(topsellerreducer, dashboardState);
    const { topSellers } = useSelector(({ dashboardReducer }: any) => {
        const topSellers = dashboardReducer.topSellers;
        return { topSellers };
    }
    );
    useEffect(() => {
      localDispatch({ type: 'setCurrentIndex', payload: 0 });
        store.dispatch(fetchTopSellers({ page: 1, take: pageSize, data: topSellers.data || null }));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
      rootDispatch(setError({ message: topSellers?.error }));
  }, [topSellers?.error]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSlideActions = (action) => {
      if (action === 'previous') {
        const newIndex = (localState.currentIndex + 1) % topSellers?.data?.length;
        localDispatch({ type: 'setCurrentIndex', payload: newIndex });
      }
      else {
        const newIndex = (localState.currentIndex - 1 + topSellers?.data?.length) % topSellers?.data?.length;
        localDispatch({ type: 'setCurrentIndex', payload: newIndex });
      }
    };

    const visibleItems = topSellers.data ? [...topSellers.data?.slice(localState.currentIndex), ...topSellers.data?.slice(0, localState.currentIndex)].slice(0, 4) : [];
    return (
        <>
            {topSellers.data && topSellers.data?.length > 0 && (
                <>
                    <div className="container mx-auto mt-5">
                        <div className="">
                            <h2 className="mb-4 text-2xl font-semibold text-secondary">Top Sellers</h2>
                        </div>
                        <div className="">
                            {!topSellers.loading && (
                                <div className="carousel container mx-auto gap-3" >
                                    {visibleItems?.map((item: any, idx: any) => (
                                        <NaviLink path={`/collection/${item.id}`} className="top-sellers">
                                            <div
                                                key={idx}
                                                className="carousel-item inline-block max-sm:w-full md:w-[380px]"
                                            >
                                                <div className="flex items-center bg-base-content py-4 px-2.5 rounded-[15px] gap-5">
                                                    <div className="shrink-0">
                                                        <img
                                                            src={item?.logo || defaultlogo}
                                                            width={122}
                                                            height={129}
                                                            alt=""
                                                            className="rounded-[15px] object-cover w-[122px] h-[129px]"
                                                        />
                                                    </div>
                                                    <div className="truncate">
                                                        <h4 className="truncate text-xl font-semibold capitalize text-white" title={item?.name || item?.walletAddress}>
                                                            {item?.name || item?.walletAddress}
                                                        </h4>
                                                        <div className="mt-3 mb-2">
                                                            <p className="text-info">Flour Price</p>
                                                            <p className="text-[16px] text-white">
                                                                {item?.flourPice || 0} Matic
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-info">Volume</p>
                                                            <p className="text-[16px] text-white">
                                                                {item?.volume || 0} Matic
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </NaviLink>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mt-5">
                            {(
                                <Button handleClick={() => handleSlideActions("previous")} btnClassName="!p-0 !shadow-none !bg-transparent">
                                    {" "}
                                    <span className="icon carousal-left-arrow cursor-pointer mr-1"></span>
                                </Button>
                            )}
                            {(
                                <Button handleClick={() => handleSlideActions("next")} btnClassName="!p-0 !shadow-none !bg-transparent">
                                    {" "}
                                    <span className="icon carousal-right-arrow cursor-pointer"></span>
                                </Button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
export default TopSeller;
