import React from 'react';
import styles from "./projectdetails.module.css";
import member from '../../assets/images/dao-profile.png';
import { Link } from 'react-router-dom';
import nodata from '../../assets/images/no-data.png';


const FoundingMember = (props) => {
    return (<>

        <div className={`md:gap-4 flex gap-6 items-start overflow-x-auto`}>
            {props.foundingmemsData
                ?.stakersData?.map((item, index) => 
                    (index < 5 ? 
                    <div className='lg:w-[140px] break-words'> 
                    <div className={`relative w-20 h-20 mx-auto `}>
                        <img src={item.image ? item.image : member} className={`rounded-full h-full w-full object-cover`} alt='' />
                        <span className={` text-base-100 text-xs font-semibold inline-flex items-center justify-center w-6 h-6 bg-primary rounded-[50%] text-center absolute right-[-5px] bottom-0.5 border border-white`}>3%</span>
                    </div>
                        <p className={`text-base font-normal  text-secondary text-center`}>{item.userName ? item.userName : '-'}</p>
                        <p className={`text-base font-semibold text-secondary text-center `}>
                            {item.walletAddress?.slice(0, 4) + '....' + item.walletAddress?.substring(item.walletAddress.length - 4, item.walletAddress.length)}
                        </p>
                        </div>:'') )}



            {props.foundingmemsData?.stakersData?.length != 0 && props.foundingmemsData?.stakersData?.length  >=  5 && <Link to={`/foundingmemebersview/${props.pjctId}`}>
                <div className={`bg-secondary w-20 h-20 rounded-full shrink-0 flex items-center justify-center cursor-pointer ml-0 md:ml-10`}>
                    <div className={`text-center`}>
                        <span className={`icon ${styles.rightArrow}`}></span>
                        <p className={`text-base-100 text-xs font-normal`}>View All</p>
                    </div>
                </div>
            </Link>}
            {props.foundingmemsData?.stakersData?.length == 0 && <div className="text-center flex-1">
                <img width={120} src={nodata} className='mx-auto' />
                <p className="text-secondary text-center">No data found</p>
            </div>}
        </div>

      
        </>
        
    );


};

export default FoundingMember;