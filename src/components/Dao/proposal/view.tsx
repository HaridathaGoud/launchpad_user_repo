import React, { useState, useRef, useReducer } from "react";
import defaultProfile from "../../../assets/images/praposal-user.png";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Placeholder from "react-bootstrap/Placeholder";
import defaultBG from "../../../assets/images/default-bg.png";
import { setError } from "../../../reducers/layoutReducer";
import { getProposalStatusBg } from "../proposals/utils";
import ProposalCardShimmer from "../shimmers/proposalcardshimmer";
import ProposalViewCardShimmer from "../shimmers/proposalviewshimmer";
const reducers = (state: any, action: any) => {
  switch (action.type) {
    case "copied":
      return { ...state, copied: action.payload };
    case "isNoButtonLoading":
      return { ...state, isNoButtonLoading: action.payload };
    case "isButtonLoading":
      return { ...state, isButtonLoading: action.payload };
    case "mintedMemberShipCount":
      return { ...state, mintedMemberShipCount: action.payload };
    case "errorMsg":
      return { ...state, errorMsg: action.payload };
    case "selectedOption":
      return { ...state, selectedOption: action.payload };
    case "selectedhash":
      return { ...state, selectedhash: action.payload };
  }
};
function Proposal() {
  const { address } = useAccount();
  const rootDispatch = useDispatch();
  const proposalDetails = useSelector(
    (state: any) => state.vtg.proposalDetails
  );
  const customerVoteStatus = useSelector(
    (state: any) => state.vtg.isCustomerVoted
  );
  const user = useSelector((state: any) => state.auth.user);
  const isVoted = customerVoteStatus?.data?.isVoted;
  const [readMore, setReadMore] = useState(false);
  const scrollableRef = useRef<any>(null);
  const [state, dispatch] = useReducer(reducers, {
    copied: false,
    isButtonLoading: false,
    isNoButtonLoading: false,
    mintedMemberShipCount: null,
    errorMsg: null,
    selectedOption: null,
    selectedhash: null,
  });
  const handleCopy = () => {
    dispatch({ type: "copied", payload: true });
    setTimeout(() => {
      dispatch({ type: "copied", payload: false });
    }, 1000);
  };

  const handleShowMore = (value: string) => {
    value === "more" && setReadMore(true);
    value === "less" && setReadMore(false);
  };
  if (proposalDetails?.error || customerVoteStatus?.error)
    rootDispatch(setError(proposalDetails?.error || customerVoteStatus?.error));
  return (
    <>
      <div ref={scrollableRef}></div>
      <div className="py-[18px] px-5 rounded-lg shadow-md daorightpanel-bg">
        <div>
          {proposalDetails?.loading ? (
            <ProposalViewCardShimmer/>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <div className="">
                  <span className="text-2xl font-semibold text-secondary">
                    {proposalDetails?.data?.title}
                  </span>
                </div>
                {isVoted && (
                  <div className="ml-auto">
                    <span className="bg-primary text-white px-4 py-2 rounded-[33px]">
                      VOTED
                    </span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <div>
                    <div className="pt-2">
                      <div>
                        <div className="md:flex justify-between items-center mb-3.5">
                          <div className="flex items-center flex-wrap">
                            <div className="w-9 h-9 mr-2 shrink-0">
                              <img
                                src={user.profilePicUrl || defaultProfile}
                                className="rounded-full object-cover w-9 h-9"
                                alt={user.firstName || "user"}
                              />
                            </div>
                            <p className="mr-2 text-secondary opacity-50">
                              Stargate DAO by{" "}
                              <span>
                                {address?.slice(0, 4)}...{address?.slice(-4)}
                              </span>
                              <CopyToClipboard
                                text={address}
                                options={{ format: "text/plain" }}
                                onCopy={() => handleCopy()}
                              >
                                <span
                                  className={
                                    !state?.copied
                                      ? "icon md copy-icon cursor-pointer ms-0 pl-4"
                                      : "icon md check-icon pl-4"
                                  }
                                />
                              </CopyToClipboard>
                            </p>
                            <div>
                              <span
                                className={`font-semibold px-3 py-1 rounded ${
                                  getProposalStatusBg[
                                    proposalDetails?.data?.status
                                  ]
                                }`}
                              >
                                {proposalDetails?.data?.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <h2 className="text-base font-semibold text-secondary whitespace-nowrap">
                              Created By
                            </h2>
                            <div className="flex items-center bg-accent rounded-[50px] p-1.5 truncate">
                              <img
                                src={
                                  proposalDetails?.data?.creatorImage ||
                                  defaultProfile
                                }
                                className="w-[24px] h-[24px] mr-3 rounded-full object-cover"
                                alt="created By"
                              />
                              <span className="truncate">
                                {" "}
                                {proposalDetails?.data?.walletAddress ===
                                address
                                  ? "YOU"
                                  : proposalDetails?.data?.createdBy ||
                                    proposalDetails?.data?.walletAddress}
                              </span>
                              <CopyToClipboard
                                text={proposalDetails?.data?.walletAddress}
                                options={{ format: "text/plain" }}
                                onCopy={() => handleCopy()}
                              >
                                <span
                                  className={
                                    !state?.copied
                                      ? "icon md copy-icon  cursor-pointer shrink-0"
                                      : "icon copy-check c-pointer shrink-0  cursor-pointer"
                                  }
                                />
                              </CopyToClipboard>
                            </div>
                          </div>
                        </div>
                        <div className={`shrink-0 h-64`}>
                          <img
                            src={proposalDetails?.data?.image || defaultBG}
                            className="rounded-lg object-cover w-full h-64"
                            alt="project"
                          />
                        </div>
                        <h2 className="text-base font-semibold mt-3 text-secondary mb-2">
                          Proposal Overview
                        </h2>
                        <p
                          className={`text-secondary break-all ${
                            proposalDetails?.data?.description?.length > 400 &&
                            !readMore
                              ? "text-overlay"
                              : ""
                          }`}
                        >
                          {!readMore &&
                          proposalDetails?.data?.description?.length > 400
                            ? proposalDetails?.data?.description?.slice(
                                0,
                                400
                              ) + " ..."
                            : proposalDetails?.data?.description}
                        </p>
                      </div>

                      <p className="text-center mt-2">
                        {!readMore &&
                          proposalDetails?.data?.description?.length > 400 && (
                            <button
                              onClick={() => handleShowMore("more")}
                              className="hover:text-primary text-secondary"
                            >
                              Show More
                            </button>
                          )}
                        {readMore && (
                          <button
                            onClick={() => handleShowMore("less")}
                            className="hover:text-primary text-secondary"
                          >
                            Show Less
                          </button>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Proposal;
