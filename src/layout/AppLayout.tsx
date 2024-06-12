import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import FooterComponent from "../components/layouts/Default/FooterComponent";
import ErrorMessage from "../ui/ErrorMessage";
import ToasterMessage from "../ui/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { setError, setToaster } from "../reducers/layoutReducer";
import SwipeUp from "../ui/swipeUp";
import PleaseWait from "./pleaseWait";
import useOnlineStatus from "../hooks/useOnlineStatus";
import {
  getTokenDetails,
  setArcanaUserDetails,
  setUserID,
  Staker,
  walletAddress,
} from "../reducers/rootReducer";
import { store } from "../store";
import { ConnectorData, useAccount, useDisconnect } from "wagmi";
import { getKyc } from "../utils/api";
import useArcanaAuth from "../hooks/useArcanaAuth";
import useContract from "../hooks/useContract";
import offline from "../assets/images/offline.svg";
import Login from "./Login";
import { supportedChainIds } from "../utils/supportedChains";
const AppLayout = () => {
  const { pathname } = useLocation();
  const { isStaker } = useContract();
  const { isConnected, address, connector: activeConnector } = useAccount();
  const auth = useArcanaAuth();
  const isOnline = useOnlineStatus();
  const rootDispatch = useDispatch();
  const { disconnectAsync } = useDisconnect();
  const { error, toaster, user, hasBasicToken } = useSelector((store: any) => ({
    error: store.layoutReducer.error,
    toaster: store.layoutReducer.toaster,
    user: store.auth.user,
    hasBasicToken: store.auth.token,
  }));
  const [changingAddress, setChangingAddress] = useState(false);
  useEffect(() => {
    store.dispatch(getTokenDetails(null, null));
  }, []);
  useEffect(() => {
    if (isConnected && address && !user?.id) {
      getCustomerDetails(address);
    }
    if(!isConnected && !address && user?.id){
      console.log(isConnected,address)
      console.log("in")
      store.dispatch(setUserID({ id: '', name: '' }));
    }
  }, [isConnected, address]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    error?.message && rootDispatch(setError({ message: "" }));
    toaster?.message && rootDispatch(setToaster({ message: "" }));
    window.scrollTo(0, 0);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    activeConnector?.on("change", handleConnectorUpdate);
    return () => {
      activeConnector?.off("change", handleConnectorUpdate);
    };
  }, [activeConnector]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (auth) {
      auth.provider.on("connect", handleArcanaConnect);
      auth.provider.on("disconnect", handleArcanaDisconnect);
    }
    return () => {
      auth.provider.removeListener("connect", handleArcanaConnect);
      auth.provider.removeListener("disconnect", handleArcanaDisconnect);
    };
  }, [auth]);
  const handleArcanaConnect = async () => {
    const userInfo = await auth.getUser();
    const isLoggedIn = await auth.isLoggedIn();
    rootDispatch(setArcanaUserDetails({ isLoggedIn, ...userInfo }));
  };
  const handleArcanaDisconnect = async () => {
    const isLoggedIn = await auth.isLoggedIn();
    rootDispatch(setArcanaUserDetails({ isLoggedIn }));
    await onDisconnect();
  };
  const handleConnectorUpdate = ({ account, chain }: ConnectorData | any) => {
    if (account) {
      getCustomerDetails(account);
      getStakeFlag();
      return;
    }
    if (
      !supportedChainIds.includes(chain?.id)
    ) {
      rootDispatch(
        setError({
          message: "Your current network is unsupported.",
          type: "warning",
        })
      );
    } else if (
      supportedChainIds.includes(chain?.id)
    ) {
      rootDispatch(setError({ message: "" }));
    }
  };
  const dispatchCustomerDetails = (data: any) => {
    store.dispatch(setUserID(data));
    store.dispatch(walletAddress(address || ""));
  };
  const getCustomerDetails = async (address: string | undefined) => {
    setChangingAddress(true);
    if (address) {
      try {
        const res = await getKyc(`User/CustomerDetails/${address}`);
        if (res.statusText?.toLowerCase() === "ok" || res.status === 200) {
          dispatchCustomerDetails(res?.data);
        } else {
          rootDispatch(setError({ message: res }));
        }
      } catch (error) {
        rootDispatch(setError({ message: error.message || error }));
      } finally {
        setChangingAddress(false);
      }
    }
  };
  const getStakeFlag = () => {
    isStaker().then((res: any) => {
      store.dispatch(Staker(res));
    });
  };
  const onDisconnect = useCallback(async () => {
    setChangingAddress(true);
    try {
      await disconnectAsync();
      auth.connected && (await auth.logout?.());
      rootDispatch(setArcanaUserDetails({ isLoggedIn: false }));
      rootDispatch(setUserID({ id: '', name: '' }));
    } catch (error) {
      rootDispatch(setError({ message: error.message || error }));
    } finally {
      setChangingAddress(false);
    }
  }, [auth]);
  return (
    <>
      {!isOnline && (
        <div className="flex justify-center items-center h-[100vh]">
          <img src={offline} alt="offline" />
        </div>
      )}
      {isOnline && (
        <>
          <Header
            changingAddress={changingAddress}
            onDisconnect={onDisconnect}
          />
          <Login onWalletConect={(account:any) => console.log(account)} />
          <div className="">
            {error?.message && (
              <ErrorMessage
                errorMessage={error?.message}
                setErrorMessage={() => rootDispatch(setError({ message: "" }))}
                onCloseCallback={error?.onCloseCallback}
                type={error?.type}
              />
            )}
            {toaster?.message && (
              <ToasterMessage
                message={toaster?.message}
                closeToaster={() => rootDispatch(setToaster({ message: "" }))}
                timeout={toaster?.timeout}
                type={toaster?.type}
                position={toaster?.position}
                callback={toaster?.callback}
                callbackTimeout={toaster?.callbackTimeout}
              />
            )}
            {hasBasicToken && (
              <div className="min-h-[80vh]">
                <Outlet />
              </div>
            )}
            {!hasBasicToken && <PleaseWait />}
          </div>
          <div className={`lg:hidden`}>
            <SwipeUp />
          </div>
          <FooterComponent />
        </>
      )}
    </>
  );
};

export default AppLayout;
