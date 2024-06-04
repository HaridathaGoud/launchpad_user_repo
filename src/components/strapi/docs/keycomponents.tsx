import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom'; // Import useHistory from react-router-dom


function KeyComponents() {
  const [postDetails, setPost] = useState([]);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/docs?populate=*');
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
        <div className="">         
           <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.intro.keycomponenttitle}</h1>              
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