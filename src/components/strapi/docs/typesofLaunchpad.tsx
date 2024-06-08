import React from 'react';
function LaunchpadTypes({data}) {
  return (
    <div>
      {data?.data?.map((item) => (<>
        <div className="">         
           {/* <Markdown>{item.attributes.intro.launchpadtypes}</Markdown> */}
           <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.intro.LPtitle}</h1>
              <h3 className='text-base-200 font-medium'>{item.attributes.intro.LPsubtitle}</h3>
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
              <li> {item.attributes.intro.point1}  </li>
              <li> {item.attributes.intro.point2}</li>
              <li> {item.attributes.intro.point3}</li>
              <li> {item.attributes.intro.point4}</li>
              <li> {item.attributes.intro.point5}</li>
              <li> {item.attributes.intro.point6}</li>
             </ul>
             </div>
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default LaunchpadTypes;