import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { get ,getKyc} from '../../../utils/api';
import { store } from '../../../store';
import { setUserID, Staker, walletAddress } from '../../../reducers/rootReducer';
import { useNavigate as useRouter } from 'react-router-dom';
import useContract from '../../../hooks/useContract';
import { connect } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import WalletConnect from './connect.wallet';
const ConnectButton = () => {
  const [modalShow, setModalShow] = useState(false);
  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const { isStaker } = useContract();

  useEffect(() => {
    getStakeFlag();
    if (address) {
      getCustomerDetails();
    }
  }, [address]);

  const getStakeFlag = () => {
    isStaker().then((res: any) => {
      store.dispatch(Staker(res));
    });
  };

  const getCustomerDetails = async () => {
    let res = await getKyc(`User/CustomerDetails/${address}`);
    store.dispatch(setUserID(res.data));
    store.dispatch(walletAddress(address));
  };
  const handleDisconnect = async () => {
    await disconnectAsync();
    router('/dashboard');
    store.dispatch(setUserID(null));
  };
  const handleLinkClick = async (e: any, path: string) => {
    if (path === 'modal') {
    } else {
      e.preventDefault();
      router(path);
    }
  };
  return (
    <>
      {!isConnected && (
        <div className="btn-style">
          <button
            type="button"
            className="custom-button position-btn"
            onClick={() => setModalShow(true)}
          >
            {' '}
            <span className="icon md wallet " />
            Connect Wallet
          </button>
        </div>
      )}
      {isConnected && (
        <NavDropdown
          className="header-droopdown"
          title={
            isConnected && (
              <>
                <Button type="button" className="custom-button">
                  {' '}
                  <span className="icon md wallet " />
                  <span>{address?.slice(0, 4) + '....' + address?.substring(address.length - 4, address.length)}</span>
                </Button>{' '}
              </>
            )
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item
            onClick={(e) => handleLinkClick(e, '/profile')}
          >
            <span className="icon profile me-2"></span> Profile
          </NavDropdown.Item>
          <NavDropdown.Item to="" onClick={handleDisconnect}>
            <span className="icon disconnect-wallet me-2"></span> Disconnect
          </NavDropdown.Item>
        </NavDropdown>
      )}
      <WalletConnect
        showWalletModal={modalShow}
        onWalletConect={(addr) => getCustomerDetails(addr)}
        onWalletClose={() => setModalShow(false)}
      />
    </>
  );
};
const connectStateToProps = ({ auth }) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(ConnectButton);
