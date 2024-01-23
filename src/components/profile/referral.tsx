import React, { useEffect, useState } from "react";
import { useSelector, connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";
import nodata from "../../assets/images/no-data.png";
import { Spinner } from "react-bootstrap";
import { useAccount } from "wagmi";
import { store } from "../../store";
import { getEarnedBonous, getKyc } from "../../utils/api";

function Referrals(props: any) {
  const [copied, setCpoied] = useState(false);
  const [referralCopied, setReferralCpoied] = useState(false);
  const [loader, setLoader] = useState(false);
  const pageSize = 10;
  const [pageNo, setPageNo] = useState(1);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loadData, setLoadData] = useState();
  const [hide, setHide] = useState(false);
  const [walletId, setWalletId] = useState({});
  const [refferalData, setRefferalData] = useState([]);
  const [earnedValue, setEarnedValue] = useState({});
  const { address } = useAccount();
  const user = store.getState().auth;
  const userId = user?.user?.id;
  const authInfo = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    if (userId && address) {
      getRefferalData(1, 10);
      getEarnedData();
    }
  }, [address]);

  const loadMore = () => {
    getRefferalData(pageNo, pageSize);
  };

  const isErrorDispaly = (objValue) => {
    if (
      objValue.status > 400 &&
      objValue.status < 500 &&
      objValue.status !== 401
    ) {
      return "Something went wrong please try again!";
    } else {
      if (objValue.data && typeof objValue.data === "string") {
        return objValue.data;
      } else if (
        objValue.response.data &&
        objValue.response.data.title &&
        typeof objValue.response.data.title
      ) {
        return objValue.response.data.title;
      } else if (
        objValue.originalError &&
        typeof objValue.originalError.message === "string"
      ) {
        return objValue.originalError.message;
      } else {
        return typeof objValue === "object" && objValue.reason
          ? objValue.reason
          : "Something went wrong please try again!";
      }
    }
  };
  const getRefferalData = async (pageNo: any, pageSize: any) => {
    setLoader(true);
    setHide(true);
    if (refferalData?.length == 0) {
      setLoader(true);
      setHide(false);
    }
    const skip = pageNo * pageSize - pageSize;
    const take = pageSize;
    const res = await getKyc(`User/GetReferralData/${userId}/${take}/${skip}`)
      .then((response) => {
        let _pageNo = pageNo + 1;
        setPageNo(_pageNo);
        let mergeData =
          pageNo == 1
            ? [...response.data]
            : [...refferalData, ...response.data];
        setRefferalData(mergeData);
        setLoadData(response.data?.length >= 10);
        setLoader(false);
        setHide(false);
      })
      .catch((error) => {
        setErrorMsg(isErrorDispaly(error));
        setLoader(false);
        setHide(false);
      });
  };
  const handleCopy = (item: any) => {
    setWalletId(item?.walletAddress);
    setCpoied(true);
    setReferralCpoied(false);
    setTimeout(() => setCpoied(false), 1000);
  };
  const handleReferralCopy = () => {
    setReferralCpoied(true);
    setCpoied(false);
    setTimeout(() => setReferralCpoied(false), 1000);
  };

  const getEarnedData = async () => {
    await getEarnedBonous(`User/customerearned/${authInfo?.id}`)
      .then((response) => {
        setEarnedValue(response.data);
      })
      .catch((error) => {
        setErrorMsg(isErrorDispaly(error));
        setLoader(false);
      });
  };

  return (
    <div className="">
      <div className="">
        <div className="mt-2 mb-2 flex gap-4 flex-wrap items-center">
          <div className="mt-2 mb-2 flex gap-4 items-center">
            <span className="text-sm font-normal text-secondary opacity-[0.9]">
              My Referral Code :{" "}
            </span>
            <span className="">{user?.user?.customerReferralCode || "--"}</span>
            {user?.user?.customerReferralCode && (
              <CopyToClipboard
                text={user?.user?.customerReferralCode}
                options={{ format: "text/plain" }}
                onCopy={() =>
                  handleReferralCopy(user?.user?.customerReferralCode)
                }
              >
                <span
                  className={
                    !referralCopied
                      ? "icon md copy-icon c-pointer ms-0"
                      : "icon md check-icon"
                  }
                />
              </CopyToClipboard>
            )}
          </div>
          <div className="mt-2 mb-2 flex gap-4 flex-wrap">
            <span className="text-sm font-normal text-secondary opacity-[0.9]">
              My Earnings :{" "}
            </span>
            {/* <span className='profile-value'>{authInfo?.customerReferralCode || "--"}</span> */}
            <div className="lg:flex items-center gap-4">
              <div>
                {/* <span className='profile-label ms-1'>Matic :- </span>
                <span className='profile-value'>{ earnedValue?.value|| "-"}</span>
                <span className='profile-value'>{ earnedValue?.maticCoin|| "-"}</span> */}
                <span className="text-sm font-normal text-secondary opacity-[0.9]">
                  Matic :-{" "}
                </span>
                {earnedValue?.value != "0.00000000" ? (
                  <span className="font-medium text-sm text-secondary">
                    {earnedValue?.value} {earnedValue?.maticCoin}
                  </span>
                ) : (
                  <span className="font-medium text-sm text-secondary">
                    {"-"}
                  </span>
                )}
              </div>
              <div>
                <span className="text-sm font-normal text-secondary opacity-[0.9]">
                  ETH :-{" "}
                </span>
                {earnedValue?.ethValue != "0.00000000" ? (
                  <span className="font-medium text-sm text-secondary">
                    {earnedValue?.ethValue} {earnedValue?.ethCoin}
                  </span>
                ) : (
                  <span className="font-medium text-sm text-secondary">
                    {"-"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <h1 className="font-semibold text-lg text-secondary mb-3">
          Referral’s
        </h1>
      </div>
      <div className="">
        {refferalData?.length > 0 ? (
          <div className="overflow-auto">
            <table className="refferal-table mx-auto border-spacing-y-2.5 border-separate max-sm:w-[800px] xl:w-[950px]">
              <thead>
                <tr>
                  <th className="text-left text-base text-secondary font-bold">
                    Date
                  </th>
                  <th className="text-left text-base text-secondary font-bold">
                    Name
                  </th>
                  <th className="text-left text-base text-secondary font-bold">
                    Wallet Address
                  </th>
                  <th className="text-left text-base text-secondary font-bold">
                    Is Membership
                  </th>
                </tr>
              </thead>
              {refferalData?.map((item: any) => (
                  <tbody>
                    <tr>
                      <td>
                        <p className="font-sm text-sm text-secondary font-normal">
                          <Moment format="DD/MM/YYYY">
                            {moment(new Date(item?.date), "DD/MM/YYYY")}
                          </Moment>
                        </p>
                      </td>
                      <td>
                        <p className="font-normal text-sm text-secondary">
                          {item?.name}
                        </p>
                      </td>
                      <td>
                        <div className="font-normal text-sm text-secondary wallet-address">
                          {item?.walletAddress}
                          <CopyToClipboard
                            text={item?.walletAddress}
                            options={{ format: "text/plain" }}
                            onCopy={() => handleCopy(item)}
                          >
                            <span
                              className={
                                copied && item?.walletAddress === walletId
                                  ? "icon check-icon"
                                  : "icon copy-icon c-pointer ms-0"
                              }
                            />
                          </CopyToClipboard>
                        </div>
                      </td>
                      <td>
                        <p className="font-normal text-sm text-secondary">
                          {item?.isMemberShip?.toString()}
                        </p>
                      </td>
                    </tr>
                  </tbody>
              ))}
            </table>
            {loadData && (
              <div className="mb-4">
                <span className="mb-0 d-flex justify-content-center">
                  {loader && <Spinner size="sm" className="spinner-color" />}
                </span>
                {!hide && (
                  <>
                    <p className="">
                      <span
                        className="cursor-pointer text-base text-primary font-semibold"
                        onClick={loadMore}
                      >
                        See More
                      </span>
                    </p>
                    <div className="">
                      <span
                        className="mx-auto block icon see-more cursor-pointer"
                        onClick={loadMore}
                      ></span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="text-center">
              <img width={120} src={nodata} className="mx-auto" />
              <p className="text-sm font-normal text-secondary opacity-[0.9]">
                No data found
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const connectStateToProps = ({ oidc }: any) => {
  return { oidc: oidc };
};

export default connect(connectStateToProps, null)(Referrals);
