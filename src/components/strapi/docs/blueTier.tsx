import React from 'react'

export const BlueTier = ({data}) => {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
          <div className='flex items-center gap-3  mt-4'>
          <p className='text-2xl text-secondary font-semibold'>{item.attributes?.tiers?.BlueDiamondTier}</p>
          <span className='bg-[#E5F0FF] px-3 py-[2px] rounded-3xl text-[#0068FF] text-xs font-semibold'>{item.attributes?.tiers?.BlueDiamondbadge}</span></div>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BlueDiamondTierdesc}</p>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.positionBluedaimond}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.tiers?.positionBluedaimondtxt}</li>
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.CriteriaBlueDiamond}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.tiers?.CriteriaBlueDiamond1}</li>
            <li>{item.attributes?.tiers?.CriteriaBlueDiamond2}</li>
            <li>{item.attributes?.tiers?.CriteriaBlueDiamond3}</li>
          </ul>         
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.BlueDiamondTierBenefits}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
          <li>{item.attributes?.tiers?.BlueDiamondBenefits1}</li>
          <li>{item.attributes?.tiers?.BlueDiamondBenefits2}</li>
          <li>{item.attributes?.tiers?.BlueDiamondBenefits3}</li>
          <li>{item.attributes?.tiers?.BlueDiamondBenefits4}</li>
          <li>{item.attributes?.tiers?.BlueDiamondBenefits5}</li>
          <li>{item.attributes?.tiers?.BlueDiamondBenefits6}</li>
          <li>{item.attributes?.tiers?.BlueDiamondBenefits7}</li>
          <li>{item.attributes?.tiers?.BlueDiamondBenefits8}</li>
          </ul>          
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.BlueDiamondEngagement}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.tiers?.BlueDiamondEngagement1}</li>
            <li>{item.attributes?.tiers?.BlueDiamondEngagement2}</li>
          </ul>          
        </div>
      </div>
    ))}

  </div>
  )
}
