import React from "react";
import ProposalCards from "./proposals";
import { connect } from "react-redux";
import DaoLeftPanel from "./leftPanel";
import BreadCrumb from "../../../ui/breadcrumb";

const Proposals = (props:any) => {
  return (
    <div className="container mx-auto max-sm:px-3 mt-3">
     {props.showBreadcrumb && <BreadCrumb/>}
      <div className="container mx-auto md:grid lg:grid-cols-4 gap-7 mt-8">
        <div className="shrink-0">
          <DaoLeftPanel pjctInfo={props?.pjctInfo} />
        </div>
        <div className="mt-5 md:mt-0 lg:col-span-3">
          <ProposalCards pjctInfo={props?.pjctInfo} />
          <div className="mt-10">{/* <Discussions/> */}</div>
        </div>
      </div>
    </div>
  );
};
const connectStateToProps = ({ oidc }: any) => {
  return { oidc: oidc };
};
export default connect(connectStateToProps)(Proposals);
