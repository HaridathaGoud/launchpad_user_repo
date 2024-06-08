import React  from 'react';

function LaunchpadBenefits({data}) {

  return (
    <div>
      {data?.data?.map((item) => (<>
        <div className="">         
           <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.intro.benefittitle}</h1>              
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
              <li> <span className='font-medium'>{item.attributes.intro.accgrowth} </span>{item.attributes.intro.accpoint}  </li>
              <li>  <span className='font-medium'>{item.attributes.intro.accexpert}</span> {item.attributes.intro.accexpertpoint}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.fundingopp}</span> {item.attributes.intro.fundingopppont}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.validfeed}</span> {item.attributes.intro.validfeedpoint}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.network}</span> {item.attributes.intro.networkpoint}</li>
             </ul>
             </div>    
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default LaunchpadBenefits;