import React from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import shimmers from "../shimmers/shimmers";
import PlaceHolder from "../shimmers/placeholder";
import { getProposalStatus } from "../proposals/utils";
const InformationPanel = () => {
  const proposalDetails = useSelector(
    (state: any) => state.vtg.proposalDetails
  );
  const Cardstransactions = shimmers.votingShimmer(3);
  return (
    <>
      {proposalDetails?.loading && (
        <PlaceHolder contenthtml={Cardstransactions} />
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
                {(
                  <p className="text-secondary">
                    {" "}
                    {getProposalStatus(
                      proposalDetails?.data?.startDate,
                      proposalDetails?.data?.endDate
                    )}
                  </p>
                )}
              </p>
            </div>
            <div className="flex gap-5 justify-between items-center mb-4">
              <p className={`text-sm shrink-0 text-secondary opacity-50`}>
                Start Date{" "}
              </p>
              <p className="truncate text-secondary">
                <Moment local={true} format={"DD/MM/YYYY HH:mm"}>
                  {proposalDetails?.data?.startDate}
                </Moment>{" "}
                (UTC)
              </p>
            </div>
            <div className="flex gap-5 justify-between items-center mb-4">
              <p className={`text-sm shrink-0 text-secondary opacity-50`}>
                End Date
              </p>
              <p className="truncate text-secondary">
                <Moment local format="DD/MM/YYYY HH:mm">
                  {proposalDetails?.data?.endDate}
                </Moment>{" "}
                (UTC)
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
