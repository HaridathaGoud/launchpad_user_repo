import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import success from '../../../../assets/images/thank-you.svg';
import {  useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import StartedSteps from './steps';
import { useAccount } from 'wagmi';
import WalletText from '../../../../utils/walletText';

export default function Success() {
    const params = useParams()
    const { isConnected,address } = useAccount();  

    const router = useNavigate();
    const handleRedirect =()=>{
        router(`/dao/proposalview/${params.id}`)
    }
    return (
        <>
        {isConnected ? 
        <>
            <Container className='dao-container'>                       
            <h4 > <Link to={`/dao/${params.id}/createpraposal`} className='mb-0 back-text text-black'> Create Proposal  </Link></h4>
            <hr className="custom-hr" />
          
                <Row className=''>
                <Col md={4}> 
                    <StartedSteps formSteps={100} stepsTwo={2} stepsOne={1} stepsThree={3} number={3}/>
                    </Col>
                    <Col md={8}> 
                   <div className='voting-card text-center success-section ms-md-4'>
                      <img src={success}></img>
                      <h1 className='testing-title'>Thank You</h1>
                      <p>Your proposal is submitted successfully!</p>
                      <Button variant="primary" type="submit"  onClick={handleRedirect}>
                     Back to publish proposal summary
                    </Button>
                   </div>
                    </Col>
                </Row>
            </Container>
            </> : <WalletText/>}
        </>
    );
}
