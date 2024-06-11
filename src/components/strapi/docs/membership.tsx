import React from 'react';

function Membership({data}) {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.projects?.Membership}</h1>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.TieredMembership}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.projects?.TieredMembershiptxt}</li>           
          </ul>   
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.RewardsIncentives }</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.projects?.RewardsIncentives1}</li>           
             <li >{item.attributes?.projects?.RewardsIncentives2}</li>           
             <li >{item.attributes?.projects?.RewardsIncentives3}</li>           
          </ul>   
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.GovernanceParticipation}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.projects?.GovernanceParticipation1}</li>           
             <li >{item.attributes?.projects?.GovernanceParticipation2}</li>           
          </ul> 
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.RecognitionPrestige}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.projects?.RecognitionPrestige1}</li>           
             <li >{item.attributes?.projects?.RecognitionPrestige2}</li>           
          </ul>   
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.SupportNetworking}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.projects?.SupportNetworking1}</li>           
             <li >{item.attributes?.projects?.SupportNetworking2}</li>           
          </ul>   
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.EarlyAccess}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.projects?.EarlyAccess1}</li>           
             <li >{item.attributes?.projects?.EarlyAccess2}</li>           
          </ul>  
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.ContributionRecognition}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.projects?.ContributionRecognition1}</li>           
             <li >{item.attributes?.projects?.ContributionRecognition2}</li>           
          </ul>   
        </div>
      </div>
    ))}

  </div>
  );
}

export default Membership;