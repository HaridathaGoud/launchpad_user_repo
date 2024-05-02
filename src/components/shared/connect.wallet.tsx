import React, { useReducer,useState } from 'react';
import { Button, Image, Modal } from 'react-bootstrap'; 
import metmaskIcon from '../../assets/images/connectwallet.svg';
import walletIcon from '../../assets/images/walletconnect.svg';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { switchNetwork } from 'wagmi/actions';
import Toast from 'react-bootstrap/Toast';
import MetamaskIco from '../../assets/images/pop-icon1.svg';
import WalletConnectIco from '../../assets/images/walletconnect.svg';
import TrustWalletIco from '../../assets/images/connectwallet.svg';
const reducer = (state = {}, action) => {
    switch (action.type) {
        case "SET":
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
const WalletConnect = ({ showWalletModal, onWalletConect, onWalletClose, onWalletError }: IWalletConnection) => {
    const { connectAsync, connectors, error } = useConnect();
    const { isConnected } = useAccount();
    const { disconnectAsync } = useDisconnect()
    const [state, dispatch] = useReducer(reducer, { icons: { metaMask: metmaskIcon, walletConnect: walletIcon } });
    const [walletError, setWalletError] = useState(null);
    const [scuess, setSucess] = useState(false);
    const handleConnect = async (connector: any) => {
        try {
            if (connector.id === "walletConnect") {
                onWalletClose();
            }
            if (!isConnected) {
                const { account, chain } = await connectAsync({ connector });
                if (chain.id != process.env.REACT_APP_CHAIN_ID_NUMARIC) {
                    await switchNetwork({ chainId: process.env.REACT_APP_CHAIN_ID_NUMARIC });
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
            if (onWalletError)
                onWalletError(error);
                setWalletError(error?.message);
                setSucess(true);
                setTimeout(()=>(setSucess(false),setWalletError(null)),2000)
        }
    }
    const onAccountsChanged = (account) => {
        onWalletConect(account);
       window.location.reload();
    }
    const onChainChanged = async () => {
        await disconnectAsync();
       window.location.reload();
    }
    const walletIcons = {
        metaMask: MetamaskIco,
        walletConnect: WalletConnectIco,
        injected: TrustWalletIco
      }
    return <React.Fragment>
        <Modal
            show={showWalletModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="wallet-popup custm-btns-metamask"
        >
            <div className='modal-header'>
            <span className="icon close c-pointer"  onClick={onWalletClose}></span>
            </div>
            <Modal.Body className="text-center p-3">
                <h4>Connect Your Wallet</h4>
                <hr className="modal-hr"></hr>
                <p>
            Connect with one of available wallet providers or create
            a new wallet.
          </p>
          <div className='custom-metamask-btns'>
                {connectors.map((connector) => (<div className="top d-flex" key={connector.id} >
              {connector.ready && <Button className="pop-cards top d-flex c-pointer meta-btn-style" type="button"
               onClick={() => { handleConnect(connector) }}
              >
                 <Image src={state.icons[connector.id] || metmaskIcon} alt="" />
                <p>{connector.name}</p>
              </Button>}</div>
            ))}
                </div>
                <p className="custom-text mb-2">
                    we do not own private keys and cannot
                    access your funds without your confirmation
                </p>
                <p className='note mt-4'><b>Note: If you encounter difficulties connecting your wallet, please refresh your browser and try again.</b></p>
            </Modal.Body>
        </Modal>
        <div className='p-relativeview'>
        <div className="text-center toster-component">
          <Toast show={scuess} position='bottom-center' className="text-center toster-component">
            <Toast.Body className="toaster-cust">
             <span className='icon md error me-2'></span> <span>{walletError}</span>
            </Toast.Body>
          </Toast>
        </div>
      </div>
    </React.Fragment>
}
export default WalletConnect;

interface IWalletConnection {
    showWalletModal: boolean
    onWalletClose: Function,
    onWalletConect: Function,
    onWalletError?: Function
}