import React, { useEffect } from "react";
import Header from "../components/modules/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import FooterComponent from "../components/layouts/Default/FooterComponent";
import ErrorMessage from "../ui/ErrorMessage";
import ToasterMessage from "../ui/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { setError, setToaster } from "../reducers/layoutReducer";
import SwipeUp from "../ui/swipeUp";
import PleaseWait from "./pleaseWait";
const AppLayout = () => {
  const { pathname } = useLocation();
  const rootDispatch = useDispatch();
  const { error, toaster,isAuthorized } = useSelector((store: any) => ({
    error: store.layoutReducer.error,
    toaster: store.layoutReducer.toaster,
    isAuthorized:store.auth.token,
  }));
  useEffect(() => {
    error?.message && rootDispatch(setError({ message: "" }));
    toaster?.message && rootDispatch(setToaster({ message: "" }));
    window.scrollTo(0,0);
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
        {isAuthorized && <Outlet />}
        {!isAuthorized && <PleaseWait/>}
      </div>
      <div className={`lg:hidden`}>
        <SwipeUp />
      </div>
      <FooterComponent />
    </>
  );
};

export default AppLayout;
