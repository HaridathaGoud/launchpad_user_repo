import { get } from '../../../utils/api';
import { useEffect, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import mythsnft from '../../../../src/assets/images/creator-card4.png';
import validError from '../../../../src/assets/images/validation-error.png';
import Alert from 'react-bootstrap/Alert';
import error from '../../../assets/images/error.svg'

export default function AllCollections() {
  const [collectionsDetails, setCollectionsDetails] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    getAllCollectionDetails();
  }, []);

  const getAllCollectionDetails = async () => {
    let response = await get(`User/GetAllCollections/${10}/${0}/${null}`);
    if (response) {
      setCollectionsDetails(response.data);
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
        // <Alert variant="danger">
        // <Image className='validation-error' src={validError} />
        //   <span>{errorMsg}</span>
        // </Alert>
        <div className='cust-error-bg'>
        <div className='cust-crd-mr'><Image src={error} alt="" /></div>
        <div>
          <p className='error-title error-red'>Error</p>
          <p className="error-desc">{errorMsg}</p></div>
      </div>
      )}
      {collectionsDetails.map((item) => (
        <div className="col">
          <Card className="explore-card">
            <Image src={mythsnft} alt="" />
            <div>
              <div className="card-body mb-3">
                <label className="card-text">{item.collectionName}</label>
                <Card.Title className="card-title">{item.collectionName}#203</Card.Title>
              </div>
              <div className="card-footer explore-footer">
                <div className="footer-price">
                  <label className="card-text">Price</label>
                  <h5 className="">0.0065 ETH</h5>
                </div>
                <div className="footer-price">
                  <label className="">Highest bid</label>
                  <h5 className="">2.1 wETH</h5>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
}
