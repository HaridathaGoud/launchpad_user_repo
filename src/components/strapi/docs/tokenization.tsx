import React from 'react';
function Tokenization({data}) {
  return (
    <div>
    {data?.data?.map((item: any) => (
      <div className="">
        <div>
          <h1 className='text-2xl font-semibold text-secondary'>{item.attributes?.projects?.Tokenization}</h1>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.ProjectName}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.projects?.ProjectName1}</li>           
             <li >{item.attributes?.projects?.ProjectName2}</li>          
          </ul>        
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.Listing}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.projects?.ListingTime}</li> 
          </ul>  
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.TokenInformation}</h2>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
             <li >{item.attributes?.projects?.TokenInformation1}</li> 
             <li >{item.attributes?.projects?.TokenInformation2}</li> 
             <li >{item.attributes?.projects?.TokenInformation3}</li> 
             <li >{item.attributes?.projects?.TokenInformation4}</li> 
             <li >{item.attributes?.projects?.TokenInformation5}</li> 
          </ul> 
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.TeamSection}</h2>         
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.CastCrew}</p>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.projects?.CastCrew1}</li>
            <li>{item.attributes?.projects?.CastCrew2}</li>
            <li>{item.attributes?.projects?.CastCrew3}</li>
            <li>{item.attributes?.projects?.CastCrew4}</li>
            <li>{item.attributes?.projects?.CastCrew5}</li>
            <li>{item.attributes?.projects?.CastCrew6}</li>
            <li>{item.attributes?.projects?.CastCrew7}</li>
          </ul>  
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.TokenSale}</h2>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.TokenPrice}</p>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.projects?.TokenPrice1}</li>
            <li>{item.attributes?.projects?.TokenPrice2}</li>
          </ul>          
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.ClaimSlots}</p>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.projects?.ClaimSlotstxt}</li>           
          </ul>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.vestingtime}</p>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.projects?.vestingtimetxt}</li>           
          </ul>
          <h2 className='text-base text-secondary font-semibold mt-4'>{item.attributes?.projects?.SaleRounds}</h2>
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.Round1}</p>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.projects?.Round1starttime}</li>           
            <li>{item.attributes?.projects?.Round1endtime}</li>           
          </ul>          
          <p className='text-base text-base-200 font-normal mt-4'>{item.attributes?.projects?.Round2}</p>
          <ul className='list-disc mt-2 text-base-200 ml-5 leading-8'>
            <li>{item.attributes?.projects?.Round2starttime}</li>           
            <li>{item.attributes?.projects?.Round2endtime}</li>          
          </ul>         
        </div>
      </div>
    ))}
  </div>
  );
}

export default Tokenization;