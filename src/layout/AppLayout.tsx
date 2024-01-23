import React, { useEffect, useMemo, useReducer } from "react";
import Header from "../components/modules/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import FooterComponent from "../components/layouts/Default/FooterComponent";
import OutletProvider from "./context/outletProvider";
import outletReducer, { outletReducerState } from "./outletReducer";
import ErrorMessage from "../ui/ErrorMessage";
import ToasterMessage from "../ui/Toaster";
import OutletContextModel from "./context/model";
import formatErrorMessage from "../utils/formatErrorMessage";
const AppLayout = () => {
  const [state, dispatch] = useReducer(outletReducer, outletReducerState);
  const { pathname } = useLocation();
  useEffect(() => {
    state?.error?.message &&
      dispatch({
        type: "setError",
        payload: {message:''},
      });
    state?.toaster?.message &&
      dispatch({
        type: "setToaster",
        payload: {
          message: "",
        },
      });
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  const dispatchToaster = (
    message: string,
    timeout: number,
    type: string,
    position: string,
    callback: Function | undefined,
    callbackTimeout: number
  ) => {
    dispatch({
      type: "setToaster",
      payload: {
        ...state?.toaster,
        message: message,
        callback: callback,
        type: type,
        position: position,
        timeout: timeout,
        callbackTimeout: callbackTimeout,
      },
    });
  };
  const contextValue: OutletContextModel = useMemo(() => {
    return {
      errorMessage: state?.error?.message,
      toasterMessage: state?.toaster?.message,
      setErrorMessage: (message: any, onCloseCallback?: Function) =>
        dispatch({
          type: "setError",
          payload: {
            message: formatErrorMessage(message),
            onCloseCallback: onCloseCallback,
          },
        }),
      setToaster: (
        state: string,
        callback: Function | undefined,
        callbackTimeout: number = 1000,
        timeout: number = 2000,
        type: string = "success",
        position: string = "topRight"
      ) =>
        dispatchToaster(
          state,
          timeout,
          type,
          position,
          callback,
          callbackTimeout
        ),
    };
  }, [state?.toaster]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <OutletProvider value={contextValue}>
        <Header />
        <div className="">
          {state?.error?.message && (
            <ErrorMessage
              errorMessage={state.error?.message}
              setErrorMessage={() =>
                dispatch({
                  type: "setError",
                  payload: {message:""},
                })
              }
              onCloseCallback={state.error?.onCloseCallback}
            />
          )}
          {state?.toaster?.message && (
            <ToasterMessage
              message={state?.toaster?.message}
              closeToaster={() =>
                dispatch({
                  type: "setToaster",
                  payload: {
                    message: "",
                  },
                })
              }
              timeout={state?.toaster?.timeout}
              type={state?.toaster?.type}
              position={state?.toaster?.position}
              callback={state?.toaster?.callback}
              callbackTimeout={state?.toaster?.callbackTimeout}
            />
          )}
          <Outlet />
        </div>
      </OutletProvider>
      <FooterComponent />
    </>
  );
};

export default AppLayout;
