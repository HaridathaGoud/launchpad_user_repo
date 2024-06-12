import React from 'react';

function AboutDaos({data}) {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.daos?.WhatDAOs}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.daodesc}</p>

          <h1 className='text-2xl font-semibold text-secondary mt-5'>{item.attributes?.daos?.KeyFeaturesDAOs}</h1>

          <h2 className='text-base text-secondary font-semibold mt-4' >{item.attributes?.daos?.Decentralization }</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.Decentralizationtxt}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.Autonomy}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.Autonomytxt}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.Transparency}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.Transparencytxt}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.SmartContracts}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.SmartContracts1}</li>           
             <li >{item.attributes?.daos?.SmartContracts2}</li>           
          </ul>       
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.TokenEnthusiasts}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.TokenEnthusiaststxt}</li>           
          </ul>  
          <h1 className='text-2xl font-semibold text-secondary mt-5'>{item.attributes?.daos?.ProposalListing}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ProposalListingdesc}</p>
          <h2 className='text-base text-secondary font-semibold mt-4' >{item.attributes?.daos?.Decentralization }</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.ProposalListing1}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.Autonomy}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.ProposalListing2}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.Transparency}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.ProposalListing3}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.SmartContracts}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.ProposalListing4}</li>           
          </ul>
          <h1 className='text-2xl font-semibold text-secondary mt-4'>{item.attributes?.daos?.Benefitsofdaos}</h1>

          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.TrustlessCollaboration}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.TrustlessCollaborationtxt}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.GlobalParticipation}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.GlobalParticipationtxt}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.ReducedOperational}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.ReducedOperationaltxt}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.EnhancedSecurity}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.EnhancedSecuritytxt}</li>           
          </ul>
          <h1 className='text-2xl font-semibold text-secondary mt-5'>{item.attributes?.daos?.ChallengesDAOs}</h1>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.LegalRegulatory}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.LegalRegulatorytxt}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.CodeVulnerability}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.CodeVulnerabilitytxt}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.daos?.Governance}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.daos?.Governancetxt}</li>           
          </ul>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.daos?.ChallengesDAOsdesc}</p>
        </div>
      </div>
    ))}
  </div>
  );
}

export default AboutDaos;