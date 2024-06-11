import React from 'react'

export const BlueTier = ({data}) => {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondTier}</p>
          <span>{item.attributes?.tiers?.BlueDiamondbadge}</span>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondTierdesc}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.positionBluedaimond}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.positionBluedaimondtxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaBlueDiamond}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaBlueDiamond1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaBlueDiamond2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaBlueDiamond3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondTierBenefits}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondBenefits1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondBenefits2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondBenefits3}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondBenefits4}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondBenefits5}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondBenefits6}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondBenefits7}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondBenefits8}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondEngagement}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondEngagement1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondEngagement2}</p>
        </div>
      </div>
    ))}

  </div>
  )
}
