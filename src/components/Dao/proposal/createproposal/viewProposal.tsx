import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TestingPraposalflow from './publishPraposalView'
import { Link } from 'react-router-dom';
import StartedSteps from './steps';
import { useAccount } from 'wagmi';
import WalletText from '../../../../utils/walletText';
import PublishProposalShimmer from '../../shimmers/publishproposalshimmer';

export default function ProposalView() {
    const {isConnected} = useAccount();

    return (
        <>
        {isConnected ?
            <div className='container mx-auto pt-5'>
                 <PublishProposalShimmer/>
            {/* <div className='flex items-center'>
                <Link to='/dao'>
                    <h4 className='mb-0 back-text'>Back</h4>
                    <hr className="custom-hr proposal-hr" />
                    </Link>
                    </div> */}
                <div className='grid md:grid-cols-12 gap-4 max-md:px-3'>
                    <div className='md:col-span-4'>
                   <StartedSteps formSteps={100} stepsOne={1} stepsTwo={2} stepsThree={3} number={3} />
                    <div className='m-auto list-items mt-5'>
                    </div>
                    </div>
                    <div className='md:col-span-8'> 
                   <TestingPraposalflow></TestingPraposalflow>
                    </div>
                </div>
            </div> : <WalletText/>}           
        </>
    );
}
