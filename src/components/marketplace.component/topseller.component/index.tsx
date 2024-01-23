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
          <div className="container">
            <div className="top-seller-header">
              <div>
              <h2>Top Sellers</h2>
              <hr className='top-seller-hr' />
              </div>
            </div>
            <div className="top-seller">
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
                <Carousel pauseOnHover infinite responsive={responsive}>
                  {topSeller.map((item: any, idx: any) => (
                    <div key={idx} onClick={() => handleTopSellerList(item)}>
                      <div className="sell-card">
                        <div className="top-seller-img">
                          <Image
                            src={item?.logo || defaultlogo}
                            width={100}
                            height={100}
                            alt=""
                            onClick={() => handleTopSellerList(item)}
                          />
                        </div>
                        <div className="seller-detail my-auto pb-35">
                          <div className="d-flex">
                            {' '}
                            <h4>{item?.name || item?.walletAddress}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default TopSeller;
