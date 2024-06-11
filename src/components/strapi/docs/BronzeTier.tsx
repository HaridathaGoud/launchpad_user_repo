import React from 'react'

export const BronzeTier = ({ data }) => {
  return (

    <div>
      {data?.data?.map((item: any) => (
        <div className="">
          <div>
            <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.tiers?.Tiers}</h1>
            <div className='flex items-center gap-3  mt-4'>
            <h1 className='text-2xl text-secondary font-semibold'>{item.attributes?.tiers?.BronzeTier}</h1>
            <span className='bg-[#FBF1E9] px-3 py-[2px] rounded-3xl text-[#DA7821] text-xs font-semibold'>{item.attributes?.tiers?.BronzeTierbadge}</span>
            </div>
            <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.tiers?.Bronzedesc}</p>
            <p className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.BronzTierPurpose}</p>

            <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.tiers?.BronzTierPurposetxt}</p>
            <p className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.StructureLevels}</p>
            <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.tiers?.StructureLevelstxt}</p>
            <p className='text-base text-secondary font-semibold mt-4'>{item.attributes?.tiers?.CriteriaAdvancement}</p>
            <p className='text-base text-base-200 font-normal mt-3'>{item.attributes?.tiers?.CriteriaAdvancementtxt}</p>

          </div>
        </div>
      ))}

    </div>
  )
}
