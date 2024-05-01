export const handleConnect = async (connector: any,isConnected:boolean,connectAsync:Function,switchNetwork:Function,onWalletConect:Function,disconnectAsync:Function,onWalletClose:Function,handleError:Function) => {
    const onAccountsChanged = (account) => {
        onWalletConect(account);
        window.location.reload();
      };
      const onChainChanged = async () => {
                await switchNetwork({ chainId: Number(process.env.REACT_APP_CHAIN_ID_NUMARIC) || 0 });   
        window.location.reload();
      };
    try {
      if (connector.id === 'walletConnect') {
        onWalletClose();
      }
      if (!isConnected) {
        const { account, chain } = await connectAsync({ connector });
        if (chain.id !==Number(process.env.REACT_APP_CHAIN_ID_NUMARIC)) {
          await switchNetwork({ chainId: Number(process.env.REACT_APP_CHAIN_ID_NUMARIC) || 0 });
          onWalletConect(account);
          connector.onAccountsChanged = onAccountsChanged;
          connector.onChainChanged = onChainChanged;
          onWalletClose();
        } else {
          onWalletClose();
          connector.onAccountsChanged = onAccountsChanged;
          connector.onChainChanged = onChainChanged;
        }
      } else {
        onWalletClose();
        connector.onAccountsChanged = onAccountsChanged;
        connector.onChainChanged = onChainChanged;
      }
    } catch (error) {
     handleError(error)
    }
  };