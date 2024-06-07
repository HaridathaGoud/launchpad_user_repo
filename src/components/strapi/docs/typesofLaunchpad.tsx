import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom'; // Import useHistory from react-router-dom


function LaunchpadTypes() {
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
          console.log(data);
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

  return (
    <div>
      {postDetails?.data?.map((item) => (<>
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