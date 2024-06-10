import React from 'react'

export const PlatinumTier = ({data}) => {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumTier}</p>
          <span>{item.attributes?.tiers?.PlatinumTierbadge}</span>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumTierdesc}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.positionPlatinumTier}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PositionPlatinumTiertxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaPlatinum}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaPlatinumlist1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaPlatinumlist2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaPlatinumlist3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumBenefits}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumBenefits1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumBenefits2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumBenefits3}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumBenefits4}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumBenefits5}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumBenefits6}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumBenefits7}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumBenefits8}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.platinumengagement}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.platinumengagement1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.platinumengagement2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PathDiamondTier}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PathDiamondTiertxt}</p>
        </div>
      </div>
    ))}

  </div>
  )
}
