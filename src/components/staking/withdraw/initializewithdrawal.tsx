import React from 'react';
const InitializeWithdrawl = () => {
  return (
      <div className="flex-1 flex items-center">
        <div className="">
          <h1 className="mb-5 text-lg font-bold text-secondary">Confirm Withdrawal</h1>
          <p className="text-sm font-normal text-info">
            In this step, you complete the transaction that withdraws your {process.env.REACT_APP_TOKEN_SYMBOL} tokens
          </p>
        </div>
      </div>
  );
};
export default InitializeWithdrawl;
