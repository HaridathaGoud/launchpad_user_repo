import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom'; // Import useHistory from react-router-dom
import Button from '../../../ui/Button';
import abstract1 from '../../../assets/images/about-abstarct1.svg'
import abstract2 from '../../../assets/images/about-abstarct2.svg'
import yellowellipse from '../../../assets/images/yellow-ellipse.svg'
import blueellipse from '../../../assets/images/blue-ellipse.svg'
import VisitUs from '../../visitus';

function ConclusionContent() {
  const [postDetails, setPost] = useState([]);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:1337/api/docs?populate=*');
        const response = await fetch('https://wonderful-baseball-df5acc8ae6.strapiapp.com/api/docs?populate=*');
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          // throw new Error('Network response was not ok');
        }
        
        //  const obj =  data.data.filter((item) =>{
        //     return item?.id === parseInt(params?.id)
        //   })
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('ConclusionContent ',postDetails);
  
  return (
    <div>
      {postDetails?.data?.map((item) => (<>
        <div className="">
         
            <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.intro.conclusion}</h1>
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