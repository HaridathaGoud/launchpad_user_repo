import React from "react";
import DaoResultsShimmer from "../daoResultsShimmer";
import InformationPanelShimmer from "../InformationPanelShimmer";
import ProposalViewShimmer from "../proposalViewShimmer";

const ProposalPageShimmer = () => {
  return (
    <div className="container mx-auto px-3 lg:px-0 mt-3">
      <div className="mt-5 mb-4"></div>
      <div className="md:grid md:grid-cols-12 gap-[30px]">
        <div className=" md:col-span-12 lg:col-span-3">
          <InformationPanelShimmer />
        </div>
        <div>
          <DaoResultsShimmer />
        </div>
      </div>
      <div className="md:col-span-12 lg:col-span-9 max-sm:mt-4">
        <ProposalViewShimmer />
        <div>
          <ProposalViewShimmer />
        </div>
      </div>
    </div>
  );
};

export default ProposalPageShimmer;
