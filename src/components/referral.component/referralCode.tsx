import React, { useState } from 'react';
import referral from '../../assets/images/referral.svg';
import { isexistingreferralcode } from '../../utils/api';
import { KycPost } from "../../utils/api"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import error from '../../assets/images/error.svg';
import Button from '../../ui/Button';
import Spinner from '../loaders/spinner';

const Referralcode = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const customerRegisterDetails = useSelector((state: any) => state.auth.user);
  const router = useNavigate()
  const [errorMsg, setErrorMsg] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const setField = (field, value) => {
    setTouched(null)
    setErrorMsg(null);
    setForm({
      ...form,
      [field]: value
    })
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      })
    }
  }

  const getIsExistingReferralCOde = async () => {
    setBtnLoader(true)
    const whiteSpace = /\s/;
    const emojiRejex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]|[\u2010-\u2017])/g;
    if (form?.referralCode != null
      && (form?.referralCode?.length >= 6)
      && (!emojiRejex.test(form?.referralCode) &&
        !whiteSpace.test(form?.referralCode))) {
      await isexistingreferralcode(`User/isexistingreferralcode/${form?.referralCode}`)
        .then((response) => {
          if (response) {
            setTouched(response?.data)
            setBtnLoader(false)
          }
        })
        .catch((errors) => {
          setTouched(null)
          setErrorMsg(isErrorDispaly(errors));
          setBtnLoader(false)
          window.scroll(0, 0);
        })
    } else if (!form?.referralCode) {
      setErrorMsg("Please provide referral code.");
      window.scroll(0, 0);
      setBtnLoader(false)
      setTouched(null)
    } else {
      setErrorMsg("Invalid referral code");
      window.scroll(0, 0);
      setBtnLoader(false)
    }
  }

  const referralDetails = async (event: any) => {
    event.preventDefault();
    setBtnLoader(true)
    if (form?.referralCode != null) {
      let obj = {
        id: "00000000-0000-0000-0000-000000000000",
        customerId: customerRegisterDetails.id,
        referralCode: form?.referralCode,
        status: "No"
      }
      if (touched) {

        let res = await KycPost(`User/savereferraldata`, obj)
          .then((res) => {
            if (res) {
              router('/profile')
              setBtnLoader(false)
            }
          })
          .catch((error) => {
            setErrorMsg(isErrorDispaly(error));
            setBtnLoader(false)
            window.scroll(0, 0);
          })
      } else if (!touched && form?.referralCode) {
        setErrorMsg("Invalid referral code.");
        window.scroll(0, 0);
        setBtnLoader(false)

      } else {
        setErrorMsg("Please provide referral code.");
        window.scroll(0, 0);
        setBtnLoader(false)

      }
    } else {
      setErrorMsg("Please provide referral code.");
      window.scroll(0, 0);
      setBtnLoader(false)

    }
  }

  const hancleClose = () => {
    router("/profile")
  }

  const isErrorDispaly = (objValue) => {
    if ((objValue?.status > 400 && objValue?.status < 500) && objValue?.status != 401) {
      return "Something went wrong please try again!";
    } else {
      if (objValue?.data && typeof objValue?.data === "string") {
        return objValue?.data;
      } else if (objValue?.response?.data && objValue?.response?.data?.title && typeof objValue?.response?.data?.title) {
        return objValue?.response?.data?.title;
      } else if (
        objValue?.originalError &&
        typeof objValue?.originalError?.message === "string"
      ) {
        return objValue?.originalError?.message;
      } else {
        return typeof (objValue) === "object" && objValue?.reason ? objValue?.reason : "Something went wrong please try again!";
      }
    }
  };
  return (
    <>
      <div className='container mx-auto max-sm:px-3 max-sm:mt-3 md:mt-10'>
        {errorMsg && (
          <div className='cust-error-bg'>
            <div className='mr-4'>
              <img src={error}></img>
            </div>
            <div>
              <p className='error-title error-red'>Error</p>
              <p className='mb-0'>{errorMsg}</p>
            </div>
          </div>
        )}
        <div className=''>
          <div className='text-center'>
            <img className='w-48 mx-auto' src={referral} />
            <h1 className='text-secondary text-3xl font-bold mt-10 mb-4'>Do You Have A <span className='text-primary'>Referral</span> Code?</h1>

            <p className='mb-3 text-base text-secondary font-normal'>If you have a referral code, You will get 5% </p>
          </div>
          <div className=''>
            <form className='mb-0 ' >
              <div className='lg:max-w-sm mx-auto relative'>
                <label className='text-dark text-sm font-normal p-0 mb-1 label ml-5 block'>Referral Code</label>
                <input
                  className='input input-bordered w-full rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10'
                  type="text"
                  name="referralCode"
                  value={form?.referralCode}
                  placeholder="Referral Code"
                  maxLength={6}
                  onChange={(e) => { setField('referralCode', e.currentTarget.value) }}
                />
                {touched?.isReferral && <div className='absolute top-[2px] right-5'>
                  <p className='text-sm text-secondary font-normal'>{touched.name}</p>
                  <p className='mt-3 text-right'><span className='icon green-checked'></span></p>

                </div>}
              </div>

              <div className="mt-4 text-center ">
                <Button type="cancel" handleClick={hancleClose} btnClassName="mr-4">
                  Cancel
                </Button>

                {!touched?.isReferral && <Button type="secondary" handleClick={() => getIsExistingReferralCOde()} btnClassName="">
                  <span>{btnLoader && <Spinner size="loading-sm"/>} </span> Verify
                </Button>}

                {touched?.isReferral && <Button type="secondary" handleClick={(e) => referralDetails(e)} btnClassName="">
                  <span>{btnLoader && <Spinner size="loading-sm"/>} </span> Save
                </Button>}
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
}


export default Referralcode;
