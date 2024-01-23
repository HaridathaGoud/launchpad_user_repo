import React from 'react';
import logoWhite from '../../../assets/images/yb-logo.png';
import {Image} from 'react-bootstrap';

import { get } from '../../../utils/api';
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {
  const [sociallinks, getSocialLinks] = useState<any[]>([]);
  const shouldLog = useRef(true);
  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      getSocialMediaLinks();
    }
  }, []);
  const getSocialMediaLinks = async () => {
    let response = await get('User/getsocialwebsites');
    if (response) {
      getSocialLinks(response.data);
    }
  };

  const handleSocialLink = (item: any) => {
    if (item.name == 'YouTube') {
      window.open(item.link);
    } else if (item.name == 'Mike') {
      window.open(item.link);
    } else if (item.name == 'Facebook') {
      window.open(item.link);
    } else if (item.name == 'Linkedin') {
      window.open(item.link);
    } else if (item.name == 'Telegram') {
      window.open(item.link);
    } else if (item.name == 'Twitter') {
      window.open(item.link);
    } else if (item.name == 'Instagram') {
      window.open(item.link);
    }
  };
  return (
    <div className="container">
      <div className="footer-section">
        <div className="row">
          <div className="col-xs-12 col-md-12 col-lg-6 col-xl-2 footer-logo">
            <Image src={logoWhite} alt="logo" />
            {/* <span className="logo-text">Yellowblock</span> */}
          </div>
          <div className="col-xs-12 col-md-12 col-lg-6 col-xl-5">
            <p className="footer-para">
              minnapad is a decentralised multi-chain fundraising platform that allows projects to raise capital while
              assuring early-stage investors of their safety. Stake minnapad tokens to get priority access to promising
              projects.
            </p>
          </div>
          <div className="col-xs-12 col-md-12 col-lg-12 col-xl-5">
            <div className="footer-style">
              <div className="footer-social">JOIN THE COMMUNITY</div>
              <div className="banner-smmicons c-pointer">
                {sociallinks.map((item) => (
                  <>
                    <span
                      onClick={() => handleSocialLink(item)}
                      className={`icon md ${
                        (item.name == 'YouTube' && 'yb') ||
                        (item.name == 'Mike' && 'sound') ||
                        (item.name == 'Facebook' && 'fb') ||
                        (item.name == 'Linkedin' && 'linkdin') ||
                        (item.name == 'Telegram' && 'tlgrm') ||
                        (item.name == 'Twitter' && 'tw') ||
                        (item.name == 'Instagram' && 'insta')
                      }`}
                    ></span>
                  </>
                ))}
              </div>
            </div>
            <div className="mb-3 d-flex footer-btn">
              <input
                type="email"
                placeholder="Your Email Address"
                className="form-control cust-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
              <div className="banner-btn">
                <div className="button-border"></div>
                <button type="button" className="custom-button">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-group mb-4">
          <Link to="/projects" className="footer-pro">
            Projects
          </Link>
          <Link to="/staking" className="footer-pro">
            Staking
          </Link>
          <Link to="/faq" className="footer-pro">
            FAQs
          </Link>
          <Link to="/aboutus" className="footer-pro">
            About Us
          </Link>
        </div>
      </div>
      <div className="sub-footer">
        <div className="mb-top">© Copyright minnapad 2023. All rights reserved.</div>
        <div>
          <span className="privacy-link">
            <a href="#" className="footer-pro">
              Privacy Policy
            </a>
          </span>
          <span className="">
            <a href="#" className="footer-pro">
              Terms & Services
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
