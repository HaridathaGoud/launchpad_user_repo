import { supportedChainIds } from "../../utils/supportedChains";

export const handleConnect = async (
  connector: any,
  isConnected: boolean,
  connectAsync: Function,
  switchNetwork: Function,
  onWalletClose: Function,
  handleError: Function,
  getCustomerDetails:Function
) => {
  try {
    if (connector.id === "walletConnect") {
      onWalletClose();
    }
    if (!isConnected) {
      const { account, chain } = await connectAsync({ connector });
      if (!supportedChainIds.includes(chain.id)) {
        await switchNetwork({
          chainId: Number(process.env.REACT_APP_CHAIN_ID_NUMARIC) || 0,
        });
        await getCustomerDetails(account)
      }
        await getCustomerDetails(account)
    } else {
      onWalletClose();
    }
  } catch (error) {
    handleError(error);
  }
};
