import React from 'react';

function RewardsPlatformTokens({data}) {  

  return (
    <div>
      {data?.data?.map((item:any) => (
        <div className="">         
           <div>
              <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.stake?.Rewards}</h1> 
              <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.stake?.rewarddesc}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes?.stake?.StakingRewards}</h3>
              <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.stake?.StakingRewardstext}</p>
          
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.miningrewards}</h2>
                  <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.stake?.miningrewardstext}</p>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.ParticipationRewards}</h2>
                  <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.stake?.ParticipationRewardstxt}</p>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.ReferralRewards}</h2>
                  <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.stake?.ReferralRewardstxt}</p>             
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.DeveloperRewards}</h2>
                  <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.stake?.DeveloperRewardstext}</p>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.UserOwnership}</h2>
                  <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.stake?.UserOwnershiptxt}</p>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.Interoperability}</h2>
                  <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.stake?.Interoperabilitytxt}</p>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.SecurityPrivacy}</h2>
                  <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.stake?.SecurityPrivacytxt}</p>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.CommunityGovernance}</h2>
                  <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.stake?.CommunityGovernancetxt}</p>
                  <ul className='list-disc ml-5 leading-8 text-text-base-200 mt-4'>
                    <li>{item.attributes?.stake?.rewardslist}</li>
                    <li>{item.attributes?.stake?.rewardslist2}</li>
                  </ul>
              </div>
             <img src={item.attributes?.rewardimg?.data?.attributes.url} alt="" width='' className='mt-7' />

       
        </div>       
      ))}
    </div>
  );
}

export default RewardsPlatformTokens;