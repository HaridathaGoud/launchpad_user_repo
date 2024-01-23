import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import member from '../../../assets/images/dao-profile.png';
import { Link } from 'react-router-dom';
import gadha from '../../../assets/images/hanuman-gadha.png'

const NftCards = ({setCardDetails}) => {

const data=[
    {
        image:'https://i.pinimg.com/736x/88/7f/94/887f94b606965ff9bed58d1b53dd6731.jpg',
        seriesname:'T- Series',
        cardname:'Hanuman Gada',
        price:'2.010 Matic',
        highestbid:'0.15 Matic',
        badge:'#02325'
    },
    {
        image:'https://i.pinimg.com/736x/40/b4/68/40b468326d842fa848d3013dd92e3bf4.jpg',
        seriesname:'T- Series',
        cardname:'Arrow & Bow',
        price:'2.010 Matic',
        highestbid:'0.15 Matic',
    },
    {
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8am2bBSQOTBIpVSAaW-szulIayvERIYDnDA&usqp=CAU',
        seriesname:'T- Series',
        cardname:'Gorilla Doll',
        price:'2.010 Matic',
        highestbid:'0.15 Matic',
    },
    {
        image:'https://i.pinimg.com/736x/5a/c6/51/5ac6513a4c63b941c1832e9fde7cd0d7.jpg',
        seriesname:'T- Series',
        cardname:'Wooden Arrow & Bow',
        price:'2.010 Matic',
        highestbid:'0.15 Matic',
    },
    {
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXWuCVM7fV0daX8gS7iP_JipkpER1MZY0MBw&usqp=CAU',
        seriesname:'T- Series',
        cardname:'Hand Glows',
        price:'2.010 Matic',
        highestbid:'0.15 Matic',
    },
    {
        image:'https://i.pinimg.com/736x/97/24/71/972471bbcdcd28c6c98b1a3a2b2f58fd.jpg',
        seriesname:'T- Series',
        cardname:'Arrows',
        price:'2.010 Matic',
        highestbid:'0.15 Matic',
    },
    {
        image:'https://i.pinimg.com/736x/ad/55/7f/ad557f5aaff21216b741815940debbfe.jpg',
        seriesname:'T- Series',
        cardname:'Weapon Semblance Belt',
        price:'2.010 Matic',
        highestbid:'0.15 Matic',
    },
    {
        image:'https://i.pinimg.com/736x/ab/ff/db/abffdb02813b5d044568d418b1cd1b05.jpg',
        seriesname:'T- Series',
        cardname:'Leather Armor Ornate ',
        price:'2.010 Matic',
        highestbid:'0.15 Matic',
    }
]
    return (
        <>
        {data.map((item,index)=>(
             <>
             <div className="border shadow rounded-2xl h-full">

<div className="animate-pulse space-x-4"></div>
<div className="animate-pulse space-x-4 h-60">
    <div className="bg-slate-200 rounded-xl h-64"></div>
</div>

<div className="animate-pulse mt-2 py-[1rem] px-3">
    <div className="h-2 bg-slate-200 rounded-xl mt-8"></div>
    <div className="h-2 bg-slate-200 rounded-xl mt-8"></div>
    <div className="h-2 bg-slate-200 rounded-xl mt-8"></div>
</div>
</div>
            <div onClick={()=>setCardDetails(item)}>
          <div className='shadow-md cursor-pointer bg-primary-content rounded-lg relative min-h-[420px] transform transition-transform duration-500 hover:scale-[1.03]'>
            <img src={item.image} alt="" className='h-[255px] w-full object-cover rounded-tl-lg rounded-tr-lg' />
            <div className="bg-black top-3 absolute cursor-pointer right-3 rounded-full">
            <span className='icon like-white '></span>
            </div>
           { item.badge &&  <span className='py-1 px-3 bg-primary text-white text-base font-semibold absolute rounded-tl-lg top-0 left-0'>{item.badge}</span>  }
            <div className='px-2 py-2.5'>
             <p className='text-xs text-secondary truncate'>{item.seriesname}</p>
             <h2 className='mb-2.5 text-base font-semibold truncate text-secondary'>{item.cardname}</h2>
             <div className="flex justify-between truncate mb-3 gap-2"> <p className='opacity-60 truncate text-secondary flex-1'>Price</p> <p className='font-semibold text-secondary flex-1 truncate text-right'>{item.price}</p> </div>
             <div className="flex justify-between gap-2"> <p className='opacity-60 text-secondary flex-1'>Highest bid</p>  <p className='font-semibold text-secondary flex-1 text-right truncate'>{item.highestbid}</p> </div>
            </div>
            <hr />
            <div className='px-2.5 py-4 flex justify-between'>
            <div className='flex add-cart cursor-pointer'>
                <span className='icon card-cart'></span>
                <span className='font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary'>Add to Cart</span>
            </div>
             <div className='w-px border'></div>
            <div className='flex shop-card cursor-pointer'>
                <span className='icon card-shop'></span>
                <span className='font-semibold text-secondary ml-1 whitespace-nowrap hover:text-primary'>Buy Now</span>
            </div>
            </div>
          </div>
          </div></>
        ))}
          
        </>
    );


};

export default NftCards;