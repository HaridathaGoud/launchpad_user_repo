import { get } from '../../../utils/api';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Image from 'react-bootstrap/Image';
import {Link} from 'react-router-dom';
import { Container, Card, Col, Button } from 'react-bootstrap';
import creatorcard1 from '../../../assets/images/creator-card1.png';
import validError from '../../../assets/images/validation-error.png';
import Alert from 'react-bootstrap/Alert';

export default function NftCollections() {
  const { address } = useAccount();
  const [nftcollections, setNftCollections] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    GetNfts();
  }, []);

  const GetNfts = async () => {
    let response = await get(`User/GetNfts/${address}/${10}/${0}/${null}`);
    if (response) {
      setNftCollections(response.data);
    } else {
      setErrorMsg(isErrorDispaly(response));
    }
  };

  const isErrorDispaly = (objValue: any) => {
    if (objValue.data && typeof objValue.data === 'string') {
      return objValue.data;
    } else if (objValue.originalError && typeof objValue.originalError.message === 'string') {
      return objValue.originalError.message;
    } else {
      return 'Something went wrong please try again!';
    }
  };

  return (
    <>
      {errorMsg && (
        <Alert variant="danger">
        <Image className='validation-error' src={validError} />
          <span>{errorMsg}</span>
        </Alert>
      )}

      {nftcollections?.map((item, index) => (
        <div className="col-md-4 col-lg-4 col-xl-2" key={index}>
          <Link className="nav-link" to={`/assets/${item.tokenId}/${item.collectionContractAddress}/${item.id}`}>
            <Card className="creator-bg">
              <Image src={creatorcard1} className="creator-img card-img" alt="" />

              <div className="creator-like">
                <a href="#" className="icon md creator-icon"></a>
              </div>
              <Card.Body className="pb-2">
                <Card.Text>{item?.name}</Card.Text>
                <Card.Title>
                  {item?.name}
                </Card.Title>
                <p className="card-text mt-2 mb-0">
                  Price <span className="ms-3 text-white">{item.price}</span>
                </p>
                <p className="card-text mt-2 mb-0">
                  Ends in 5 days
                  <span className="ms-3 text-white">{item.createdDate}</span>
                </p>
              </Card.Body>
              <div className="card-footer pt-3 pb-3">
                <div className="footer-price">
                  <span>Buy Now</span>
                </div>
                {/* <span className="vr"></span> */}
                {/* <div className="footer-price">
                        <span>Add to Cart</span>
                        </div> */}
              </div>
            </Card>
          </Link>
        </div>
      ))}
    </>
  );
}
