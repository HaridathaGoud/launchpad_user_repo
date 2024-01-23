import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TestingPraposalflow from './publishPraposalView'
import { Link } from 'react-router-dom';
import StartedSteps from './steps';
import { useAccount } from 'wagmi';
import WalletText from '../../../../utils/walletText';

export default function ProposalView() {
    const {isConnected} = useAccount();

    return (
        <>
        {isConnected ?
            <Container className='dao-container'>
            <div className='d-flex align-items-center sm-m-space'>
                <Link to='/dao'>
                    <h4 className='mb-0 back-text'>Back</h4>
                    <hr className="custom-hr proposal-hr" />
                    </Link>
                    </div>
                <Row className=''>
                    <Col md={4}>
                   <StartedSteps formSteps={100} stepsOne={1} stepsTwo={2} stepsThree={3} number={3} />
                    <div className='m-auto list-items mt-5'>
                    </div>
                    </Col>
                    <Col md={8}> 
                   <TestingPraposalflow></TestingPraposalflow>
                    </Col>
                </Row>
            </Container> : <WalletText/>}
        </>
    );
}
