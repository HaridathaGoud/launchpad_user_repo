import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Placeholder from 'react-bootstrap/Placeholder';

function StartedSteps(props) {
    const [loader, setLoader] = useState()
    setTimeout(() => {
        setLoader(props?.formSteps)
    }, 100);

    return (

        <>
            <div className='flex justify-between items-center '>
                <p className='text-dark text-sm font-normal p-0 label'>Get Started With These Steps</p> 
                <span className='text-sm text-info font-normal'>{props.number}/3</span>
                </div>
                {/* <ProgressBar now={props?.formSteps} className='rounded-md bg-slate-200' /> */}
                <progress now={props?.formSteps} className="progress progress-success" value={0} max="100"></progress>
            <div className='mx-auto mt-5'>
                {loader ? <div className={props?.stepsOne == "1" ? 'w-full rounded-[28px] border-[#078805] border px-6 py-3 mb-4' : 'w-full rounded-[28px] border-[#A5A5A5] border px-6 py-3 mb-4'}><span className={props?.stepsOne == "1" ? 'icon active-checkpoint mr-3' : 'icon checkpoint mr-3'}></span><span className=''>Create Proposal</span></div> :
                    <div className='step-list active '> <Placeholder xs={12} animation="glow"> <Placeholder xs={1} className='me-3 shimmer-icon' /><Placeholder xs={8} /></Placeholder>
                    </div>}
                {loader ? <div className={props?.stepsTwo == "2" ? 'w-full rounded-[28px] border-[#078805] border px-6 py-3 mb-4' : 'w-full rounded-[28px] border-[#A5A5A5] border px-6 py-3 mb-4'}><span className={props?.stepsTwo == "2" ? 'icon active-checkpoint mr-3' : 'icon checkpoint mr-3'}></span><span className=''>Proposal Summary</span></div> :
                    <div className='step-list active '> <Placeholder xs={12} animation="glow"> <Placeholder xs={1} className='me-3 shimmer-icon' /><Placeholder xs={8} /></Placeholder>
                    </div>}
                {loader ? <div className={props?.stepsThree == "3" ? 'w-full rounded-[28px] border-[#078805] border px-6 py-3 mb-4' : 'w-full rounded-[28px] border-[#A5A5A5] border px-6 py-3 mb-4'}><span className={props?.stepsThree == "3" ? 'icon active-checkpoint mr-3' : 'icon checkpoint mr-3'}></span><span className=''>Publish Proposal </span></div> :
                    <div className='step-list active '> <Placeholder xs={12} animation="glow"> <Placeholder xs={1} className='me-3 shimmer-icon ' /><Placeholder xs={8} /></Placeholder>
                    </div>}
            </div>
        </>
    );
}
export default StartedSteps;