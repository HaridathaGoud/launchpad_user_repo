import React, { useCallback, useEffect } from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import FooterComponent from "./Footer";
import ErrorMessage from "../ui/ErrorMessage";
import ToasterMessage from "../ui/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { setError, setToaster } from "../reducers/layoutReducer";
import SwipeUp from "../ui/swipeUp";
import PleaseWait from "./pleaseWait";
import useOnlineStatus from "../hooks/useOnlineStatus";
import {
  getCustomerDetails,
  getTokenDetails,
  setArcanaUserDetails,
  setUserID,
  Staker,
} from "../reducers/rootReducer";
import { store } from "../store";
import { ConnectorData, useAccount, useDisconnect } from "wagmi";
import useArcanaAuth from "../hooks/useArcanaAuth";
import useContract from "../hooks/useContract";
import offline from "../assets/images/offline.svg";
import Login from "./Login";
import { supportedChainIds } from "../utils/supportedChains";
import Overlay from "../ui/overlay";
import Spinner from "../components/loaders/spinner";
const AppLayout = () => {
  const { pathname } = useLocation();
  const { isStaker } = useContract();
  const { isConnected, address, connector: activeConnector } = useAccount();
  const auth = useArcanaAuth();
  const isOnline = useOnlineStatus();
  const rootDispatch = useDispatch();
  const { disconnectAsync } = useDisconnect();
  const error = useSelector((store: any) => store.layoutReducer.error);
  const toaster = useSelector((store: any) => store.layoutReducer.toaster);
  const gettingUserData = useSelector((store: any) => store.auth.gettingUserData);
  const user = useSelector((store: any) => store.auth.user);
  const hasBasicToken = useSelector((store: any) => store.auth.token);
  useEffect(() => {
    store.dispatch(getTokenDetails(null, null));
  }, []);
  useEffect(() => {
    if (isConnected && address && !gettingUserData &&!user?.id) {
      store.dispatch(getCustomerDetails(address,()=>console.log("connected"),onDisconnect));
    }
    if (!isConnected && !address) {
      store.dispatch(setUserID({ id: "", name: "" }));
      store.dispatch(setArcanaUserDetails({ isLoggedIn: false }));
    }
  }, [isConnected, address,gettingUserData,user?.id]); // eslint-disable-line react-hooks/exhaustive-deps
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
      store.dispatch(getCustomerDetails(account,()=>console.log("Account changed!"),onDisconnect,"changing"));
      getStakeFlag();
      return;
    }
    if (!supportedChainIds.includes(chain?.id)) {
      rootDispatch(
        setError({
          message: "Your current network is unsupported.",
          type: "warning",
        })
      );
    } else if (supportedChainIds.includes(chain?.id)) {
      rootDispatch(setError({ message: "" }));
    }
  };
  const getStakeFlag = () => {
    isStaker().then((res: any) => {
      store.dispatch(Staker(res));
    });
  };
  const onDisconnect = useCallback(async () => {
    try {
      await disconnectAsync();
      auth.connected && (await auth.logout?.());
      rootDispatch(setArcanaUserDetails({ isLoggedIn: false }));
      rootDispatch(setUserID({ id: "", name: "" }));
    } catch (error) {
      rootDispatch(setError({ message: error.message || error }));
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
            onDisconnect={onDisconnect}
          />
          <Login onWalletConect={(account: any) => console.log("connected")} />
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
             {gettingUserData==='changing' && <Overlay bgColor="bg-[#000]" bgOpacity="bg-opacity-75">
                <span className="text-white flex items-center justify-center gap-2">
                  <span className="text-[24px] font-semibold">
                    Connecting...
                  </span>
                  <Spinner />
                </span>
              </Overlay>}
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
