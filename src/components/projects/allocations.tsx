import React, { useEffect, useReducer } from "react";
import Button from "../../ui/Button";
import { ethers } from "ethers";
import nodata from "../../assets/images/no-data.png";
import useContract from "../../hooks/useContract";
import { connect, useDispatch } from "react-redux";
import Spinner from "../loaders/spinner";
import { setError, setToaster } from "../../reducers/layoutReducer";
import { allocationState, allocationsReducer } from "./reducers";

const Allocations = (props) => {
  const [state, dispatch] = useReducer(allocationsReducer, allocationState);
  const { buyTokens } = useContract();
  const rootDispatch = useDispatch();
  useEffect(() => {
    if (props.data) {
      dispatch({ type: "setAllocations", payload: props.data });
      handlePrivateOrPublic(props.data);
      if (props.data?.length !== 0) {
        dispatch({ type: "setHide", payload: false });
      } else {
        dispatch({ type: "setHide", payload: true });
      }
    }
  }, [props?.data]);
  const handlePrivateOrPublic = (data: any) => {
    data?.forEach((item: any) => {
      if (item.type === "Private") {
        let privateStartDate = new Date(item.startDate).getTime();
        let privateEndDate = new Date(item.endDate).getTime();
        DatesCheck(privateStartDate, privateEndDate, item);
      } else if (item.type === "Public") {
        let publicStartDate = new Date(props.pjctInfo.startDate).getTime();
        let publicEndDate = new Date(props.pjctInfo.endDate).getTime();
        DatesCheck(publicStartDate, publicEndDate, item);
      }
    });
  };
  const DatesCheck = (startDate: any, endDate: any, item: any) => {
    let nowDate = new Date().getTime();
    let allocationArray: any = [];
    if (startDate <= nowDate && nowDate <= endDate) {
      allocationArray.push(item);
      dispatch({ type: "setAllocations", payload: allocationArray });
    }
  };
  const handleDrawerActions = (payload: any, item: any) => {
    if (payload) {
      dispatch({
        type: "setAllocationVolume",
        payload: item?.allocationVolume,
      });
      dispatch({ type: "setVolumeData", payload: item?.paymentValue });
    } else {
      dispatch({ type: "setBuyAmount", payload: null });
      state.amountError && dispatch({ type: "setAmountError", payload: "" });
      rootDispatch(setError({ message: "" }));
      dispatch({ type: "setIsBuying", payload: false });
      dispatch({ type: "setDrawerStep", payload: 1 });
    }
    dispatch({ type: "setShouldOpenDrawer", payload: payload });
  };
  const handleAmount = (e: any) => {
    if (!e.target.value || e.target.value?.match(/^\d{1,}(\.\d{0,8})?$/)) {
      dispatch({ type: "setBuyAmount", payload: e.target.value });
    }
  };
  const handleBuyToken = (e: any) => {
    let isUpdate = false;
    const value = state.allocationVolume?.toString();
    state.amountError && dispatch({ type: "setAmountError", payload: "" });
    rootDispatch(setError({ message: "" }));
    if (value && state.buyAmount) {
      isUpdate = true;
    } else {
      if (!state.buyAmount) {
        dispatch({
          type: "setAmountError",
          payload: "Please enter allocation volume to buy.",
        });
      } else if (parseFloat(state.buyAmount) === 0) {
        dispatch({
          type: "setAmountError",
          payload: "Please enter allocation volume greater than zero.",
        });
      } else if (
        state.buyAmount &&
        parseFloat(state.buyAmount) > state.allocationVolume
      ) {
        dispatch({
          type: "setAmountError",
          payload: "Insufficient Allocation volume.",
        });
      } else {
        isUpdate = true;
      }
    }
    if (isUpdate) {
      dispatch({ type: "setDrawerStep", payload: 2 });
    } else {
      dispatch({ type: "setDrawerStep", payload: 1 });
    }
  };
  function _provider() {
    const _connector: any = window?.ethereum;
    const provider = new ethers.providers.Web3Provider(_connector);
    return provider;
  }
  const handleOk = async () => {
    const etherValue = Number(state.volumeData) * Number(state.buyAmount);
    dispatch({ type: "setIsBuying", payload: true });
    buyTokens(
      etherValue,
      Number(state.buyAmount),
      props.pjctInfo?.contractAddress
    )
      .then((res: any) => {
        // res?.wait()
        _provider()
          .waitForTransaction(res?.hash)
          .then((receipt: any) => {
            dispatch({ type: "setIsBuying", payload: false });
            dispatch({ type: "setShouldOpenDrawer", payload: false });
            dispatch({ type: "setDrawerStep", payload: 1 });
            rootDispatch(setToaster({ message: "Tokens buy successful!" }));
            props.getAllocations();
          })
          .catch((error: any) => {
            rootDispatch(setError({ message: error?.reason || error }));
            dispatch({ type: "setIsBuying", payload: false });
          });
      })
      .catch((error: any) => {
        rootDispatch(
          setError({
            message: error?.shortMessage || error?.reason || error,
            from: "contract",
          })
        );
        dispatch({ type: "setIsBuying", payload: false });
      });
  };
  return (
    <>
      {props.loader && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
      {!props.loader && (
        <div className="">
          <div>
            <h2 className="text-2xl font-medium">
              <span className="text-secondary">Your</span>{" "}
              <span className="text-primary">Allocations</span>
            </h2>
          </div>
          <div className="">
            <div className="mb-6 max-sm:w-full overflow-auto">
              {state.allocations?.length !== 0 && (
                <div className="px-1">
                  <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] ">
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
                          Purchase Volume
                        </th>
                        <th className="text-left text-base text-secondary font-bold"></th>
                      </tr>
                    </thead>
                    {state.allocations?.map((item: any, idx: any) => (
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
                            {!state.hide && (
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
                                    handleDrawerActions(true, item)
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
          {state.allocations?.length === 0 && (
            <div className="text-center">
              <img width={95} className="mx-auto" src={nodata} alt="No Data" />
              <p className="text-center text-secondary mt-2">No data found</p>
            </div>
          )}
        </div>
      )}
      {/* Buy Now modal start  */}
      {state.shouldOpenDrawer && (
        <div className="drawer drawer-end">
          <input
            id="my-drawer-4"
            type="checkbox"
            className="drawer-toggle"
            checked={state.shouldOpenDrawer}
          />
          <div className="drawer-content"></div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={() => handleDrawerActions(false, null)}
            ></label>
            <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-20">
              <div className="flex items-center justify-between">
                <h4 className="text-xl text-secondary font-medium">Buy Now</h4>
                <span
                  onClick={() => handleDrawerActions(false, null)}
                  className="icon close"
                ></span>
              </div>

              {state.drawerStep === 1 && (
                <>
                  {" "}
                  <div className="mt-10">
                    <div className="mt-10">
                      <label
                        htmlFor="amount"
                        className="text-dark text-sm font-normal p-0 mb-2 label ml-4"
                      >
                        Enter Token Count To Buy <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Token Count To Buy"
                        className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                        id="amount"
                        defaultValue={state.allocationVolume || state.buyAmount}
                        maxLength={20}
                        autoComplete="off"
                        style={{ color: "black" }}
                        onChange={(e) => handleAmount(e)}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </div>
                  {state.amountError && (
                    <div>
                      <div>
                        <span className="text-[red] ml-5">
                          {state.amountError}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="mt-8 flex justify-end gap-4">
                    <Button
                      type="cancel"
                      btnClassName=""
                      handleClick={() => handleDrawerActions(false, null)}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="secondary"
                      btnClassName="min-w-[150px]"
                      handleClick={handleBuyToken}
                    >
                      {state.isBuying && <Spinner />} Ok
                    </Button>
                  </div>
                </>
              )}

              {state.drawerStep === 2 && (
                <>
                  <div className="mt-10">
                    <p className="text-secondary text-lg font-medium">
                      Are you really sure you want to buy {state.buyAmount}{" "}
                      tokens?
                    </p>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <Button
                      type="cancel"
                      handleClick={() => handleDrawerActions(false, null)}
                    >
                      {" "}
                      Cancel
                    </Button>
                    <Button
                      type="secondary"
                      btnClassName="flex gap-2"
                      handleClick={() => handleOk()}
                      disabled={state.isBuying}
                    >
                      <span>{state.isBuying && <Spinner />} </span> Confirm
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Buy Now modal end  */}
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
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={handleDrawerCancel}
            ></label>
            <div className="menu p-4 md:w-80 min-h-full bg-white text-sm-content pt-20">
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
})(Allocations);
