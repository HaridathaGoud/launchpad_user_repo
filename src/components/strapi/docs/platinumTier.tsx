import React from 'react'

export const PlatinumTier = ({data}) => {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
          <div className='flex items-center gap-3  mt-4'>
          <p className='text-2xl text-secondary font-semibold'>{item.attributes?.tiers?.PlatinumTier}</p>
          <span className='bg-[#E3F8FF] px-3 py-[2px] rounded-3xl text-[#035388] text-xs font-semibold'>{item.attributes?.tiers?.PlatinumTierbadge}</span>
          </div>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.PlatinumTierdesc}</p>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.positionPlatinumTier}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.tiers?.PositionPlatinumTiertxt}</li>           
             </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.CriteriaPlatinum}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.tiers?.CriteriaPlatinumlist1}</li>           
             <li >{item.attributes?.tiers?.CriteriaPlatinumlist2}</li>           
             <li >{item.attributes?.tiers?.CriteriaPlatinumlist3}</li>           
             </ul>         
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.PlatinumBenefits}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.tiers?.PlatinumBenefits1}</li>           
             <li >{item.attributes?.tiers?.PlatinumBenefits2}</li>           
             <li >{item.attributes?.tiers?.PlatinumBenefits3}</li>           
             <li >{item.attributes?.tiers?.PlatinumBenefits4}</li>           
             <li >{item.attributes?.tiers?.PlatinumBenefits5}</li>           
             <li >{item.attributes?.tiers?.PlatinumBenefits6}</li>           
             <li >{item.attributes?.tiers?.PlatinumBenefits7}</li>           
             <li >{item.attributes?.tiers?.PlatinumBenefits8}</li> 
             </ul>            
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.platinumengagement}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.tiers?.platinumengagement1}</li>
            <li>{item.attributes?.tiers?.platinumengagement2}</li>
          </ul>          
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.PathDiamondTier}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.tiers?.PathDiamondTiertxt}</li>
          </ul>    
        </div>
      </div>
    ))}

  </div>
  )
}
