import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Status from '../proposal/createproposal/status';
import VotingDao from './testdao';
import Voters from './votersgrid';
import {  useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import TestingPraposalflow from '../proposal/createproposal/publishPraposalView';
import { useAccount} from 'wagmi';
import {getCustomerDetails } from '../../../reducers/authReducer';
import { connect } from "react-redux";
import ProjectCarousal from '../dao/projectCarousal';
import BreadCrumb from '../../../ui/breadcrumb';
import ProjectViewTabs from '../dao/projecttabs';
import DaoCurrentResults from '../proposal/createproposal/daocurrentresults';
import Discussions from '../proposal/createproposal/discussions';
import BannerCarousel from '../../../ui/BannerCarousal';
import aquaman from '../../../assets/images/aquaman.png';
  function Voting() {
    const router = useNavigate();
    const dispatch = useDispatch();
    const { isConnected } = useAccount();
    const selectedDaoData = useSelector((state: any) => state?.oidc?.fetchSelectingDaoData);
    const handleback =()=>{
        router(`/dao/${selectedDaoData?.daoId}`)
        dispatch({ type: 'savevoterddata', payload: null });
        dispatch({ type: 'proposarDetailas', payload: null });
    }
    const projectCarousel=[
      {url:aquaman,alt:'spider man web series'},
      {url:aquaman,alt:'captain web series'}
    ]
    return (
        <>
        {isConnected && <div className='container mx-auto max-md:px-3'>
        <BannerCarousel images={projectCarousel} className='h-52' />
          <div className='mt-5 mb-4'>
            <BreadCrumb />
            <div className='mb-12 mt-4'>
              <ProjectViewTabs />
            </div>
          </div>
          <div className='md:grid md:grid-cols-12 gap-[30px]'>
            <div className='md:col-span-3'>
              <Status></Status>
              <div>
                <DaoCurrentResults/>
              </div>
            </div>
            <div className='md:col-span-9'>
              <VotingDao></VotingDao>
              <div>
              <Voters></Voters>
              </div>
              <div>
                <Discussions/>
              </div>
            </div>
          </div>
        
        </div>}
        {!isConnected && <div className='container mx-auto'>
          <span className='mb-0 back-text c-pointer' onClick={handleback}>Voting</span>

          <div className='grid grid-cols-12 gap-[30px]'>
            <div className='col-span-3'>
              <Status></Status>
              <DaoCurrentResults/>
            </div>
            <div className='col-span-9'>
              <TestingPraposalflow></TestingPraposalflow>
            </div>
          </div>
        </div>}
        </>
    );
}
const connectDispatchToProps = (dispatch: any) => {
    return {
      customers: (address:any,callback:any) => {
        dispatch(getCustomerDetails(address,callback));
      },
    }
  }
   export default connect(null, connectDispatchToProps)(Voting);