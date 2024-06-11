import React from 'react'

export const SilverTier = ({ data }) => {
  return (
    <div>
      {data?.data?.map((item: any) => (
        <div className="">
          <div>
            <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
            <div className='flex items-center gap-3  mt-4'>
            <p className='text-2xl text-secondary font-semibold'>{item.attributes?.tiers?.SilverTier}</p>
            <span className='bg-[#FFE3EC] px-3 py-[2px] rounded-3xl text-[#620042] text-xs font-semibold'>{item.attributes?.tiers?.silvertierbadge}</span>
            </div>
            <p className='text-base-200 text-base font-normal mt-4'>{item.attributes?.tiers?.SilverTierdesc}</p>
            <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.CriteriaSilverTier}</h2>
             <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.tiers?.CriteriaSilverTierlist1}</li>
            <li >{item.attributes?.tiers?.CriteriaSilverTierlist2}</li>
            <li >{item.attributes?.tiers?.CriteriaSilverTierlist3}</li>
             </ul>
            <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.SilverBenefits}</h2>
            <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.tiers?.SilverBenefits1}</li>
            <li >{item.attributes?.tiers?.SilverBenefits2}</li>
            <li >{item.attributes?.tiers?.SilverBenefits3}</li>
            <li>{item.attributes?.tiers?.SilverBenefits4}</li>
            <li>{item.attributes?.tiers?.SilverBenefits5}</li>
            <li>{item.attributes?.tiers?.SilverBenefits6}</li>
             </ul>              
            <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.EngagementOpportunities}</h2>
            <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
              <li>{item.attributes?.tiers?.EngagementOpportunities1}</li>
              <li>{item.attributes?.tiers?.EngagementOpportunities2}</li>
            </ul>
           
            <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.PathHigherTiers}</h2>
            <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
              <li>{item.attributes?.tiers?.PathHigherTiersdesc}</li>
            </ul>
          </div>
        </div>
      ))}

    </div>
  )
}
