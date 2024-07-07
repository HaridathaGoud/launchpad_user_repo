import React, { useState } from "react";
import defaultProfile from "../../../assets/images/praposal-user.png";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import defaultBG from "../../../assets/images/default-bg.png";
import { setError } from "../../../reducers/layoutReducer";
import { getProposalStatusBg } from "../proposals/utils";
import ProposalViewShimmer from "../../loaders/ProposalViewShimmer";
const Proposal = () => {
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
  const [copied, setCopied] = useState("");
  const handleCopy = (value) => {
    setCopied(value);
    setTimeout(() => {
      setCopied("");
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
      {proposalDetails.loading && (
        <ProposalViewShimmer/>
      )}
      {!proposalDetails.loading && (
        <div className="py-[18px] px-5 rounded-lg daorightpanel-bg">
          <div>
            <div className="flex justify-between items-start">
              <div className="">
                <span className="text-2xl font-semibold text-secondary">
                  {proposalDetails?.data?.title}
                </span>
              </div>
              {isVoted && (
                <div className="ml-auto">
                  <span className="bg-primary text-white px-4 py-2 rounded-[12px]">
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
                      <div className="xl:flex justify-between gap-6 xl:gap-4 items-center mb-3.5">
                        <div className="flex items-center flex-1 gap-1 max-sm:gap-2">
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
                              onCopy={() => handleCopy("current")}
                            >
                              <span
                                className={
                                  copied === "current"
                                    ? "icon md check-icon pl-4"
                                    : "icon md copy-icon cursor-pointer ms-0 pl-4"
                                }
                              />
                            </CopyToClipboard>
                          </p>
                          <div>
                            <span
                              className={`font-semibold px-3 py-1 rounded-[28px] text-[12px] ${
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
                              {proposalDetails?.data?.walletAddress === address
                                ? "YOU"
                                : proposalDetails?.data?.createdBy ||
                                  proposalDetails?.data?.walletAddress}
                            </span>
                            <CopyToClipboard
                              text={proposalDetails?.data?.walletAddress}
                              options={{ format: "text/plain" }}
                              onCopy={() => handleCopy("creator")}
                            >
                              <span
                                className={
                                  copied === "creator"
                                    ? "icon copy-check c-pointer shrink-0  cursor-pointer"
                                    : "icon md copy-icon  cursor-pointer shrink-0"
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
                          ? proposalDetails?.data?.description?.slice(0, 400) +
                            " ..."
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
          </div>
        </div>
      )}
    </>
  );
};

export default Proposal;
