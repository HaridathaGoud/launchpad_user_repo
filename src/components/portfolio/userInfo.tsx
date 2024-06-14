import React, { useEffect, useMemo, useState } from "react";
import ProfilePicture from "../profile/profilePicture";
import { useAccount, useBalance } from "wagmi";
import { useDispatch, useSelector } from "react-redux";
import apiCalls from "../../utils/api";
import { setError } from "../../reducers/layoutReducer";
import { setUserID } from "../../reducers/rootReducer";
import Button from "../../ui/Button";
import Spinner from "../loaders/spinner";

const UserInfo = () => {
  const { user, arcanaUser } = useSelector((store: any) => store.auth);
  const [usd, setUSD] = useState(0);
  const [fetchingFiat, setFetchingFiat] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { address } = useAccount();
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
  }, [currency]);
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
  const userFiatAmount: number = useMemo(() => {
    const nativeCurrency = currencyBalance || 0;
    const fiatCurrency = usd || 0;
    return nativeCurrency * fiatCurrency;
  }, [currencyBalance, usd]);

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
            User Name
          </p>
          <p className="font-medium text-sm text-secondary">
            {user?.userName ? (
              <span className="bg-[#E3F8FF] text-[#035388] text-[10px] font-semibold px-3 py-1 rounded-full">
                {user?.userName}
              </span>
            ) : (
              "--"
            )}
          </p>
        </div>
        <div className="">
          <p className="text-sm font-normal text-secondary opacity-[0.9]">
            Wallet Address
          </p>
          <p className="font-medium text-sm text-secondary break-all">
            {address ? address : "--"}
          </p>
        </div>
        <div>
          <p className="text-sm font-normal text-secondary opacity-[0.9]">
            Email
          </p>
          <p className="font-medium text-sm text-secondary">
            {user?.email || arcanaUser?.email || "--"}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm font-normal text-secondary opacity-[0.9]">USD</p>
        <div className="flex justify-start gap-2 items-center">
          <p className="text-secondary text-sm font-medium">
            {userFiatAmount > 0 ? userFiatAmount.toFixed(8) : 0}
          </p>
          <Button
            type="plain"
            btnClassName={""}
            handleClick={() => getUSDFromMatic("matic-network", "usd")}
            disabled={fetchingFiat}
          >
            {fetchingFiat && <Spinner size="loading-sm" />}
            {!fetchingFiat && <span className="icon refresh-icon h-full" />}
          </Button>
        </div>
        <div className="my-4">
          <p className="text-sm font-normal text-secondary opacity-[0.9]">
            {process.env.REACT_APP_CURRENCY}
          </p>
          <div className="flex justify-start gap-2 items-center">
            <p className="font-medium	text-sm text-secondary">
              {currencyBalance > 0 ? currencyBalance?.toFixed(8) : 0}
            </p>
            <Button
              type="plain"
              btnClassName={""}
              handleClick={() => getCurrency()}
              disabled={refetchingNativeBalance}
            >
              {refetchingNativeBalance &&  <Spinner size="loading-sm" />}
              {!refetchingNativeBalance && (
                <span className="icon refresh-icon h-full" />
              )}
            </Button>
          </div>
        </div>
        <p className="text-sm font-normal text-secondary opacity-[0.9]">
          {process.env.REACT_APP_TOKEN_SYMBOL}
        </p>

        <div className="flex justify-start gap-2 items-center">
          <p className="font-medium	text-sm text-secondary">
            {tokenBalance > 0 ? tokenBalance?.toFixed(8) : 0}
          </p>
          <Button
            type="plain"
            btnClassName={"text-base"}
            handleClick={() => getNativeCurrency()}
            disabled={refetchingTokenBalance}
          >
            {refetchingTokenBalance && <Spinner size="loading-sm" />}
            {!refetchingTokenBalance && (
              <span className="icon refresh-icon h-full" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
