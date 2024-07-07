import React, { useEffect } from "react";
import Button from "../../ui/Button";
import NoDataFound from "../../ui/noData";
import moment from "moment";
import { useDispatch } from "react-redux";
import ConvertLocalFormat from "../../utils/dateFormat";
import Spinner from "../loaders/spinner";
import { setToaster } from "../../reducers/layoutReducer";
import useClaimTokens from "../../hooks/useClaimTokens";
import PortfolioShimmer from "../loaders/portfolioshimmer";
import { numberWithCommas } from "../../ui/formatNumber";

const Claims = ({ userClaims,fetchData }) => {
  const rootDispatch = useDispatch();
  const { isClaiming, handleClaim, tokensClaimed } = useClaimTokens();
  useEffect(() => {
    onClaim();
  }, [tokensClaimed]);
  const onClaim = () => {
    if (tokensClaimed) {
      rootDispatch(setToaster({ message: "Tokens claim successful!" }));
      fetchData();
    }
  };
  const isBuyButtonDisabled = (claims: any) => {
    const nowDate = moment.utc(new Date()).toDate().getTime();
    const claimDate = moment.utc(claims.date).toDate().getTime();
    const isEnable = claimDate >= nowDate;
    return isEnable;
  };

  return (
    <div>
      <div className="mb-6 max-sm:w-full overflow-auto">
        <div className="px-1">
          <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] px-1">
            <thead>
              <tr className="!bg-primary-content">
                <th className="text-left text-base text-secondary font-bold">
                  Projects
                </th>
                <th className="text-left text-base text-secondary font-bold">
                  Allocation
                </th>
                <th className="text-left text-base text-secondary font-bold">
                  Date
                </th>
                <th className="text-left text-base text-secondary font-bold">
                  Token Symbol
                </th>
                <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                        {/* Live Price */}
                        </th>
              </tr>
            </thead>
            <tbody>
              {userClaims.data?.length > 0 &&
                userClaims.data.map((item: any, index: any) => (
                  <tr key={item.projectName}>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {item?.projectName}
                      </p>
                    </td>
                    <td> <p className="font-normal text-sm text-secondary">{numberWithCommas(item?.allocation)}</p></td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {item.date ? ConvertLocalFormat(item?.date) : "--"}
                      </p>
                    </td>
                    <td>
                      <p className="font-normal text-sm text-secondary">
                        {item?.tokenSymbol}
                      </p>
                    </td>
                    {/* <td>
                        <p className="font-normal text-sm text-secondary">
                          {item?.liveprice && '$'+item?.liveprice||'--'}
                        </p>
                      </td> */}
                    <td className="!p-2 text-right md:w-[217px]">
                      {" "}
                      {!item?.isBuy && (
                        <Button
                          type="primary"
                          btnClassName="!py-0 px-6"
                          disabled={
                            isBuyButtonDisabled(item) ||
                            item.allocation === 0 ||
                            item?.isBuy ||
                            isClaiming===index
                          }
                          handleClick={() => handleClaim(index, item)}
                        >
                          {isClaiming === index && (
                            <span>
                              <Spinner />
                            </span>
                          )}
                          Claim
                        </Button>
                      )}
                      {item?.isBuy && (
                        <>
                          {" "}
                          <Button
                            type="primary"
                            btnClassName="!py-0 px-6"
                            disabled={item?.isBuy || isClaiming === index}
                          >
                            Claimed
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              {!userClaims.data?.length && !userClaims?.loading && (
                <tr className="!bg-transparent">
                  <td colSpan={6} className="text-center ">
                    <NoDataFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {userClaims?.loading && <PortfolioShimmer.Tab />}
        </div>
      </div>
    </div>
  );
};

export default Claims;
