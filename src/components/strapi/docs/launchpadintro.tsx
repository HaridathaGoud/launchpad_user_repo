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

function LaunchpadIntro() {
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
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.intro.launchpadtitle}</h1>
             <ul className='list-disc ml-5 my-4'>
              <li> {item.attributes.intro.keypoint1}  </li>
              <li> {item.attributes.intro.keypoint2}</li>
             </ul>
             <div className='bg-secondary p-7 rounded-lg  lg:w-[600px]'>
             <span className='text-white text-7xl font-semibold'>{item.attributes.intro.bgtitle}</span>
              <img src={'http://localhost:1337' + item.attributes.dottlogo.data.attributes.url} alt="" width='' className='inline align-bottom ms-8' />
             </div>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.intro.launchpaddesc}</p>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.intro.launchpaddesc2}</p>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.intro.launchpaddesc3}</p>
            </div>             
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default LaunchpadIntro;