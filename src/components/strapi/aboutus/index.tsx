import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import {  useParams } from 'react-router-dom'; // Import useHistory from react-router-dom
import Button from '../../../ui/Button';
import abstract1 from '../../../assets/images/about-abstarct1.svg'
import abstract2 from '../../../assets/images/about-abstarct2.svg'
 
function AboutUs() {
  const [postDetails,setPost] = useState([]);
const params = useParams();
console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/aboutpages?populate=*');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
    //  const obj =  data.data.filter((item) =>{
    //     return item?.id === parseInt(params?.id)
    //   })
      setPost(data);
    console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, []);
 
  return (
    <div>
       {postDetails?.data?.map((item) => (<>  
       <div className="bg-[#E7F4FA] bg-about relative">     
        <div className='container mx-auto grid md:grid-cols-2 items-center'>
         <div>
         <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.abouttitle} <span className='text-primary'>{item.attributes.primarytitle}</span> {item.attributes.suffixtitle} </h1>
         <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.ybDescription}</p>
          <div className="flex gap-16 my-6">
            <div>
              <h1 className='text-[48px] font-semibold text-secondary'>{item.attributes.expvalue}</h1>
              <p className='text-base font-medium text-primary'>{item.attributes.explabel}</p>
            </div>
            <div>
              <h1 className='text-[48px] font-semibold text-secondary'>{item.attributes.devvalue}</h1>
              <p className='text-base font-medium text-primary'>{item.attributes.devlabel}</p>
            </div>
          </div>
          <Button type='primary' children={item.attributes.contact.Title} btnClassName='md:w-[160px]'  />
          <Button type='cancel' children={item.attributes.knowmore.Title} btnClassName='ml-4 md:w-[160px] whitespace-nowrap'  />
         </div>
          <div> 
          <img src={'http://localhost:1337' + item.attributes.bannerimg.data.attributes.url} alt="" width='' className='md:w-[564px] ml-auto' />          
          </div>
        </div>
        <img src={abstract1} alt="" className='absolute bottom-[-180px]' />
        <img src={abstract2} alt="" className='absolute right-0 top-56' />
        </div>
        <div className='grid md:grid-cols-2 items-center'>
            
        </div>
        
        </>

      ))}
    </div>
  );
}
 
export default AboutUs;