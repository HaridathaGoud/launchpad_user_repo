import React from 'react';
function Tokenization({data}) {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.projects?.Tokenization}</h1>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.ProjectName}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.ProjectName1}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.ProjectName2 }</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.Listing}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.ListingTime}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TokenInformation}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TokenInformation1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TokenInformation2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TokenInformation3}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TokenInformation4}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TokenInformation5}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TeamSection}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.CastCrew}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.CastCrew1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.CastCrew2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.CastCrew3}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.CastCrew4}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.CastCrew5}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.CastCrew6}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.CastCrew7}</p>

          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TokenSale}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TokenPrice}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TokenPrice1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TokenPrice2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.ClaimSlots}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.ClaimSlotstxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.vestingtime}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.vestingtimetxt}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.SaleRounds}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.Round1}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.Round1starttime}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.Round1endtime}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.Round2}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.Round2starttime}</p>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.Round2endtime}</p>
        </div>
      </div>
    ))}
  </div>
  );
}

export default Tokenization;