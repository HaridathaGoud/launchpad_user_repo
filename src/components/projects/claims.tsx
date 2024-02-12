import React, { useEffect, useState, useRef, useContext } from "react";
import Button from "../../ui/Button";
import nodata from "../../assets/images/no-data.png";
import useContract from "../../hooks/useContract";
// import { isErrorDispaly } from '../../utils/errorHandling';
import { get } from "../../utils/api";
import { store } from "../../store";
import { connect } from "react-redux";
// import error from '../../assets/images/error.svg';
import Spinner from "../loaders/spinner";
import outletContext from "../../layout/context/outletContext";
import OutletContextModel from "../../layout/context/model";

const Claims = (props) => {
  const [claimsLoader, setclaimsLoader] = useState<any>(false);
  const [claimHide, setClaimHide] = useState(true);
  const [claimsData, setClaimsData] = useState<{ [key: string]: any }>([]);
  const [claimBtnLoader, setClaimBtnLoader] = useState<any>(false);
  const [claimIndex, setClaimIndex] = useState<any>(null);
  // const [claimErrorMsg, setClaimErrorMsg] = useState<any>(null);
  const { claimTokens } = useContract();
  const [scuess, setSucess] = useState(false);
  const shouldLog = useRef(true);
  const { setToaster, setErrorMessage }: OutletContextModel =
    useContext(outletContext);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      getClaimsData();
    }
  }, [props.pid]);
  const getClaimsData = async () => {
    const user = store.getState().auth;
    const userId =
      user?.user?.id && user?.user?.id != ""
        ? user?.user?.id
        : "00000000-0000-0000-0000-000000000000";
    await get("User/Claims/" + props.pid + "/" + userId)
      .then((response: any) => {
        setClaimsData(response.data);
        setclaimsLoader(false);
        if (response.data?.length != 0) {
          setClaimHide(false);
        } else {
          setClaimHide(true);
        }
        //handleClaimsCheck(response.data);  //calim button private& public end dates check
      })
      .catch((error: any) => {
        setErrorMessage?.(error?.reason || error);
        setclaimsLoader(false);
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
            setToaster?.("Claimed successfully");
            setSucess(true);
            setTimeout(function () {
              setSucess(false);
            }, 2000);
          })
          .catch((error: any) => {
            setClaimBtnLoader(false);
            window.scroll(0, 0);
            setErrorMessage?.(error.reason || error);
          });
      })
      .catch((error: any) => {
        setClaimBtnLoader(false);
        window.scroll(0, 0);
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
              {/* {claimErrorMsg && (
                            <div className="cust-error-bg my-4">
                                <img src={error} alt="" width={32} height={32} className="me-2" />
                                <div>
                                    <p className="error-title error-red">Error</p>
                                    <p className="error-desc">{claimErrorMsg}</p>
                                </div>
                            </div>
                        )} */}
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
                    <>
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
                                {claimBtnLoader && index == claimIndex && (
                                  <>
                                    <Spinner
                                      className="space-right  text-base-100"
                                      as="span"
                                      animation="border"
                                      variant="dark"
                                      size="sm"
                                      role="status"
                                      aria-hidden="true"
                                    ></Spinner>
                                  </>
                                )}{" "}
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
                    </>
                  ))}
                </table>
              </div>
              {claimsData?.length == 0 && (
                <div className="text-center">
                  <img width={120} className="mx-auto" src={nodata} />
                  <p className="text-secondary text-center">No data found</p>
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
