import React from 'react';

function UnStakingPlatform({data}) {
  return (
    <div>
      {data?.data?.map((item) => (<>
        <div className="">         
           <div>
              <h1 className='text-2xl font-semibold text-secondary'>{item.attributes.stake.unstake}</h1> 
              <p className='text-base text-base-200 font-normal mt-3'>{item.attributes.stake.unstaketext}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.unstakedesc}</h3>
              <p className='text-base text-base-200 font-normal mt-3'>{item.attributes.stake.unstakedesctext}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.UserUnderstanding}</h3>
              <p className='text-base text-base-200 font-normal mt-3'>{item.attributes.stake.UserUnderstandingtext}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.Flexibility}</h3>
              <p className='text-base text-base-200 font-normal mt-3'>{item.attributes.stake.Flexibilitytext}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.Liquidity}</h3>
              <p className='text-base text-base-200 font-normal mt-3'>{item.attributes.stake.Liquiditytext}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.usercentic}</h3>
              <p className='text-base text-base-200 font-normal mt-3'>{item.attributes.stake.usercentictext}</p>
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
                 <li>{item.attributes.stake.unstakelist}</li>
                 <li>{item.attributes.stake.unstakelist2}</li>
             </ul>
             <img src={item.attributes.unstakeimg.data.attributes.url} alt="" width='' className='mt-7' />

             </div>    
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default UnStakingPlatform;