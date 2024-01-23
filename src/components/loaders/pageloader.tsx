import React from 'react';

const PageLoader = () => {

    return (
        <>
            <div className='h-screen flex items-center justify-center bg-base-300'>
                <span className="loading loading-bars w-24"></span>
            </div>
        </>
    );

};

export default PageLoader;