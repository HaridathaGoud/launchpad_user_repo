import React from 'react'

export const SilverTier = ({ data }) => {
  return (
    <div>
      {data?.data?.map((item: any) => (
        <div className="">
          <div>
            <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.SilverTier}</p>
            <span>{item.attributes?.tiers?.silvertierbadge}</span>
            <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes?.tiers?.SilverTierdesc}</h3>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaSilverTier}</p>

            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaSilverTierlist1}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaSilverTierlist2}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaSilverTierlist3}</p>

            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.SilverBenefits}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.SilverBenefits1}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.SilverBenefits2}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.SilverBenefits3}</p>

            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.SilverBenefits4}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.SilverBenefits5}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.SilverBenefits6}</p>

            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.EngagementOpportunities}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.EngagementOpportunities1}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.EngagementOpportunities2}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PathHigherTiers}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PathHigherTiersdesc}</p>
          </div>
        </div>
      ))}

    </div>
  )
}
