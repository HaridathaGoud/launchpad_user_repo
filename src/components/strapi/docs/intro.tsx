import React from 'react';
function IntroPage({data}) {
  return (
    <div>
      {data?.data?.map((item) => (<>
        <div className="">
         
            <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.intro.introTitle}</h1>
              <img src={item.attributes.introimage.data.attributes.url} alt="" width='' className='md:w-[564px] mx-auto' />
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.intro.introDesc}</p>
            </div>             
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default IntroPage;