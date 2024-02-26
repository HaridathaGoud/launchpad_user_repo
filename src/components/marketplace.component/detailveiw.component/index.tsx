import {
  Row,
  Col,
  Button,
  Nav,
  Card,
  Tabs,
  Tab,
  Container,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import React, { useState } from "react";
import detailimage from "../../../src/assets/images/detailview.png";
import Form from "react-bootstrap/Form";
import creatorcard from "../../assets/images/creator-card.png";
import creatorcard1 from "../../assets/images/creator-card1.png";
import creatorcard2 from "../../assets/images/creator-card2.png";
import creatorcard3 from "../../assets/images/creator-card3.png";
import creatorcard4 from "../../assets/images/creator-card4.png";
import creatorcard5 from "../../assets/images/creator-card5.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
export default function DetailView() {
  const [show, setShow] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container mx-auto">
      <section className="mt-5">
        <div className="grid md:grid-cols-2">
          <div>
            <div className="detail-image-card">
              <div className="detail-icons">
                <div>
                  <span className="icon detail-eth"></span>
                </div>
                <div>
                  <span className="detail-count">16</span>
                  <div className="like-icon-bg">
                    <a href="" className="icon detail-like"></a>
                  </div>
                </div>
              </div>
              <div className="card-fixes">
                <Image src={detailimage} alt="" className="detail-image" />
              </div>
            </div>
          </div>
          <div>
            <div className="detail-text-card">
              <div className="detail-heading-card">
                <h1 className="detail-title mb-0">Dooplicator #1654</h1>
                <div className="nft-details">
                  <div>
                    <label className="detail-label">Creator</label>
                    <a href="" className="detail-creator-title">
                      Original Myths
                    </a>
                  </div>
                  <div>
                    <label className="detail-label">Current Owner</label>
                    <a href="" className="detail-creator-title">
                      Owned by AlanCL
                    </a>
                  </div>
                </div>
              </div>
              <div className="details-favour">
                <span className="icon detail-view-eye"></span>
                <span className="detail-view-label">300 view s</span>
                <span className="icon favourite-filled"></span>
                <span className="detail-view-label">12 favorites</span>
                <span className="icon art"></span>
                <span className="detail-view-label">Art</span>
              </div>
              <hr className="detail-border" />
              <div>
                <h3 className="price-title">Current Price</h3>
                <h1 className="detail-value">0.68 ETH</h1>
                <span className="detail-amount">$1,072.29</span>
              </div>
              <div className="detail-buttons">
                <button className="detail-btn">Buy Now</button>
                {/* <div className="detail-add-nft">
                    <span className="icon detail-add"></span>
                  </div> */}
              </div>
              <div className="mt-3">
                <button className="place-btn" onClick={handleShow}>
                  Place a bid
                </button>
              </div>
            </div>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            className="wallet-popup checkout-modal"
          >
            <Modal.Header>
              <span></span>
              <span
                className="icon close c-pointer"
                onClick={handleClose}
              ></span>
            </Modal.Header>
            <Modal.Body>
              <h2 className="section-title text-center mt-0">Place a Bid</h2>
              <div className="mb-4 input name-feild">
                <label className="input-label">Price</label>
                <h6 className="">
                  0.01 <span>WETH</span>
                </h6>
              </div>
              <InputGroup className="mb-4 input name-feild">
                <Form.Label className="input-label">Your Bid</Form.Label>
                <Form.Control
                  placeholder="0.01"
                  aria-label="Username"
                  className="input-style"
                />
              </InputGroup>
              <InputGroup className="mb-4 input name-feild">
                <Form.Label className="input-label mt-2">
                  Crypto Type
                </Form.Label>
                <div className="p-relative ">
                  <Form.Select
                    aria-label="Default select example"
                    className="form-select select-coin mb-2"
                  >
                    <option>WETH</option>
                    <option value="1">WETH</option>
                  </Form.Select>
                  <span className="icon select-arrow"></span>
                </div>
              </InputGroup>
              <div className="balance-card">
                <div className="bal-feild">
                  <label>Your balance</label>
                  <h6>0.0000 ETH</h6>
                </div>
                <div className="bal-feild">
                  <label>Your bidding balance</label>
                  <h6>0.0000 ETH</h6>
                </div>
                <div className="bal-feild">
                  <label>Service fee</label>
                  <h6>0.0000 ETH</h6>
                </div>
                <div className="bal-feild">
                  <label>Total bid ammount</label>
                  <h6>0.0000 ETH</h6>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="custom-btn active">Place a bid</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </section>
      <section>
        <Row className="tab-section">
          <Col lg={6} sm={12}>
            <div className="creator-tabs">
              <Tabs className="tab-border" defaultActiveKey="first">
                <Tab eventKey="first" title="Overview">
                  <div>
                    <h3 className=" overview-space">
                      By{" "}
                      <span className="overview-title-color">Doodles_LLC</span>
                    </h3>
                    <h3 className="overview-title">Description</h3>
                    <p className="overview-text">
                      The Doodle-y matter in the Dooplicator appears to be
                      searching for new charges of utility for its owner.
                    </p>
                  </div>
                </Tab>
                <Tab eventKey="second" title=" Details">
                  <div>
                    <Row className="mt-5">
                      <Col lg={4}>
                        <label className="address-label">
                          Contract Address
                        </label>
                        <h4 className="overview-value mt-2">0x466c...13ac</h4>
                      </Col>
                      <Col lg={4}>
                        <label className="address-label">Token ID</label>
                        <h4 className="overview-value mt-2">1654</h4>
                      </Col>
                      <Col lg={4}>
                        <label className="address-label">Token Standard</label>
                        <h4 className="overview-value mt-2">ERC-721</h4>
                      </Col>
                    </Row>
                    <Row className="mt-5 update-address">
                      <Col lg={4}>
                        <label className="address-label">Chain</label>
                        <h4 className="overview-value mt-2">Ethereum</h4>
                      </Col>
                      <Col lg={4}>
                        <label className="address-label">Last Updated</label>
                        <h4 className="overview-value mt-2">5 hours ago</h4>
                      </Col>
                      <Col lg={4}>
                        <label className="address-label">
                          Creator Earnings
                        </label>
                        <h4 className="overview-value mt-2">5%</h4>
                      </Col>
                    </Row>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Col>
          <Col lg={6} sm={12} className="ps-2">
            <div className="ps-lg-4">
              <h3 className="property-title overview-space text-lg-start">
                Properties
              </h3>
              <Row>
                <Col lg={4} md={6} sm={6} efeed>
                  <div className="property-card mb-4">
                    <div className="p-2">
                      <span className="overview-title-color detail-card-label">
                        OG Wearables Charge
                      </span>
                      <span className="detail-card-label">Used</span>
                      <span className="card-sub-label">7% have this trait</span>
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={6} sm={6}>
                  <div className="property-card mb-4">
                    <div className="p-2">
                      <span className="overview-title-color detail-card-label">
                        Rarity
                      </span>
                      <span className="detail-card-label">Very Common</span>
                      <span className="card-sub-label">
                        67% have this trait
                      </span>
                    </div>
                  </div>
                </Col>

                <Col lg={4} md={6} sm={6}>
                  <div className="property-card mb-4  ">
                    <div className="p-2">
                      <span className="overview-title-color detail-card-label">
                        Space Doodles Charge
                      </span>
                      <span className="detail-card-label">Available</span>
                      <span className="card-sub-label">
                        100% have this trait
                      </span>
                    </div>
                  </div>
                </Col>
                <Col lg={4} md={6} sm={6}>
                  <div className="property-card mb-4">
                    <div className="p-2">
                      <span className="overview-title-color detail-card-label">
                        Type
                      </span>
                      <span className="detail-card-label">Dooplicator</span>
                      <span className="card-sub-label">
                        100% have this trait
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </section>
      <section className="my-5 detail-corousel detail-page pb-60">
        <h2 className="section-title text-dark">More from this collection</h2>
        <div className="corousel">
          <Carousel
            autoPlaySpeed={1000}
            infinite
            responsive={responsive}
            className="corousel-arrows"
          >
            <div className="creator-card">
              <Link className="nav-link" to={"/createby"}>
                <Card className="creator-bg">
                  <div className="card-fixes">
                    <Image
                      src={creatorcard}
                      className="creator-img card-img"
                      alt=""
                    />
                  </div>
                  <Card.Body>
                    <Card.Text>OriginalMyths#443</Card.Text>
                    <Card.Title>Original Myths NFT</Card.Title>
                  </Card.Body>
                  <div className="card-footer">
                    <div className="footer-price">
                      <span>Price</span>
                      <div className="">0.003 ETH</div>
                    </div>
                    <div className="footer-price">
                      <span>Highest bid</span>
                      <div className="">1.17 wETH</div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            <div className="creator-card">
              <Link className="nav-link" href={"/createby"}>
                <Card className="creator-bg">
                  <div className="card-fixes">
                    <Image
                      src={creatorcard1}
                      className="creator-img card-img"
                      alt=""
                    />
                  </div>
                  <Card.Body>
                    <Card.Text>OriginalMyths#443</Card.Text>
                    <Card.Title>Original Myths NFT</Card.Title>
                  </Card.Body>
                  <div className="card-footer">
                    <div className="footer-price">
                      <span className="detail-text">Price</span>
                      <div className="">0.003 ETH</div>
                    </div>
                    <div className="footer-price">
                      <span className="detail-text">Highest bid</span>
                      <div className="">1.17 wETH</div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            <div className="creator-card">
              <Link className="nav-link" to={"/createby"}>
                <Card className="creator-bg">
                  <div className="card-fixes">
                    <Image
                      src={creatorcard2}
                      className="creator-img card-img"
                      alt=""
                    />
                  </div>
                  <Card.Body>
                    <Card.Text>OriginalMyths#443</Card.Text>
                    <Card.Title>Original Myths NFT</Card.Title>
                  </Card.Body>
                  <div className="card-footer">
                    <div className="footer-price">
                      <span className="detail-text">Price</span>
                      <div className="">0.003 ETH</div>
                    </div>
                    <div className="footer-price">
                      <span className="detail-text">Highest bid</span>
                      <div className="">1.17 wETH</div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            <div className="creator-card">
              <Link className="nav-link" href={"/createby"}>
                <Card className="creator-bg ">
                  <div className="card-fixes">
                    <Image
                      src={creatorcard3}
                      className="creator-img card-img"
                      alt=""
                    />
                  </div>
                  <Card.Body>
                    <Card.Text>OriginalMyths#443</Card.Text>
                    <Card.Title>Original Myths NFT</Card.Title>
                  </Card.Body>
                  <div className="card-footer">
                    <div className="footer-price">
                      <span className="detail-text">Price</span>
                      <div className="">0.003 ETH</div>
                    </div>
                    <div className="footer-price">
                      <span className="detail-text">Highest bid</span>
                      <div className="">1.17 wETH</div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            <div className="creator-card">
              <Link className="nav-link" to={"/createby"}>
                <Card className="creator-bg  ">
                  <div className="card-fixes">
                    <Image
                      src={creatorcard4}
                      className="creator-img card-img"
                      alt=""
                    />
                  </div>
                  <Card.Body>
                    <Card.Text>OriginalMyths#443</Card.Text>
                    <Card.Title>Original Myths NFT</Card.Title>
                  </Card.Body>
                  <div className="card-footer">
                    <div className="footer-price ">
                      <span className="detail-text">Price</span>
                      <div className="">0.003 ETH</div>
                    </div>
                    <div className="footer-price">
                      <span className="detail-text">Highest bid</span>
                      <div className="">1.17 wETH</div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            <div className="creator-card">
              <Link className="nav-link" to={"/createby"}>
                <Card className="creator-bg">
                  <div className="card-fixes">
                    <Image
                      src={creatorcard5}
                      className="creator-img card-img"
                      alt=""
                    />
                  </div>
                  <Card.Body>
                    <Card.Text>OriginalMyths#443</Card.Text>
                    <Card.Title>Original Myths NFT</Card.Title>
                  </Card.Body>
                  <div className="card-footer">
                    <div className="footer-price">
                      <span className="detail-text">Price</span>
                      <div className="">0.003 ETH</div>
                    </div>
                    <div className="footer-price">
                      <span className="detail-text">Highest bid</span>
                      <div className="">1.17 wETH</div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </Carousel>
        </div>
      </section>
    </div>
  );
}
