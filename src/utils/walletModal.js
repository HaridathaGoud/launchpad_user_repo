import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import MetamaskIco from '../assets/images/pop-icon1.svg';
import WalletConnectIco from '../assets/images/walletconnect.svg';
import TrustWalletIco from '../assets/images/connectwallet.svg';
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCustomerRegisterDetails, setUserID } from '../reducers/rootReducer';
import { getCUstomers } from '../utils/api';
import { supportedChainIds } from '../utils/supportedChains';
import { store } from '../store'
import { changeNetwork } from '../hooks/useChangeChain';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import ToasterMessage from '../utils/tostermessage';
import { supportedChainIds } from './supportedChains';
function WalletModal(props) {
  const { connectAsync, connectors, error, isLoading, pendingConnector } = useConnect();
  const [modalShow, setModalShow] = useState(props.modalShow);
  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const router = useNavigate();
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { switchNetwork } = changeNetwork();
  const [walletError, setWalletError] = useState(null);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', async (chain_id) => {
        if (!supportedChainIds.includes(chain_id)) {
          await disconnectAsync();
          router('/minnapad/dashboard');
        }
      });
      window.ethereum.on('accountsChanged', async (account) => {
        if (!isConnected) {
          await connectAsync( {connector: new MetaMaskConnector()});
          getCustomerDetail(account[0], true);
        } else {
          getCustomerDetail(account[0], true);
        }

      });
    }
    if (isConnected) {
      getCustomerDetail(address, false);
    }
  }, []);
  const getCustomerDetail = async (address, isAccountChange) => {
    setLoader(true);
    let response = await getCUstomers(`User/CustomerDetails/${address}`);
    if (response) {
      store.dispatch(setUserID(response.data));
      if (response.data.kycStatus == null || response.data.kycStatus?.toLowerCase() !== 'completed') {
        router('/minnapad/kycStatus');
      } else if (isAccountChange) {
        router('/minnapad/dashboard');
      }
      authToken(response.data);
      handleClose()
      props.metaMaskCOnnection(true, response.data.id)
      store.dispatch(setUserID(response.data));
      setLoader(false);
    } else {
      setErrorMsg(isErrorDispaly(response));
      setLoader(false);
    }
  };
  const authToken = (data) => {
    const payload = {
      id: data.id,
      email: data.email,
    };
  };

  const handleConnect = async ({ connector }) => {
    if (!window.ethereum&&connector.id!=="walletConnect") {
      window.open("", "_blank")
    } else {
      if (connector.id === "walletConnect") {
        setModalShow(false)
      }
      try {
        const { account, chain } = await connectAsync({ connector });
        if (!supportedChains.includes(chain.id)) {
          await disconnectAsync()
          try {
            await switchNetwork();
            await connectAsync({ connector })
            setLoader(true);
            setModalShow(false);
            getCustomerDetail(account, false);
          } catch (error) {
            await disconnectAsync();
          }
        } else {
          setLoader(true);
          setModalShow(false);
          getCustomerDetail(account, false);
        }
        setWalletError(null);
      } catch (error) {
        setWalletError(error.message)
        setTimeout(()=>{props.metaMaskModalClose(false)},1000)
        
      }
    }
  };
  const isErrorDispaly = (objValue) => {
    if (objValue.data && typeof objValue.data === 'string') {
      return objValue.data;
    } else if (objValue.originalError && typeof objValue.originalError.message === 'string') {
      return objValue.originalError.message;
    } else {
      return 'Something went wrong please try again!';
    }
  };
  const handleClose = () => {
    setWalletError(null);
    props.metaMaskModalClose(false)
  }
  const walletIcons = {
    metaMask: MetamaskIco,
    walletConnect: WalletConnectIco,
    injected: TrustWalletIco
  }
  return (<>
    <div>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="wallet-popup custm-btns-metamask"
      >
        <Modal.Header >
          <span className="icon close c-pointer" onClick={() => handleClose()}></span>
        </Modal.Header>
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
                onClick={() => handleConnect({ connector })}
              >
                <Image src={walletIcons[connector.id]} alt="" />
                <p>{connector.name}</p>
              </Button>}</div>
            ))}
            {/* </Modal.Header> */}
          </div>
          <p className="bottom-para mb-3">
            we do not own private keys and cannot access your funds without your confirmation
          </p>
          <p className='mt-4'><b>Note: If you encounter difficulties connecting your wallet, please refresh your browser and try again.</b></p>
        </Modal.Body>
      </Modal>
      <div className="cust-toaster-db" >
      <ToasterMessage success={walletError} bg={"Danger"} isShowToaster={walletError != null} onCloseToast={()=>setWalletError(null)} />
    </div>
    </div>
    </>
  )
}

const connectDispatchToProps = (dispatch) => {
  return {
    customerRegister: (customerId) => {
      dispatch(getCustomerRegisterDetails(customerId));
    },
    dispatch,
  };
};

export default connect(null, connectDispatchToProps)(WalletModal);