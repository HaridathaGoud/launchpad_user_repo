import React, { useMemo } from 'react';
import metmaskIcon from '../../../assets/images/metamask.svg';
import walletIcon from '../../../assets/images/walletconnect.svg';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { switchNetwork } from 'wagmi/actions';
import { useDispatch } from 'react-redux';
import { setToaster } from '../../../reducers/layoutReducer';
import { handleConnect } from './handleConnect';
const WalletConnect = ({onWalletConect, onWalletClose, onWalletError }: IWalletConnection) => {
  const rootDispatch=useDispatch()
  const { connectAsync, connectors } = useConnect();
  const { isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const icons=useMemo(()=>{
    return  { metaMask: metmaskIcon, walletConnect: walletIcon }
  },[])
  const handleError=(error:any)=>{
    if (onWalletError) onWalletError(error);
    rootDispatch(setToaster({message:error?.message,timeout:3000,type:'error'}))
  }
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
                      handleConnect(connector,isConnected,connectAsync,switchNetwork,onWalletConect,disconnectAsync,onWalletClose,handleError);
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
