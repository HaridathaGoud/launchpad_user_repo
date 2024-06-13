import React from "react";
import Button from "../../ui/Button";
import { connect } from "react-redux";
import NoDataFound from '../../ui/nodatafound';
import Spinner from "../loaders/spinner";
import moment from "moment";
import ConvertLocalFormat from "../../utils/dateFormat";
import { ClaimsShimmer } from "../loaders/projects/claimsShimmer";

const Investments = ({ data, loading, claimBtnLoader, claimIndex, handleClaim, showClaimableOnly }) => {
  const isBuyButtonDisabled = (claims: any) => {
    const nowDate = moment.utc(new Date()).toDate().getTime();
    const claimDate = moment.utc(claims.date).toDate().getTime();
    const isEnable = claimDate >= nowDate;
    return isEnable;
  };

  return (
    <div >
      {showClaimableOnly &&
        <div className="">
          {loading &&
            <ClaimsShimmer />
          }
          {!loading &&
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
                    {/* <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                        Live Price
                        </th> */}
                  </tr>
                </thead>
                  <tbody>
                    {data?.length > 0 ? (
                      data.map((item: any, index: any) => (
                        <tr key={item.projectName}>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {item?.projectName}
                            </p>
                          </td>
                          <td>
                            {item?.allocation}
                          </td>
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
                          <td className="!p-2 text-right">
                            {" "}
                            {!item?.isBuy && (
                              <Button
                                type="primary"
                                btnClassName="!py-0 px-6"
                                disabled={
                                  isBuyButtonDisabled(item) ||
                                  item.allocation === 0 || item?.isBuy
                                }
                                handleClick={() => handleClaim(index, item)}
                              >
                                {claimBtnLoader && index === claimIndex && (
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
                                  disabled={item?.isBuy}
                                >
                                  Claimed
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="!bg-transparent">
                        <td colSpan={6} className="text-center ">
                          <NoDataFound />
                        </td>
                      </tr>
                    )}
                  </tbody>
              </table>
            </div>

          </div>
          }
        </div>
      }
      {!showClaimableOnly &&
        <div className="">
          {loading &&
            <ClaimsShimmer />
          }
          {!loading &&
            <div className="mb-6 max-sm:w-full overflow-auto">
              <div className="px-1">
                <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] px-1">
                  <thead>
                    <tr className="!bg-primary-content">
                      <th className="text-left text-base text-secondary font-bold">
                        Projects
                      </th>
                      <th className="text-left text-base text-secondary font-bold">
                        Network
                      </th>
                      <th className="text-left text-base text-secondary font-bold">
                        Invested
                      </th>
                      <th className="text-left text-base text-secondary font-bold">
                        Tokens
                      </th>
                      <th className="text-left text-base text-secondary font-bold">
                        Status
                      </th>
                      <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                        Purchase Price
                      </th>
                      {/* <th className="text-left text-base text-secondary font-bold whitespace-nowrap">
                   Live Price
                   </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 ? (
                      data.map((item: any) => (
                        <tr key={item.projectName}>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {item?.projectName}
                            </p>
                          </td>
                          <td>
                            <span className="icon usdt scale-150"></span>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {item?.invested && item?.invested+' '+ process.env.REACT_APP_CURRENCY || '--'}
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {item?.tokens && (item?.tokens +' '+item?.tokenSymbol) || '--'}
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {item?.status ? item?.status : '--'}
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {item?.purchasePrice && item?.purchasePrice +' '+ process.env.REACT_APP_CURRENCY|| '--'}
                            </p>
                          </td>
                          {/* <td>
                   <p className="font-normal text-sm text-secondary">
                     {item?.liveprice && '$'+item?.liveprice||'--'}
                   </p>
                 </td> */}
                        </tr>
                      ))
                    ) : (
                      <tr className="!bg-transparent">
                        <td colSpan={6} className="text-center ">
                          <NoDataFound />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          }
        </div>}
    </div>

  );
};
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(Investments);
