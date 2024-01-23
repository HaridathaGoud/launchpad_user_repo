import React from 'react';
import useCopyToClipboard from '../../../hooks/useCopytoClipboard';

export default function Price() {
  const [isCopied, handleCopy] = useCopyToClipboard();
  return (
    <>
      <div className="header-strip">
        <div className="container">
          <div className="strip-center row justify-content-center">
            <div className="address-copy col-xxl-6 col-xl-5 col-lg-12">
              <span> {process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS}</span>{' '}
              <span
                className={`${!isCopied ? 'icon sm copy-icon c-pointer' : 'icon sm copy-check'}`}
                onClick={() => handleCopy(process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS)}
              ></span>
            </div>
            <div className="top-pricelist col-xxl-6 col-xl-7 col-lg-12">
              <div className="strip-text">
                {' '}
                Token: <span className="strip-bold"> {process.env.REACT_APP_TOKEN_SYMBOL}</span>
              </div>
              <div className="strip-text">
                {' '}
                Price: <span className="strip-bold"> $ 0.06</span>
              </div>
              <div className="strip-text">
                {' '}
                Market Cap (90.76M Supply) : <span className="strip-bold"> $5.87M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
