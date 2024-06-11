import React from 'react'

const SelectERC20token = ({data}) => {
  return (
    
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes?.ApplyIVO?.selectERC20token}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ercdesc}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ProjectName}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ProjectName1 }</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ProjectName2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ListingInformation}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ListingInformation1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TokenInformation}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TokenImage}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.BannerImage}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TokenContract}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TokenSymbol}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TokenDetails}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TeamSection}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.CastandCrew}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.CastandCrewname}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.CastandCrewrole}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.CastandCrewbio}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.CastandCrewsmm}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.insta}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.fb}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.twitter}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TokenSaleInformation}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.TokenPrice}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.PrivateSale}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.PublicSale}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ClaimSlots}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.ClaimSlots1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.VestingTime}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.ApplyIVO?.VestingTime1}</p>
        </div>
      </div>
    ))}
  </div>
  )
}

export default SelectERC20token