import React from "react";
import Moment from "react-moment";
const PublishProposal = ({ proposalDetails }) => {
  return (
    <div className="">
      <div className="">
        <span className="mb-0 me-2 text-base font-semibold text-secondary">
          {proposalDetails?.proposal}
        </span>
        <p className="mt-2">{proposalDetails?.summary}</p>
      </div>
      <hr className="my-3" />
      <div>
        <h3 className="mb-0 me-2 text-base font-semibold text-secondary">Proposal Image</h3>
        <img src={proposalDetails?.image.url} alt={proposalDetails?.proposal}/>
      </div>
      <hr className="my-3" />
      <div className="">
        <h1 className="mb-2 text-base font-semibold text-secondary">Voting </h1>
        <div>
          <p className="text-sm text-secondary opacity-50 mb-2">
            Your proposal options
          </p>
          <div className="flex items-center flex-wrap gap-3">
            {proposalDetails?.options?.map((item, index) => (
              <p
                className="px-3 rounded-xl py-1 text-secondary font-medium bg-slate-200"
                key={item.options}
              >
                {item?.index || index + 1}. {item?.options}
              </p>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="">
        <h3 className="mb-3 text-base font-semibold text-secondary">
          Duration{" "}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-secondary opacity-50">Start Date & Time</p>
          <p className="">
            <Moment local={true} format={"DD/MM/YYYY HH:mm"}>
              {proposalDetails?.startDate}
            </Moment>
          </p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-secondary opacity-50">End Date & Time</p>
          <p className="">
            <Moment local={true} format={"DD/MM/YYYY HH:mm"}>
              {proposalDetails?.endDate}
            </Moment>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublishProposal;
