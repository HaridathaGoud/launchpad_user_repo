import React from 'react';
function SuccessfulStories({data}) {

  return (
    <div>
      {data?.data?.map((item) => (<>
        <div className="">         
           <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.intro.successstory}</h1>              
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
              <li>{item.attributes.intro.successpoint1}  </li>
              <li>   {item.attributes.intro.successpoint2}</li>             
             </ul>
             <div className='grid md:grid-cols-2 gap-20 text-center'>
              <div >
              <img src={item.attributes.storyimg1.data.attributes.url} alt="" width='' className='mx-auto mb-3' />
             <div className='relative'>
             <p className='text-base-200'>{item.attributes.intro.storydesc}</p>
              <img src={item.attributes.quoteimg.data.attributes.url} alt="" width='' className='inline absolute left-0 top-[-14px]' />
             </div>

              <div className='mt-7 mb-5'>
              <img src={item.attributes.star.data.attributes.url} alt="" width='' className='inline' />
              <img src={ item.attributes.star.data.attributes.url} alt="" width='' className='inline' />
              <img src={item.attributes.star.data.attributes.url} alt="" width='' className='inline' />
              <img src={item.attributes.star.data.attributes.url} alt="" width='' className='inline' />
              <img src={item.attributes.star.data.attributes.url} alt="" width='' className='inline' />
              <span className='text-secondary font-bold align-middle ml-3'>{item.attributes.intro.ratingnumber}</span>
              </div>
              <p className='text-secondary font-bold'>{item.attributes.intro.storyname}</p>
              <p className='text-base-200'>{item.attributes.intro.storyrole}</p>
              </div>
              <div>
             <img src={ item.attributes.storyimg2.data.attributes.url} alt="" width='' className='mx-auto mb-3' />
             <div className='relative'>
             <p className='text-base-200'>{item.attributes.intro.storydesc2}</p>
             <img src={item.attributes.quoteimg.data.attributes.url} alt="" width='' className='inline absolute left-0 top-[-14px]' />
             </div>
             <div className='mt-7 mb-5'>
              <img src={item.attributes.star.data.attributes.url} alt="" width='' className='inline' />
              <img src={item.attributes.star.data.attributes.url} alt="" width='' className='inline' />
              <img src={item.attributes.star.data.attributes.url} alt="" width='' className='inline' />
              <img src={item.attributes.star.data.attributes.url} alt="" width='' className='inline' />
              <img src={item.attributes.starnull.data.attributes.url} alt="" width='' className='inline' />
              <span className='text-secondary font-bold align-middle ml-3'>{item.attributes.intro.ratingnumber2}</span>
              </div>
              <p className='text-secondary font-bold'>{item.attributes.intro.storyname2}</p>
              <p className='text-base-200'>{item.attributes.intro.storyrole2}</p>
             </div>
             </div>
             
             </div>    
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default SuccessfulStories;