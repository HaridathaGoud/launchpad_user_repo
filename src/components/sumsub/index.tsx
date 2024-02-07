import React, { useContext, useEffect, useState } from "react";
import snsWebSdk from "@sumsub/websdk";
import { get, getKyc } from "../../utils/api";
import { useAccount } from "wagmi";
import ConnectToWallet from "../ConnectToWallet";
import { useSelector } from "react-redux";
import { setUserID } from "../../reducers/rootReducer";
import { store } from "../../store";
import { useNavigate } from "react-router-dom";

import OutletContextModel from "../../layout/context/model";
import outletContext from "../../layout/context/outletContext";
import sumsubStyling from "./sumsubStyling";
import Spinner from "../loaders/spinner";
const SumSub = () => {
  const [state, setState] = useState({
    loading: true,
    sumSubConfirm: false,
    showConnect: false,
  });
  const { setToaster, setErrorMessage }: OutletContextModel =
    useContext(outletContext);
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
                setToaster?.(
                  "Details Submitted, Verification Under Process!",
                  () => {
                    navigate("/dashboard");
                    setState({ ...state, loading: false });
                  },
                  1000
                );
              }
            } else if (type === "idCheck.onUploadError") {
              console.log(payload.errors[0] ? payload.errors[0]:payload);
            } else if (type === "idCheck.onUploadWarning") {
              console.log(payload.errors[0] ? payload.errors[0]:payload);
            }
          })
          .build();
        snsWebSdkInstance.launch("#sumsub-websdk-container");
        setState({ ...state, loading: false, showConnect: false });
      } else {
        setErrorMessage?.(response);
      }
    } catch (error) {
      setErrorMessage?.(error);
    } finally {
      setState({ ...state, loading: false });
    }
  };

  return (
    <>
      {state.loading && <Spinner />}
      {!state.showConnect && !state.loading && (
        <div id="sumsub-websdk-container"></div>
      )}
      {state.showConnect && <ConnectToWallet />}
    </>
  );
};

export default SumSub;
