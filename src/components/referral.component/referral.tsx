import React from 'react';
import referral from '../../assets/images/referral.svg';
import { useNavigate,useParams} from 'react-router-dom';
import { updateisreferralpage } from '../../utils/api';
import Button from "../../ui/Button"

function Referral() {
    const router = useNavigate();
    const params=useParams()


   const handleOk=async()=>{
    router(`/referralcode/${params.id}`)
   
    }
    const handleUpdateReferral= async()=>{
        let obj={
            customerId:params.id,
            status:"No"
          }
        await updateisreferralpage(`User/updateisreferralpage`,obj) 
        .then((response) => {
            if (response) {
                router('/profile')
            }
          })
          .catch((error) => {
           
          });
    }
  return (
    <>
   <div className='container mx-auto max-sm:px-3 max-sm:mt-3 md:mt-10'>
   <div className='text-center'>
    <img className='w-48 mx-auto' src={referral} ></img>
    <h1 className='text-secondary text-3xl font-bold mt-10 mb-4'>Do You Have A <span className='text-primary'>Referral</span> Code?</h1>
   
    <p className='mb-3 text-base text-secondary font-normal'>If you have a referral code, You will get 5% </p>
   </div>
   <div className='referral-input position-relative'>
  <div className="mt-4 text-center">
  <Button type="cancel" handleClick={handleUpdateReferral} btnClassName="text-center">
    No
    </Button>
    <Button type="secondary"  handleClick={handleOk} btnClassName="m-0 ms-3">
    Yes
    </Button>
</div>
   </div>
   </div>
    </>
  );
}


export default Referral;
