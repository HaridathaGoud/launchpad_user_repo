import React, { useState } from "react";
import { useAccount } from "wagmi";
import defaultlogo from "../../../assets/images/default-bg.png";
import NoDataFound from "../../../ui/noData";
import Button from "../../../ui/Button";
const MoreFromCollection = ({
  gotoFev,
  getNFTImageUrl,
  moreCollection,
  moreCollectionClick,
  notConnectCollectionClick,
}) => {
  const [currentIndex,setCurrentIndex]=useState(0)
  const handleSlideActions = (action) => {
    if (action === 'previous') {
      const newIndex = (currentIndex+ 1) % moreCollection?.length;
      setCurrentIndex(newIndex)
    }
    else {
      const newIndex = (currentIndex - 1 + moreCollection?.length) % moreCollection?.length;
      setCurrentIndex(newIndex)
    }
  };
  const { isConnected,address } = useAccount();
  const data = moreCollection?.length>0 ? [...moreCollection.slice(currentIndex), ...moreCollection.slice(0, currentIndex)].slice(0,5) : [];
  return (
    <section className="mt-5">
      <h2 className="text-[24px] font-semibold text-secondary mb-5 mt-6">
        More from this collection
      </h2>
      <div className="min-h-[250px]">
        {moreCollection?.length !== 0 && (
          <div className="relative container">
            <div className="carousel gap-4 flex py-2 px-2 md:px-14">
              {data?.map((item) => (
                <div
                  className="carousel-item more-collection shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]"
                  key={item.name + item.walletAddress + item.image}
                >
                  {/* <Link className="nav-link" href={`/assets/${item.tokenId}/${item.collectionContractAddress}/${item.id}`}> */}
                  <div className="w-full">
                    <div
                      className="cursor-pointer w-full"
                      onClick={
                        isConnected
                          ? () => moreCollectionClick(item)
                          : () => notConnectCollectionClick(item)
                      }
                    >
                      <img
                        src={ item?.image || defaultlogo}
                        className={`h-[255px] w-full object-cover rounded-tl-lg rounded-tr-lg ${
                          item?.isUnlockPurchased &&
                          address?.toLowerCase() !==
                            item?.walletAddress?.toLowerCase()
                            ? ""
                            : ""
                        }`}
                        alt=""
                      />
                    </div>
                    <div className=" bg-black top-3 absolute cursor-pointer right-3 rounded-full">
                      <Button type="plain" handleClick={() => gotoFev(item)}>
                        <span
                          className={`icon like-white  ${
                            item?.isFavourite ? "active" : ""
                          }`}
                        ></span>
                      </Button>
                    </div>
                    <div className="px-2 py-2.5">
                      <p className="text-xs text-secondary truncate">
                        Avengers
                      </p>
                      <h1 className="mb-2.5 text-base font-semibold truncate text-secondary">
                        {" "}
                        {item.name}{" "}
                      </h1>
                      <div className="flex justify-between truncate mb-3 gap-2">
                        <p className="opacity-60 truncate text-secondary flex-1">
                          Price
                        </p>
                        <p className="font-semibold text-secondary flex-1 truncate text-right">
                          {item.price ? item.price : "--"}{" "}
                          {item.price
                            ? item.currency ||
                              process.env.REACT_APP_CURRENCY_SYMBOL
                            : ""}
                        </p>
                      </div>
                      <div className="flex justify-between gap-2">
                        <p className="opacity-60 text-secondary flex-1">
                          Highest bid
                        </p>
                        <p className="font-semibold text-secondary flex-1 text-right truncate">
                          {item.highestBid ? item.highestBid : "--"}{" "}
                          {item.highestBid
                            ? item.currency ||
                              process.env.REACT_APP_CURRENCY_SYMBOL
                            : ""}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="px-2.5 py-4 flex justify-center">
                      {/* <div className="flex add-cart cursor-pointer">
                  <span className="icon card-cart"></span>
                  <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
                    Add to Cart
                  </span>
                </div>
                <div className="w-px border"></div> */}
                      <div className="flex shop-card cursor-pointer">
                        <span className="icon card-shop"></span>
                        <span className="font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary">
                          Buy Now
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              ))}
            </div>
            {data?.length>=5 && <div className="md:flex md:absolute md:w-full justify-between md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 max-sm:mt-4">
            <Button type="plain" handleClick={() => handleSlideActions("previous")}>
            <span className="icon carousal-left-arrow cursor-pointer lg:scale-[1.4] mr-1"></span>
            </Button>
            <Button type="plain" handleClick={() => handleSlideActions("next")}>
              <span className="icon carousal-right-arrow cursor-pointer lg:scale-[1.4]"></span>
              </Button>
            </div>}
          </div>
        )}
        {moreCollection?.length === 0 && <NoDataFound text={""} />}
      </div>
    </section>
  );
};

export default MoreFromCollection;
