import React from "react";
import Button from "../../../ui/Button";
import { connect } from "react-redux";
import NoDataFound from "../../../ui/nodatafound";

const AllocationsView = (props) => {
  return (
    <>
        <div className="" id="allocationClaimHeader">
          <div>
            <h2 className="text-2xl font-medium">
              <span className="text-secondary">Your</span>{" "}
              <span className="text-primary">Allocations</span>
            </h2>
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
                              {item.allocationVolume.toLocaleString()}{" "}
                              {item?.paymentSymbol?.toLocaleString() || "--"}
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {item.paymentValue}
                            </p>
                          </td>
                          <td>
                            <p className="font-normal text-sm text-secondary">
                              {item.purchaseVolume.toLocaleString()}
                            </p>
                          </td>
                          <td className="!p-2">
                            {!props.hide && (
                              <div className="text-right">
                                {" "}
                                <Button
                                  type="primary"
                                  btnClassName="!py-0 px-6"
                                  disabled={
                                    item.allocationVolume === 0 ||
                                    item?.allocationVolume <=
                                      item?.purchaseVolume ||
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

      {/* Confirm modal start  */}
      {/* {isconfirm && (
        <div className="drawer drawer-end">
          <input
            id="my-drawer-4"
            type="checkbox"
            className="drawer-toggle"
            checked={isconfirm}
          />
          <div className="drawer-content"></div>
          <div className="drawer-side z-[999]">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={handleDrawerCancel}
            ></label>
            <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl text-secondary font-medium">Confirm</h4>
                <span
                  onClick={handleDrawerCancel}
                  className="icon close"
                ></span>
              </div>

              <div className="mt-10">
                <p className="text-secondary text-lg font-medium">
                  Are you really sure you want to buy {buyBalance} tokens?
                </p>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button type="cancel" handleClick={handleDrawerCancel}>
                  {" "}
                  Cancel
                </Button>
                <Button
                  type="secondary"
                  btnClassName="flex gap-2"
                  handleClick={() => handleOk()}
                  disabled={btnLoader}
                >
                  <span>{btnLoader && <Spinner />} </span> Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {/* Confirm modal end  */}
    </>
  );
};
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(AllocationsView);
