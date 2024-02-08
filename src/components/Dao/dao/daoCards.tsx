import React, { useContext, useState } from 'react';
import DaoCardShimmer from '../shimmers/daodashboard';
import OutletContextModel from '../../../layout/context/model';
import outletContext from '../../../layout/context/outletContext';
import apiCalls from '../../../utils/api';

function DaoCards(props: any) {
    const [cardDetails, setCardDetails] = useState<any[]>([]);
    const [cardSeeMoreHide, setCardSeeMoreHide] = useState<boolean>(false);
    const [totalCardData, setTotalCardData] = useState<any[]>([]);
    const [pageNo, setPageNo] = useState(1);
    const pageSize = 10;
    const [search, setSearch] = useState(null);
    const [loadeMessage, setLoaderMessage] = useState('');
    const [loader, setLoader] = useState(false);
    const [loadData, setLoadData] = useState(false)
    const {setErrorMessage}:OutletContextModel=useContext(outletContext)

    // const fetchMoreData = (props:any) => {
    //     getDaoCardDetails(pageNo, props.pageSize);
    // };

    // const getDaoCardDetails = async (pageNo: number,pageSize: number) => {
    //     setLoader(true);
    //     setCardSeeMoreHide(false);
    //     if (cardDetails?.length == 0) {
    //         setLoader(true);
    //     }
    //     const skip = pageNo * props.pageSize - props.pageSize;
    //     let response = await apiCalls.getDaoDetails(10,5);
    //     if (response) {
    //         let _pageNo = pageNo + 1;
    //         setPageNo(_pageNo);
    //         setSearch(search);
    //         let mergeData = pageNo == 1 ? [...response.data] : [...cardDetails, ...response.data];
    //         if (mergeData.length > 0) {
    //             setLoaderMessage(' ');
    //             setLoadData(response.data.length >= 9)
    //         } else if (mergeData.length == 0) {
    //             setCardSeeMoreHide(true);
    //             setLoaderMessage('No data found');
    //         }
    //         setCardDetails(mergeData);
    //         if (search == null) {
    //             setTotalCardData(mergeData);
    //         }
    //         setLoader(false);
    //     } else {
    //         setErrorMessage?.(response);
    //         setLoader(false);
    //     }
    // };
    return (
        <><div><div className='container mx-auto max-sm:px-3 md:mt-3 mt-4'>
            <h5 className='font-semibold text-2xl text-secondary'>DAO’s</h5>
            
            <div className='grid grid-cols-4 gap-4'>
                {props?.loading ?
                   [...Array(props.daoData?.data?.length || 4)].map((_, index) => (
                    <div key={index}>
                        <DaoCardShimmer />
                    </div>
                ))
                    : (<>
                        {props?.daoData?.data?.map((item: any) => (
                           <>
                                {props?.daoData ? <div className='shadow rounded me-3 mt-md-0 mt-3 sm-m-0 cursor-pointer rounded-lg transform transition-transform duration-500 hover:scale-[1.03]' onClick={() => props?.goToHome(item)}>
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
            <div className='text-center mt-4' >
            {/* {!props?.daoData?.data && <span className="loading loading-spinner loading-sm"></span> } */}
            {/* {props?.daoData?.data && <div>
                    <span onClick={fetchMoreData} className='cursor-pointer text-base text-primary font-semibold'>See More</span>
                    <span onClick={fetchMoreData} className='mx-auto block icon see-more cursor-pointer mt-[-4px]'></span>
                </div> } */}
            </div>
        </div>
        </div></>
    )
}

export default DaoCards;