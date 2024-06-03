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

function IntroPage() {
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
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.intro.introTitle}</h1>
              <img src={'http://localhost:1337' + item.attributes.introimage.data.attributes.url} alt="" width='' className='md:w-[564px] mx-auto' />
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.intro.introDesc}</p>
            </div>             
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default IntroPage;