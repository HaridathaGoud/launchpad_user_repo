
import React from 'react';
function ConclusionContent({data}) {
  return (
    <div>
      {data?.data?.map((item) => (<>
        <div className="">
         
            <div>
              <h1 className='text-2xl font-semibold text-secondary'>{item.attributes.intro.conclusion}</h1>
             <ul className='list-disc ml-5 my-4 leading-9 text-base-200'>
              <li> {item.attributes.intro.conclusiontext1}  </li>
              <li> {item.attributes.intro.conclusiontext2}</li>
              <li> {item.attributes.intro.conclusiontext3}</li>
             </ul>
             
            </div>             
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default ConclusionContent;