const supportedChainIds =
  process.env.REACT_APP_ENV_VAR === "prd"
    ? [137, 0x89]
    : [80002, 0x13882];
const supportedChainDetails=[
    {name:'Polygon', id:137},
    {name:'Polygon Amoy', id:80002},
]
export { supportedChainIds,supportedChainDetails };
