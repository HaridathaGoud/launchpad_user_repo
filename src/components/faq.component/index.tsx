import React from 'react';
import { Accordion, Row, Col, Form } from 'react-bootstrap';
export default function Faqs() {
  return (
    <>
      <div>
        <div className="container my-5 py-5">
          <h2 className="faq-subheading title-green text-center">FAQ</h2>
          <h1 className="faq-heading text-center">Frequently Asked Questions</h1>
          <hr className="hr-center"></hr>
          <div className="accord-sec">
            {/* <Row>
              <Col lg={7} className="pe-5"> */}
            <Accordion defaultActiveKey="0" className="mt-5">
              {/* <Accordion.Item eventKey="0">
                <Accordion.Header className="profile-title">What is Artha? </Accordion.Header>
                <Accordion.Body>
                  minnapad is a decentralized fundraising platform that allows startups in the web3 realm to raise funds
                  for their projects by attracting potential investors in the community. To put it simply, minnapad is a
                  tier-based IDO (Initial DEX Offering) platform that allows promising projects to meet the ideal
                  investors.
                </Accordion.Body>
              </Accordion.Item> */}
              <Accordion.Item eventKey="1">
                <Accordion.Header className="profile-title">What is Minna Token? </Accordion.Header>
                <Accordion.Body>
                  DOTT is the native currency of the Minna blockchain.
                  DOTT tokens are required to stake and produce blocks on the Minna blockchain.
                  They’re also the exclusive currency of the Snarketplace,
                  which is used by block producers and SNARK producers to buy and sell SNARK proofs.
                </Accordion.Body>
              </Accordion.Item>
              {/* <Accordion.Item eventKey="2">
                <Accordion.Header className="profile-title">
                  How do investors get access to the projects? 
                </Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item> */}
              <Accordion.Item eventKey="3">
                <Accordion.Header className="profile-title">
                  How do Stakers get access to the projects? 
                </Accordion.Header>
                <Accordion.Body>
                  Since minnapad is a tier-based platform, Stakers have to stake the required quantity of Minna tokens
                  to qualify for a tier. Once they belong to a particular tier, they will get automatic access to the
                  allocation round, where the project owners will automatically allocate a specific portion of project
                  tokens that can be swapped with staked Minna tokens.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header className="profile-title">What is the claiming/vesting cycle?  </Accordion.Header>
                <Accordion.Body>
                  It is the period that defines the interval on which the user can claim the new project tokens. This is
                  important for project owners because it prevents users from dumping a large quantity of their tokens
                  all of a sudden. To be precise, the vesting cycle acts as an anti-whale mechanism that will prevent
                  users from manipulating the value of the new project’s token.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header className="profile-title">
                  How many rounds does the platform have to facilitate the sale of new tokens?   
                </Accordion.Header>
                <Accordion.Body>
                  The platform has two rounds.
                  <ul>
                    <li> Allocation Round </li>
                    <li> First Come First Serve (FCFS) Round</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* </Col> */}
            {/* <Col lg={5}>
                <div className="img-border">
                  <Image src={faqimage} className="about-us-image" alt="" />
                </div>
                <div className="faq-inputs-bg"></div>
                <div className="faq-input-fields">
                  <h2 className="mb-5 faq-subheading">Ask a difficult question</h2>

                  <Form action="https://script.google.com/macros/s/AKfycbwrpzT-x-r_1_BL1hKqH_fpL9uxr1dnJvd3qktRAwXuNAs0oJa6PEIQqmo1q2iqmccQ/exec">
                    <Form.Group className="mb-5" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-5" controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Your Email Address" />
                    </Form.Group>
                    <Form.Group className="mb-5" controlId="formPlaintextEmail">
                      <Form.Control as="textarea" rows={5} placeholder="Message" />
                    </Form.Group>
                    <div className="faq-btn banner-btn">
                      <div className="faq-btn button-border"></div>
                      <button type="submit" className="custom-button">
                        Submit <span className="icon md btnarrow-black"></span>
                      </button>
                    </div>
                  </Form>
                </div>
              </Col> */}
            {/* </Row> */}
          </div>
        </div>
        {/* <FooterComponent /> */}
      </div>
    </>
  );
}
