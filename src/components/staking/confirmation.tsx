import React from "react";
import sucess from "../../assets/images/success.svg";
const ConfirmationComponent = (props: any) => {
  const navigateToHash = () => {
    window.open(`${process.env.REACT_APP_HAS_URL + "tx/" + props?.hash}`);
  };
  let stakeAmount = parseFloat(props?.amountStake);
  let stakeFormattedNumber = stakeAmount?.toLocaleString("en-US", {
    maximumFractionDigits: 8,
  });
  return (
    <div className=" flex-1 items-center flex">
      <div className="flex gap-5 items-center">
        <div className="">
          <img src={sucess} alt="sucess" />
        </div>
        <div className="">
          <h1 className="mb-2 text-lg font-bold text-secondary">Confirmed</h1>
          <p className="text-sm font-normal text-info">
            {props.isStaking && (
              <>
                {" "}
                Congratulations! Your {stakeFormattedNumber} tokens are now
                staked.
              </>
            )}
            {!props.isStaking && !props.isWithdrawal && (
              <>
                {" "}
                You have initiated the unstaking process and started the 7 day
                timer.
              </>
            )}
            {props.isWithdrawal && (
              <>
                {" "}
                You have withdraw your {process.env.REACT_APP_TOKEN_SYMBOL}{" "}
                tokens.
              </>
            )}
            <br />
            If desired, you may check 'Mumbai network' to confirm the
            transaction.
          </p>
          {(!props.isStaking || props.isStaking) && props?.hash && (
            <div>
              {" "}
              <span className="" onClick={navigateToHash}>
                <span className="text-sm font-semibold text-secondary">
                  {props?.hash}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ConfirmationComponent;
