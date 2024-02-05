import React, { useEffect } from 'react';
import praposalImage from '../../../../assets/images/firstpraposal-image.png';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
export default function CreateFirstPraposal(props:any) {
    const { isConnected } = useAccount();
    useEffect(()=>{

    },[])
    return (<>
            <div className='bg-base-300 py-[18px] px-5 rounded-lg shadow-md text-center'>
                <div className='flex justify-center mb-6'>
                    <img src={praposalImage} />
                </div>
                    {(isConnected &&  props?.memberShipCount>=2) && (  <div className=''><Link className='bg-primary min-w-[164px] py-3 rounded-[28px] text-lg font-semibold text-base-100 px-8 inline-block' to={`/dao/${props?.daoId}/createpraposal`}><span className="mt-2 mb-2">Create Your First Proposal</span></Link></div> )}
                    <p className='text-secondary mt-3'>Get your community involved in the decision making process.<br />
                        Learn more in our proposal guide.</p>

            </div>
    </>)
}