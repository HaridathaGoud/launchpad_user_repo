import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import defaultlogo from '../../../assets/images/default-logo.png';
import moment from "moment";
import NaviLink from "../../../ui/NaviLink";

const pjctTypes = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  closed: "Closed",
};
const statusColourList: any = {
  ongoing: "dot-green",
  closed: "dot-red",
  Closed: "dot-red",
  upcoming: "dot-orange",
};
const ProjectDetailsCard = (props: any) => {
  return (
    <div className="lg:col-span-4 max-sm:mt-4">
      <div className="border bg-primary-content border-neutral-content relative rounded-[15px] py-5 px-3.5 ">
        <div className="">
          <div className="">
            <div className="md:flex justify-between">
              <div className="flex gap-2 items-start">
                <div className="profile-image shrink-0">
                  <img
                    src={props.pjctInfo?.publisherLogo || defaultlogo}
                    className="h-12 w-12 rounded-full object-cover"
                    alt=""
                  />
                </div>
                <div>
                 <span className="tooltip" data-tip={ props.pjctInfo?.projectName?.charAt(0).toUpperCase() + props.pjctInfo?.projectName?.slice(1)}>
                 <span className="text-2xl font-semibold text-secondary text-start lg:truncate inline-block lg:w-[300px] break-all">
                    { props.pjctInfo?.projectName?.charAt(0).toUpperCase() + props.pjctInfo?.projectName?.slice(1)}
                  </span>
                 </span>
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
              <div className="flex mt-6 lg:pl-14">
                <div className="flex gap-3 justify-between items-center">
                  <div className={` py-1 rounded px-3 ${
                          statusColourList[props.currentPjct]
                        }`}>
                    <p className="text-sm font-medium text-base-100">
                      <span
                        className={`inline-block w-3 h-3 rounded-full mr-2 bg-white`}
                      ></span>
                      {pjctTypes[props.currentPjct]}
                    </p>
                  </div>

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
                <h5 className="text-base text-secondary mb-1">
                  {props.pjctInfo?.totalSupply?.toLocaleString()}
                </h5>
                <p className="text-base text-secondary opacity-60">
                  Total Supply
                </p>
              </div>
              <div className="">
                {props.pjctInfo?.totalRaised && (
                  <h5 className="text-base text-secondary mb-1">
                    ${props.pjctInfo?.totalRaised?.toLocaleString()}
                  </h5>
                )}
                {!props.pjctInfo?.totalRaised && (
                  <h5 className="text-base text-secondary opacity-60">-</h5>
                )}
                <p className="text-base text-secondary opacity-60">
                  Total Raise
                </p>
              </div>

              <div className="">
                <h5 className="text-base text-secondary mb-1">
                  {props.pjctInfo?.tokenVolume} {props.pjctInfo?.tokenSymbol} ={" "}
                  {props.pjctInfo?.paymentValue} {props.pjctInfo?.paymentSymbol}
                </h5>
                <p className="text-base text-secondary opacity-60">Price</p>
              </div>
              <div className="">
                <h5 className="text-base text-secondary mb-1">
                  {props.pjctInfo?.intialsupply?.toLocaleString() || "-"}
                </h5>
                <p className="text-base text-secondary opacity-60">
                  Initial Supply
                </p>
              </div>

              <div className="total-status md:col-span-2">
                <div className="fields-style">
                  <h5 className="text-base text-secondary mb-1">
                    {props.pjctInfo?.launchDate
                      ? moment(props.pjctInfo?.launchDate).format(
                          "DD-MM-YYYY HH:mm"
                        )
                      : "--"}
                    (UTC)
                  </h5>

                  <p className="text-base text-secondary opacity-60">
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
                      ? moment(props.pjctInfo?.privateStartDate).format(
                          "DD-MM-YYYY HH:mm"
                        )
                      : "--"}
                    (UTC)
                  </p>
                </div>
                <div className="border-r border-neutral-content mx-4"></div>
                <div className="flex-1">
                  <p className="text-xs text-secondary opacity-60 mb-2">
                    Private Closes
                  </p>
                  <p className="text-sm text-secondary">
                    {props.pjctInfo?.privateEndDate
                      ? moment(props.pjctInfo?.privateEndDate).format(
                          "DD-MM-YYYY HH:mm"
                        )
                      : "--"}
                    (UTC)
                  </p>
                </div>
              </div>
              <div className={`py-1 rounded px-3 absolute top-[-17px] right-6 md:min-w-[103px] ${
                      statusColourList[
                        props.pjctInfo?.privateStatus?.toLowerCase()
                      ]
                    }`}>
                <p className="text-base mb-0 text-base-100">
                  <span
                    className={`inline-block w-3 h-3 bg-white rounded-full mr-2 `}
                  ></span>
                  {(props.pjctInfo?.privateStatus === "Ongoing" && "Ongoing") ||
                    (props.pjctInfo?.privateStatus === "Upcoming" &&
                      "Upcoming") ||
                    (props.pjctInfo?.privateStatus === "Closed" && "Closed")}
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
                      ? moment(props.pjctInfo?.publicStartDate).format(
                          "DD-MM-YYYY HH:mm"
                        )
                      : "--"}
                    (UTC)
                  </p>
                </div>
                <div className="border-r border-neutral-content mx-4"></div>
                <div className="flex-1">
                  <p className="text-xs text-secondary opacity-60 mb-2">
                    Public Closes
                  </p>
                  <p className="text-sm text-secondary">
                    {props.pjctInfo?.publicEndDate
                      ? moment(props.pjctInfo?.publicEndDate).format(
                          "DD-MM-YYYY HH:mm"
                        )
                      : "--"}
                    (UTC)
                  </p>
                </div>
              </div>
              <div className={`py-1 rounded px-3 absolute top-[-17px] right-6 md:min-w-[103px] ${
                      statusColourList[
                        props.pjctInfo?.publicStatus?.toLowerCase()
                      ]
                    }`}>
                <p className="text-base mb-0 text-base-100">
                  <span
                    className={`inline-block w-3 h-3 bg-white  rounded-full mr-2 `}
                  ></span>
                  {(props.pjctInfo?.publicStatus === "Ongoing" && "Ongoing") ||
                    (props.pjctInfo?.publicStatus === "Upcoming" &&
                      "Upcoming") ||
                    (props.pjctInfo?.publicStatus === "Closed" && "Closed")}
                </p>
              </div>
            </div>
            <div className="divider h-px"></div>
            <div>
              <div className=" mb-4">
                <h4 className="text-base text-secondary opacity-60 mb-1">
                  Vesting Period
                </h4>
                <p className="text-base text-secondary mb-2">
                  {props.pjctInfo?.vesting} Hours
                </p>
                <h4 className="text-base text-secondary opacity-60 mb-1">
                  Vesting Slots
                </h4>
                <p className="text-base text-secondary">
                  {props.pjctInfo?.claimSlots}
                </p>
              </div>
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
                <ProgressBar
                  variant="info"
                  now={props.swapedPercentage?.toString()?.slice(0, 3)}
                  className="rounded-[15px] bg-[#D9D9D9]"
                />
                <div className="flex justify-between items-start mt-1">
                  <p className="text-xs text-secondary">
                    {props.swapedPercentage?.toString()?.slice(0, 8)} %
                  </p>
                  <p className="text-xs text-secondary">
                    {props.pjctInfo?.totalSoldTokens?.toLocaleString() || 0}/
                    {props.pjctInfo?.intialsupply?.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;
