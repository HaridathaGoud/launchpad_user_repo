import React from 'react';
import NftCardsShimmer from '../../loaders/NftCardShimmer';
import NoData from '../../../ui/noData';
const NftCards = ({ NftDetails }) => {
    const data = [
        {
            image: 'https://i.pinimg.com/236x/2a/a8/9a/2aa89ab8c33e56de598ac044415a4c3f.jpg',
            seriesname: 'T- Series',
            cardname: 'Money Heist Gun',
            price: '2.010 Matic',
            highestbid: '0.15 Matic',
            badge: '#02325'
        },
        {
            image: 'https://i.pinimg.com/564x/ab/b2/56/abb256bfaf1e55acccb672f9916ca872.jpg',
            seriesname: 'T- Series',
            cardname: 'Money Heist mask',
            price: '2.010 Matic',
            highestbid: '0.15 Matic',
        },
        {
            image: 'https://i.pinimg.com/236x/99/51/17/995117a6fe6df1d35810cc02bb85bbf6.jpg',
            seriesname: 'T- Series',
            cardname: 'Money Heist Locker',
            price: '2.010 Matic',
            highestbid: '0.15 Matic',
        },
        {
            image: 'https://i.pinimg.com/236x/08/4e/8d/084e8dcd86c67d675603201a9d5baac4.jpg',
            seriesname: 'T- Series',
            cardname: 'Tokyo Doll',
            price: '2.010 Matic',
            highestbid: '0.15 Matic',
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXWuCVM7fV0daX8gS7iP_JipkpER1MZY0MBw&usqp=CAU',
            seriesname: 'T- Series',
            cardname: 'Hand Glows',
            price: '2.010 Matic',
            highestbid: '0.15 Matic',
        },
        {
            image: 'https://i.pinimg.com/736x/97/24/71/972471bbcdcd28c6c98b1a3a2b2f58fd.jpg',
            seriesname: 'T- Series',
            cardname: 'Arrows',
            price: '2.010 Matic',
            highestbid: '0.15 Matic',
        },
        {
            image: 'https://i.pinimg.com/736x/ad/55/7f/ad557f5aaff21216b741815940debbfe.jpg',
            seriesname: 'T- Series',
            cardname: 'Weapon Semblance Belt',
            price: '2.010 Matic',
            highestbid: '0.15 Matic',
        },
        {
            image: 'https://i.pinimg.com/736x/ab/ff/db/abffdb02813b5d044568d418b1cd1b05.jpg',
            seriesname: 'T- Series',
            cardname: 'Leather Armor Ornate ',
            price: '2.010 Matic',
            highestbid: '0.15 Matic',
        }
    ]

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