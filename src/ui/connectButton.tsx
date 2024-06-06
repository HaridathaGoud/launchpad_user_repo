import React from "react";
import Button from "./Button";
import { modalActions } from "./Modal";
interface ConnectWalletProps {
  text?: string;
  type?: string;
  getDetails?: Function;
}
const ConnectWallet = ({ text, type }: ConnectWalletProps) => {
  return (
    <>
      <Button
        type={type || "primary"}
        handleClick={() => {
          modalActions("walletConnectModal", "open");
        }}
        btnClassName="flex items-center animate-heartbeat dark-textwhite"
      >
        <>
          <span>{text || "Connect Wallet"}</span>
          {(!type || type === "primary") && (
            <span className={`icon wallet mt-[-3px]`}></span>
          )}
        </>
      </Button>{" "}
    </>
  );
};

export default ConnectWallet;
