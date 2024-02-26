import React, { useEffect, useState, useRef, useContext } from "react";
import { get } from "../../utils/api";
// import { isErrorDispaly } from '../../utils/errorHandling';
import moment from "moment";
import DefaultImg from "../../assets/images/default-bg.png";
import { Link } from "react-router-dom";
import nodata from "../../assets/images/no-data.png";
import ProjectShimmer from "../../components/loaders/projectcardshimmer";
// import error from '../../assets/images/error.svg';
import Spinner from "../loaders/spinner";
import outletContext from "../../layout/context/outletContext";
import OutletContextModel from "../../layout/context/model";
import BreadCrumb from "../../ui/breadcrumb";

const Projectscomponent = (props) => {
  const [cardDetails, setCardDetails] = useState<any[]>([]);
  const [cardSeeMoreHide, setCardSeeMoreHide] = useState<boolean>(false);
  const [totalCardData, setTotalCardData] = useState<any[]>([]);
  // const [errorMsg, setErrorMsg] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState(null);
  const [loadeMessage, setLoaderMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const endedIgosRef = useRef<any>(null);
  const pjctTypes = { Ongoing: "Open", Upcoming: "Upcoming", Closed: "Ended" };
  const { setErrorMessage }: OutletContextModel = useContext(outletContext);

  const fetchMoreData = () => {
    getPrjectCardDetails(pageNo, props.pageSize, props.pjctType, search);
  };

  const getPrjectCardDetails = async (
    pageNo: number,
    pageSize: number,
    type: any,
    search: any
  ) => {
    setLoader(true);
    setCardSeeMoreHide(false);
    if (cardDetails?.length == 0) {
      setLoader(true);
    }
    const skip = pageNo * props.pageSize - props.pageSize;
    let response = await get(
      `User/Projects/${props.pjctType}/${props.pageSize}/${skip}/${search}`
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
      setErrorMessage?.(response);
      setLoader(false);
    }
  };
  const shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      getPrjectCardDetails(1, props.pageSize, "Ongoing", null);
    }
  }, []);

  const handleWebSiteLinks = (item: any, type: string) => {
    if (type == "TW") {
      window.open(item.twitter);
    } else if (type == "FACEBOOK") {
      window.open(item.facebook);
    } else if (type == "INSTAGRAM") {
      window.open(item.instagram);
    } else if (type == "NETWORK") {
      window.open(item.websiteUrl);
    } else if (type == "LINKDIN") {
      window.open(item.linkdin);
    } else if (type == "TELEGRAM") {
      window.open(item.telegram);
    } else if (type == "DISCARD") {
      window.open(item.discord);
    }
  };
  const handleSearchIcon = (data: any) => {
    if (!(data == "" || data == null || data.includes("."))) {
      getPrjectCardDetails(1, props.pageSize, "Ongoing", data);
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
        getPrjectCardDetails(1, props.pageSize, "Ongoing", data);
      }
    } else if (!data) {
      setCardDetails(totalCardData);
    }
  };

  const statusColourList = {
    Ongoing: "dot-green",
    Closed: "dot-red",
    Upcoming: "dot-orange",
  };
  return (
    <>
      {cardDetails.length > 0 && (
        <div className="container mx-auto max-sm:px-3 mt-6">
          <div className="">
            <BreadCrumb/>
            <div
              className={`flex justify-between mb-4 md:items-center ${
                props.pageSize >= 9 ? "max-sm:flex-col gap-3" : ""
              }`}
            >
              <h2 className="font-semibold text-xl lg:text-2xl text-secondary  ">
                {pjctTypes[props.pjctType]}{" "}
                <span className="text-primary">
                  {" "}
                  {process.env.REACT_APP_OFFERING_TITLE}s
                </span>{" "}
                Projects
              </h2>
              {props.pageSize < 9 && (
                <Link
                  to={`/allprojects/${props.pjctType}`}
                  className="text-primary text-base font-medium"
                >
                  View All
                </Link>
              )}
              {props.pageSize >= 9 && (
                <div className="mb-3 d-flex">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search IGO"
                      className="w-full rounded-[28px] border-[#A5A5A5] border h-12 focus:outline-none pl-5 pr-12"
                      onKeyUp={(value) => handleSearch(value)}
                      ref={endedIgosRef}
                    />
                    <span
                      className="icon md search absolute right-4 bottom-4 cursor-pointer md:w-72"
                      onClick={() => handleSearchIcon(search)}
                    />
                  </div>
                </div>
              )}
            </div>
            {cardDetails?.length ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cardDetails?.map((item) => (
                  <>
                    {loader ? (
                      <ProjectShimmer></ProjectShimmer>
                    ) : (
                      <div className="border rounded-2xl project-card bg-primary-content p-[18px] transform transition-transform duration-500 hover:scale-[1.03] bg-[rgba(0,0,0,0.9)]">
                        <div className="flex justify-between">
                          <img
                            src={
                              item.publisherLogo
                                ? item.publisherLogo
                                : DefaultImg
                            }
                            className="rounded-full w-11 h-11 object-cover"
                            alt=""
                          />
                          <div className="flex gap-2">
                            {item.facebook && (
                              <span
                                className="icon facebook-md cursor-pointer"
                                onClick={() =>
                                  handleWebSiteLinks(item, "FACEBOOK")
                                }
                              ></span>
                            )}
                            {item.websiteUrl && (
                              <span
                                className="icon network-md cursor-pointer"
                                onClick={() =>
                                  handleWebSiteLinks(item, "NETWORK")
                                }
                              ></span>
                            )}
                            {item.twitter && (
                              <span
                                className="icon twitter-md cursor-pointer"
                                onClick={() => handleWebSiteLinks(item, "TW")}
                              ></span>
                            )}
                            {item.instagram && (
                              <span
                                className="icon instagram-md cursor-pointer"
                                onClick={() =>
                                  handleWebSiteLinks(item, "INSTAGRAM")
                                }
                              ></span>
                            )}
                            {item.linkdin && (
                              <span
                                className="icon linkdin cursor-pointer"
                                onClick={() =>
                                  handleWebSiteLinks(item, "LINKDIN")
                                }
                              ></span>
                            )}
                            {item.telegram && (
                              <span
                                className="icon telegram-md cursor-pointer"
                                onClick={() =>
                                  handleWebSiteLinks(item, "TELEGRAM")
                                }
                              ></span>
                            )}
                            {item.discard && (
                              <span
                                className="icon discord-md cursor-pointer"
                                onClick={() =>
                                  handleWebSiteLinks(item, "DISCARD")
                                }
                              ></span>
                            )}
                          </div>
                        </div>
                        <Link
                          className=""
                          aria-current="page"
                          to={`/projects/projectdetails/${props.pjctType}/${item?.id}`}
                        >
                          <div className="">
                            <span className="text-lg font-semibold text-secondary">
                              {item?.projectName}
                            </span>
                            <div className=" flex gap-6">
                              <p className="text-warning-content">
                                <span
                                  className={`inline-block w-2 h-2 rounded-full ${
                                    statusColourList[
                                      item?.publicOrPrivateStatus
                                    ]
                                  }`}
                                ></span>{" "}
                                {item?.publicOrPrivateStatus}
                              </p>

                              <p className="text-warning-content">
                                <span
                                  className={`icon  ${
                                    item?.tokenNetworkLogo ||
                                    "usdt icon scale-[1.4]"
                                  } `}
                                ></span>{" "}
                                {item?.tokenNetwork
                                  ? item?.tokenNetwork
                                  : process.env.REACT_APP_CURRENCY}
                              </p>
                            </div>
                          </div>

                          <div className="">
                            <div className="">
                              <img
                                src={item?.cardImage || DefaultImg}
                                className="mt-2 w-full h-[200px] object-cover rounded-2xl"
                                alt=""
                              />{" "}
                              <div className="pt-2">
                                <p className="text-secondary text-3lines min-h-[72px]">
                                  {item?.description}
                                </p>
                                <div
                                  className={`bg-base-300 rounded-2xl p-2.5 my-2`}
                                >
                                  <label
                                    className={`text-base-200 text-base font-medium`}
                                  >
                                    Cast & Crew
                                  </label>
                                  {item.cast_Crews?.length == 0 ? (
                                    <p className="text-base font-normal text-secondary h-12 overflow-hidden">
                                      -
                                    </p>
                                  ) : (
                                    <p className="text-base font-normal text-secondary h-12 overflow-hidden">
                                      {item.cast_Crews
                                        .map((obj) => obj["name"])
                                        .join(", ")}
                                    </p>
                                  )}
                                </div>

                                <div className="flex justify-between">
                                  <label
                                    className={`text-base-200 text-base font-semibold`}
                                  >
                                    Total Raise
                                  </label>
                                  <p className=" font-normal text-secondary">
                                    {item.totalRaised?.toLocaleString()
                                      ? "$"
                                      : ""}
                                    {item?.totalRaised?.toLocaleString() || "-"}
                                  </p>
                                </div>
                                <div className="flex justify-between my-2">
                                  <label
                                    className={`text-base-200 text-base font-semibold `}
                                  >
                                    Total Supply
                                  </label>
                                  <p className="font-normal text-secondary">
                                    {`${
                                      item?.totalSupply?.toLocaleString() || "-"
                                    }`}
                                  </p>
                                </div>
                                <div className="flex justify-between">
                                  <label
                                    className={`text-base-200 text-base font-semibold `}
                                  >
                                    Price
                                  </label>
                                  <p className="">
                                    {item?.tokenVolume} {item?.tokenSymbol} ={" "}
                                    {item?.paymentValue?.toLocaleString()}{" "}
                                    {item?.paymentSymbol}
                                  </p>
                                </div>
                                <div
                                  className={`bg-secondary-content rounded-2xl mt-3 flex`}
                                >
                                  <div className="w-full my-2.5 px-3">
                                    <label
                                      className={`text-base-100 opacity-60 text-base font-medium`}
                                    >
                                      {item?.accessType == "Private"
                                        ? "Private Opens"
                                        : "Public Opens"}
                                    </label>
                                    <p className="text-base font-normal text-base-100">
                                      {item.accessType == "Private"
                                        ? item?.privateStartDate == " "
                                          ? "TBA"
                                          : moment(
                                              item.privateStartDate
                                            ).format("DD-MM-YYYY HH:mm")
                                        : moment(item.publicStartDate).format(
                                            "DD-MM-YYYY HH:mm"
                                          )}
                                      (UTC)
                                    </p>
                                  </div>
                                  <div
                                    className={`border-l border-base-200 w-full my-2.5 pr-3 pl-4`}
                                  >
                                    <label
                                      className={`text-base-100 opacity-60 text-base font-medium`}
                                    >
                                      {item?.accessType == "Private"
                                        ? "Private Closes"
                                        : "Public Closes"}
                                    </label>
                                    <p className="text-base font-normal text-base-100">
                                      {item.accessType == "Private"
                                        ? item?.privateEndDate == " "
                                          ? "TBA"
                                          : moment(item.privateEndDate).format(
                                              "DD-MM-YYYY HH:mm"
                                            )
                                        : moment(item.publicEndDate).format(
                                            "DD-MM-YYYY HH:mm"
                                          )}
                                      (UTC)
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )}
                  </>
                ))}
              </div>
            ) : (
              <>
                {cardSeeMoreHide && (
                  <div className="text-center">
                    <img width={120} className="mx-auto" src={nodata} />
                    <p className="text-secondary text-center">{loadeMessage}</p>
                  </div>
                )}
              </>
            )}
            {cardDetails?.length !== 0 && loadData && loader && (
              <div className="text-center mt-2">
                <Spinner className="text-center"></Spinner>
              </div>
            )}
            {cardDetails?.length != 0 && loadData && !loader && (
              <div className="text-center mt-4">
                {" "}
                <span
                  onClick={fetchMoreData}
                  className="cursor-pointer text-base text-primary font-semibold"
                >
                  See More
                </span>
                <span
                  onClick={fetchMoreData}
                  className="mx-auto block icon see-more cursor-pointer mt-[-4px]"
                ></span>{" "}
              </div>
            )}
          </div>
        </div>
       )}
      {cardDetails?.length == 0 && loader && (
        <div className="text-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProjectShimmer></ProjectShimmer>

            <ProjectShimmer></ProjectShimmer>
            <ProjectShimmer></ProjectShimmer>
          </div>
        </div>
      )}
    </>
  );
};

export default Projectscomponent;
