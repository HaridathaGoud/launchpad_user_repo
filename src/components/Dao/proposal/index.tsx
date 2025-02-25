import React, { useEffect } from "react";
import InformationPanel from "./informationPanel";
import Proposal from "./view";
import { useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import ProjectDetailTabs from "../../projects/projectDetailTabs";
import ProposalResults from "./results";
import ProposalTabs from "./tabs";
import BreadCrumb from "../../../ui/breadcrumb";
import {
  clearCustomerVoteStatus,
  clearProposalDetails,
  clearVoters,
  getCustomerVoteStatus,
  getProposalDetails,
} from "../../../reducers/votingReducer";

const ProposalView = (props) => {
  const params = useParams();
  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    props.getProposalDetails?.(
      params.proposalId,
      user.id || "00000000-0000-0000-0000-000000000000"
    );
    if(user?.id){
      props.getCustomerVoteStatus?.(
        params.proposalId,
        user.id
      );
    }else{
      props.clearCustomerVoteStatus?.();
    }
    return () => {
      props.clearVotersList();
      props.clearCustomerVoteStatus();
      props.clearProposalDetails()
    };
  }, [user?.id,params.proposalId]);

  return (
    <>
        <div className="container mx-auto px-3 lg:px-0 mt-3">
          <div className="mt-5 mb-4">
            <BreadCrumb />  
          </div>
          {props?.showTabs &&<div className="sticky top-[73px] z-10 project-detail-tab">
               <ProjectDetailTabs pjctInfo={null} />
            </div>}
            {props?.showTabs && <div className="mb-8"></div>}
          <div className="md:grid md:grid-cols-12 gap-[30px]">
            <div className=" md:col-span-12 lg:col-span-3">
              <InformationPanel />
              <div>
                <ProposalResults/>
              </div>
            </div>
            <div className="md:col-span-12 lg:col-span-9 max-sm:mt-4">
              <Proposal/>
              <div>
                <ProposalTabs />
              </div>
            </div>
          </div>
        </div>
      <>
        {/* <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle"> */}
        {/* <div className="modal-box p-0">
               <div className='p-5'>
               <div className="flex justify-between items-center  mb-5">
               <h3 className="font-semibold text-lg mb-5">Cast your vote</h3>
               <span className={`icon ${styles.closeIcon}`}></span>
               </div>
                <div className='flex justify-between items-center mb-3'>
                    <p className={`text-sm ${styles.lightColor}`}>Choice</p>
                    <p>No</p>
                </div>
                <div className='flex justify-between items-center mb-3'>
                    <p className={`text-sm ${styles.lightColor}`}>DOTT</p>
                    <p>31,272,274 <span className={`icon ${styles.squareArrow}`}></span></p>
                </div>
                <div className='flex justify-between items-center mb-3'>
                    <p className={`text-sm ${styles.lightColor}`}>Your voting power</p>
                    <p>0 Safran</p>
                </div>
                <div className={`py-4 px-3 flex gap-3 ${styles.popBg}`}>
                    <div>
                    <span className={`icon ${styles.info}`}></span>
                    </div>
                    <div>
                        <p>Oops, it seems you don’t have any voting power at block 31,272,274. <span className='font-semibold text-base cursor-pointer'>Learn more</span><span className={`icon cursor-pointer ${styles.squareArrow}`}></span></p>
                    </div>
                </div>
               </div>
                <div className={`modal-action justify-center py-6 mt-2 ${styles.borderTop}`}>
                    <form method="dialog" className='flex items-center'>
                    <div className='mr-5'> <Button children={'Cancel'} type='cancel' /></div>
                    <Button children={'I agree'} type='secondary' />
                    </form>
                </div>
            </div> */}
        {/* </dialog>  */}

        {/* <div>
          <div className="modal-box p-0">
            <div className='p-5'>
              <div className="flex justify-between items-center  mb-5">
                <h3 className="font-semibold text-lg">Terms Of Service</h3>
                <span className={`icon ${styles.closeIcon}`}></span>
              </div>

              <div className={`py-4 px-3 flex gap-3 ${styles.popBg}`}>
                <div>
                  <span className={`icon ${styles.info}`}></span>
                </div>
                <div>
                  <p>Oops, it seems you don’t have any voting power at block 31,272,274. <span className='font-semibold text-base cursor-pointer'>Learn more</span><span className={`icon cursor-pointer ${styles.squareArrow}`}></span></p>
                </div>
              </div>
              <div className="flex items-center justify-center mt-7 px-10">
                <p className='text-center font-semibold truncate'>docs.safran.store/library/terms-a...</p><span className={`icon cursor-pointer shrink-0 ${styles.squareArrow}`}></span>
              </div>
            </div>
            <div className={`modal-action justify-center py-6 mt-2 ${styles.borderTop}`}>
              <form method="dialog" className='flex items-center'>
                <div className='mr-5'> <Button children={'Cancel'} type='cancel' /></div>
                <Button children={'Confirm'} type='secondary' />
              </form>
            </div>
          </div>
        </div> */}
      </>
    </>
  );
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    getProposalDetails: (sub: any, custId: any) => {
      dispatch(getProposalDetails(sub, custId));
    },
    getCustomerVoteStatus: (proposalId: any, customerId: any) => {
      dispatch(getCustomerVoteStatus(proposalId, customerId));
    },
    clearVotersList: () => {
      dispatch(clearVoters());
    },
    clearCustomerVoteStatus: () => {
      dispatch(clearCustomerVoteStatus());
    },
    clearProposalDetails: () => {
      dispatch(clearProposalDetails());
    },
  };
};
export default connect(null, connectDispatchToProps)(ProposalView);
