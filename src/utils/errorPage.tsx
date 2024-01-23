import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../ui/Button';
const ErrorPage = () => {
  const router = useNavigate();
    const goToDashBoard = () => {
        window.location.reload()
    }
  return (
    <>  
    <div className='flex items-center justify-center'>
    <div className='py-10'>
    <div className='text-center text-secondary'>
     <h1 className='text-4xl font-medium text-secondary mb-4'>Something went wrong!</h1>
     <p className='text-2xl font-medium text-secondary mb-4'>Please refresh your page</p>
     </div>
     <div className='text-center'>
     <Button btnClassName='' type='primary' handleClick={()=>goToDashBoard()}>Reload the page</Button>
     </div>
    </div>
    </div>
    </>
  );
};

export default ErrorPage;