const supportedChains = [
    process.env.REACT_APP_POLYGON_CHAIN_HEX_ID,
    parseInt(process.env.REACT_APP_POLYGON_CHAIN_NUMARIC_ID)
]
export { supportedChains }