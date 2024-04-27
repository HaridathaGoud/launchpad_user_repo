import React, { useEffect, useState} from "react";
import Button from "../../ui/Button";
import nodata from "../../assets/images/no-data.png";
import useContract from "../../hooks/useContract";
import { connect, useDispatch } from "react-redux";
import Spinner from "../loaders/spinner";
import moment from "moment";
import { ethers } from "ethers";
import { setError, setToaster } from "../../reducers/layoutReducer";
const Claims = (props) => {
  const [claimHide, setClaimHide] = useState(true);
  const [claimBtnLoader, setClaimBtnLoader] = useState<any>(false);
  const [claimIndex, setClaimIndex] = useState<any>(null);
  const { claimTokens } = useContract();
  const rootDispatch=useDispatch()
  useEffect(() => {
      if (props.data?.length !== 0) {
        setClaimHide(false);
      } else {
        setClaimHide(true);
      }
  }, [props.data]); //eslint-disable-line react-hooks/exhaustive-deps
  const handleClaim = (index: any) => {
    rootDispatch(setError({message:''}))
    setClaimIndex(index);
    setClaimBtnLoader(true);
    claimTokens(props.pjctInfo?.contractAddress)
      .then((res: any) => {
        // res.wait()
        _provider()
          .waitForTransaction(res?.hash)
          .then((receipt: any) => {
            setClaimBtnLoader(false);
            props.getClaims();
            rootDispatch(setToaster({message:"Tokens claim successful!"}))
          })
          .catch((error: any) => {
            setClaimBtnLoader(false);
            rootDispatch(setError({message:error?.reason || error}))
          });
      })
      .catch((error: any) => {
        setClaimBtnLoader(false);
        rootDispatch(setError({message:error,from:'contract'}))
      });
  };
  function _provider() {
    const _connector: any = window?.ethereum;
    const provider = new ethers.providers.Web3Provider(_connector);
    return provider;
  }
  const isBuyButtonDisabled = (claims:any) => {
    const nowDate = moment.utc(new Date()).toDate().getTime();
    const claimDate = moment.utc(claims.date).toDate().getTime();
    const isEnable = claimDate >= nowDate;
    return isEnable;
  };
  return (
    <>
      {!props.loader && (
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
                  {props?.data?.map((claims: any, index: any) => (
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
                                isBuyButtonDisabled(claims) ||
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
              {props?.data?.length === 0 && (
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
