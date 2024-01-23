export const navigateToUniswap = () => {
    process.env.REACT_APP_LIQUIDITY_BUY_URL &&
      process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS &&
      window.open(
        process.env.REACT_APP_LIQUIDITY_BUY_URL +
          process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS
      );
  };