import React, { useEffect } from "react";
import Header from "../components/modules/Header/Header";
import { Outlet, useLocation, useParams } from "react-router-dom";
import FooterComponent from "../components/layouts/Default/FooterComponent";
import ErrorMessage from "../ui/ErrorMessage";
import ToasterMessage from "../ui/Toaster";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setToaster,
} from "../reducers/layoutReducer";
import SwipeUpComponent from "../components/projects/swipeup";
const AppLayout = () => {
  const { pathname } = useLocation();
  const {projectName,projectId}=useParams()
  const rootDispatch = useDispatch();
  const { error, toaster } = useSelector((store: any) => ({
    error: store.layoutReducer.error,
    toaster: store.layoutReducer.toaster,
  }));
  useEffect(() => {
    error?.message && rootDispatch(setError({ message: "" }));
    toaster?.message && rootDispatch(setToaster({ message: "" }));
    window.scrollTo(0,0)
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Header />
      <div className="">
        {error?.message && (
          <ErrorMessage
            errorMessage={error?.message}
            setErrorMessage={() => rootDispatch(setError({ message: ""}))}
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
        <Outlet />
      </div>
      <div className={`lg:hidden`}>
      <SwipeUpComponent/>
      </div>
      <FooterComponent />
    </>
  );
};

export default AppLayout;
