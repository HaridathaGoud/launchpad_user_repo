import React, { useContext, useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import defaultlogo from "../../../assets/images/default-logo.png";
import Placeholder from "react-bootstrap/Placeholder";
import { store } from "../../../store";
import { fetchTopSellers } from "../../../reducers/marketPlaceReducer";
import { useSelector } from "react-redux";
import outletContext from "../../../layout/context/outletContext";
import OutletContextModel from "../../../layout/context/model";
import Button from "../../../ui/Button";
import NaviLink from "../../../ui/NaviLink";
const pageSize = 10;
const TopSeller = () => {
  const { setErrorMessage }: OutletContextModel = useContext(outletContext);
  const { data, error, loader, currPage } = useSelector(
    (store: any) => store.marketPlaceDashboard.topSellers
  );
  useEffect(() => {
    store.dispatch(fetchTopSellers(1, pageSize));
    if (error) setErrorMessage?.(error);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSlideActions = (action: any) => {
    if (action === "previous") {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + data?.length) % data?.length);
      // const prevPage = currPage - 1 > 0 ? currPage - 1 : 1;
      // store.dispatch(fetchTopSellers(prevPage, pageSize));
    }
    if (action === "next") {
      // const nextPage = currPage + 1;
      // store.dispatch(fetchTopSellers(nextPage, pageSize));
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }
  };
  const visibleItems = data? [...data?.slice(currentIndex), ...data?.slice(0, currentIndex)].slice(0, 4):[];
  return (
    <>
      {data && data?.length > 0 && (
        <>
          <div className="container mx-auto mt-5">
            <div className="">
              <h2 className="mb-4 text-2xl font-semibold">Top Sellers</h2>
            </div>
            <div className="">
              <div className="text-center">
                {loader && (
                  <div className="sell-card  shimmer-topseller shimmer">
                    <Placeholder animation="glow">
                      <Placeholder xs={2} className="topseller-img" />
                    </Placeholder>

                    <Placeholder animation="glow">
                      <Placeholder xs={12} />
                      <Placeholder xs={12} />
                      <Placeholder xs={12} />
                    </Placeholder>
                  </div>
                )}
              </div>
              {!loader && (
                <div className="carousel container mx-auto gap-3" >
                  {visibleItems?.map((item: any, idx: any) => (
                    <NaviLink path={`/accounts/${item.walletAddress}`}>
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
                            <h4 className="truncate text-xl font-semibold capitalize text-white">
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
                <Button handleClick={() => handleSlideActions("previous")}>
                  {" "}
                  <span className="icon carousal-left-arrow cursor-pointer mr-1"></span>
                </Button>
              )}
              {(
                <Button handleClick={() => handleSlideActions("next")}>
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
