import React from 'react';

function RewardsPlatformTokens({data}) {  
  return (
    <div>
      {data?.data?.map((item:any) => (
        <div className="">         
           <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes?.stake?.Rewards}</h1> 
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.stake?.rewarddesc}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes?.stake?.StakingRewards}</h3>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.stake?.StakingRewardstext}</p>
              <div>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.miningrewards}</h2>
                <ol className='  text-base-200 leading-8 ml-5'>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes?.stake?.miningrewardstext}</span></li>
                </ol>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.ParticipationRewards}</h2>
                <ol className='  text-base-200 leading-8 ml-5'>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes?.stake?.ParticipationRewardstxt}</span></li>
                </ol>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.ReferralRewards}</h2>
                <ol className='  text-base-200 leading-8 ml-5'>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes?.stake?.ReferralRewardstxt}</span></li>
                </ol>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.DeveloperRewards}</h2>
                <ol className='  text-base-200 leading-8 ml-5'>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes?.stake?.DeveloperRewardstext}</span></li>
                </ol>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.UserOwnership}</h2>
                <ol className='  text-base-200 leading-8 ml-5'>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes?.stake?.UserOwnershiptxt}</span></li>
                </ol>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.Interoperability}</h2>
                <ol className='  text-base-200 leading-8 ml-5'>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes?.stake?.Interoperabilitytxt}</span></li>
                </ol>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.SecurityPrivacy}</h2>
                <ol className='  text-base-200 leading-8 ml-5'>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes?.stake?.SecurityPrivacytxt}</span></li>
                </ol>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes?.stake?.CommunityGovernance}</h2>
                <ol className='  text-base-200 leading-8 ml-5'>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes?.stake?.CommunityGovernancetxt}</span></li>
                </ol>
              </div>
             <img src={item.attributes?.rewardimg?.data?.attributes.url} alt="" width='' className='mt-7' />

             </div>    
        </div>       
      ))}
    </div>
  );
}

export default RewardsPlatformTokens;