import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import {  useParams } from 'react-router-dom'; // Import useHistory from react-router-dom
import Button from '../../../ui/Button';
 
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
        <div className='container mx-auto grid md:grid-cols-2 items-center'>
         <div>
         <h1 className=''>{item.attributes.abouttitle} <span>{item.attributes.primarytitle}</span> {item.attributes.suffixtitle} </h1>
         <p>{item.attributes.ybDescription}</p>
          <div className="flex">
            <div>
              <h1>{item.attributes.expvalue}</h1>
              <p>{item.attributes.explabel}</p>
            </div>
            <div>
              <h1>{item.attributes.devvalue}</h1>
              <p>{item.attributes.devlabel}</p>
            </div>
          </div>
          <Button type='primary' children={item.attributes.contact.Title}  />
          <Button type='cancel' children={item.attributes.knowmore.Title} btnClassName='ml-4'  />
         </div>
          <div> 
          <img src={'http://localhost:1337' + item.attributes.bannerimg.data.attributes.url} alt="" width='' className='md:w-[564px] ml-auto' />          
          </div>
        </div>
        <div className='grid md:grid-cols-2 items-center'>
            
        </div>
        </>

      ))}
    </div>
  );
}
 
export default AboutUs;