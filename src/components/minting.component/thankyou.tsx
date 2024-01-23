import React from 'react';
import Button from 'react-bootstrap/Button';
import Thankyou from '../../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { getCustomerRegisterDetails, setIscustomerRegister } from '../../reducers/rootReducer';
import { connect, useSelector } from 'react-redux';
import { store } from '../../store';
const ThankYou = (props) => {
    const router = useNavigate();
    const authInfo = useSelector((state: any) => state.auth.user);

const handleDashboard=()=>{
    router('/minting');
    store.dispatch(setIscustomerRegister({ key: 'customerRegisterDetails', data: null }));
    // props.customerRegister(authInfo.id)
}

       return (<><div className="cust-container-align">
        <div className="thanku-scroll card-mt-pt">
            <div className='card-valign'>
                <div className='thank-card'>
                    <img src={Thankyou} alt="" className='thankyou-img' />
                    <h4 className='my-4 thank-desc'>Thank you for registering! Your registration has been received.</h4>
                    <Button 
                    className= "mintnow-btn"
                    onClick={handleDashboard} >
                    <span>Back</span>
            </Button>
                </div>
            </div>
        </div>
        </div>
    </>)
}
const connectDispatchToProps = (dispatch: any) => {
    return {
      customerRegister: (customerId: any) => {
        dispatch(getCustomerRegisterDetails(customerId));
      },
      dispatch,
    };
  };
  export default connect(null, connectDispatchToProps)(ThankYou);
