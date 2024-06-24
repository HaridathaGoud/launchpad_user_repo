import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import defaultlogo from "../../../../assets/images/default-logo.png";
import Placeholder from "react-bootstrap/Placeholder";
import { store } from "../../../../store";
import { fetchTopSellers } from "../../../../reducers/marketPlaceReducer";
import { useSelector } from "react-redux";
import Button from "../../../../ui/Button";
import NaviLink from "../../../../ui/NaviLink";
const pageSize = 10;
const TopSellerCarousal = () => {
  const { data, error, loader, currPage } = useSelector(
    (store: any) => store.marketPlaceDashboard.topSellers
  );
  useEffect(() => {
    store.dispatch(fetchTopSellers(1, pageSize));
    if (error) rootDispatch(setError({message:error}));
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
          <div className="container mx-auto mb-[36px]">  
          <div className="text-right">
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
                <div className="carousel container mx-auto gap-3 p-2" >
                  {visibleItems?.map((item: any, idx: any) => (
                    <NaviLink path={`/marketplace/collection/${item.id}`}>
                      <div
                        key={idx}
                        className="carousel-item inline-block max-sm:w-full md:w-[380px] pl-1"
                      >
                        <div className="flex bg-primary-content py-4 px-2.5 rounded-[15px] gap-5" style={{boxShadow:'0px 0px 8px 0px rgba(0, 0, 0, 0.25)'}}>
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
                            <h4 className="truncate text-xl font-semibold capitalize text-dark">
                              {item?.name || item?.walletAddress}
                            </h4>
                            <div className="mt-3 mb-2">
                              <p className="text-info text-sm font-normal">Flour Price</p>
                              <p className="text-[16px] text-dark">
                                {item?.flourPice || 0} Matic
                              </p>
                            </div>
                            <div>
                              <p className="text-info text-sm font-normal">Volume</p>
                              <p className="text-[16px] text-dark">
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
           
          </div>
        </>
      )}
    </>
  );
};
export default TopSellerCarousal;
