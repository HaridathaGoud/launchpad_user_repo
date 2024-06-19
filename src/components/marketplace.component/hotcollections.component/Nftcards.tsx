import React from 'react';
import NftCardsShimmer from '../../loaders/NftCardShimmer';
import NoData from '../../../ui/noData';
const NftCards = ({ NftDetails }) => {
    return (
        <>
        {NftDetails?.loading &&
        <NftCardsShimmer/>}
            {!NftDetails?.loading && <>
                {NftDetails?.data?.length >0 && NftDetails?.data?.map((item:any) => (
                    <div key={item?.id}>
                        <div className='shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]'>
                            <img src={item?.image} alt="" className='h-[255px] w-full object-cover rounded-tl-lg rounded-tr-lg' />
                            <div className="bg-black top-3 absolute cursor-pointer right-3 rounded-full">
                                <span className='icon like-white '></span>
                            </div>
                            {item?.badge && <span className='py-1 px-3 bg-primary text-white text-base font-semibold absolute rounded-tl-lg top-0 left-0'>{item?.badge}</span>}
                            <div className='px-2 py-2.5'>
                                <p className='text-xs text-secondary truncate'>{item?.seriesname}</p>
                                <h2 className='mb-2.5 text-base font-semibold truncate text-secondary'>{item?.name}</h2>
                                <div className="flex justify-between truncate mb-3 gap-2"> <p className='opacity-60 truncate text-secondary flex-1'>Price</p> <p className='font-semibold text-secondary flex-1 truncate text-right'>{item?.price}{' Matic'}</p> </div>
                                <div className="flex justify-between gap-2"> <p className='opacity-60 text-secondary flex-1'>Highest bid</p>  <p className='font-semibold text-secondary flex-1 text-right truncate'>{item?.highestBid}{' Matic'}</p> </div>
                            </div>
                            <hr />
                            <div className='px-2.5 py-4 flex justify-between'>
                                {/* <div className='flex add-cart cursor-pointer'>
                <span className='icon card-cart'></span>
                <span className='font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary'>Add to Cart</span>
                                 </div> */}
                                <div className='w-px border'></div>
                                <div className='flex shop-card cursor-pointer'>
                                    <span className='icon card-shop'></span>
                                    <span className='font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary'>Buy Now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {!NftDetails?.data?.length && 
                <div className='text-center'> 
                <NoData text={""} />
                </div>}
                
            </>}
        </>);
};

export default NftCards;