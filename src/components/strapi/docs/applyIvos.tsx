import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ApplyIvos = () => {
    const [postDetails, setPost] = useState([]);
  const params = useParams();
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

  console.log('ApplyIvos ',postDetails);
  return (
    <div>

    </div>
  )
}

export default ApplyIvos