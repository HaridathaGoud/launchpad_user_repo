import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "../../ui/Button";
import { ethers } from 'ethers';
import nodata from "../../assets/images/no-data.png";
// import { isErrorDispaly } from '../../utils/errorHandling';
import useContract from "../../hooks/useContract";
import { connect } from "react-redux";
import { store } from "../../store";
import { get } from "../../utils/api";
import Spinner from "../loaders/spinner";
import outletContext from "../../layout/context/outletContext";
import OutletContextModel from "../../layout/context/model";

const Allocations = (props) => {
  const [allocationsData, setAllocationsData] = useState<{
    [key: string]: any;
  }>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isconfirm, setIsconfirm] = useState(false);
  const [allocationsLoader, setAllocationsLoader] = useState<any>(false);
  const [isHide, setIsHide] = useState(true);
  const [allocationVolume, setAllocationVolume] = useState<any>(null);
  const [volumeData, setVolumeData] = useState<any>(null);
  const [buyBalance, setBuyBalance] = useState<any>("");
  const [amountErrorMsg, setAmountErrorMsg] = useState<any>(null);
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  const { buyTokens } = useContract();
  const user = store.getState().auth;
  const shouldLog = useRef(true);
  const { setToaster, setErrorMessage }: OutletContextModel =
    useContext(outletContext);
  useEffect(() => {
    if (props.pid) {
      if (shouldLog.current) {
        shouldLog.current = false;
        getProjectClaimsDetails("allocations");
      }
    }
  }, [props.pid, user]);//eslint-disable-line react-hooks/exhaustive-deps

  const getProjectClaimsDetails = async (e: any) => {
    setAllocationsLoader(true);
    setErrorMessage?.(null);
    if (e === "allocations") {
      const user = store.getState().auth;
      const userId =
        user?.user?.id && user?.user?.id != ""
          ? user?.user?.id
          : "00000000-0000-0000-0000-000000000000";
      try {
        const res = await get("User/Allocations/" + props.pid + "/" + userId);
        if (res.statusText.toLowerCase() === "ok") {
          setAllocationsData(res.data);
          handlePrivateOrPublic(res.data);
          if (res.data?.length !== 0) {
            setIsHide(false);
          } else {
            setIsHide(true);
          }
        }
        setAllocationsLoader(false);
      } catch (error) {
        setErrorMessage?.(error);
        setAllocationsLoader(false);
      }
    }
  };
  const handlePrivateOrPublic = (data: any) => {
    data?.map((item: any) => {
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
    let allocationArray:any = [];
    if (startDate <= nowDate && nowDate <= endDate) {
      allocationArray.push(item);
      setAllocationsData(allocationArray);
    }
  };
  const handleBuyNow = (item: any) => {
    setErrorMessage?.(null);
    setIsChecked(true);
    setAllocationVolume(item?.allocationVolume);
    setVolumeData(item?.paymentValue);
  };
  const handleDrawerCancel = () => {
    setIsChecked(false);
    setIsconfirm(false);
    setErrorMessage?.(null);
  };
  const handleAmount = (e: any) => {
    if (!e.target.value || e.target.value?.match(/^\d{1,}(\.\d{0,8})?$/)) {
      setBuyBalance(e.target.value);
    }
  };
  const handleCancel = async () => {
    setIsChecked(false);
    setBuyBalance(null);
    setAmountErrorMsg(null);
    setErrorMessage?.(null);
    setBtnLoader(false);
  };
  const handleBuyToken = (e: any) => {
    let isUpdate = false;
    const value = allocationVolume?.toString();
    setAmountErrorMsg(null);
    setErrorMessage?.(null);
    if (value && !buyBalance) {
      isUpdate = true;
    } else {
      if (!buyBalance) {
        setAmountErrorMsg("Please enter allocation volume to buy.");
      } else if (parseFloat(buyBalance) === 0) {
        setAmountErrorMsg("Please enter allocation volume greater than zero.");
      } else if (buyBalance && parseFloat(buyBalance) > allocationVolume) {
        setAmountErrorMsg("Insufficient Allocation volume.");
      } else {
        isUpdate = true;
      }
    }
    if (isUpdate) {
      setIsconfirm(true);
    } else {
      setIsconfirm(false);
    }
  };
  function _provider() {
    const _connector: any = window?.ethereum;
    const provider = new ethers.providers.Web3Provider(_connector);
    return provider;
  }
  const handleOk = async () => {
    console.log(volumeData,buyBalance)
    const etherValue=Number(volumeData)*Number(buyBalance)
    setBtnLoader(true);
    buyTokens(etherValue,Number(buyBalance), props.pjctInfo?.contractAddress)
      .then((res: any) => {
        // res?.wait()
        _provider()
          .waitForTransaction(res?.hash)
          .then((receipt: any) => {
            setBtnLoader(false);
            setIsChecked(false);
            getProjectClaimsDetails("allocations");
            setToaster?.("Tokens buy successful!");
            window.location.reload();
            setIsconfirm(false);
          })
          .catch((error: any) => {
            console.log(error)
            setIsChecked(true);
            setErrorMessage?.(error.reason || error);
            setBtnLoader(false);
            setIsconfirm(false);
          });
      })
      .catch((error: any) => {
        setIsChecked(true);
        setIsconfirm(false);
        setErrorMessage?.(error?.shortMessage || error?.reason || error);
        setBtnLoader(false);
      });
  };
  return (
    <>
      {allocationsLoader && (
        <div className="text-center">
          <Spinner/>
        </div>
      )}
      {!allocationsLoader && (
          <div className="">
            <div>
              <h2 className="text-2xl font-medium">
                <span className="text-secondary">Your</span>{" "}
                <span className="text-primary">Allocations</span>
              </h2>
            </div>
            <div className="">
              <div className="mb-6 max-sm:w-full overflow-auto">
                {allocationsData?.length !== 0 && (
                  <div>
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
                        {allocationsData?.map((item: any, idx: any) => (
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
                                    {item?.paymentSymbol?.toLocaleString() ||
                                      "--"}
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
                                  {!isHide && (
                                    <div className="text-right">
                                      {" "}
                                      <Button
                                        type="primary"
                                        btnClassName="!py-0 px-6"
                                        disabled={
                                          item.allocationVolume === 0 ||
                                          item?.allocationVolume <=
                                            item?.purchaseVolume ||
                                          (item?.type?.toLowerCase() ===
                                            "private" &&
                                            props.pjctInfo?.privateStatus?.toLowerCase() ===
                                              "closed") ||
                                          (item?.type?.toLowerCase() ===
                                            "public" &&
                                            props.pjctInfo?.publicStatus?.toLowerCase() ===
                                              "closed")
                                        }
                                        handleClick={() => handleBuyNow(item)}
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
            {allocationsData?.length == 0 && (
              <div className="text-center">
                <img width={120} className="mx-auto" src={nodata} alt="No Data"/>
                <p className="text-secondary text-center">No data found</p>
              </div>
            )}
          </div>
      )}
      {/* Buy Now modal start  */}
      {isChecked && (
        <div className="drawer drawer-end">
          <input
            id="my-drawer-4"
            type="checkbox"
            className="drawer-toggle"
            checked={isChecked}
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
                <h4 className="text-xl text-secondary font-medium">Buy Now</h4>
                <span
                  onClick={handleDrawerCancel}
                  className="icon close"
                ></span>
              </div>

              <div className="mt-10">
                <div className="mt-10">
                  <label htmlFor="amount" className="text-dark text-sm font-normal p-0 mb-2 label ml-5">
                    Enter Token Count To Buy *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Token Count To Buy"
                    className="input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4"
                    id="amount"
                    defaultValue={allocationVolume || buyBalance}
                    maxLength={20}
                    autoComplete="off"
                    style={{ color: "black" }}
                    onChange={(e) => handleAmount(e)}
                  />
                </div>
              </div>
              <div>
                <div>
                  <span className="text-[red] ml-5">{amountErrorMsg}</span>
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-4">
                <Button
                  type="cancel"
                  btnClassName=""
                  handleClick={handleCancel}
                >
                  Cancel
                </Button>

                <Button
                  type="secondary"
                  btnClassName="min-w-[150px]"
                  handleClick={handleBuyToken}
                >
                  {btnLoader && (
                      <Spinner/>
                  )}{" "}
                  Ok
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Buy Now modal end  */}
      {/* Confirm modal start  */}
      {isconfirm && (
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
                Are you really sure you want to buy?
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
                >
                  <span>{btnLoader && <Spinner />} </span> Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
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
