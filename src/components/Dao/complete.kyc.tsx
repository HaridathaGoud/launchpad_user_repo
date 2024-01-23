import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getCustomerDetails } from '../../reducers/authReducer';

const CompleteKyc = (props : any) => {

  const { address } = useAccount();  
  const router = useNavigate();

  const handleKyc = () => {
    window.open(process.env.REACT_APP_KYC_APP, "_blank")
  };

  useEffect(()=>{
    if(address){
      props?.customerDetails(address,(callback:any)=>{      
        if(callback?.data?.data?.kycStatus?.toLowerCase() === "completed"){         
          router(`/`)   
        }else{
             
        }
      })
    }
  },[address])
  return (
    <div className="container">
       {props?.loader && 
            <>
             <div className="flex justify-center">
               <div className='loading-overlay'>
               <div className="text-center image-container">               
             </div></div>
             </div>
            </>}
     {!props?.loader && <div className="proceedKyc staking-steps kyc-centeralign">
        <div className="text-center">
          <h3 className='completekyc-title mb-4'>To proceed with Create Proposal/Voting <br/> please <span style={{color:'#0068ff'}}>complete your KYC</span></h3>
          <hr className='my-collection-hr'/>
          <button type="button" className="btn-primary" onClick={handleKyc}>
            Complete KYC
          </button>
        </div>
      </div>}
    </div>
  );
};

const connectDispatchToProps = (dispatch: any) => {
  return {    
    customerDetails: (address:any,callback:any) => {
      dispatch(getCustomerDetails(address,callback));
  }
  }
}


export default connect(null, connectDispatchToProps)(CompleteKyc);
