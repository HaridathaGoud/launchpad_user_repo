import React, { useEffect } from "react";
import Header from "../components/modules/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import FooterComponent from "../components/layouts/Default/FooterComponent";
import ErrorMessage from "../ui/ErrorMessage";
import ToasterMessage from "../ui/Toaster";
import { store } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStakedAmount,
  setError,
  setToaster,
} from "../reducers/layoutReducer";
import { useAccount } from "wagmi";
import useContract from "../hooks/useContract";
const AppLayout = () => {
  const { pathname } = useLocation();
  const { address } = useAccount();
  const { getStakedAmount } = useContract();
  const rootDispatch = useDispatch();
  const { error, toaster } = useSelector((store: any) => ({
    error: store.layoutReducer.error,
    toaster: store.layoutReducer.toaster,
  }));
  useEffect(() => {
    store.dispatch(fetchStakedAmount(getStakedAmount));
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    error?.message && rootDispatch(setError({ message: "" }));
    toaster?.message && rootDispatch(setToaster({ message: "" }));
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header />
      <div className="">
        {error?.message && (
          <ErrorMessage
            errorMessage={error?.message}
            setErrorMessage={() => rootDispatch(setError({ message: "" }))}
            onCloseCallback={error?.onCloseCallback}
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
        <Outlet />
      </div>
      <FooterComponent />
    </>
  );
};

export default AppLayout;
