import React, { useState, useEffect } from 'react';
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
import { Modal, modalActions } from '../ui/Modal';
import Button from '../ui/Button';
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


  const percentage = () => {
    const buyValue = props.nftDetails?.price || props.nftDetails?.value
    let percentage = (buyValue * 1) / 100
    setPercentageValue(percentage)
    let totalValue = buyValue + percentage
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
      CollectionContractAddress: props.collectionAddress,
      crypto: 'WMATIC',
      TransactionHash: null,
      TokenId: null
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
        obj.TransactionHash = buyObj.hash
        obj.TokenId = props.nftDetails.tokenId
        let response = await get(`User/nfttype/${nftId}`);
        if (response.data.isPutOnSale) {
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
    if (objValue.data && typeof objValue.data === 'string' || objValue?.cause?.reason || objValue?.reason) {
      return objValue.data || objValue?.cause?.reason || objValue.reason;
    } else if (objValue.shortMessage) {
      if (objValue.shortMessage?.includes("The total cost")) {
        return "Low balance"
      } else {
        return objValue.shortMessage
      }
    } else if (objValue.originalError && typeof objValue.originalError.message === 'string') {
      return objValue.originalError.message;
    } else {
      return 'Something went wrong please try again!';
    }
  };
  return (
    <>
      <Modal id='marketplace-buy-now'>
        <form onSubmit={(e) => buyNow(e)}>
          <div className="p-3 justify-content-between">
            <h2 className="text-dark text-lg font-semibold">Checkout</h2>
          </div>
          {/* {errorMsg && (
          <Alert variant="danger">
            <Image className='validation-error' src={validError} />
            <span>{errorMsg}</span>
          </Alert>
        )} */}
          {errorMsg && (

            <div className='p-3'>
              <div className='cust-error-bg mt-2'>
                <div className='mr-4'><img src={error} alt="" /></div>
                <div>
                  <p className='error-title error-red text-start'>Error</p>
                  <p className="error-desc text-start">{errorMsg}</p></div>
              </div>
            </div>
          )}
          {/* <div className="text-center">{saleLoader && <Spinner></Spinner>}</div>
                    {!saleLoader && ( */}

          <div className='p-3'>
            {/* {saleErrorMsg && (
                          <Alert variant="danger">
                            <Image className='validation-error' src={validError} />
                            <span>{saleErrorMsg}</span>
                          </Alert>
                        )} */}

            <p className="text-dark mb-3">
              NFT Marketplace is the platform where users can purchase NFT assets directly from creator,
              Users need to pay for the gas fee as well as platform fee before purchasing the NFT.
              User can purchase NFT also through bidding, where creator will accept a price from the user
            </p>
         
            <div className="flex justify-between items-center my-4">
              <p className='text-sm shrink-0 text-secondary opacity-50'>Buy Price</p>
              <p className="truncate text-secondary text-end">
                {props.nftDetails?.price || props.nftDetails?.value}{' '}
                {props.nftDetails?.currency?.toUpperCase() || process.env.REACT_APP_CURRENCY_SYMBOL}
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className='text-sm shrink-0 text-secondary opacity-50'>Buyer Fee</p>
              <p className="truncate text-secondary text-end">
                {percentageValue}{' '}
                {props.nftDetails?.currency?.toUpperCase() || process.env.REACT_APP_CURRENCY_SYMBOL}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className='text-sm shrink-0 text-secondary opacity-50'>Total Buy Price</p>
              <p className="truncate text-secondary text-end">
                {totalBuyValue}{' '}
                {props.nftDetails?.currency?.toUpperCase() || process.env.REACT_APP_CURRENCY_SYMBOL}
              </p>
            </div>
          </div>
          <hr />
          <div className='text-center mt-5'>
            <Button btnClassName="custom-btn" type="secondary" disabled={btnLoader}>
              <span> {btnLoader && <Spinner size="sm" className='text-base-100' />} </span> Buy Now
            </Button>
          </div>
        </form>
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
