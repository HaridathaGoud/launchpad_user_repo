import React, { useState, useEffect } from 'react';
import { Row, Col, Card} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { get } from '../../utils/api';
import {Link} from 'react-router-dom';
import nodata from '../../../src/assets/images/no-data.png';
import defaultlogo from '../../../src/assets/images/default-logo.png';
import error from '../../../src/assets/images/error.svg';
import { isErrorDispaly } from '../../utils/errorHandling';
import Modal from 'react-bootstrap/Modal';
import { useAccount } from 'wagmi';
import loadimg from '../../../src/assets/images/Minnapad-Logo-loader.svg';

function MyCollections(props: any) {
  const [show, setShow] = useState(false);
  const [customerCollections, setCustomerCollections] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loader, setLoader] = useState(false);
  const {isConnected } = useAccount();
  const router = useNavigate();

  const handleCreate = (token: any) => {
    router(`/createcollection/${token}`);
  };

  function initialize() {
    getCustomerCollection();
  }
  useEffect(() => {
    getCustomerCollection();
  }, [isConnected,props?.auth?.user?.id]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getCustomerCollection = async () => {
    setLoader(true);
    await get(`User/GetCustomerCollections/${props?.auth?.user?.id}`)
      .then((res: any) => {
        setCustomerCollections(res.data);
        setLoader(false);
      })
      .catch((error: any) => {
        setErrorMsg(isErrorDispaly(error));
        setLoader(false);
      });
  };

  const handleChange = (e: any) => {
    handleCreate(e);
  };

  return (
    <>
      <div className="container">
        {errorMsg && (
          <div className='cust-error-bg'>
            <div className='cust-crd-mr'><Image src={error} alt="" /></div>
            <div>
              <p className='error-title error-red'>Error</p>
              <p className="error-desc">{errorMsg}</p></div>
          </div>
        )}
        {loader && 
        <>
           <div className="d-flex justify-content-center">
                      <div className='loading-overlay'><div className="text-center image-container">
                        <Image
                          className=""
                          src={loadimg}
                          alt=""
                        />
                      </div></div>
                    </div>
        </>
        ||
          <>
            <Row className="mt-5 align-items-center">
              <Col lg={8}>
                <h2 className="my-collections section-title mb-2">My collections</h2>
                <hr className='top-seller-hr my-3' />
                <p className="collec-text">Create, curate, and manage collections of unique NFTs to share and sell.</p>
              </Col>

              <Col lg={4} className=" mb-2 text-end mt-lg-0 mt-3">
                {/*----------- We need to show Create a Collection in Feature------ */}
                {/* <Button className="custom-btn" onClick={()=>handleCreate('ERC-721')}>
                Create a collection
                </Button>{' '} */}
                <Modal size="lg" centered show={show} onHide={handleClose} className="wallet-popup create-item-modal">
                  <Modal.Header className="p-0">
                    <span></span>
                    <span className="icon md close-icon c-pointer" onClick={handleClose}></span>
                  </Modal.Header>
                  <Modal.Body>
                    <h2 className="section-title text-left mt-0 mb-3">Create Your New Collection</h2>
                    <div className="d-flex justify-content-around create-sel">
                      <div className="coll-popup me-2">
                        <div className="create-item text-center c-pointer" onClick={() => handleChange('ERC-721')}>
                          <h4 className="mb-0">Create</h4>
                          <h3 className="mb-0">ERC-721</h3>
                        </div>
                      </div>
                      <div className="coll-popup">
                        <div className="create-item text-center c-pointer" onClick={() => handleChange('ERC-1155')}>
                          <h4 className="mb-0">Create</h4>
                          <h3 className="mb-0">ERC-1155</h3>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </Col>
            </Row>

            <div className="py-5">
              <div className="row creator-card create-by-row">
                {customerCollections.length > 0 && (
                  <>
                    {customerCollections.map((item: any) => (
                      <div className="col-md-6 col-lg-3 space-x mt-2">
                        <Card className="creator-bg">
                          <Link className="text-decoration-none" to={`/collections/${item?.id}`}>
                            <div className="account-card-img">
                              {' '}
                              <Image
                                src={item?.logo || defaultlogo}
                                className="creator-img card-img"
                                width={200}
                                height={300}
                                alt=""
                              />
                            </div>
                          </Link>
                          <Card.Body className="explore-nfts">
                            <Card.Title className="card-title">{item?.collectionName}</Card.Title>
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
                  </>
                )}
                {customerCollections.length == 0 && (
                  <>
                    <div className="nodata-text db-no-data">
                      <Image src={nodata} alt=""></Image>
                      <h3 className="text-center">No data found</h3>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        }
      </div>
    </>
  );
}
const connectStateToProps = ({ auth }: any) => {
  return { auth: auth };
};
export default connect(connectStateToProps, (dispatch) => {
  return { dispatch };
})(MyCollections);
