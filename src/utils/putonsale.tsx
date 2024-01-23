import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { post, postMarketplace } from './api';
import { useCollectionDeployer } from './useCollectionDeployer';
import validError from '../../src/assets/images/validation-error.png';
import UserContract from '../contracts/user721contract.json';
import ToastContainer from 'react-bootstrap/ToastContainer';
import validSuccess from '../../src/assets/images/success.png';
import Toast from 'react-bootstrap/Toast';
import error from '../assets/images/error.svg'
const PutOnSale = (props: any) => {
  const [show, setShow] = useState(props.showModal);
  const [saleErrorMsg, setSaleErrorMsg] = useState<any>(null);
  const [saleLoader, setSaleLoader] = useState(false);
  const [validationError, setValidationError] = useState();
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(null);
  const [scuess, setSucess] = useState(false);
  const [btnLoader,setBtnLoader]=useState(false)
  const [saveObj, setSaveObj] = useState({
    tokenId: '',
    customerId: '',
    value: 0,
    crypto: '',
    saleType: '',
    signature: '',
    nftId: '',
    serviceFee: '0.025',
  });
  const { getSignatureForSale, setApprovalForAll } = useCollectionDeployer();
  const handleChange = (value: any) => {
    setSaleErrorMsg(null);
    const data = value.target.value;
    let matches = data.match(/\./g);
    let result = (matches != null && matches.length >= 2) && "Two Dots";
    let isNumber;
    if (result == "Two Dots") {
      isNumber = false;
    } else {
      isNumber = /^[0-9/.].*$/.test(data);
    }
    if (!isNumber) {
      setValidationError('Please enter only numbers');
    } else {
      setValidationError(null);
      let obj = Object.assign({}, saveObj);
      obj.value = value.target.value;
      setSaveObj(obj);
    }
  };
  const placeONSaleorAuction = async (e: type, type: any) => {
    setBtnLoader(true)
    let obj = Object.assign({}, saveObj);
    const form = e.currentTarget;
    if (obj.value == '0' || obj.value == 0) {
      setSaleErrorMsg('Amount must be greater than zero');
      setBtnLoader(false)
    } else {
      setSaleLoader(true);
      if (form.checkValidity() === true && validationError == null) {
        setApprovalForAll(props?.reqFields?.collectionAddress, UserContract.abi, async (response) => {
          if (response.ok) {
            let signature = await getSignatureForSale(
              props.reqFields?.collectionAddress || props.nftDetails?.collectionContractAddress,
              props.nftDetails?.tokenId,
              props.nftDetails?.CollectionType ? props.nftDetails?.CollectionType : 'ERC1155',
              obj.value,
            );
            obj.customerId = props.reqFields.auth.user?.id;
            obj.tokenId = props.reqFields.tokenId ? props.reqFields.tokenId : '';
            obj.crypto = props.nftDetails?.currency
              ? props.nftDetails?.currency
              : process.env.REACT_APP_CURRENCY_SYMBOL || 'Matic';
            obj.saleType = type;
            obj.signature = signature;
            obj.nftId = props.nftDetails?.id;
            let response = await postMarketplace(`User/SaveSale`, obj);
            if (response) {
              setSucess(true)
              setBtnLoader(false)
              setSuccess("NFT has been successfully put on sale")
               setTimeout(() => {
                // setSucess(false)
                // setShow(false);
                props.handleClose();
                props.refresh()
              }, 2000); 
              setSaleLoader(false);
              //  props.updateAmount(response.data.value);
            
            } else {
              setSaleLoader(false);
              setBtnLoader(false)
              setSaleErrorMsg(isErrorDispaly(response));
              setShow(false);
              props.handleClose();
            }
          } else {
            setBtnLoader(false)
            setSaleErrorMsg(isErrorDispaly(response.data));
            setSaleLoader(false);
          }
        });
      } else {
        setBtnLoader(false)
        setValidated(true);
        setSaleLoader(false);
        window.scroll({
          top: 150,
          left: 100,
          behavior: 'smooth',
        });
      }
    }
  };
  const isErrorDispaly = (objValue: any) => {
    if (objValue.data && typeof objValue.data === 'string' || objValue.reason) {
      return objValue.data ||  objValue.reason;
    }else if(objValue.shortMessage){
      if(objValue.shortMessage?.includes("The total cost")){
        return "Low balance"
      }else{
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
      <Modal centered show={show} onHide={props.handleClose} className="wallet-popup checkout-modal confirmaton-modal">
        <Modal.Header className='p-3 justify-content-between'>
        <h2 className="section-title mt-0 mb-0">Put on sale</h2>
          <span className="icon close c-pointer" onClick={props.handleClose}></span>
        </Modal.Header>
        <Modal.Body>
         
          <div className="sale-switch">
            {saleErrorMsg && (
              // <Alert variant="danger">
              //   <Image className='validation-error' src={validError} />
              //   <span>{saleErrorMsg}</span>
              // </Alert>
               <div className='cust-error-bg'>
              <div className='cust-crd-mr'><Image src={error} alt="" /></div>
              <div>
                <p className='error-title error-red text-start'>Error</p>
                <p className="error-desc text-start">{saleErrorMsg}</p></div>
            </div>
            )}
            <Form noValidate validated={validated}>
              {/* <div className="d-flex justify-content-between">
                <div>
                  <label className="">Put on sale</label>
                  <p>you'll receive bids on this item</p>
                </div>
                <Form.Check type="switch" id="custom-switch" checked disabled/>
              </div>
              <div className="d-flex justify-content-between cust-my">
                <div>
                  <label className="">Instant sale price</label>
                  <p>Enter the price for which the item will be instantly sold</p>
                </div>
                <Form.Check type="switch" id="custom-switch" disabled/>
              </div> */}

              <div className="  cust-suffix-left my-4">
                <div className='d-flex'>
                  <Form.Control
                    aria-label="Username"
                    type="text"
                    className="input-style mb-0"
                    placeholder="Enter the price"
                    onChange={(value) => handleChange(value)}
                    isInvalid={!!validationError}
                    feedback={validationError}
                    maxLength={13}
                    required
                  />
                  <InputGroup.Text id="basic-addon3" className="input-style input-rightradius px-3">
                    {props.nftDetails?.currency ? props.nftDetails?.currency : process.env.REACT_APP_CURRENCY_SYMBOL}
                  </InputGroup.Text>
                </div>
                {validationError && <Form.Text className="cust-validmsg">Please provide valid sale price.</Form.Text>}
              </div>
              {/* <div className="d-flex justify-content-between">
                <div>
                  <label className="">Unlock once purchased</label>
                  <p>Content will be unlocked after successful transaction</p>
                </div>
                <Form.Check type="switch" id="custom-switch" disabled/>
              </div> */}
            </Form>
          </div>
          
           
          
        </Modal.Body>
        <Modal.Footer>
        <div className='text-end'> <Button
              className="custom-btn"
              onClick={(e) => placeONSaleorAuction(e, 'Sale')}

              disabled={saleLoader}
            >
              <span>{btnLoader && <Spinner size="sm" className='text-base-100' />} </span> Put on sale
            </Button>
            </div>
        </Modal.Footer>
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
export default PutOnSale;
