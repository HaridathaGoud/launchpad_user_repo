import React from 'react';

function Tips({data}) {
  return (
    <div>
      {data?.data?.map((item) => (<>
        <div className="">         
           <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.intro.tips}</h1>              
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
              <li> <span className='font-medium'>{item.attributes.intro.research} </span>{item.attributes.intro.researchtext}  </li>
              <li>  <span className='font-medium'>{item.attributes.intro.networkactively}</span> {item.attributes.intro.nettext}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.beopen}</span> {item.attributes.intro.beopentext}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.makemost}</span> {item.attributes.intro.makemosttext}</li>
             </ul>
             </div>    
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default Tips;