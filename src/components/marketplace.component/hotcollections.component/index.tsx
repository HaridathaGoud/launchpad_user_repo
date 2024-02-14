import { useEffect, useState} from 'react';
import { getMarketplace } from '../../../utils/api';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useNavigate} from 'react-router-dom';
//import { isErrorDispaly } from '../../utils/errorHandling';
import Placeholder from 'react-bootstrap/Placeholder';
import error from '../../../assets/images/error.svg';

export default function HotCollections() {
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hotCollectionData, setHotCollectionData] = useState<any>([]);
  const router = useNavigate();

  useEffect(() => {
    getHotCollectionsData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getHotCollectionsData = async () => {
    setLoader(true);
    await getMarketplace(`User/HotCollectionsData/10/0/${null}/${null}`)
      .then((response: any) => {
        setHotCollectionData(response.data);
        setLoader(false);
      })
      .catch((error: any) => {
        setErrorMessage();
        setLoader(false);
      });
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleHotCollectionItem = (item: any) => {
    router(`/collections/${item?.id}`);
  };
  
  return (
    <>
      {hotCollectionData?.length > 0 && (
        <>
          <div className="container mx-auto mt-[40px]">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Hot Collections</h2>
           
            {errorMessage && (            
              <div className='cust-error-bg'>
              <div className='mr-4'><Image src={error} alt="" /></div>
              <div>
              <p className='error-title error-red'>Error</p>
              <p className="error-desc">{errorMessage}</p></div>
         </div>
            )}
            <div className="text-center">{loader &&  <div className='trending-card hot-collection-shimmer'>
          <Placeholder  animation="glow" >
            <Placeholder xs={2} className='trending-img'/>
          </Placeholder>
          
          <Placeholder  animation="glow" className='p-3'>
            <Placeholder xs={12} className="w-75 "/>
            <Placeholder animation="wave"className='px-3'>
            <Placeholder xs={6}className="w-25 "/>
            <Placeholder xs={6}className="w-25 ms-5"/>
            </Placeholder>
          </Placeholder>
        
          </div>}</div>
            {!loader && (
              // <div className="hot-collect">
              //   <Carousel responsive={responsive} infinite className="">
              //     {hotCollectionData.map((item: any) => (
              //       <div>
              //         <div className="hotcollections-card" onClick={() => handleHotCollectionItem(item)}>
              //           <div className="card-fixes">
              //             <Image src={item.logo} alt="" className="hotcolllect-img" height="10" width="10" />
              //           </div>
              //           <div className="value-section">
              //             <h4 className="card-title">{item.collectionName}</h4>
              //             <div className="row">
              //               {/* -----------Thise are we are using in Feature--------- */}
              //               {/* <div className="col-lg-6 hotcoll-vals">
              //                 <label className="card-label">Floor</label>
              //                 {item.flourValue && (
              //                   <>
              //                     <p className="card-value cardfooter-ellipse">
              //                       {item.flourValue} {process.env.REACT_APP_TOKENNAME}
              //                     </p>
              //                   </>
              //                 )}
              //                 {!item.flourValue && (
              //                   <>
              //                     <p className="card-value ">{item.flourValue || '-'}</p>
              //                   </>
              //                 )}
              //               </div> */}
              //               {/* <div className="col-lg-6 hotcoll-vals">
              //                 <label className="card-label">Total Valume</label>
              //                 <p className="card-value cardfooter-ellipse">
              //                   {item.totalVolume} {process.env.REACT_APP_TOKENNAME}
              //                 </p>
              //               </div> */}
              //             </div>
              //           </div>
              //         </div>
              //       </div>
              //     ))}
              //   </Carousel>
              // </div>

              <div className='carousel container mx-auto gap-4 py-1'>
                {hotCollectionData.map((item: any) => (
              <div className="carousel-item px-1">
                
                      <div className="card bg-primary-content lg:w-[300px] " onClick={() => handleHotCollectionItem(item)}>
                        <div className="">
                          <img src={item.logo} alt="" className="h-[300px] object-cover rounded-[16px]" />
                        </div>
                        <div className="p-5">
                          <h4 className="font-semibold text-2xl capitalize text-secondary">{item.collectionName}</h4>
                          <div className="">
                           
                            <div className="flex justify-between items-center mt-[18px]">
                              <label className="text-secondary text-base">Floor</label>
                              {item.flourValue && (
                                <>
                                  <p className="text-secondary text-lg font-semibold flex-1 text-right break-all">
                                    {item.flourValue} {process.env.REACT_APP_TOKENNAME}
                                  </p>
                                </>
                              )}
                              {!item.flourValue && (
                                <>
                                  <p className=" text-secondary text-lg font-semibold flex-1 text-right break-all">{item.flourValue || '-'}</p>
                                </>
                              )}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <label className="text-secondary text-base flex-1">Total Valume</label>
                              <p className="text-secondary text-lg font-semibold flex-1 text-right break-all">
                                {item.totalVolume} {process.env.REACT_APP_TOKENNAME}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                  
                 
              </div> ))}
            </div>
            
            )}
             <div className='mt-5'>
              <span className='icon carousal-left-arrow cursor-pointer mr-1'></span>
              <span className='icon carousal-right-arrow cursor-pointer'></span>
            </div>
           
          </div>
        </>
      )}
    </>
  );
}
