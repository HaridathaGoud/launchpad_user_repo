import React, { useCallback, useReducer } from "react";
import metmaskIcon from "../../assets/images/metamask.svg";
import walletIcon from "../../assets/images/walletconnect.svg";
import google from "../../assets/images/google.svg";
import twitter from "../../assets/images/twitter-img.svg";
import discord from "../../assets/images/discord-img.svg";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { switchNetwork } from "wagmi/actions";
import { useDispatch, useSelector } from "react-redux";
import { setError, setToaster } from "../../reducers/layoutReducer";
import { handleConnect } from "./handleConnect";
import { emailValidation } from "../../utils/validation";
import Button from "../../ui/Button";
import { Modal, modalActions } from "../../ui/Modal";
import Spinner from "../../components/loaders/spinner";
import TimeCalculate from "../../components/staking/timeCalculate";
import { walletReducer, walletState } from "./reducer";
import Overlay from "../../ui/overlay";
import {
  getCustomerDetails,
  setArcanaUserDetails,
  setGettingUserData,
  setUserID,
} from "../../reducers/rootReducer";
import useArcanaAuth from "../../hooks/useArcanaAuth";
import { store } from "../../store";
const arcanaLogins = [
  { id: "google-connector", name: "google", icon: google },
  { id: "twitter-connector", name: "twitter", icon: twitter },
  { id: "discord-connector", name: "discord", icon: discord },
];
const icons = { metaMask: metmaskIcon, walletConnect: walletIcon };
const Login = ({
  onWalletConect,
  onWalletError,
  modalId = "walletConnectModal",
}: IWalletConnection) => {
  const rootDispatch = useDispatch();
  const gettingUserData = useSelector(
    (store: any) => store.auth.gettingUserData
  );
  const { connectAsync, connectors, isLoading, pendingConnector } =
    useConnect();
  const { isConnected } = useAccount();
  const auth = useArcanaAuth();
  const [localState, localDispatch] = useReducer(walletReducer, walletState);
  const { disconnectAsync } = useDisconnect();
  const handleError = (error: any) => {
    if (onWalletError) onWalletError(error);
    rootDispatch(
      setToaster({ message: error?.message, timeout: 3000, type: "error" })
    );
  };
  const handleEmailChange = (value: any) => {
    localDispatch({
      type: "setState",
      payload: {
        ...localState,
        email: value,
        errors: {
          ...localState.errors,
          email: "",
        },
      },
    });
  };
  const handleOTPChange = (value: any) => {
    if (value && (/\D/g.test(value) || value.length > 6)) return;
    localDispatch({
      type: "setState",
      payload: {
        ...localState,
        otp: value,
        errors: {
          ...localState.errors,
          otp: "",
        },
      },
    });
  };
  const validateEmail = () => {
    if (localState.email) {
      return emailValidation(localState.email) ? "Invalid email address" : "";
    }
    return "Enter email to continue!";
  };
  const validateOtp = () => {
    if (localState.otp) {
      return "";
    }
    return "Enter otp to confirm!";
  };
  const validate = (input: string) => {
    let error: string = "";
    let isValid: boolean = true;
    switch (input) {
      case "email":
        error = validateEmail();
        break;
      case "otp":
        error = validateOtp();
        break;
      default:
        break;
    }
    if (error) {
      isValid = false;
      const errorsToUpdate = { ...localState.errors };
      errorsToUpdate[input] = error;
      localDispatch({ type: "setErrors", payload: errorsToUpdate });
    }
    return isValid;
  };
  const onDisconnect = useCallback(async () => {
    try {
      await disconnectAsync();
      auth.connected && (await auth.logout?.());
      rootDispatch(setArcanaUserDetails({ isLoggedIn: false }));
      rootDispatch(setUserID({ id: "", name: "" }));
      rootDispatch(setGettingUserData(''))
    } catch (error) {
      rootDispatch(setError({ message: error.message || error }));
    }
  }, [auth]);
  const onSuccessfulConnection = (address: any) => {
    onWalletConect?.(address);
    closeModal();
  };
  const getUserDetails = (address: any) => {
    store.dispatch(
      getCustomerDetails(address, onSuccessfulConnection, onDisconnect)
    );
  };
  const confirmOTP = async (connector: any) => {
    localDispatch({
      type: "setState",
      payload: { verifying: "otp", gettingUser: true },
    });
    try {
      const isValid = validate("otp");
      if (!isValid) return;
      await connector?.auth?.loginWithOTPComplete(localState.otp, () => {
        modalActions(modalId, "close");
      });
      await handleConnect(
        connector,
        isConnected,
        connectAsync,
        switchNetwork,
        closeModal,
        handleError,
        getUserDetails
      );
    } catch (error) {
      const errorsToUpdate = { ...localState.errors };
      const message = JSON.parse(error.message);
      errorsToUpdate["otp"] =
        message["errorDescription"] || message["error"] || message;
      localDispatch({ type: "setErrors", payload: errorsToUpdate });
    } finally {
      localDispatch({
        type: "setState",
        payload: { verifying: "", gettingUser: false },
      });
    }
  };
  const sendOTP = async (connector: any, otpSent?: number) => {
    localDispatch({ type: "setVerifying", payload: "email" });
    try {
      const isValid = validate("email");
      if (!isValid) return;
      const loginState = await connector?.auth?.loginWithOTPStart(
        localState.email
      );
      await loginState.begin();
      if (loginState.isCompleteRequired) {
        localDispatch({
          type: "setState",
          payload: {
            showTimer: true,
            initiatedTime: Math.floor(Date.now() / 1000),
            otpSent: otpSent || 1,
          },
        });
        rootDispatch(
          setToaster({
            message: `OTP has been ${
              otpSent ? "resent" : "sent"
            } successfully!`,
          })
        );
      }
    } catch (error) {
      const errorsToUpdate = { ...localState.errors };
      errorsToUpdate["email"] =
        error["errorDescription"] || error.message || error;
      localDispatch({ type: "setErrors", payload: errorsToUpdate });
    } finally {
      localDispatch({ type: "setVerifying", payload: "" });
    }
  };
  const handleArcanaConnect = async (connector: any, connectTo: string) => {
    if (connectTo === "otp") {
      localState.otpSent ? confirmOTP(connector) : sendOTP(connector);
      return;
    }
    localDispatch({ type: "setGettingUser", payload: true });
    await connector.setLogin({
      provider: `${connectTo}`,
    });
    await handleConnect(
      connector,
      isConnected,
      connectAsync,
      switchNetwork,
      closeModal,
      handleError,
      getUserDetails
    );
    localDispatch({ type: "setGettingUser", payload: false });
  };
  const closeModal = () => {
    modalActions(modalId, "close");
    onModalClose();
  };
  const onModalClose = () => {
    localDispatch({ type: "setState", payload: walletState });
  };
  const onTimerEnd = (showTimer: boolean) => {
    localDispatch({
      type: "setState",
      payload: { showTimer, initiatedTime: 0 },
    });
  };
  const [arcanaConnector, ...walletConnectors] = connectors;
  return (
    <Modal
      id={modalId}
      modalClass="md:w-[60%] lg:w-[35%] relative"
      onClose={onModalClose}
    >
      <div className="mt-2">
        <h2 className="text-[24px] md:text-[42px] text-secondary font-normal text-center">
          Connect Wallet
        </h2>
        <p className="text-[14px] md:text-sm text-secondary font-normal text-center mb-4">
          by choosing one of the following login options
        </p>
        <div>
          <div className="md:w-96 mx-auto">
            {arcanaLogins.length > 0 && (
              <div className="">
                <div className="flex justify-center gap-2 w3modal-icons">
                  {arcanaLogins.map((login: any) => {
                    return (
                      <div
                        className="tooltip capitalize"
                        data-tip={login.name}
                        key={login.name}
                      >
                        <Button
                          type="plain"
                          btnClassName="border-[1px] border-info-content p-4 hover:animate-heartbeat rounded-full flex items-center mb-4 mx-auto"
                          handleClick={() =>
                            handleArcanaConnect(arcanaConnector, login.name)
                          }
                          disabled={localState.verifying !== ""}
                        >
                          <img
                            src={login.icon}
                            alt=""
                            className="!w-[27px] !h-[27px]"
                          />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="relative md:w-96 mx-auto my-8">
              <hr />
              <p className="text-center w-36 absolute top-0 bg-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold bg-dark-color">
                {" "}
                or continue with
              </p>
            </div>
            {((isLoading && pendingConnector?.id === arcanaConnector.id) ||
              gettingUserData==='connecting') && (
              <Overlay bgColor="bg-[#000]" bgOpacity="bg-opacity-60">
                <span className="text-white flex items-center justify-center gap-2">
                  <span className="text-[24px] font-semibold">
                    Connecting...
                  </span>
                  <Spinner />
                </span>
              </Overlay>
            )}
          </div>
          <div className="flex justify-center gap-2">
            {walletConnectors.map((connector: any) => (
              <div className="" key={connector.id}>
                {connector.id !== "arcana" && (
                  <span className="tooltip" data-tip={connector.name}>
                    <Button
                      type="plain"
                      btnClassName="border-[1px] border-info-content p-4 hover:animate-heartbeat rounded-full flex items-center mb-4 mx-auto"
                      key={connector.id}
                      disabled={localState.verifying !== ""}
                      handleClick={async () => {
                        await handleConnect(
                          connector,
                          isConnected,
                          connectAsync,
                          switchNetwork,
                          closeModal,
                          handleError,
                          getUserDetails
                        );
                      }}
                    >
                      <img
                        src={icons[connector.id] || metmaskIcon}
                        alt=""
                        className="!w-[30px] !h-[30px]"
                      />
                    </Button>
                  </span>
                )}
                {((isLoading && pendingConnector?.id === connector.id) ||
                  gettingUserData==='connecting') && (
                  <Overlay bgColor="bg-[#000]" bgOpacity="bg-opacity-60">
                    <span className="text-white flex items-center justify-center gap-2">
                      <span className="text-[24px] font-semibold">
                        Connecting...
                      </span>
                      <Spinner />
                    </span>
                  </Overlay>
                )}
              </div>
            ))}
          </div>
          <div className="md:w-96 mx-auto mb-2">
            <div className="relative md:w-96 mx-auto my-6">
              <hr />
              <p className="text-center w-36 absolute top-0 bg-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold bg-dark-color">
                {" "}
                or continue with
              </p>
            </div>
            {localState.otpSent === 0 && (
              <div>
                <input
                  type="text"
                  placeholder="Enter Email"
                  value={localState.email}
                  className="input input-bordered w-full rounded-[12px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                  onChange={(e) => handleEmailChange(e.target.value)}
                  disabled={localState.verifying === "email"}
                  autoFocus
                />
                {localState.errors.email && (
                  <label className="text-sm font-normal text-red-600 ml-4">
                    {localState.errors.email}
                  </label>
                )}
              </div>
            )}
            {localState.otpSent > 0 && (
              <div className="text-center">
                <input
                  type="text"
                  value={localState.otp}
                  placeholder="Enter OTP"
                  className="input input-bordered w-full rounded-[12px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
                  onChange={(e) => handleOTPChange(e.target.value)}
                  disabled={localState.verifying === "otp"}
                  autoFocus
                />
                <div className="flex justify-between">
                  <div>
                    {localState.errors.otp && (
                      <label className="text-sm font-normal text-red-600 ml-4">
                        {localState.errors.otp}
                      </label>
                    )}
                  </div>
                  {localState.showTimer && (
                    <TimeCalculate
                      timerSeconds={30}
                      initiatedTime={localState.initiatedTime}
                      setTimer={onTimerEnd}
                      textToDisplay={"Resend OTP in"}
                    />
                  )}
                  {!localState.showTimer && (
                    <button
                      className="text-[#6766e9] font-semibold"
                      onClick={() => sendOTP(arcanaConnector, 2)}
                      disabled={localState.showTimer}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="text-center mt-4">
              <Button
                type="primary"
                btnClassName="w-full"
                handleClick={() => handleArcanaConnect(arcanaConnector, "otp")}
                disabled={localState.verifying !== ""}
              >
                {localState.verifying !== "" && (
                  <span>
                    <Spinner />
                  </span>
                )}
                {localState.otpSent ? "Confirm OTP" : "Login with OTP"}
              </Button>
            </div>
          </div>
        </div>
        <p className="text-sm font-normal text-center text-neutral mb-2">
          we do not own private keys and cannot access your funds without your
          confirmation
        </p>
        <p className="text-sm font-normal text-center text-neutral">
          <b>
            Note: If you encounter difficulties connecting your wallet, please
            refresh your browser and try again.
          </b>
        </p>
      </div>
    </Modal>
  );
};
export default Login;

interface IWalletConnection {
  onWalletConect: Function;
  onWalletError?: Function;
  modalId?: string;
}
