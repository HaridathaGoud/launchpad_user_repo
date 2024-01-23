import React, { useContext, useMemo } from 'react';
import metmaskIcon from '../../../assets/images/metamask.svg';
import walletIcon from '../../../assets/images/walletconnect.svg';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { switchNetwork } from 'wagmi/actions';
import outletContext from '../../../layout/context/outletContext';
import OutletContextModel from '../../../layout/context/model';
const WalletConnect = ({onWalletConect, onWalletClose, onWalletError }: IWalletConnection) => {
  const {setToaster}:OutletContextModel=useContext(outletContext)
  const { connectAsync, connectors } = useConnect();
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const icons=useMemo(()=>{
    return  { metaMask: metmaskIcon, walletConnect: walletIcon }
  },[])
  const handleConnect = async (connector: any) => {
    try {
      if (connector.id === 'walletConnect') {
        onWalletClose();
      }
      if (!isConnected) {
        const { account, chain } = await connectAsync({ connector });
        if (chain.id !=80001) {
          await switchNetwork({ chainId: Number(process.env.REACT_APP_CHAIN_ID_NUMARIC) || 0 });
          onWalletConect(account);
          connector.onAccountsChanged = onAccountsChanged;
          connector.onChainChanged = onChainChanged;
          onWalletClose();
        } else {
          onWalletConect(account);
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
      if (onWalletError) onWalletError(error);
      setToaster?.(error?.message,undefined,undefined,3000,'error');
    }
  };
  const onAccountsChanged = (account) => {
    onWalletConect(account);
    window.location.reload();
  };
  const onChainChanged = async () => {
    await disconnectAsync();
    window.location.reload();
  };
  return (
   <>
          <h2 className="text-[42px] text-secondary font-normal text-center">Connect Your Wallet</h2>
          <p className="text-sm text-secondary font-normal text-center mb-4">Connect with one of available wallet providers or create a new wallet.</p>
          <div>
            {connectors.map((connector) => (
              <div className="flex" key={connector.id}>
                {connector.ready && (
                  <button
                    className="px-6 py-2 rounded-lg flex items-center bg-info-content mb-4 mx-auto"
                    type="button"
                    onClick={() => {
                      handleConnect(connector);
                    }}
                  >
                    <img src={icons[connector.id] || metmaskIcon} alt="" className='mr-2' />
                    <p className="mb-0 c-pointer">{connector.name}</p>
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm font-normal text-center text-neutral mb-4">
            we do not own private keys and cannot access your funds without your confirmation
          </p>
          <p className="text-sm font-normal text-center text-neutral">
            <b>
              Note: If you encounter difficulties connecting your wallet, please refresh your browser and try again.
            </b>
          </p>
        {/* </Modal.Body> */}
      {/* </Modal> */}
    </>
  );
};
export default WalletConnect;

interface IWalletConnection {
  onWalletClose: Function;
  onWalletConect: Function;
  onWalletError?: Function;
}
