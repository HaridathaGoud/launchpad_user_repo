import React, { useEffect, useState } from "react";
import InformationPanel from "./informationPanel";
import Proposal from "./view";
import { useParams } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import TestingPraposalflow from "./publishPraposalView";
import { useAccount } from "wagmi";
import { getCustomerDetails } from "../../../reducers/authReducer";
import ProjectViewTabs from "../projecttabs";
import ProposalResults from "./results";
import PublishProposalShimmer from "../shimmers/publishproposalshimmer";
import ProposalTabs from "./tabs";
import { get } from "../../../utils/api";
import { store } from "../../../store";
import BreadCrumb from "../../../ui/breadcrumb";
import TrendingProjects from "../../staking/trendingCarousel";
import { setError } from "../../../reducers/layoutReducer";

const ProposalView=()=>{
  const params = useParams();
  const dispatch = useDispatch();
  const user = store.getState().auth;
  const { isConnected } = useAccount();
  const [loader, setLoader] = useState(false);
  const selectedDaoData = useSelector(
    (state: any) => state?.oidc?.fetchSelectingDaoData
  );
  const [pjctInfo, setPjctInfo] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      getPjctDetails();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const getPjctDetails = async () => {
    if (params?.pid) {
      setLoader(true);
      const userId =
        user?.user?.id && user?.user?.id != ""
          ? user?.user?.id
          : "00000000-0000-0000-0000-000000000000";
      const res = await get(
        "User/TokenInformation/" + params?.pid + "/" + userId
      )
        .then((res: any) => {
          setPjctInfo(res.data);
        })
        .catch((error: any) => {
          dispatch(setError({ message: error }));
          setLoader(false);
        });
    }
  };

  return (
    <>
      {loading ? (
        <div className="container mx-auto">
          <PublishProposalShimmer />
        </div>
      ) : (
        <>
          {isConnected && (
            <div className="container mx-auto max-md:px-3 mt-3">
              <TrendingProjects />
              <div className="mt-5 mb-4">
                <BreadCrumb />
                <div className="mb-12 mt-4">
                  {params?.pid && <ProjectViewTabs />}
                </div>
              </div>
              <div className="grid md:grid-cols-12 gap-[30px]">
                <div className="md:col-span-3">
                  <InformationPanel />
                  <div>
                    <ProposalResults pjctInfo={pjctInfo} />
                  </div>
                </div>
                <div className="md:col-span-9">
                  <Proposal pjctInfo={pjctInfo} />
                  <div>
                    <ProposalTabs />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isConnected && (
            <div className="container mx-auto mt-4">
              <div className="grid grid-cols-12 gap-[30px]">
                <div className="col-span-3">
                  <InformationPanel />
                  <ProposalResults />
                </div>
                <div className="col-span-9">
                  <TestingPraposalflow></TestingPraposalflow>
                </div>
              </div>
            </div>
          )}
        </>
      )}
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
}
const connectDispatchToProps = (dispatch: any) => {
  return {
    customers: (address: any, callback: any) => {
      dispatch(getCustomerDetails(address, callback));
    },
  };
};
export default connect(null, connectDispatchToProps)(ProposalView);