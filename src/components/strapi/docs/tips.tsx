import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom'; // Import useHistory from react-router-dom


function Tips() {
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

  console.log('Tips ',postDetails);
  

  return (
    <div>
      {postDetails?.data?.map((item) => (<>
        <div className="">         
           <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.intro.tips}</h1>              
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
              <li> <span className='font-medium'>{item.attributes.intro.research} </span>{item.attributes.intro.researchtext}  </li>
              <li>  <span className='font-medium'>{item.attributes.intro.networkactively}</span> {item.attributes.intro.nettext}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.beopen}</span> {item.attributes.intro.beopentext}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.makemost}</span> {item.attributes.intro.makemosttext}</li>
             </ul>
             </div>    
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default Tips;