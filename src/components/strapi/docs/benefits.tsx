import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom'; // Import useHistory from react-router-dom


function LaunchpadBenefits() {
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

  console.log('LaunchpadBenefits ',postDetails);
  
  return (
    <div>
      {postDetails?.data?.map((item) => (<>
        <div className="">         
           <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.intro.benefittitle}</h1>              
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
              <li> <span className='font-medium'>{item.attributes.intro.accgrowth} </span>{item.attributes.intro.accpoint}  </li>
              <li>  <span className='font-medium'>{item.attributes.intro.accexpert}</span> {item.attributes.intro.accexpertpoint}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.fundingopp}</span> {item.attributes.intro.fundingopppont}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.validfeed}</span> {item.attributes.intro.validfeedpoint}</li>
              <li>  <span className='font-medium'>{item.attributes.intro.network}</span> {item.attributes.intro.networkpoint}</li>
             </ul>
             </div>    
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default LaunchpadBenefits;