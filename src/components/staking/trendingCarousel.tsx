import React, { useEffect, useRef, useState } from "react";
import CarouselShimmer from "../loaders/dashboard/carouselShimmer";
import Carousel from "../../ui/Carousel";
import { get } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setError } from "../../reducers/layoutReducer";
const TrendingProjects = () => {
  const rootDispatch=useDispatch()
  const shouldLog = useRef(true);
  const [loader, setLoader] = useState(false);
  const [trendingProjects,setTrendingProjects]=useState(null)
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      getTrendingProjects(2, 0);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getTrendingProjects = async (take: number, skip: number) => {
    setLoader(true);
    try {
      const response = await get(`User/trendingivos/${take}/${skip}`);
      if (response.statusText.toLowerCase() === "ok") {
        setTrendingProjects(response.data);
      } else {
        rootDispatch(setError({message:response}))
      }
    } catch (error) {
      rootDispatch(setError({message:error}))
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
    {loader && <CarouselShimmer/> }
    {!loader && trendingProjects && <Carousel className="h-52"
      data={trendingProjects}
      hasContent={false}
    />}
    </>    
    
  );
};

export default TrendingProjects;
