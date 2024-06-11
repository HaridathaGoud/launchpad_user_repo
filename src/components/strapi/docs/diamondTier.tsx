import React from 'react'

export const DiamondTier = ({data}) => {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
          <div className='flex items-center gap-3  mt-4'>
          <p className='text-2xl text-secondary font-semibold'>{item.attributes?.tiers?.DiamondTier}</p>
          <span className='bg-[#FFE3EC] px-3 py-[2px] rounded-3xl text-[#620042] text-xs font-semibold'>{item.attributes?.tiers?.DiamondTierbadge}</span>
          </div>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.DiamondTierdesc}</p>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.PositionDiamondTier}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.tiers?.PositionDiamondTiertxt}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.CriteriaDiamond}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.tiers?.CriteriaDiamond1}</li>           
             <li >{item.attributes?.tiers?.CriteriaDiamond2}</li>           
             <li >{item.attributes?.tiers?.CriteriaDiamond3}</li>           
          </ul>        
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.Diamondbenefits}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.tiers?.Diamondbenefits1}</li>           
             <li >{item.attributes?.tiers?.Diamondbenefits2}</li>           
             <li >{item.attributes?.tiers?.Diamondbenefits3}</li>           
             <li >{item.attributes?.tiers?.Diamondbenefits4}</li>           
             <li >{item.attributes?.tiers?.Diamondbenefits5}</li>           
             <li >{item.attributes?.tiers?.Diamondbenefits6}</li>           
             <li >{item.attributes?.tiers?.Diamondbenefits7}</li>           
             <li >{item.attributes?.tiers?.Diamondbenefits8}</li>           
          </ul>        
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.DaimondEngagement}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.tiers?.DaimondEngagement1}</li>
            <li>{item.attributes?.tiers?.DaimondEngagement2}</li>
          </ul>         
        </div>
      </div>
    ))}

  </div>
  )
}
