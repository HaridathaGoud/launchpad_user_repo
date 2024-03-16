import React, { useEffect, useRef, useState } from "react";
import { get } from "../../utils/api";
import FeaturedIvosShimmer from "../loaders/dashboard/featuredIvosShimmer";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../reducers/layoutReducer";
interface IVO {
  id: any;
  icon: any;
  name: any;
  value: any;
}
const FeaturedIvos = () => {
  const errorMessage = useSelector(
    (store: any) => store.layoutReducer.error.message
  );
  const [loader, setLoader] = useState(false);
  const rootDispatch = useDispatch();
  const [featuredIvos, setFeaturedIvos] = useState([]);
  const shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      getFeaturedIvos(4, 0);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getFeaturedIvos = async (take: number, skip: number) => {
    setLoader(true);
    try {
      const response = await get(`User/FeaturedIgos/${take}/${skip}`);
      if (response.statusText.toLowerCase() === "ok") {
        setFeaturedIvos(response.data);
        errorMessage && rootDispatch(setError({ message: "" }));
      } else {
        rootDispatch(setError({ message: response }));
      }
    } catch (error) {
      rootDispatch(setError({ message: error }));
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="max-sm:mt-[30px] lg:mt-[70px]">
      {loader && <FeaturedIvosShimmer />}

      {!loader && featuredIvos.length === 0 && ""}
      {!loader && featuredIvos.length > 0 && (
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <h1 className="mb-2 text-[32px] font-semibold text-secondary">
              Featured <span className="text-primary">IVOs</span>
            </h1>
            <p className="text-base-200 mt-[-5px]">
              Launchpad, Video Streaming Platform - The Best Is Yet To Come!
            </p>
          </div>
          <div className="overflow-x-hidden mb-10 flex justify-center">
            <div className={`carousel max-sm:gap-4 md:gap-6 featuredIvos`}>
              {featuredIvos?.map((ivo: IVO) => {
                return (
                  <div
                    className="carousel-item bg-base-content gap-10 items-center bg-neutral-focus py-4 px-8 rounded-xl max-w-[335px]"
                    key={ivo.id}
                  >
                    <div className="shrink-0">
                      <img
                        src={ivo.icon}
                        className="rounded-md w-[90px] h-[90px] object-cover shrink-0"
                        alt={ivo.name}
                      />
                    </div>
                    <div>
                      <h1 className="text-error-content text-4xl break-all">
                        {ivo.value}
                        <span className="text-base capitalize">
                        {process.env.REACT_APP_CURRENCY}
                        </span>
                      </h1>
                      <p className="text-error-content opacity-60 text-lg ">
                        {ivo.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedIvos;
