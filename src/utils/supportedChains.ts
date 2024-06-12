const supportedChains =
  process.env.REACT_APP_ENV_VAR === "prd"
    ? [137, 0x89]
    : [80002, 0x13882, 137, 0x89];
export { supportedChains };
