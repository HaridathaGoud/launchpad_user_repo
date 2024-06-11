import React from 'react'

export const GoldTier = ({data}) => {
  return (
    <div>
      {data?.data?.map((item: any) => (
        <div className="">
          <div>
            <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldTier}</p>
            <span>{item.attributes?.tiers?.GoldTierbadge}</span>

            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.Positiongold}</p>

            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PositionGoldtxt}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaGold}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaGoldlist1}</p>

            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaGoldlist2}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaGoldlist3}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldBenefits}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldBenefits2}</p>

            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldBenefits3}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldBenefits4}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldBenefits5}</p>

            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldBenefits6}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldBenefits7}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldEngagementOpportunities}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldEngagementtxt}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldPath}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.GoldPathtxt}</p>
          </div>
        </div>
      ))}

    </div>
  )
}
