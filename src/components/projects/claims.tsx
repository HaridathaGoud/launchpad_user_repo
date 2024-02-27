import React, { useEffect, useState, useContext } from "react";
import Button from "../../ui/Button";
import nodata from "../../assets/images/no-data.png";
import useContract from "../../hooks/useContract";
import { get } from "../../utils/api";
import { store } from "../../store";
import { connect } from "react-redux";
import Spinner from "../loaders/spinner";
import outletContext from "../../layout/context/outletContext";
import OutletContextModel from "../../layout/context/model";
import moment from "moment";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
const Claims = (props) => {
  const { address } = useAccount();
  const [claimsLoader, setClaimsLoader] = useState<any>(false);
  const [claimHide, setClaimHide] = useState(true);
  const [claimsData, setClaimsData] = useState<{ [key: string]: any }>([]);
  const [claimBtnLoader, setClaimBtnLoader] = useState<any>(false);
  const [claimIndex, setClaimIndex] = useState<any>(null);
  const { claimTokens } = useContract();
  const { setToaster, setErrorMessage }: OutletContextModel =
    useContext(outletContext);
  useEffect(() => {
      getClaimsData();
  }, [props.pid, address]); //eslint-disable-line react-hooks/exhaustive-deps
  const getClaimsData = async () => {
    const user = store.getState().auth;
    const userId =
      user?.user?.id && user?.user?.id != ""
        ? user?.user?.id
        : "00000000-0000-0000-0000-000000000000";
    await get("User/Claims/" + props.pid + "/" + userId)
      .then((response: any) => {
        setClaimsData(response.data);
        setClaimsLoader(false);
        if (response.data?.length !== 0) {
          setClaimHide(false);
        } else {
          setClaimHide(true);
        }
        //handleClaimsCheck(response.data);  //calim button private& public end dates check
      })
      .catch((error: any) => {
        setErrorMessage?.(error?.reason || error);
        setClaimsLoader(false);
      });
  };
  const handleClaim = (index: any) => {
    setErrorMessage?.(null);
    setClaimIndex(index);
    setClaimBtnLoader(true);
    claimTokens(props.pjctInfo?.contractAddress)
      .then((res: any) => {
        // res.wait()
        _provider()
          .waitForTransaction(res?.hash)
          .then((receipt: any) => {
            setClaimBtnLoader(false);
            // getProjectClaimsDetails('allocations');
            setToaster?.("Tokens claim successful!");
            window.location.reload();
          })
          .catch((error: any) => {
            setClaimBtnLoader(false);
            setErrorMessage?.(error.reason || error);
          });
      })
      .catch((error: any) => {
        setClaimBtnLoader(false);
        setErrorMessage?.(error.shortMessage || error);
      });
  };
  function _provider() {
    const _connector: any = window?.ethereum;
    const provider = new ethers.providers.Web3Provider(_connector);
    return provider;
  }
  return (
    <>
      {!claimsLoader && (
        <>
          {claimHide && (
            <div className="">
              <div>
                <h2 className="text-2xl font-medium">
                  <span className="text-secondary">Cl</span>
                  <span className="text-primary">aim</span>
                </h2>
              </div>
              <div className="">
                <p className="text-base text-neutral">
                  1. You first need to purchase the tokens on this page, when
                  the {process.env.REACT_APP_OFFERING_TITLE}’S is live on TBA
                </p>
                <p className="text-base text-neutral">
                  2. After that , claim your purchased tokens here at TGE
                </p>
              </div>
            </div>
          )}
          {!claimHide && (
            <div className="">
              <div>
                <h2 className="text-2xl font-medium">
                  <span className="text-secondary">Cl</span>
                  <span className="text-primary">aim</span>
                </h2>
              </div>
              <div className="max-sm:w-full overflow-auto">
                <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] ">
                  <thead>
                    <tr>
                      <th className="text-left text-base text-secondary font-bold">
                        No.
                      </th>
                      <th className="text-left text-base text-secondary font-bold">
                        Allocation
                      </th>
                      <th className="text-left text-base text-secondary font-bold">
                        Date
                      </th>
                      <th className="text-left text-base text-secondary font-bold">
                        Claimed
                      </th>
                      <th className="text-left text-base text-secondary font-bold"></th>
                    </tr>
                  </thead>
                  {claimsData?.map((claims: any, index: any) => (
                    <tbody key={index}>
                      <tr>
                        <td>
                          <p className="font-normal text-sm text-secondary">
                            {index + 1}
                          </p>{" "}
                        </td>
                        <td>
                          <p className="font-normal text-sm text-secondary">
                            {claims.allocation.toLocaleString()}
                          </p>{" "}
                        </td>
                        <td>
                          <p className="font-normal text-sm text-secondary">
                            {claims.date
                              ? moment(claims.date).format("DD-MM-YYYY HH:mm")
                              : "--"}
                            {claims.date ? `(UTC)` : "--"}
                          </p>{" "}
                        </td>
                        <td>
                          <p className="font-normal text-sm text-secondary">
                            {claims?.claimedValue?.toLocaleString() || "0"}
                          </p>{" "}
                        </td>
                        <td className="!p-2 text-right">
                          {" "}
                          {!claims?.isBuy && (
                            <Button
                              type="primary"
                              btnClassName="!py-0 px-6"
                              disabled={
                                claims.allocation === 0 || claims?.isBuy
                              }
                              handleClick={() => handleClaim(index)}
                            >
                              {claimBtnLoader && index === claimIndex && (
                                <span>
                                  <Spinner />
                                </span>
                              )}
                              Claim
                            </Button>
                          )}
                          {claims?.isBuy && (
                            <>
                              {" "}
                              <Button
                                type="primary"
                                btnClassName="!py-0 px-6"
                                disabled={claims?.isBuy}
                              >
                                Claimed
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              {claimsData?.length === 0 && (
                <div className="text-center">
                  <img
                    width={95}
                    className="mx-auto"
                    src={nodata}
                    alt="No Data"
                  />
                  <p className="text-secondary text-center mt-2">No data found</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(Claims);
