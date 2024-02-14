import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../ui/Button';

const Pageerror = () => {
  const router = useNavigate();
 const goToDashBoard=()=>{
  router('/dashboard');
  }
  return (
    <>
    <div className='flex items-center justify-center h-screen'>
    <div>
    <div className='text-center text-dark'>
     <h1 className='text-3xl font-semibold'>Page not found!</h1>
     <p className='mt-5 text-base'>We can't find the page that you're  <br/>looking for</p>
     </div>
     <div className='text-center mt-2'>
     <Button type='primary' handleClick={()=>goToDashBoard()}>Back</Button>
     </div>
    </div>
    </div>
    </>
  );
};

export default Pageerror;
