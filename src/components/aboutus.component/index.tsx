import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {Image} from 'react-bootstrap';
import banner from '../../assets/images/banner-img.png';
import seichibanner from '../../assets/images/seichi.png';
import keijibanner from '../../assets/images/keiji.png';
import Carousel from 'react-bootstrap/Carousel';

export default function AboutUs() {
  return (
    <>
      <div className="about-bg">
        <div className="container pb-5">
          <Row className="align-items-center">
            <Col lg={6} className="lg-pe-5 pb-5">
              <h1 className="faq-heading">About Us</h1>
              <hr />
              <p className="regular-text">
                minnapad is a decentralized crowdfunding platform that makes potential projects join hands with
                strategic investors in the space. The platform yearns to bring a change in the web3 society by funding
                and supporting the growth of interesting, workable, and promising startups. We strive with an objective
                to connect project owners and ideal investors under one roof to revolutionize the market with
                sustainable economic growth. We are an adept crew of blockchain enthusiasts who have hands-on experience
                in the domain.
              </p>
            </Col>
            <div className="col-xl-5 col-xxl-5 col-md-6 banner-right-section">
              <Carousel >
              <Carousel.Item interval={1500}>
                <div className="new-banner">
                  <div className="slideimage">
                    <Image src={keijibanner} alt="" className="banner-slideimage" />
                  </div>
                </div>
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                <div className="new-banner">
                  <div className="slideimage">
                    <Image src={seichibanner} alt="" className="banner-slideimage" />
                  </div>
                </div>
                </Carousel.Item>
                </Carousel>
              </div>

            {/* shimmers start  */}

            {/* <Col lg={6} className="pe-5">
              <div className="md-d-flex justify-content-end">
                <div className="image-bgcard">
                  <Placeholder animation="glow">
                    <Placeholder className="banner-image" />
                  </Placeholder>
                </div>
              </div>
            </Col> */}

            {/* shimmers end  */}
          </Row>
        </div>
        {/* <FooterComponent /> */}
      </div>
    </>
  );
}
