import React from 'react';

function AboutDaos({data}) {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.daos?.WhatDAOs}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.daodesc}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.KeyFeaturesDAOs}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.Decentralization }</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.Decentralizationtxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.Autonomy}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.Autonomytxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.Transparency}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.Transparencytxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.SmartContracts}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.SmartContracts1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.SmartContracts2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.TokenEnthusiasts}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.TokenEnthusiaststxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalListing}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalListingdesc}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalListing1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalListing2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalListing3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalListing4}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.Benefitsofdaos}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.TrustlessCollaboration}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.TrustlessCollaborationtxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.GlobalParticipation}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.GlobalParticipationtxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ReducedOperational}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ReducedOperationaltxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.EnhancedSecurity}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.EnhancedSecuritytxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ChallengesDAOs}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.LegalRegulatory}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.LegalRegulatorytxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.CodeVulnerability}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.CodeVulnerabilitytxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.Governance}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.Governancetxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ChallengesDAOsdesc}</p>
        </div>
      </div>
    ))}
  </div>
  );
}

export default AboutDaos;