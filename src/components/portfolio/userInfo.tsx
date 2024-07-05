import React, { useEffect, useState } from "react";
import ProfilePicture from "../profile/profilePicture";
import { useAccount, useBalance } from "wagmi";
import { useDispatch, useSelector } from "react-redux";
import apiCalls from "../../utils/api";
import { setError } from "../../reducers/layoutReducer";
import { setUserID } from "../../reducers/rootReducer";
import Button from "../../ui/Button";
import Spinner from "../loaders/spinner";
import useCopyToClipboard from "../../hooks/useCopytoClipboard";
import { numberWithCommas } from "../../ui/formatNumber";
const getName = (firstName: string | null, lastName: String | null) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  if (firstName && !lastName) {
    return `${firstName}`;
  }
  return `--`;
};
const UserInfo = () => {
  const { user, arcanaUser } = useSelector((store: any) => store.auth);
  const [usd, setUSD] = useState(0);
  const [fetchingFiat, setFetchingFiat] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { isCopied, handleCopy } = useCopyToClipboard();
  const {
    data: currency,
    refetch: getCurrency,
    isRefetching: refetchingNativeBalance,
  } = useBalance({ address }) || {};
  const {
    data: tokenData,
    refetch: getNativeCurrency,
    isRefetching: refetchingTokenBalance,
  } = useBalance({
    address,
    token: process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS as
      | `0x${string}`
      | undefined,
  }) || {};
  const currencyBalance = Number(currency?.formatted || 0);
  const tokenBalance = Number(tokenData?.formatted || 0);
  useEffect(() => {
    getUSDFromMatic("matic-network", "usd");
  }, [currencyBalance]);
  const getUSDFromMatic = async (id: string, to: string) => {
    setFetchingFiat(true);
    try {
      const response = await apiCalls.getFiatAmount(id, to);
      if (response.status === 200) {
        setUSD(response.data[id][to]);
      } else {
        dispatch(setError({ message: response }));
      }
    } catch (err) {
      dispatch(setError({ message: err.message || err }));
    } finally {
      setFetchingFiat(false);
    }
  };
  const fetchBalances = () => {
    getCurrency();
    getNativeCurrency();
  };
  return (
    <div className="tier-card rounded-[16px] bg-primary-content p-[18px] grid md:grid-cols-3 gap-6 mb-6">
      <div className="flex justify-center w-full  items-center rounded-lg">
        <ProfilePicture
          profile={{ ...user }}
          updateProfile={(profile: any) => dispatch(setUserID(profile))}
        />
      </div>
      <div className=" grid gap-4">
        <div>
          <p className="text-sm font-normal text-secondary opacity-[0.9]">
            User name
          </p>
          <p className="font-medium text-sm text-secondary">
            {getName(user?.firstName, user?.lastName)}
          </p>
        </div>
        <div className="">
          <p className="text-sm font-normal text-secondary opacity-[0.9]">
            Wallet Address
          </p>
          <p className="font-medium text-sm text-secondary break-all">
            {address
              ? `${address.slice(0, 6)}....${address.slice(
                  address.length - 6,
                  address.length
                )}`
              : "--"}
            <Button type="plain" handleClick={() => handleCopy(address)}>
              <span
                className={`${
                  !isCopied
                    ? "icon md copy-icon c-pointer ms-0"
                    : "icon md check-icon"
                }`}
              />
            </Button>
          </p>
        </div>
        <div>
          <p className="text-sm font-normal text-secondary opacity-[0.9] ">
            Email
          </p>
          <p className="font-medium text-sm text-secondary">
            {user?.email || arcanaUser?.email || "--"}
          </p>
        </div>
      </div>
      <div>
        <div className="my-4">
          <div className="flex justify-start gap-1 items-center h-[17px]">
            <p className="text-sm font-normal text-secondary opacity-[0.9]">
              {process.env.REACT_APP_CURRENCY}
            </p>
            {(refetchingNativeBalance ||
              refetchingTokenBalance ||
              fetchingFiat) && <Spinner size="loading-sm" />}
            {!refetchingNativeBalance &&
              !refetchingTokenBalance &&
              !fetchingFiat && (
                <div className="tooltip capitalize" data-tip={"Refetch"}>
                  <Button
                    type="plain"
                    btnClassName={"flex justify-center items-center"}
                    handleClick={() => fetchBalances()}
                    disabled={refetchingNativeBalance}
                  >
                    <span className="icon refresh-icon h-full" />
                  </Button>
                </div>
              )}
          </div>
          <div className="mt-2">
            <p className="font-medium	text-sm text-secondary">
              {currencyBalance > 0
                ? `${numberWithCommas(currencyBalance)} ~ ${numberWithCommas(
                    currencyBalance * usd,
                    2
                  )} $`
                : "0.00 ~ 0.00 $"}
            </p>
          </div>
        </div>
        <p className="text-sm font-normal text-secondary opacity-[0.9]">
          {process.env.REACT_APP_TOKEN_SYMBOL}
        </p>

        <div className="flex justify-start gap-2 items-center">
          <p className="font-medium	text-sm text-secondary w-[40px]">
            {tokenBalance > 0 ? numberWithCommas(tokenBalance) : "0.00"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
