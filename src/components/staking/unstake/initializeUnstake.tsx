import React from 'react';
const InitializeUnstake = () => {
  return (
      <div className='flex-1 flex items-center'>
      <div className="">
        <h1 className="mb-5 text-lg font-bold text-secondary">Confirm Unstaking Process</h1>
        <p className="text-sm font-normal text-info">
          In this step, you initiate the unstaking process. After a 7 days waiting period, you will be allowed to
          withdraw your {process.env.REACT_APP_TOKEN_SYMBOL}
        </p>
      </div>
      </div>
  );
};
export default InitializeUnstake;
