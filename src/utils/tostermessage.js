import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';

const ToasterMessage = (props) => {
  const [showToast,setShowToast]=useState(props.isShowToaster);
  useEffect(()=>{
    if(props.isShowToaster){
      setShowToast(true);
      setTimeout(()=>{
       setShowToast(false);
       if(props.onCloseToast){props.onCloseToast();}
      },3000)
    }
  },[props.isShowToaster])
  return (
    <>
       <div className="p-relativeview">
        <div className="text-center toster-component">
            <Toast show={showToast} delay={3000} autohide={true}
                position='bottom-center'
                bg={props.bg || 'Success'}
            >
                <Toast.Body className="toaster-cust"><span className={`icon ${props.bg==="Danger"?"error-alert":"success"} me-2`}></span><span className="toaster-cust-text">{props?.success}</span></Toast.Body>
            </Toast>
        </div>
        </div>
    </>
  );
};
ToasterMessage.propTypes = {
  isShowToaster: PropTypes.string,
  success: PropTypes.string,
};
export default ToasterMessage;
