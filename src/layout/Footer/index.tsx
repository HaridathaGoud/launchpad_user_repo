import React from "react";
import logo from "../../assets/images/yb-logo-white.svg";
import NaviLink from "../../ui/NaviLink";
const FooterComponent = () => {
  return (
    <>
      <footer
        className={`footer grid !lg:grid-cols-7 max-sm:pt-10 md:pt-20 text-base-content container mx-auto px-3 lg:px-0`}
      >
        <aside className="lg:col-span-2">
         <div className="lg:flex">
         <img src={logo} alt="YellowBlock" className="w-8 mr-3" />
          <p className="mt-4 mb-2	text-secondary">
            OTT typically refers to the delivery of
            <br /> media content over the internet
            <br /> without the involvement of traditional <br />
            broadcast or cable television providers.
          </p>
         </div>
          <div className="grid grid-cols-6 gap-3">
            <a
              href="https://twitter.com/YellowblockNet"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className={`twitter icon`}></span>
            </a>
            <a
              href="https://www.facebook.com/YellowblockNet/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className={`facebook icon`}></span>
            </a>
            <a
              href="https://www.instagram.com/yellowblock_software_sols/"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className={`insta icon`}></span>
            </a>
            <a
              href="https://t.me/yellowblock_software_solutions"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className={`telegram icon`}></span>
            </a>
            <a
              href="https://discord.gg/Ud5EmQtw"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <span className={`discord icon`}></span>
            </a>
            <a href="https://yellowblock.net/" target="_blank" rel="noreferrer">
              {" "}
              <span className={`globe icon`}></span>
            </a>
          </div>
        </aside>
        <nav>
          <header className="text-secondary font-semibold">NAVIGATION</header>
          <NaviLink
            path="https://yellowblock.net/portfolio/"
            target="_blank"
            rel="noreferrer"
            type="footerNav"
          >
            Projects
          </NaviLink>
          <NaviLink
            path="/aboutus"
            type="footerNav"
          >
            About Us
          </NaviLink>
          <NaviLink
            path="https://yellowblock.net/"
            target="_blank"
            rel="noreferrer"
            type="footerNav"
          >
            Faq's
          </NaviLink>
          <NaviLink
            path="https://yellowblock.net/contact/"
            target="_blank"
            rel="noreferrer"
            type="footerNav"
          >
            Contact
          </NaviLink>
        </nav>
        <nav>
          <header className="text-secondary font-semibold">LEGAL</header>
          <NaviLink
            path="https://yellowblock.net/"
            type="footerNav"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </NaviLink>
          <NaviLink
            path="https://yellowblock.net/"
            type="footerNav"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </NaviLink>
          <NaviLink
            path="https://yellowblock.net/"
            type="footerNav"
            target="_blank"
            rel="noreferrer"
          >
            Cookie Preferences
          </NaviLink>
          <NaviLink
            path="https://yellowblock.net/"
            type="footerNav"
            target="_blank"
            rel="noreferrer"
          >
            Corporate Information
          </NaviLink>
        </nav>
        <nav>
          <header className="text-secondary font-semibold">TALK TO US</header>
          <a
            className="text-secondary opacity-60"
            href="mailto:contact@yellowblock.net"
          >
            contact@yellowblock.net
          </a>
          <span className="text-secondary opacity-60">Ph:+91 8390150032</span>
        </nav>
      </footer>
      <div className="pb-4 pt-12">
        <p className="text-center text-secondary text-xs">
          &copy; Copyright 2023 DOTT. All rights reserved.
        </p>
      </div>{" "}
    </>
  );
};
export default FooterComponent;
