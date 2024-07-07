import React from "react";
import Button from "../../../ui/Button";
import { connect } from "react-redux";
import NoDataFound from "../../../ui/noData";
import { numberWithCommas } from "../../../ui/formatNumber";

const AllocationsView = (props) => {
  return (
        <div className="" id="allocationClaimHeader">
          <div>
            <h4 className="text-2xl font-semibold text-secondary mb-2 mt-8">
              Your Allocations
            </h4>
          </div>
          <div className="">
            <div className="mb-6 max-sm:w-full overflow-auto">
              {props.allocations?.length !== 0 && (
                <div className="px-1">
                  <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] px-1">
                    <thead>
                      <tr>
                        <th className="text-left text-base text-secondary font-bold">
                          No.
                        </th>
                        <th className="text-left text-base text-secondary font-bold">
                          Type
                        </th>
                        <th className="text-left text-base text-secondary font-bold">
                          Allocation Volume
                        </th>
                        <th className="text-left text-base text-secondary font-bold">
                          Price Per Token
                        </th>
                        <th className="text-left text-base text-secondary font-bold">
                          Purchased Volume
                        </th>
                        <th className="text-left text-base text-secondary font-bold"></th>
                      </tr>
                    </thead>
                    {props.allocations?.map((item: any, idx: any) => (
                      <tbody key={idx}>
                        <tr>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {idx + 1}
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {item.type}
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {numberWithCommas(parseInt(item.allocationVolume))}{" "}
                              {item?.paymentSymbol || "--"}
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {item.paymentValue}
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {numberWithCommas(item.purchaseVolume)}
                            </p>
                          </td>
                          <td className="!p-2">
                            {!props.hide && (
                              <div className="text-right">
                                {" "}
                                <Button
                                  type="primary"
                                  btnClassName="!py-0 px-6 whitespace-nowrap"
                                  disabled={
                                    parseInt(item.allocationVolume) === 0 ||
                                    parseInt(item?.allocationVolume) <=
                                    parseInt(item?.purchaseVolume) ||
                                    (item?.type?.toLowerCase() === "private" &&
                                      props.pjctInfo?.privateStatus?.toLowerCase() ===
                                        "closed") ||
                                    (item?.type?.toLowerCase() === "public" &&
                                      props.pjctInfo?.publicStatus?.toLowerCase() ===
                                        "closed")
                                  }
                                  handleClick={() =>
                                    props.handleDrawerActions(true, item)
                                  }
                                >
                                  Buy Now
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              )}
            </div>
          </div>
          {props.allocations?.length === 0 && (
            <NoDataFound text ={''}/>
          )}
        </div>
  );
};
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(AllocationsView);
