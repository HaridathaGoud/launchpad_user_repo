import React from 'react';

function KeyComponents({data}) {
  return (
    <div>
      {data?.data?.map((item) => (<>
        <div className="">         
           <div>
              <h1 className='text-2xl font-semibold text-secondary'>{item.attributes.intro.keycomponenttitle}</h1>              
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
              <li> <span className='font-medium'>{item.attributes.intro.appprocess} </span>{item.attributes.intro.apptext}  </li>
              <li>  <span className='font-medium'>{item.attributes.intro.curriculum}</span> {item.attributes.intro.curriculumtext}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.mentorship}</span> {item.attributes.intro.mentortext}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.funding}</span> {item.attributes.intro.fundingtext}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.demo}</span> {item.attributes.intro.demotext}</li>
             </ul>
             </div>    
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default KeyComponents;