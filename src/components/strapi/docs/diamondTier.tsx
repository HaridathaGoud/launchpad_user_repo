import React from 'react'

export const DiamondTier = ({data}) => {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.DiamondTier}</p>
          <span>{item.attributes?.tiers?.DiamondTierbadge}</span>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.DiamondTierdesc}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PositionDiamondTier}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PositionDiamondTiertxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaDiamond}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaDiamond1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaDiamond2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaDiamond3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.Diamondbenefits}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.Diamondbenefits1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.Diamondbenefits2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.Diamondbenefits3}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.Diamondbenefits4}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.Diamondbenefits5}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.Diamondbenefits6}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.Diamondbenefits7}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.Diamondbenefits8}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.DaimondEngagement}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.DaimondEngagement1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.DaimondEngagement2}</p>
        </div>
      </div>
    ))}

  </div>
  )
}
