async function watchAsset(provider:any,tokenAddress:string, tokenSymbol:string, tokenDecimals:string, tokenImage:string,tokenType:string="ERC20") {
    try {
        const wasAdded = await provider.request({
            method: 'wallet_watchAsset',
            params: {
                type: tokenType,
                options: {
                    address: tokenAddress,
                    symbol: tokenSymbol,
                    decimals: tokenDecimals,
                    image: tokenImage,
                },
            },
        });
  
        if (wasAdded) {
            return [true,'']
        } else {
            return [false,'User rejected the request']
        }
    } catch (error) {
        return [false,error.message || error]
    }
  }

  export default watchAsset