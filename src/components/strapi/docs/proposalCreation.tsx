import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom'; // Import useHistory from react-router-dom


function ProposalCreation() {
  const [postDetails, setPost] = useState([]);
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        debugger
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
           <div>
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.stake.stakingtitle}</h1> 
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.stake.stakedesc}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.stakefeatures}</h3>
             
             <ul className='my-4 text-base-200 leading-9'>
              <li> <span className='font-medium'>{item.attributes.stake.stakerewards} </span>{item.attributes.stake.stakerewardtext}  </li>
              <li>  <span className='font-medium'>{item.attributes.stake.stakemechanisam}</span> {item.attributes.stake.stakemechtext}</li>
              <li>  <span className='font-medium'>{item.attributes.stake.enhancedengagement}</span> {item.attributes.stake.enhancetext}</li>
              <li>  <span className='font-medium'>{item.attributes.stake.communitybinding}</span> {item.attributes.stake.communitytext}</li>
             </ul>
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
                 <li>{item.attributes.stake.stakelist}</li>
                 <li>{item.attributes.stake.stakelist2}</li>
             </ul>
             <img src={'http://localhost:1337' + item.attributes.stakeimg.data.attributes.url} alt="" width='' className='mt-7' />

             </div>    
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default ProposalCreation;