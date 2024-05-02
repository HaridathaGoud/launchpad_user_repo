import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Projectscomponent from "./projectsComponent";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../reducers/layoutReducer";
import { get } from "../../utils/api";
import { guid } from "../../utils/constants";

const AllProjects = () => {
  const params = useParams();
  const rootDispatch=useDispatch()
  const user = useSelector((state: any) => state?.auth?.user);
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 9
  const [loader, setLoader] = useState(false);
  const [cardSeeMoreHide, setCardSeeMoreHide] = useState<boolean>(false);
  const [cardDetails, setCardDetails] = useState<any>();
  const [search, setSearch] = useState(null);
  const [loadData, setLoadData] = useState(false);
  const [totalCardData, setTotalCardData] = useState<any[]>([]);
  const [loaderMessage, setLoaderMessage] = useState("");
  const endedIgosRef = useRef<any>(null);
  const pjctTypes = { Ongoing: "Open", Upcoming: "Upcoming", Closed: "Ended" };

  useEffect(()=>{
    getPrjectCardDetails(1, pageSize, params.type, null);
  },[])
  const fetchMoreData = () => {
    getPrjectCardDetails(pageNo, pageSize, params.type, search);
  };
  const getPrjectCardDetails = async (
    pageNo: number,
    pageSize: number,
    type: any,
    search: any
  ) => {
    setLoader(true);
    setCardSeeMoreHide(false);
    if (cardDetails?.length === 0) {
      setLoader(true);
    }
    const skip = pageNo * pageSize - pageSize;
    let response = await get(
      `User/Projects/${params.type}/${pageSize}/${skip}/${search}/${user?.id || guid}`
    );
    if (response) {
      let _pageNo = pageNo + 1;
      setPageNo(_pageNo);
      setSearch(search);
      let mergeData =
        pageNo == 1 ? [...response.data] : [...cardDetails, ...response.data];
      if (mergeData.length > 0) {
        setLoaderMessage(" ");
        setLoadData(response.data.length >= 9);
      } else if (mergeData.length == 0) {
        setCardSeeMoreHide(true);
        setLoaderMessage("No data found");
      }
      setCardDetails(mergeData);
      if (search == null) {
        setTotalCardData(mergeData);
      }
      setLoader(false);
    } else {
      rootDispatch(setError({message:response}))
      setLoader(false);
    }
  };
  const handleSearchIcon = (data: any) => {
    if (!(data == "" || data == null || data.includes("."))) {
      getPrjectCardDetails(1, pageSize, params.type, data);
      setCardDetails(totalCardData);
    }
  };

  const handleSearch = (e: any) => {
    let data = e.target.value.trim();
    setSearch(data);
    if (e.key === "Enter") {
      if (data == "" || data.includes(".")) {
        e.preventDefault();
      } else {
        getPrjectCardDetails(1, pageSize, params.type, data);
      }
    } else if (!data) {
      setCardDetails(totalCardData);
    }
  };
  return (
    <div className="container mx-auto px-3 lg:px-0 mt-3 lg:mt-6">
      <Projectscomponent pageSize="9" pjctType={params.type} showBreadcrumb={true} showpjctType={true}
      loader={loader}
      cardSeeMoreHide={cardSeeMoreHide}
      loaderMessage={loaderMessage}
      loadData={loadData}
      cardDetails={cardDetails}
      handleSearchIcon={handleSearchIcon}
      handleSearch= {handleSearch}
      search={search}
      fetchMoreData={fetchMoreData}
      endedIgosRef={endedIgosRef}
      pjctTypes ={pjctTypes} />
    </div>
  );
};

export default AllProjects;
