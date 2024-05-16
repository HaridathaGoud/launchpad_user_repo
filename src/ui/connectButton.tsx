import React from "react";
import Button from "./Button";
import { Modal, modalActions } from "./Modal";
import WalletConnect from "../components/modules/ConnectButton/connect.wallet";
import { useDispatch } from "react-redux";
import { setToaster } from "../reducers/layoutReducer";
interface ConnectWalletProps{
    text?:string,
    type?:string,
    getDetails?:Function,
}
const ConnectWallet = ({text,type}:ConnectWalletProps) => {
  const rootDispatch = useDispatch();
  return (
    <>
      <Button
        type={type || 'primary'}
        handleClick={() => {
          modalActions("walletConnectModal", "open");
        }}
        btnClassName="flex items-center animate-heartbeat dark-textwhite"
      >
        <>
          <span>{text || "Connect Wallet"}</span>
          {(!type || type==='primary') && <span className={`icon wallet mt-[-3px]`}></span>}
        </>
      </Button>{" "}
      {
        <Modal id={"walletConnectModal"}>
          <WalletConnect
            onWalletConect={() =>
             console.log("Connected!") }
            onWalletClose={() => {
              modalActions("walletConnectModal", "close");
            }}
          />
        </Modal>
      }
    </>
  );
};

export default ConnectWallet;
