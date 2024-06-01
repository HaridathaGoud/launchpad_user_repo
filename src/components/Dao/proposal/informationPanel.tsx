import React from "react";
import { useSelector } from "react-redux";
import { getProposalStatus } from "../proposals/utils";
import InformationPanelShimmer from "../../loaders/InformationPanelShimmer";
import ConvertLocalFormat from "../../../utils/dateFormat";
const InformationPanel = () => {
  const proposalDetails = useSelector(
    (state: any) => state.vtg.proposalDetails
  );
  return (
    <>
      {proposalDetails?.loading && (
        <InformationPanelShimmer/>
      )}
      {!proposalDetails?.loading && (
        <div className="">
          <div className="">
            <h2 className="text-lg font-semibold pb-3 text-secondary">
              Information
            </h2>

            <div className="flex gap-5 justify-between items-center mb-4 shrink-0">
              <p className={`text-sm text-secondary opacity-50`}>
                Strategies(s)
              </p>
              <div className="mr-2">
                {proposalDetails?.data?.strategy || "--"}
              </div>
            </div>
            <div className="flex gap-5 justify-between items-center mb-4">
              {/* <p className={`text-sm shrink-0 text-secondary opacity-50`}>Voting System</p> */}
              <p className={`text-sm shrink-0 text-secondary opacity-50`}>
                Voting
              </p>
              <p className="truncate text-secondary">
                {" "}
                {
                  <p className="text-secondary">
                    {" "}
                    {getProposalStatus(
                      proposalDetails?.data?.startDate,
                      proposalDetails?.data?.endDate
                    )}
                  </p>
                }
              </p>
            </div>
            <div className="flex gap-5 justify-between items-center mb-4">
              <p className={`text-sm shrink-0 text-secondary opacity-50`}>
                Start Date{" "}
              </p>
              <p className="truncate text-secondary">
                {ConvertLocalFormat(proposalDetails?.data?.startDate)} {" "}
              </p>
            </div>
            <div className="flex gap-5 justify-between items-center mb-4">
              <p className={`text-sm shrink-0 text-secondary opacity-50`}>
                End Date
              </p>
              <p className="truncate text-secondary">
                {ConvertLocalFormat(proposalDetails?.data?.endDate)} {" "}
              </p>
            </div>
          </div>
          <hr />
        </div>
      )}
    </>
  );
};

export default InformationPanel;
