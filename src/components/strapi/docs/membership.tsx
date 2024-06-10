import React from 'react';

function Membership({data}) {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes?.projects?.Membership}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TieredMembership}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TieredMembershiptxt}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.RewardsIncentives }</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.RewardsIncentives1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.RewardsIncentives2}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.RewardsIncentives3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.GovernanceParticipation}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.GovernanceParticipation1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.GovernanceParticipation2}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.RecognitionPrestige}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.RecognitionPrestige1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.RecognitionPrestige2}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.SupportNetworking}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.SupportNetworking1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.SupportNetworking2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.EarlyAccess}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.EarlyAccess1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.EarlyAccess2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.ContributionRecognition}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.ContributionRecognition1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.ContributionRecognition2}</p>

        </div>
      </div>
    ))}

  </div>
  );
}

export default Membership;