import React,{ useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { getMarketplace } from '../../../utils/api';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import defaultlogo from '../../../assets/images/default-logo.png';
import validError from '../../../assets/images/validation-error.png';
//import { isErrorDispaly } from '../../../utils/errorHandling';
import Placeholder from 'react-bootstrap/Placeholder';
const TopSeller = () => {
  const [topSeller, setTopSeller] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useNavigate();
  useEffect(() => {
    getTopSellerDetails();
    setErrorMessage(null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getTopSellerDetails = async () => {
    setLoader(true);
    await getMarketplace(`User/TopSellers/10/0`)
      .then((response: any) => {
        setTopSeller(response.data);
        setLoader(false);
      })
      .catch((error: any) => {
        setErrorMessage();
        setLoader(false);
      });
  };

  const handleTopSellerList = (item) => {
    router(`/accounts/${item.walletAddress}`);
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
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

  return (
    <>
      {topSeller?.length > 0 && (
        <>
          <div className="container mx-auto">
            <div className="">             
              <h2 className='mb-4 text-2xl font-semibold'>Top Sellers</h2>  
            </div>
            <div className="">
              {errorMessage && (
                <Alert variant="danger">
                  <Image className='validation-error' src={validError} />
                  <span>{errorMessage}</span>
                </Alert>
              )}
              <div className="text-center">{loader && 
                <div className='sell-card  shimmer-topseller shimmer'>
                <Placeholder  animation="glow" >
                  <Placeholder xs={2} className='topseller-img'/>
                </Placeholder>
                
                <Placeholder  animation="glow">
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                  <Placeholder xs={12} />
                </Placeholder>
              
                </div>}</div>
              {!loader && (
                <div className='carousel container mx-auto gap-3'>
                  {topSeller.map((item: any, idx: any) => (
                    <div key={idx} onClick={() => handleTopSellerList(item)} className="carousel-item md:inline-block w-[380px]">
                      <div className="flex items-center bg-base-content py-4 px-2.5 rounded-[15px] gap-5">
                        <div className="shrink-0">
                          <img
                            src={item?.logo || defaultlogo}
                            width={122}
                            height={129}
                            alt=""
                            className='rounded-[15px] object-cover w-[122px] h-[129px]'
                            onClick={() => handleTopSellerList(item)}
                          />
                        </div>
                        <div className='truncate'>
                            <h4 className='truncate text-xl font-semibold capitalize text-white'>{item?.name || item?.walletAddress}</h4>
                            <div className='mt-3 mb-2'>
                              <p className='text-info'>Flour Price</p>
                              <p className='text-[16px] text-white'>888.95 Matic</p>
                            </div>
                            <div>
                              <p className='text-info'>Volume</p>
                              <p className='text-[16px] text-white'>888.95 Matic</p>
                            </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default TopSeller;
