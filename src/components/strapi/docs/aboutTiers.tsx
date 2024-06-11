import React from 'react';
function AboutTiers({data}) {
  return (
    <div>
      {data?.data?.map((item) => (<>
        <div className="">         
           <div>
              <h1 className='text-2xl font-semibold text-secondary'>{item.attributes.stake.stakingtitle}</h1> 
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.stake.stakedesc}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.stakefeatures}</h3>
             
             <ul className='my-4 text-base-200 leading-9'>
              <li> <span className='font-medium'>{item.attributes.stake.stakerewards} </span>{item.attributes.stake.stakerewardtext}  </li>
              <li>  <span className='font-medium'>{item.attributes.stake.stakemechanisam}</span> {item.attributes.stake.stakemechtext}</li>
              <li>  <span className='font-medium'>{item.attributes.stake.enhancedengagement}</span> {item.attributes.stake.enhancetext}</li>
              <li>  <span className='font-medium'>{item.attributes.stake.communitybinding}</span> {item.attributes.stake.communitytext}</li>
             </ul>
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
                 <li>{item.attributes.stake.stakelist}</li>
                 <li>{item.attributes.stake.stakelist2}</li>
             </ul>
             <img src={item.attributes.stakeimg.data.attributes.url} alt="" width='' className='mt-7' />

             </div>    
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default AboutTiers;