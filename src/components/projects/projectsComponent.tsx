import React from "react";
import DefaultImg from "../../assets/images/default-bg.png";
import { Link } from "react-router-dom";
import ProjectCardShimmer from "../loaders/projects/projectCardShimmer";
import Spinner from "../loaders/spinner";
import BreadCrumb from "../../ui/breadcrumb";
import NoDataFound from "../../ui/nodatafound";
import JoinProject from "../shared/joinProject";
import ConvertLocalFormat from "../../utils/dateFormat";
const statusColourList = {
  Ongoing: "dot-green",
  Ended: "dot-red",
  Upcoming: "dot-orange",
};
const pjctTypes = { Ongoing: "Open", Upcoming: "Upcoming", Closed: "Ended" };
const Projectscomponent = (props: any) => {
  return (
    <>
      {/* {cardDetails.length > 0 && props.showpjctType &&  ( */}
      <div className="container mx-auto mt-[32px]">
        <div className="">
          {props.showBreadcrumb && <BreadCrumb />}
          {/* {(props.cardDetails?.length > 0 || props.from !== "dashBoard") && ( */}
          {(props.cardDetails?.length > 0 || !props?.from) && (
            <div
              className={`flex justify-between mb-4 mt-5 md:items-center ${
                props.pageSize >= 9 ? "max-sm:flex-col gap-3" : ""
              }`}
            >
              <h2 className="font-semibold text-xl lg:text-2xl text-secondary  ">
                {pjctTypes[props.pjctType]}{" "}
                <span className="text-primary">
                  {" "}
                  {process.env.REACT_APP_OFFERING_TITLE}s
                </span>{" "}
                {/* Projects */}
              </h2>
              {props.pageSize < 9 && props.cardDetails?.length >= 3 && (
                <Link
                  to={`/projects/${props.pjctType}`}
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
                      placeholder="Search IVO"
                      className="w-full rounded-[28px] border-[#A5A5A5] border h-12 focus:outline-none pl-5 pr-12"
                      onKeyUp={(value) => props?.handleSearch(value)}
                      ref={props.endedIgosRef}
                    />
                    <span
                      className="icon md search absolute right-4 bottom-4 cursor-pointer md:w-72"
                      onClick={() => props?.handleSearchIcon(props?.search)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {props.cardDetails?.length !== 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {props.cardDetails?.map((item) => (
                <>
                  {props.loader ? (
                    <ProjectCardShimmer></ProjectCardShimmer>
                  ) : (
                    <div
                      className="border rounded-2xl project-card bg-primary-content p-[18px] transform transition-transform duration-500 hover:scale-[1.03] bg-[rgba(0,0,0,0.9)] relative overflow-hidden"
                      key={item.id}
                    >
                      <div className={`flex gap-3 justify-between mt-3`}>
                        <img
                          src={
                            item.publisherLogo ? item.publisherLogo : DefaultImg
                          }
                          className="rounded-full w-11 h-11 object-cover shrink-0"
                          alt=""
                        />
                        <div className="grow">
                          <h1 className="text-lg font-semibold text-secondary break-all">
                            {item?.projectName}
                          </h1>
                          <div className=" flex gap-6">
                            <p className="text-warning-content">
                              <span
                                className={`inline-block w-2 h-2 rounded-full ${
                                  statusColourList[item?.publicOrPrivateStatus]
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
                          <JoinProject projectDetails={item} buttonClass={"min-w-[100px]"} statusClass={"bg-[#13B166] font-semibold absolute top-0 right-0 px-2 py-1 text-[#fff] rounded-bl-lg min-w-[100px] text-center"} buttonType={"primary"} projectStatus={item?.publicOrPrivateStatus}/>
                      </div>
                      <Link
                        className=""
                        aria-current="page"
                        to={`/projects/${item?.projectName}/${item?.id}/${null}`}
                      >
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
                              {/* <div
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
                                </div> */}

                              <div className="flex justify-between mt-2">
                                <label
                                  htmlFor="totalRaise"
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
                                  htmlFor="totalSupply"
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
                                  htmlFor=" price"
                                  className={`text-base-200 text-base font-semibold `}
                                >
                                  Price
                                </label>
                                <p className="font-normal text-secondary">
                                  {item?.tokenVolume} {item?.tokenSymbol} ={" "}
                                  {item?.paymentValue} {item?.paymentSymbol}
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
                                        :ConvertLocalFormat(item?.privateStartDate)
                                        :ConvertLocalFormat(item?.publicStartDate)
                                }
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
                                      :ConvertLocalFormat(item?.privateEndDate)
                                      :ConvertLocalFormat(item?.publicEndDate)
                              }
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
          )}
          {/* {props.cardDetails?.length === 0 && props.from !== "dashBoard" && ( */}
          {props.cardDetails?.length === 0 && !props.from  && (
            <NoDataFound text={props.loaderMessage} />
          )}
          {/* </>
            )} */}
          {props.cardDetails?.length !== 0 &&
            props.loadData &&
            props.loader && (
              <div className="text-center mt-2">
                <Spinner className="text-center"></Spinner>
              </div>
            )}
          {props.cardDetails?.length !== 0 &&
            props.loadData &&
            !props.loader && (
              <div className="text-center mt-4">
                {" "}
                <span
                  onClick={props.fetchMoreData}
                  className="cursor-pointer text-base text-primary font-semibold"
                >
                  See More
                </span>
                <span
                  onClick={props.fetchMoreData}
                  className="mx-auto block icon see-more cursor-pointer mt-[-4px]"
                ></span>{" "}
              </div>
            )}
        </div>
      </div>
      {/* )}  */}
      {props.loader && (
        <div className="text-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProjectCardShimmer></ProjectCardShimmer>
            <ProjectCardShimmer></ProjectCardShimmer>
            <ProjectCardShimmer></ProjectCardShimmer>
          </div>
        </div>
      )}
    </>
  );
};

export default Projectscomponent;
