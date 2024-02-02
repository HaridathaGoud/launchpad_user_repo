import React, { useState,useReducer } from 'react';
import daoprofile from "../../../assets/images/dao-profile.png";
import Image from 'react-bootstrap/Image'
import SecondaryButtonLg from '../button/secondarylg';
import TextInput from '../inputs/textinput';
import TextArea from '../inputs/textarea';
import BrowserInput from '../inputs/browserinput';
import CancelButton from '../button/cancel';
import SecondaryButtonMd from '../button/secondarybuttonmd';
import { useAccount } from 'wagmi';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Createpraposal from '../proposal/createproposal/createpraposal';

const DaoLeftPanel = () => {
    const [isChecked, setIsChecked] = useState(false)
   
    const router = useNavigate();

    const handleRedirectCreatepraposalScreen = () => {
        setIsChecked(true)
    }
    const handleCancel = () => {
        setIsChecked(false)
    }

    return (
        <>
            <div>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 '>
                        <Image src={daoprofile} className='rounded-full object-cover' />
                    </div>
                    <div>
                        <h1 className='text-lg font-semibold mb-1'>Aquaman</h1>
                        <p>63k Members</p>
                    </div>
                </div>
                <button onClick={handleRedirectCreatepraposalScreen} className='bg-secondary w-full my-2 rounded-[28px] h-[42px] text-lg font-semibold text-base-100 px-8'>New Proposal</button>
                <div>
                    <h1 className='text-base font-semibold my-5'>Proposals</h1>
                    <p className={`mb-5 text-secondary opacity-60`}>About </p>
                    <p className={`mb-5 text-secondary opacity-60`}>Settings</p>
                    <div className='flex gap-2'> <span className={`icon facebook-md `}></span>
                        <span className={`icon instagram-md `}></span>
                        <span className={`icon telegram-md `}></span>
                        <span className={`icon discord-md `}></span>
                        <span className={`icon network-md `}></span>
                    </div>
                </div>
            </div>
            

            {isChecked && <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isChecked} />
                <div className="drawer-content">
                
                    {/* <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label> */}
                </div>
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" onClick={handleCancel}></label>
                    <div className="menu p-4 md:w-80 min-h-full bg-white text-base-content pt-24">
                       
                       <Createpraposal close={handleCancel}/>
                    </div>
                </div>
            </div>}
        </>
    );


};

export default DaoLeftPanel;