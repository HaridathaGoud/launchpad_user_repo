import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {  getVoters } from "../../../reducers/votingReducer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Spinner from "../../loaders/spinner";
import Button from "../../../ui/Button";
import NoDataFound from "../../../ui/nodatafound";
import ProposalViewShimmer from "../../loaders/ProposalViewShimmer";
const pageSize = 10;
function Voters(props: any) {
  const params = useParams();
  const voters = useSelector((state: any) => state?.vtg?.voters);
  const [copied, setCopied] = useState("");
  useEffect(() => {
    props.getVotersList({
      page: 1,
      take: pageSize,
      id: params?.proposalId,
      data: null,
    });
  }, []);

  const fetchMoreData = () => {
    props.getVotersList({
      page: voters?.nextPage,
      take: pageSize,
      id: params?.proposalId,
      data: voters?.data,
    });
  };
  const handleCopy = (address) => {
    setCopied(address);
    setTimeout(() => {
      setCopied("");
    }, 1000);
  };

  return (
    <>
      <div className="mt-[26px] mb-2">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-semibold text-secondary">
              Voters {""}
            </span>
            <span className="text-secondary">
              ({voters?.data?.length} voters)
            </span>
          </div>
        </div>
      </div>

      {voters?.loading ? (
        <ProposalViewShimmer/>
      ) : (
        <div>
          <div className="">
            <div className="mb-6 max-sm:w-full overflow-auto">
              <div className="px-2">
                <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] ">
                  <thead>
                    <tr>
                      <th className="text-left text-base text-secondary font-bold">
                        No
                      </th>
                      <th className="text-left text-base text-secondary font-bold">
                        Voter Address
                      </th>
                      <th className="text-left text-base text-secondary font-bold text-center">
                      Vote Option
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {voters?.data?.length > 0 &&
                      voters?.data?.map((voter: any, index: any) => (
                        <tr key={voter.walletAddress + voter.options}>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {index + 1}
                            </p>
                          </td>
                          <td>
                            <div className="flex gap-4">
                              <span className="flex-1 w-20 truncate">
                                {voter?.walletAddress}
                              </span>
                              <CopyToClipboard
                                text={voter?.walletAddress}
                                options={{ format: "text/plain" }}
                                onCopy={() => handleCopy(voter?.walletAddress)}
                              >
                                <span
                                  className={
                                    copied !== voter?.walletAddress
                                      ? "icon md copy-icon  cursor-pointer shrink-0"
                                      : "icon copy-check c-pointer shrink-0  cursor-pointer"
                                  }
                                />
                              </CopyToClipboard>
                            </div>
                          </td>
                          <td>
                            <p className="font-normal text-center text-sm text-secondary">
                              {voter.options}
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {!voters.loading && voters?.data?.length === 0 && (
                  <NoDataFound text ={''}/>
                )}
                <div className="flex justify-center">
                  {voters.loading && (
                    <span className="text-center">
                      <Spinner />
                    </span>
                  )}
                  {!voters.loading &&
                    voters?.data?.length > 0 &&
                    voters?.data?.length ===
                      pageSize * (voters?.nextPage - 1) && (
                      <Button handleClick={fetchMoreData} type="plain">
                        <p className="text-center text-primary text-base font-medium mb-0 cursor-pointer">
                          See More
                        </p>
                        <span className="icon block mx-auto see-more cursor-pointer"></span>
                      </Button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Discussions/> */}
    </>
  );
}
const connectDispatchToProps = (dispatch: any) => {
  return {
    getVotersList: (information: any) => {
      dispatch(getVoters(information));
    },
  };
};
export default connect(null, connectDispatchToProps)(Voters);
