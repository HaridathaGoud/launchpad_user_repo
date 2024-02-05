import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
import success from '../../../../assets/images/thank-you.svg';
import {  useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import StartedSteps from './steps';
import { useAccount } from 'wagmi';
import WalletText from '../../../../utils/walletText';
import Button from '../../../../ui/Button';
import PublishProposalShimmer from '../../shimmers/publishproposalshimmer';

export default function Success() {
    const params = useParams()
    const { isConnected,address } = useAccount();  
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer); // Cleanup the timer
    }, []);

    const router = useNavigate();
    const handleRedirect =()=>{
        router(`/dao/proposalview/${params.id}`)
    }

    return (
        <>
        {isConnected ? 
        <>
            <div className='container mx-auto pt-5'>
            {loading ? (
                           <PublishProposalShimmer/> 
                        ) : ( <>                   
            {/* <h4 > <Link to={`/dao/${params.id}`} className='mb-0 back-text text-black'> Create Proposal  </Link></h4>
            <hr /> */}
                <div className='grid md:grid-cols-12 gap-4 max-md:px-3 '>
                <div className='md:col-span-4'> 
                    <StartedSteps formSteps={100} stepsTwo={2} stepsOne={1} stepsThree={3} number={3}/>
                    </div>
                    <div className='md:col-span-8'> 
                   <div className='text-center'>
                      <img src={success} className='mx-auto'></img>
                      <h1 className='text-success font-bold text-lg mt-3 cursor-pointer'>Thank You</h1>
                      <p className='mb-5 text-secondary'>Your proposal is submitted successfully!</p>
                      <Button  type="primary"  handleClick={handleRedirect}>
                     Back to publish proposal summary
                    </Button>
                   </div>
                    </div>
                </div>
                </>  )}
            </div>
            </> : <WalletText/>}
        </>
    );
}
