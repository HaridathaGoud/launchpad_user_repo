
import React from 'react';
const ConfirmComponent = (props: any) => {
  let stakeAmount = props?.amountStake;
  let stakeFormattedNumber = stakeAmount?.toLocaleString('en-US', { maximumFractionDigits: 8 });
  return (
    <>
      <div className="">
        <>       
          <h2 className="mt-2 mb-6 text-lg font-bold text-secondary">Confirm</h2>
          <p className="text-sm font-normal text-info">
            Amount to Stake - <span className='text-sm font-semibold text-secondary'>{stakeFormattedNumber}</span>
          </p>
          <div>
            <p className="text-sm font-normal text-info mt-3">
              In this step, you deposit the tokens into the staking contract. After this step, your tokens will be
              successfully staked.
            </p>
          </div>
        </>
      </div>
    </>
  );
};
export default ConfirmComponent;
