import { NextPage } from 'next';
import React, { useState } from 'react';
import styles from "./dao.module.css";
import RadioInput from '../../../inputs/radioinput';
import SecondaryButtonLg from '../../../button/secondarylg';
import CancelButton from '../button/cancel';
import PrimaryButtonMd from '../button/primarymd';
import SecondaryButtonMd from '../button/secondarymd';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from '../../../../ui/Button';
import { Modal, modalActions } from '../../../../ui/Modal';
import votesuccess from '../../../../assets/images/vote-success.gif'

const   DaoCurrentResults: NextPage = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [saveBtn,setsaveBtn] = useState(true);
    const [editBtn,seteditBtn] = useState(false);
    const proposarDetailas = useSelector((state: any) => state?.vtg?.fetchproposalviewdata);
    const handleChange = (e: any) => {
        dispatch({ type: 'selectedOption', payload: e?.option })
        dispatch({ type: 'selectedhash', payload: e?.optionHash })
      }
      const handleRedirectVotingScreen = () => {
        if (selectedOption === 'yes') {
            modalActions('agreeModel','open')
                   
          } else if (selectedOption === 'no') {
            modalActions('castYourVote','open')
          }
    }
    const handleCheckBoxChange = (event) => {
        setSelectedOption(event.target.value);
      };
    const handleCancel = () => {
        modalActions('agreeModel','close')
        modalActions('castYourVote','close')
    }
    const handleAgree=()=>{
        modalActions('agreeModel','close')
        modalActions('castYourVote','open')
    }
    const handleConfirmVote=()=>{
        modalActions('castYourVote','close')
        setsaveBtn(false);
        if (selectedOption === 'no') {
            setsaveBtn(true);
            seteditBtn(false);
             // saveVote(true)
        }else{
            seteditBtn(true)
            // saveVote(true)
        }
    }
    const handleEditVote=()=>{
        modalActions('agreeModel','open')
    }
    const handleViewVote=()=>{
        seteditBtn(false);
        setsaveBtn(true);
    }
    return (
        <>
            <div>
                <h1 className='text-xl font-semibold mb-2 text-secondary'>Current results</h1>
                <div  className={` daorightpanel-bg rounded-[15px] py-4 px-4`}>
                <div className='flex justify-between gap-5 mb-5'>
                   <div className='shrink-0'>
                   <div className='mb-2'>
                        <span className={`${styles.greenDot} mr-2 align-middle`}></span>
                        <span className='text-base text-secondary'>Yes - 100%</span>
                    </div>
                    <div>
                        <span className={`${styles.redDot} mr-2 align-middle`}></span>
                        <span className='text-base text-secondary'>No - 0%</span>
                    </div>
                   </div>
                   <div>
                   <p className='text-secondary truncate'>23k The Saf...</p>
                   {editBtn &&  <img src={votesuccess} alt="" className='mt-2 w-[90px]' />}
                   </div>
                 </div>
                 <h2 className='text-base font-semibold mb-2 text-secondary'>Cast Your Vote</h2>
                  <div className="flex gap-8 mb-9">
                  <div className='flex gap-2'>

                  <label><input type="radio" name="radio-1"
                  value="yes"
                  checked={selectedOption === 'yes'}
                  onChange={handleCheckBoxChange}
                   className="radio mr-1" /></label>

                    {/* <RadioInput/> */}
                    <p className='font-medium text-secondary'>Yes</p>
                   </div>
                   <div className='flex gap-2'>
                   <label><input type="radio" name="radio-1"
                   value="no"
                   checked={selectedOption === 'no'}
                   onChange={handleCheckBoxChange}
                    className="radio mr-1" /></label>

                    {/* <RadioInput/> */}
                    <p className='font-medium text-secondary'>No</p>
                   </div>
                  </div>
                    {saveBtn &&
                        <div className='mb-2'>
                            <Button children={'Vote Now'} handleClick={handleRedirectVotingScreen} type='secondary' btnClassName='w-full' />
                        </div>
                    }
                    {editBtn &&
                        <div>
                            <div className='mb-2'>
                                <Button children={'Edit Vote'} handleClick={handleEditVote} type='secondary' btnClassName='w-full' />
                            </div>
                            <div className='mb-2'>
                                <Button children={'View Vote'} handleClick={handleViewVote} type='secondary' btnClassName='w-full' />
                            </div>
                        </div>
                    } 
                  
                </div>
            </div>
            {/* {proposarDetailas?.data?.options?.length != 0 && <div className='mt-5'>
                          <p className='text-base font-semibold mt-3 text-secondary'>choose your option</p>
                          <div className='d-flex flex-wrap-align voting-card-opt'>
                            {proposarDetailas?.data?.options?.map((item: any) => (<Form.Check className='me-4 options-width'>
                              <Form.Check.Input
                                type="radio"
                                className='c-pointer'
                                key={item?.option}
                                value={item?.option}
                                aria-label={`radio ${item?.option}`}
                                disabled={isVoted && item?.isSelect === false}
                                // onClick={() => handleChange(item)}
                                // checked={item?.isSelect ? item?.isSelect : state?.selectedOption === item?.option}
                              /><Form.Label className='text-secondary'>{item?.option}</Form.Label>
                            </Form.Check>))}
                          </div>
                        </div>} */}

                        <Modal id='agreeModel' modalClass='max-w-[510px]'>
                    <div >
                        <div className=''>
                            <div className="flex justify-between items-center  mb-5">
                                <h3 className="font-semibold text-lg">Terms Of Service</h3>
                            </div>
                            <div className={`py-4 px-3 flex gap-3 ${styles.popBg}`}>
                                <div>
                                    <span className={`icon ${styles.info}`}></span>
                                </div>
                                <div>
                                    <p>Oops, it seems you don’t have any voting power at block 31,272,274. <span className='font-semibold text-base cursor-pointer'>Learn more</span><span className={`icon cursor-pointer ${styles.squareArrow}`}></span></p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-7 px-10">
                                <p className='text-center font-semibold truncate'>docs.safran.store/library/terms-a...</p><span className={`icon cursor-pointer shrink-0 ${styles.squareArrow}`}></span>
                            </div>
                        </div>
                        <div className={`modal-action justify-center pt-4 ${styles.borderTop}`}>
                            <form method="dialog" className='flex items-center'>
                                <div className='mr-5'> <Button children={'Cancel'} handleClick={handleCancel} type='cancel' /></div>
                                 <Button children={'I agree'} handleClick={handleAgree} type='secondary' />
                            </form>
                        </div>
                    </div>
              
                        </Modal>
                      
            <Modal id='castYourVote' modalClass='max-w-[510px]'>
                <div >
                    <div >
                        <div className="flex justify-between items-center  mb-5">
                            <h3 className="font-semibold text-lg mb-5">Cast your vote</h3>
                            {/* <span className={`icon ${styles.closeIcon}`} onClick={handleCancel}></span> */}
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <p className={`text-sm ${styles.lightColor}`}>Choice</p>
                            <p> {selectedOption} </p>
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <p className={`text-sm ${styles.lightColor}`}>DOTT</p>
                            <p>31,272,274 <span className={`icon ${styles.squareArrow}`}></span></p>
                        </div>
                        <div className='flex justify-between items-center mb-3'>
                            <p className={`text-sm ${styles.lightColor}`}>Your voting power</p>
                            <p>0 Safran</p>
                        </div>
                        <div className={`py-4 px-3 flex gap-3 mb-4 ${styles.popBg}`}>
                            <div>
                                <span className={`icon ${styles.info}`}></span>
                            </div>
                            <div>
                                <p>Oops, it seems you don’t have any voting power at block 31,272,274. <span className='font-semibold text-base cursor-pointer'>Learn more</span><span className={`icon cursor-pointer ${styles.squareArrow}`}></span></p>
                            </div>
                        </div>
                    </div>
                    <div className={`modal-action justify-center pt-6 mt-2 ${styles.borderTop}`}>
                        <form method="dialog" className='flex items-center'>
                            <div className='mr-5'> <Button children={'Cancel'} handleClick={handleCancel} type='cancel' /></div>
                            <Button children={'Confirm'} handleClick={handleConfirmVote} type='secondary' />
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DaoCurrentResults;