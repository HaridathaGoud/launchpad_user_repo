import React, { useEffect, useState } from "react";
import snsWebSdk from "@sumsub/websdk";
import { get, getKyc } from "../../utils/api";
import { useAccount } from "wagmi";
import ConnectToWallet from "../ConnectToWallet";
import { useDispatch, useSelector } from "react-redux";
import { setUserID } from "../../reducers/rootReducer";
import { store } from "../../store";
import { useNavigate } from "react-router-dom";
import sumsubStyling from "./sumsubStyling";
import Spinner from "../loaders/spinner";
import { setError, setToaster } from "../../reducers/layoutReducer";
const SumSub = () => {
  const [state, setState] = useState({
    loading: true,
    sumSubConfirm: false,
    showConnect: false,
  });
  const rootDispatch = useDispatch();
  const { isConnected, address } = useAccount();
  const user = useSelector((state: any) => state?.auth?.user);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    country: "",
    countryCode: "",
    profilePicUrl: "",
    walletAddress: address,
    status: "Active",
    imageUrl: "",
    kycStatus: "",
  });

  useEffect(() => {
    if (isConnected) {
      launchWebSdk();
    } else {
      setState((state) => ({ ...state, showConnect: true }));
    }
  }, [isConnected, user]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    getCustomerDetail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getCustomerDetail = async () => {
    let response = await get(`User/CustomerDetails/${address}`);
    if (response) {
      setProfile(response.data);
      store.dispatch(setUserID(response.data));
    }
  };

  const launchWebSdk = async () => {
    if (profile?.kycStatus?.toLowerCase() === "completed") {
      return navigate("/profile");
    }
    setState({ ...state, loading: true });
    try {
      const response = await getKyc(
        `Sumsub/AccessToken1?applicantId=${user?.id}&levelName=sumsub-signin-demo-level`
      );
      if (response.statusText.toLowerCase() === "ok") {
        let snsWebSdkInstance = snsWebSdk
          .init(response.data.token, () => response.data.token)
          .withConf({
            lang: "en",
            uiConf: {
              customCssStr: sumsubStyling,
            },
          })
          .onMessage((type: string, payload: any) => {
            if (type === "idCheck.onReady") {
              setState({ ...state, loading: false });
            } else if (type === "idCheck.onStepCompleted") {
              if (payload.idDocSetType === "SELFIE") {
                setState({ ...state, loading: true });
                rootDispatch(
                  setToaster({
                    message: "Details Submitted, Verification Under Process!",
                    callback: () => {
                      navigate("/dashboard");
                      setState({ ...state, loading: false });
                    },
                    callbackTimeout: 1000,
                  })
                );
              }
            } else if (type === "idCheck.onUploadError") {
              rootDispatch(
                setError({
                  message: payload.errors[0] ? payload.errors[0] : payload,
                })
              );
            } else if (type === "idCheck.onUploadWarning") {
              rootDispatch(
                setError({
                  message: payload.errors[0] ? payload.errors[0] : payload,
                  type: "warning",
                })
              );
            }
          })
          .build();
        snsWebSdkInstance.launch("#sumsub-websdk-container");
        setState({ ...state, loading: false, showConnect: false });
      } else {
        rootDispatch(setError({ message: response }));
      }
    } catch (error) {
      rootDispatch(setError({ message: error }));
    } finally {
      setState({ ...state, loading: false });
    }
  };

  return (
    <>
      {state.loading && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
      {!state.showConnect && <div id="sumsub-websdk-container"></div>}
      {state.showConnect && <ConnectToWallet />}
    </>
  );
};

export default SumSub;
