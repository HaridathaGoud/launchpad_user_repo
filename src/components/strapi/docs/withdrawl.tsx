import { log } from 'console';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom'; // Import useHistory from react-router-dom


function Withdrawl() {
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
              <h1 className='text-[40px] font-semibold text-secondary'>{item.attributes.stake.withdraw}</h1> 
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.stake.withdrawdesc}</p>
              <h3 className='text-secondary text-base font-bold mt-4'>{item.attributes.stake.withdrawuser}</h3>
              <p className='text-base text-base-200 font-normal mt-4'>{item.attributes.stake.withdrawusertext}</p>
              <div>
                <h2 className='text-base text-secondary mt-5 font-semibold'>{item.attributes.stake.withdrawtypes}</h2>
                <ol className='list-decimal text-base-200 leading-8 ml-5'>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes.stake.InstantWithdrawal}</span>{item.attributes.stake.InstantWithdrawaltext}</li>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes.stake.FlexibleWithdrawal}</span>{item.attributes.stake.FlexibleWithdrawaltext}</li>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes.stake.SecureWithdrawl}</span>{item.attributes.stake.Securewithdrawltext}</li>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes.stake.LowTransaction}</span>{item.attributes.stake.LowTransactiontext}</li>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes.stake.MultipleWithdrawal}</span>{item.attributes.stake.MultipleWithdrawaltext}</li>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes.stake.WithdrawalAvail}</span>{item.attributes.stake.WithdrawalAvailtext}</li>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes.stake.TransparentWithdrawal}</span>{item.attributes.stake.TransparentWithdrawaltxt}</li>
                  <li className='mt-[14px]'><span  className='text-secondary font-medium'>{item.attributes.stake.WithdrawalConfirm}</span>{item.attributes.stake.WithdrawalConfirmtxt}</li>
                </ol>
              </div>
             <ul className='list-disc ml-5 my-4 text-base-200 leading-9'>
                 <li>{item.attributes.stake.Withdrawallist}</li>
                 <li>{item.attributes.stake.Withdrawallist2}</li>
             </ul>
             <img src={'http://localhost:1337' + item.attributes.withdrawimg.data.attributes.url} alt="" width='' className='mt-7' />

             </div>    
        </div>       
        
      </>

      ))}
    </div>
  );
}

export default Withdrawl;