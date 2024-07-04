import React, { useEffect, useState} from "react";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import { ethers } from "ethers";
import useContract from "../../../hooks/useContract";
import { store } from "../../../store";
import { get } from "../../../utils/api";
import { setError, setToaster } from "../../../reducers/layoutReducer";
import { ClaimsShimmer } from "../../loaders/projects/claimsShimmer";
import Button from "../../../ui/Button";
import Spinner from "../../loaders/spinner";
import NoDataFound from "../../../ui/noData";
import ConvertLocalFormat from "../../../utils/dateFormat";
const Claims = (props:any) => {
  const { claimTokens } = useContract();
  const user = store.getState().auth;
  const [claimHide, setClaimHide] = useState(true);
  const [claimBtnLoader, setClaimBtnLoader] = useState<any>(false);
  const [claimIndex, setClaimIndex] = useState<any>(null);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState<any>(null);

  const rootDispatch=useDispatch()
  useEffect(() => {
    getClaimDetails()
  }, []); 

  const getClaimDetails = async () => {
    const userId =
      user?.user?.id && user?.user?.id != ""
        ? user?.user?.id
        : "00000000-0000-0000-0000-000000000000";
    try {
        const claims = await get("User/Claims/" + props.pid + "/" + userId);
        if (claims.status === 200) {
          setData(claims.data);
          if (claims.data?.length !== 0) {
            setClaimHide(false);
          } else {
            setClaimHide(true);
          }
        } else {
          rootDispatch(setError({ message: claims }));
        }
    } catch (error) {
      rootDispatch(setError({ message: error }));
    } finally {
      setLoader(false);
    }
  };
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
            props.getDetails();
            getClaimDetails();
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
    {loader && (
        <ClaimsShimmer/>
      )}
      {!loader && (
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
                <p className="text-base text-secondary">
                  1. You first need to purchase the tokens on this page, when
                  the {process.env.REACT_APP_OFFERING_TITLE}’S is live on TBA
                </p>
                <p className="text-base text-secondary">
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
                <table className="refferal-table md:w-full border-spacing-y-2.5 border-separate max-sm:w-[800px] px-1">
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
                  {data?.map((claims: any, index: any) => (
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
                            {claims.date ? ConvertLocalFormat(claims.date) : "--"}
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
                                isBuyButtonDisabled(claims) || claimBtnLoader ||
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
              {data?.length === 0 && (
                <NoDataFound />
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
