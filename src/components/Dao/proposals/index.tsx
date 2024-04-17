import React, { useEffect } from "react";
import ProposalCards from "./proposals";
import { connect } from "react-redux";
import DaoLeftPanel from "./leftPanel";
import BreadCrumb from "../../../ui/breadcrumb";
import { getDaoDetails } from "../../../reducers/proposlaReducer";
import { useParams } from "react-router-dom";
const Proposals = (props:any) => {
  const {projectId}=useParams()
  useEffect(()=>{
    props.getDaoDetails({id:projectId || props.pjctInfo?.id});
  },[])
  return (
    <div className="container mx-auto px-3 lg:px-0 mt-3">
     {props.showBreadcrumb && <BreadCrumb/>}
      <div className={` ${props.from==='project' ?'':"container mx-auto md:grid lg:grid-cols-4 gap-7 mt-8"}`}>
        <div className="shrink-0">
          <DaoLeftPanel pjctInfo={props?.pjctInfo} from={props.from} showHeader={props.showHeader}/>
        </div>
        <div className="mt-5 md:mt-0 lg:col-span-3">
          <ProposalCards pjctInfo={props?.pjctInfo} from={props.from} />
          {/* <div className="mt-10"><Discussions/></div> */}
        </div>
      </div>
    </div>
  );
};
const connectStateToProps = ({ oidc }: any) => {
  return { oidc: oidc };
};
const connectDispatchToProps = (dispatch: any) => {
  return {
    getDaoDetails: (information: any) => {
      dispatch(getDaoDetails(information));
    }
  };
};
export default connect(connectStateToProps,connectDispatchToProps)(Proposals);
