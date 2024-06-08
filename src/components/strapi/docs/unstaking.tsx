import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom'; // Import useHistory from react-router-dom


function UnStake() {
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
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.stake.unstake}</h1> 
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.stake.unstaketext}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.unstakedesc}</h3>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.stake.unstakedesctext}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.UserUnderstanding}</h3>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.stake.UserUnderstandingtext}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.Flexibility}</h3>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.stake.Flexibilitytext}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.Liquidity}</h3>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.stake.Liquiditytext}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.usercentic}</h3>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.stake.usercentictext}</p>
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
                 <li>{item.attributes.stake.unstakelist}</li>
                 <li>{item.attributes.stake.unstakelist2}</li>
             </ul>
             <img src={'http://localhost:1337' + item.attributes.unstakeimg.data.attributes.url} alt="" width='' className='mt-7' />

             </div>    
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default UnStake;