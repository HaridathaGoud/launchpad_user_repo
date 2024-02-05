import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useBalance, useAccount } from 'wagmi';
import { useCollectionDeployer } from './useCollectionDeployer';
import { get, post } from './api';
import { Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import validError from '../assets/images/validation-error.png';
import error from '../assets/images/error.svg';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import validSuccess from '../assets/images/success.png';
const BuyComponent = (props: any) => {
  const [show, setShow] = useState(props.showModal);
  const router = useNavigate();
  const { address } = useAccount();
  const { data } = useBalance({ address: address });
  const { collectionAddress, nftId } = useParams();
  const { buyAsset } = useCollectionDeployer();
  const [btnLoader, setBtnLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [scuess, setSucess] = useState(false);
  const [percentageValue, setPercentageValue] = useState();
  const [totalBuyValue, setTotalBuyValue] = useState();
  useEffect(() => {
    percentage()
  }, []);

  
 const percentage=()=>{
 const buyValue=props.nftDetails?.price || props.nftDetails?.value
 let percentage= (buyValue*1)/100
 setPercentageValue(percentage)
 let totalValue=buyValue + percentage
 setTotalBuyValue(totalValue)
 }

  const buyNow = async (e: any) => {
debugger
    setShow(true);
    setBtnLoader(true);
    e.preventDefault();
    const form = e.currentTarget;
    const obj = {
      nftId: nftId || props.nftDetails?.id,
      customerId: props.auth.user.id,
      value: props.nftDetails?.price,
      CollectionContractAddress:props.collectionAddress,
      crypto: 'WMATIC',
      TransactionHash:null,
      TokenId:null
    };
    if (form.checkValidity() === true) {
      try {
        const buyObj = await buyAsset(
          props.nftDetails.signature,
          props.nftDetails.collectionType,
          props.collectionAddress,
          props.nftDetails.tokenId,
          props.nftDetails.price,
          props.nftDetails.ownerAddress,
          props.nftDetails.supply,
        );
        obj.TransactionHash=buyObj.hash
        obj.TokenId= props.nftDetails.tokenId
        let response = await get(`User/nfttype/${nftId}`);
        if(response.data.isPutOnSale){
          let response = await post(`/User/SaveBuy`, obj);
          if (response) {    
            setSucess(true)
            setSuccess("NFT purchased successfully ")
             setTimeout(() => {
              setSucess(false)
              setShow(false);
              router(`/accounts/${address}`);
            }, 2000);    
            setBtnLoader(false);
          } else {
            setBtnLoader(false);
            setShow(false);
            setErrorMsg(isErrorDispaly(response));
          }
        }    
      } catch (error) {
                setBtnLoader(false);
        setShow(true);
        setErrorMsg(isErrorDispaly(error));
      }

    } else {
      setBtnLoader(false);
      setShow(false);
    }
  };
  const isErrorDispaly = (objValue: any) => {
    if (objValue.data && typeof objValue.data === 'string' || objValue?.cause?.reason || objValue?.reason ) {
      return objValue.data || objValue?.cause?.reason || objValue.reason ;
    } else if(objValue.shortMessage){
      if(objValue.shortMessage?.includes("The total cost")){
        return "Low balance"
      }else{
       return objValue.shortMessage
      }    
    }else if (objValue.originalError && typeof objValue.originalError.message === 'string') {
      return objValue.originalError.message;
    } else {
      return 'Something went wrong please try again!';
    }
  };
  return (
    <>
      <Modal centered show={show} onHide={props.handleClose} className="wallet-popup checkout-modal confirmaton-modal">
        
        <Form onSubmit={(e) => buyNow(e)}>
          <Modal.Header className="p-3 justify-content-between">
          <h2 className="section-title text-center mt-0 mb-0">Checkout</h2>
            <span className="icon close c-pointer" onClick={props.handleClose}></span>
          </Modal.Header>
          {/* {errorMsg && (
          <Alert variant="danger">
            <Image className='validation-error' src={validError} />
            <span>{errorMsg}</span>
          </Alert>
        )} */}
        {errorMsg && (
                            
<div className='p-3'>
                            <div className='cust-error-bg mt-2'>
                            <div className='mr-4'><Image src={error} alt="" /></div>
                            <div>
                              <p className='error-title error-red text-start'>Error</p>
                              <p className="error-desc text-start">{errorMsg}</p></div>
</div>
                          </div>
                          )}
          {/* <div className="text-center">{saleLoader && <Spinner></Spinner>}</div>
                    {!saleLoader && ( */}

          <Modal.Body className='p-3'>
            {/* {saleErrorMsg && (
                          <Alert variant="danger">
                            <Image className='validation-error' src={validError} />
                            <span>{saleErrorMsg}</span>
                          </Alert>
                        )} */}
          
            <p className="common-text mb-5 text-start">
              NFT Marketplace is the platform where users can purchase NFT assets directly from creator,
               Users need to pay for the gas fee as well as platform fee before purchasing the NFT.
                User can purchase NFT also through bidding, where creator will accept a price from the user
            </p>
            {/* <div className="balance-card"> */}
            <div className="bal-feild light-bg">
              <label>Buy Price</label>
              <h6 className="text-end">
                {props.nftDetails?.price || props.nftDetails?.value}{' '}
                {props.nftDetails?.currency?.toUpperCase() || process.env.REACT_APP_CURRENCY_SYMBOL}
              </h6>
            </div>
            <div className="bal-feild light-bg">
              <label>Buyer Fee</label>
              <h6 className="text-end">
                {percentageValue}{' '}
                {props.nftDetails?.currency?.toUpperCase() || process.env.REACT_APP_CURRENCY_SYMBOL}
              </h6>
            </div>
            <div className="bal-feild light-bg">
              <label>Total Buy Price</label>
              <h6 className="text-end">
                {totalBuyValue}{' '}
                {props.nftDetails?.currency?.toUpperCase() || process.env.REACT_APP_CURRENCY_SYMBOL}
              </h6>
            </div>
            {/* </div> */}
            {/* <InputGroup className="mb-5 input name-feild">
              <Form.Label className="input-label">Buy Price</Form.Label>
              <Form.Control
                placeholder="0.01 MATIC"
                aria-label="Username"
                className="input-style"
                name="value"
                //onChange={(value) => handleChange(value)}
              />
            </InputGroup> */}
          </Modal.Body>

          {/* )} */}
          <Modal.Footer>
            <Button className="custom-btn" type="submit" disabled={btnLoader}>
            <span> {btnLoader && <Spinner size="sm" className='text-base-100' />} </span> Buy Now
            </Button>
          </Modal.Footer>
        </Form> 
        <div className='p-absolute toaster-center'>
        <ToastContainer className="p-3 cust-nametoster position-fixed bottom-0" >
              <Toast show={scuess} className="text-center toster-component">
                <Toast.Body className="toaster-cust">
                <Image src={validSuccess} className='svalidation-error' /> <span>{success}</span>
                </Toast.Body>
              </Toast>
            </ToastContainer>
            </div>      
      </Modal>      
    </>
  );
};
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(BuyComponent);
