import React, { useEffect, useState } from 'react';
import praposalImage from '../../../../assets/images/firstpraposal-image.png';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import Createpraposal from '../../proposal/createproposal/createpraposal';
export default function CreateFirstPraposal(props:any) {
    const [isChecked, setIsChecked] = useState(false)
    const { isConnected } = useAccount();
    useEffect(()=>{
    },[])
    const handleRedirectCreatepraposalScreen = () => {
        setIsChecked(true)
    }
    const handleCancel = () => {
        setIsChecked(false)
    }
    return (<>
            <div className='bg-base-300 py-[18px] px-5 rounded-lg shadow-md text-center'>
                <div className='flex justify-center mb-6'>
                    <img src={praposalImage} />
                </div>
                    {(isConnected &&  props?.memberShipCount>=2) && (  <div className=''><Link className='bg-primary min-w-[164px] py-3 rounded-[28px] text-lg font-semibold text-base-100 px-8 inline-block' onClick={handleRedirectCreatepraposalScreen} to={''}><span className="mt-2 mb-2">Create Your First Proposal</span></Link></div> )}
                    <p className='text-secondary mt-3'>Get your community involved in the decision making process.<br />
                        Learn more in our proposal guide.</p>

            </div>
            {isChecked && <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isChecked} />
                <div className="drawer-content">
                    {/* <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label> */}
                </div>
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" onClick={handleCancel}></label>
                    <div className="menu p-4 md:w-80 min-h-full bg-white text-base-content pt-24">
                       
                       <Createpraposal close={handleCancel} pjctInfo={props?.pjctInfo}/>
                    </div>
                </div>
            </div>}

    </>)
}