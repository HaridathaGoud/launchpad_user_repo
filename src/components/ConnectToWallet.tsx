import React from "react";
import wallet from '../assets/images/connect-wallet.png'
const ConnectToWallet = () => {
  return (
      <div className="my-10 text-center">
        <div>
          <img src={wallet} alt="" className="mx-auto md:w-[30%]" />
          <h1 className="md:text-2xl mt-2 text-secondary font-semibold">
          Please Click the <span className="text-primary">Connect Wallet</span> Button
          <br /> To Continue
          </h1>
        </div>
      </div>
  );
};

export default ConnectToWallet;
