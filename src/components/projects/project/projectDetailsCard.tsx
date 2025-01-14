import React from "react";
import defaultlogo from "../../../assets/images/default-logo.png";
import NaviLink from "../../../ui/NaviLink";
import ConvertLocalFormat from "../../../utils/dateFormat";
import { ProjectViewTokendetailsCardShimmer } from "../../loaders/projects/projectViewTokendetailsCardShimmer";
import { numberWithCommas } from "../../../ui/formatNumber";
const getOverallStatus = ({ private:privateStatus, public:publicStatus }) => {
  if (!privateStatus && !publicStatus) {
    return "";
  }
  if (
    privateStatus.toLowerCase() === "upcoming" &&
    publicStatus.toLowerCase() === "upcoming"
  ) {
    return "Upcoming";
  }
  if (
    privateStatus.toLowerCase() === "ended" &&
    publicStatus.toLowerCase() === "ended"
  ) {
    return "Ended";
  }
  return "Ongoing";
};
const statusColourList: any = {
  ongoing: "dot-green",
  closed: "dot-red",
  Closed: "dot-red",
  ended: "dot-red",
  Ended: "dot-red",
  upcoming: "dot-orange",
};
const ProjectDetailsCard = (props: any) => {
  return (
    <div className="lg:col-span-4 max-sm:mt-4">
      {props.loader && <ProjectViewTokendetailsCardShimmer />}
      {!props?.loader && (
        <div>
          <div className="border bg-primary-content border-neutral-content relative rounded-[15px] py-5 px-3.5 dark-br-color">
            <div className="">
              <div className="">
                <div className="md:flex justify-between">
                  <div className="flex gap-2 items-start">
                    <div className="profile-image shrink-0">
                      <img
                        src={props.pjctInfo?.mediaImage || defaultlogo}
                        className="h-12 w-12 rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <div>
                      {props.pjctInfo?.projectName ? (
                        <span
                          className="tooltip"
                          data-tip={
                            props.pjctInfo?.projectName
                              ?.charAt(0)
                              .toUpperCase() +
                            props.pjctInfo?.projectName?.slice(1)
                          }
                        >
                          <span className="text-2xl font-semibold text-secondary text-start lg:truncate inline-block lg:w-[300px] break-all">
                            {props.pjctInfo?.projectName
                              ?.charAt(0)
                              .toUpperCase() +
                              props.pjctInfo?.projectName?.slice(1)}
                          </span>
                        </span>
                      ) : (
                        "--"
                      )}
                      <h4 className="text-sm text-secondary uppercase">
                        {props.pjctInfo?.tokenSymbol}
                      </h4>
                      <div className="flex gap-2">
                        {props.pjctInfo?.facebook && (
                          <NaviLink
                            className="icon facebook-md cursor-pointer"
                            path={props.pjctInfo?.facebook}
                            target="_blank"
                            rel="noopener noreferrer external"
                          />
                        )}
                        {props.pjctInfo?.websiteUrl && (
                          <NaviLink
                            className="icon network-md cursor-pointer"
                            path={props.pjctInfo?.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer external"
                          />
                        )}
                        {props.pjctInfo?.twitter && (
                          <NaviLink
                            className="icon twitter-md cursor-pointer"
                            path={props.pjctInfo?.twitter}
                            target="_blank"
                            rel="noopener noreferrer external"
                          />
                        )}
                        {props.pjctInfo?.instagram && (
                          <NaviLink
                            className="icon instagram-md cursor-pointer"
                            path={props.pjctInfo?.instagram}
                            target="_blank"
                            rel="noopener noreferrer external"
                          />
                        )}
                        {props.pjctInfo?.telegram && (
                          <NaviLink
                            className="icon telegram-md cursor-pointer"
                            path={props.pjctInfo?.telegram}
                            target="_blank"
                            rel="noopener noreferrer external"
                          />
                        )}
                        {props.pjctInfo?.discard && (
                          <NaviLink
                            className="icon discord-md cursor-pointer"
                            path={props.pjctInfo?.discard}
                            target="_blank"
                            rel="noopener noreferrer external"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex lg:pl-14">
                    <div className="flex gap-3 justify-between items-center">
                      {getOverallStatus(props.status) && <div
                        className={` py-1 rounded px-3`}
                      >
                        <p className="font-medium text-base-100">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${statusColourList[getOverallStatus(
                          props.status
                        ).toLowerCase()]}`}
                          ></span>
                          {getOverallStatus(props.status)}
                        </p>
                      </div>}

                      {props.pjctInfo?.tokenNetwork && (
                        <p className="text-sm font-medium text-secondary">
                          <span
                            className={`icon scale-[1.4] mr-1 ${
                              props.pjctInfo?.tokenNetworkLogo?.toLowerCase() ||
                              "usdt"
                            }`}
                          ></span>
                          {props.pjctInfo?.tokenNetwork ||
                            process.env.REACT_APP_CURRENCY}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 mt-[32px] gap-5">
                  <div className="">
                    <h5 className="text-base text-secondary mb-1 font-semibold">
                      {props.pjctInfo?.totalSupply ? numberWithCommas(props.pjctInfo?.totalSupply) : '--'}
                    </h5>
                    <p className="text-base text-secondary opacity-60 font-normal">
                      Total Supply
                    </p>
                  </div>
                  {props.pjctInfo?.tokenType === "ERC-20" && (
                    <div className="">
                      {props.pjctInfo?.totalRaised && (
                        <h5 className="text-base text-secondary mb-1 font-semibold">
                          ${numberWithCommas(props.pjctInfo?.totalRaised)}
                        </h5>
                      )}
                      {!props.pjctInfo?.totalRaised && (
                        <h5 className="text-base text-secondary opacity-60 font-normal">
                          -
                        </h5>
                      )}
                      <p className="text-base text-secondary opacity-60 font-normal">
                        Total Raise
                      </p>
                    </div>
                  )}

                  <div className="">
                    <h5 className="text-base text-secondary mb-1 font-semibold">
                      {numberWithCommas(props.pjctInfo?.tokenVolume)}{" "}
                      {props.pjctInfo?.tokenSymbol} ={" "}
                      {numberWithCommas(props.pjctInfo?.paymentValue)}{" "}
                      {props.pjctInfo?.paymentSymbol}
                    </h5>
                    <p className="text-base text-secondary opacity-60 font-normal">Price</p>
                  </div>
                  {props.pjctInfo?.tokenType === "ERC-20" && (
                    <div className="">
                      <h5 className="text-base text-secondary mb-1 font-semibold">
                        {props.pjctInfo?.intialsupply ? numberWithCommas(props.pjctInfo?.intialsupply) : "-"}
                      </h5>
                      <p className="text-base text-secondary opacity-60 font-normal">
                        Initial Supply
                      </p>
                    </div>
                  )}

                  <div className="total-status md:col-span-2">
                    <div className="fields-style">
                      <h5 className="text-base text-secondary mb-1 font-semibold">
                        {props.pjctInfo?.launchDate
                          ? ConvertLocalFormat(props.pjctInfo?.launchDate)
                          : "--"}
                      </h5>

                      <p className="text-base text-secondary opacity-60 font-normal">
                        Launch date
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border border-neutral-content relative rounded-[5px] py-[18px] px-2 mt-4">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-secondary opacity-60 mb-2">
                        Private Opens
                      </p>
                      <p className="text-sm text-secondary">
                        {props.pjctInfo?.privateStartDate
                          ? ConvertLocalFormat(props.pjctInfo?.privateStartDate)
                          : "--"}
                      </p>
                    </div>
                    <div className="border-r border-neutral-content mx-4"></div>
                    <div className="flex-1">
                      <p className="text-xs text-secondary opacity-60 mb-2">
                        Private Closes
                      </p>
                      <p className="text-sm text-secondary">
                        {props.pjctInfo?.privateEndDate
                          ? ConvertLocalFormat(props.pjctInfo?.privateEndDate)
                          : "--"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`py-1 rounded px-3 absolute top-[-15px] right-6 w-[100px] text-center ${
                      statusColourList[props.status?.["private"]?.toLowerCase()]
                    }`}
                  >
                    <p className="mb-0 text-base-100">
                      <span
                        className={`inline-block w-2 h-2 bg-white rounded-full mr-1 `}
                      ></span>
                      {props.status?.["private"]}
                    </p>
                  </div>
                </div>
                <div className="border border-neutral-content relative rounded-[5px] py-[18px] px-2 mt-7">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-secondary opacity-60 mb-2">
                        Public Opens
                      </p>
                      <p className="text-sm text-secondary">
                        {props.pjctInfo?.publicStartDate
                          ? ConvertLocalFormat(props.pjctInfo?.publicStartDate)
                          : "--"}
                      </p>
                    </div>
                    <div className="border-r border-neutral-content mx-4"></div>
                    <div className="flex-1">
                      <p className="text-xs text-secondary opacity-60 mb-2">
                        Public Closes
                      </p>
                      <p className="text-sm text-secondary">
                        {props.pjctInfo?.publicEndDate
                          ? ConvertLocalFormat(props.pjctInfo?.publicEndDate)
                          : "--"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`py-1 rounded px-3 absolute top-[-15px] right-6 w-[100px] text-center ${
                      statusColourList[props.status?.["public"]?.toLowerCase()]
                    }`}
                  >
                    <p className=" mb-0 text-base-100">
                      <span
                        className={`inline-block w-2 h-2 bg-white  rounded-full mr-1 `}
                      ></span>
                      {props.status?.["public"]}
                    </p>
                  </div>
                </div>
                <div className="divider h-px"></div>
                <div>
                  {props.pjctInfo?.tokenType === "ERC-20" && (
                    <div className=" mb-4">
                      <h4 className="text-base text-secondary opacity-60 mb-1">
                        Vesting Period
                      </h4>
                      <p className="text-base text-secondary mb-2">
                        {props.pjctInfo?.vesting ? numberWithCommas(props.pjctInfo?.vesting): 0} Hours
                      </p>
                      <h4 className="text-base text-secondary opacity-60 mb-1">
                        Vesting Slots
                      </h4>
                      <p className="text-base text-secondary">
                        {props.pjctInfo?.claimSlots ? numberWithCommas(props.pjctInfo?.claimSlots) : '--'}
                      </p>
                    </div>
                  )}
                  <div className="">
                    <h4 className="text-base text-secondary opacity-60">
                      Country Restrictions
                    </h4>
                    <p className="text-base text-secondary">
                      {props.pjctInfo?.countryRestrictions?.join(", ")}
                    </p>
                  </div>
                  <div className="mt-6">
                    <p className="text-base text-secondary opacity-60">
                      Swap Progress
                    </p>
                    <progress
                      className="progress progress-success w-full"
                      value={props.swapedPercentage}
                      max="100"
                    ></progress>

                    <div className="flex justify-between items-start mt-1">
                      <p className="text-xs text-secondary">
                        {props.swapedPercentage?.toString()?.slice(0, 4)} %
                      </p>
                      <p className="text-xs text-secondary">
                        {numberWithCommas(props.pjctInfo?.totalSoldTokens) || 0}
                        /{numberWithCommas(props.pjctInfo?.totalSupply) || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsCard;
