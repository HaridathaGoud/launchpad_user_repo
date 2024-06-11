import React from 'react'

export const BronzeTier = ({ data }) => {
  return (

    <div>
      {data?.data?.map((item: any) => (
        <div className="">
          <div>
            <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BronzeTier}</p>
            <span>{item.attributes?.tiers?.BronzeTierbadge}</span>
            <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes?.tiers?.Bronzedesc}</h3>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BronzTierPurpose}</p>

            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.BronzTierPurposetxt}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.StructureLevels}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.StructureLevelstxt}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaAdvancement}</p>
            <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.tiers?.CriteriaAdvancementtxt}</p>

          </div>
        </div>
      ))}

    </div>
  )
}
