import React from 'react';
import DaoCardShimmer from '../shimmers/daodashboard';

function DaoCards(props: any) {

    return (
        <><div><div className='container mx-auto max-sm:px-3 md:mt-3 mt-4'>
            <h5 className='font-semibold text-2xl text-secondary'>DAO’s</h5>
            
            <div className='grid grid-cols-4 gap-4'>
                {props?.loading ?
                   <div> <DaoCardShimmer/> </div>
                    : (<>
                        {props?.daoData?.data?.map((item: any) => (
                           <>
                                {props?.daoData ? <div className='shadow rounded me-3 mt-md-0 mt-3 sm-m-0 c-pointer rounded-lg transform transition-transform duration-500 hover:scale-[1.03]' onClick={() => props?.goToHome(item)}>
                                    <img src={item?.logo} className='w-full rounded-t-lg h-[350px] object-cover' />
                                    <div className='p-2 rounded-b-lg'>
                                        <div className='text-base font-normal text-secondary !mb-0'>
                                        <span className='text-base-200 text-base font-semibold'>Name:</span>  {item?.name} 
                                        </div>
                                        <div className='text-base font-normal text-secondary mb-1'>
                                        <span className='text-base-200 text-base font-semibold'> Members:</span>  {item?.members.toLocaleString()}
                                        </div>
                                    </div>
                                </div> : (
                                    <div>
                                        <DaoCardShimmer/>
                                    </div>)}
                           </>
                        ))}
                    </>)}
            </div>
        </div>
        </div></>
    )
}

export default DaoCards;