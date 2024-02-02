import React from 'react';
import ProposalCards from '../createproposal/praposalCards'
import { connect } from "react-redux";
import { getCardsProposalList } from '../proposlaReducer/proposlaReducer';
import ProjectCarousal from '../../dao/projectCarousal';
import BreadCrumb from '../../../../ui/breadcrumb';
import ProjectViewTabs from '../../dao/projecttabs';
import DaoLeftPanel from '../../dao/daoleftpanel';
import aquaman from '../../../../assets/images/aquaman.png';
import BannerCarousel from '../../../../ui/BannerCarousal';
function CommonCreateProposal() {
  const projectCarousel=[
    {url:aquaman,alt:'spider man web series'},
    {url:aquaman,alt:'captain web series'}
  ]
  return (
    <>
   
    <div className="container mx-auto max-sm:px-3 md:mt-3">  
    <BannerCarousel images={projectCarousel} className='h-52' />  
    <div className='mt-5 mb-4'>
  <BreadCrumb/>
  <div className='mb-12 mt-4'>
  <ProjectViewTabs/>
  </div>
  </div> 
     
      <div className='container mx-auto md:grid lg:grid-cols-4 gap-7 mt-14'>
     <div className='shrink-0'>
     <DaoLeftPanel/>     
     </div>
     <div className='mt-5 md:mt-0 lg:col-span-3'>     
      <ProposalCards  />
    <div className='mt-10'>
    {/* <Discussions/> */}
    </div>
     </div>
     </div>
    </div>
    </>
  )
}
const connectStateToProps = ({ oidc }: any) => {
  return { oidc: oidc };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    proposalDetailsList: (pageSize: any, pageNo: any, daoId: any, status: any, search: any, startDate: any, endDate: any) => {
      dispatch(getCardsProposalList(pageSize, pageNo, daoId, status, search, startDate, endDate));
    }
  }
}
export default connect(connectStateToProps, connectDispatchToProps)(CommonCreateProposal);