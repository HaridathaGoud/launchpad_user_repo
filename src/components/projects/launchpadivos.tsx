import { NextPage } from 'next';
import React, { useState } from 'react';
import styles from "./dashboard.module.css";
const LaunchpadIvos: NextPage = () => {


    return (
        <>

            <div className='flex justify-center items-center'>
               <div>
               <h1 className="text-center mb-2 text-[32px] font-semibold">Launchpad <span className='text-primary'>IVOs</span> Projects</h1>
                <div className={`flex justify-center `}>
                  <div className='flex gap-2 mt-2 mb-4'>
                  <h2 className='font-semibold text-lg'>Calendar</h2>
                   <div>
                    <span className={`${styles.dateLeftArrow} icon cursor-pointer`}></span>
                    <span className='text-lg mx-2 align-middle'>Aug 01 - Sep 01 2023 </span>
                    <span className={`${styles.dateRightArrow} icon cursor-pointer`}></span>
                   </div>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row gap-4 text-center'>
                    <div className={`bg-base-300 px-5 py-4 rounded-[15px] min-w-[124px] min-h-[130px] ${styles.ivosCard}`}>
                        <div className='flex mb-4 justify-center'>
                           <div className='mr-2'> <span className={`inline-block w-2.5 h-2.5 bg-success rounded-full`}></span></div>
                            <div>
                                <h3 className='text-xl font-medium'>24</h3>
                                <p className='text-neutral-content mt-[-5px]'>Thu</p>
                            </div>
                        </div>
                        <div>
                            <span className={`${styles.ivoCircleGreen} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>3</span>
                            <span className={`${styles.ivoCircleBrown} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>2</span>
                            <span className={`${styles.ivoCircleRed} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>2</span>
                        </div>
                    </div>
                    <div className={`bg-base-300 px-5 py-4 rounded-[15px] min-w-[124px] min-h-[130px] ${styles.ivosCard}`}>
                        <div className='flex mb-4 justify-center'>
                           <div className='mr-2'> <span className={`inline-block w-2.5 h-2.5 bg-success rounded-full`}></span></div>
                            <div>
                                <h3 className='text-xl font-medium'>24</h3>
                                <p className='text-neutral-content mt-[-5px]'>Thu</p>
                            </div>
                        </div>
                        <div>
                            <span className={`${styles.ivoCircleGreen} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>3</span>
                            <span className={`${styles.ivoCircleBrown} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>2</span>
                            <span className={`${styles.ivoCircleRed} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>2</span>
                        </div>
                    </div>
                    <div className={`bg-base-300 px-5 py-4 rounded-[15px] min-w-[124px] min-h-[130px] ${styles.ivosCard}`}>
                        <div className='flex mb-4 justify-center'>
                           <div className='mr-2'> <span className={`inline-block w-2.5 h-2.5 bg-success rounded-full`}></span></div>
                            <div>
                                <h3 className='text-xl font-medium'>24</h3>
                                <p className='text-neutral-content mt-[-5px]'>Thu</p>
                            </div>
                        </div>
                        <div>
                            <span className={`${styles.ivoCircleGreen} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>3</span>
                            <span className={`${styles.ivoCircleBrown} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>2</span>
                            <span className={`${styles.ivoCircleRed} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>2</span>
                        </div>
                    </div>
                    <div className={`bg-base-300 px-5 py-4 rounded-[15px] min-w-[124px] min-h-[130px] ${styles.ivosCard}`}>
                        <div className='flex mb-4 justify-center'>
                           <div className='mr-2'> <span className={`inline-block w-2.5 h-2.5 bg-success rounded-full`}></span></div>
                            <div>
                                <h3 className='text-xl font-medium'>24</h3>
                                <p className='text-neutral-content mt-[-5px]'>Thu</p>
                            </div>
                        </div>
                        <div>
                            <span className={`${styles.ivoCircleGreen} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>3</span>
                            <span className={`${styles.ivoCircleBrown} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>2</span>
                            <span className={`${styles.ivoCircleRed} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>2</span>
                        </div>
                    </div>
                    <div className={`bg-base-300 px-5 py-4 rounded-[15px] min-w-[124px] min-h-[130px] ${styles.ivosCard}`}>
                        <div className='flex mb-4 justify-center'>
                           <div className='mr-2'> <span className={`inline-block w-2.5 h-2.5 bg-success rounded-full`}></span></div>
                            <div>
                                <h3 className='text-xl font-medium'>24</h3>
                                <p className='text-neutral-content mt-[-5px]'>Thu</p>
                            </div>
                        </div>
                        <div>
                            <span className={`${styles.ivoCircleGreen} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>3</span>
                            <span className={`${styles.ivoCircleBrown} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>2</span>
                            <span className={`${styles.ivoCircleRed} mr-[-8px] inline-block w-[34px] h-[34px] !p-[6px] rounded-full text-base font-semibold m[-8px]`}>2</span>
                        </div>
                    </div>
                </div>
               </div>
            </div>
        </>
    );


};

export default LaunchpadIvos;