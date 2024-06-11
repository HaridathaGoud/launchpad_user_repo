import React from 'react'

export const GoldTier = ({data}) => {
  return (
    <div>
      {data?.data?.map((item: any) => (
        <div className="">
          <div>
            <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
            <div className='flex items-center gap-3  mt-4'>
            <p className='text-2xl text-secondary font-semibold'>{item.attributes?.tiers?.GoldTier}</p>
            <span className='bg-[#EDE5D0] px-3 py-[2px] rounded-3xl text-[#A67D13] text-xs font-semibold'>{item.attributes?.tiers?.GoldTierbadge}</span>
             </div>
            <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.Positiongold}</h2>
            <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.tiers?.PositionGoldtxt}</li>           
             </ul>
            <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.CriteriaGold}</h2>
            <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.tiers?.CriteriaGoldlist1}</li>           
             <li >{item.attributes?.tiers?.CriteriaGoldlist2}</li>           
             <li >{item.attributes?.tiers?.CriteriaGoldlist3}</li>           
             </ul>           
            <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.GoldBenefits}</h2>
            <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.tiers?.GoldBenefits1}</li>           
             <li >{item.attributes?.tiers?.GoldBenefits2}</li>           
             <li >{item.attributes?.tiers?.GoldBenefits3}</li>           
             <li >{item.attributes?.tiers?.GoldBenefits4}</li>           
             <li >{item.attributes?.tiers?.GoldBenefits5}</li>           
             <li >{item.attributes?.tiers?.GoldBenefits6}</li>           
             <li >{item.attributes?.tiers?.GoldBenefits7}</li> 
             </ul>  
           
            <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.GoldEngagementOpportunities}</h2>
            <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
              <li>{item.attributes?.tiers?.GoldEngagementtxt}</li>
            </ul>
            <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.GoldPath}</h2>
            <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
              <li>{item.attributes?.tiers?.GoldPathtxt}</li>
            </ul>
          </div>
        </div>
      ))}

    </div>
  )
}
