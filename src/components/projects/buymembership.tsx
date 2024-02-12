import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import styles from "./projectdetails.module.css";
import silver from "../../assets/images/silver.png";
import Gold from "../../assets/images/gold.png";
import platinum from "../../assets/images/platinum.png";
import activeSilver from "../../assets/images/silver-active.png";
import activeGold from "../../assets/images/gold-active.png";
import activePlatinum from "../../assets/images/platinum-active.png";
import success from "../../assets/images/success.png";
import MaticInput from "../inputs/maticforminput";
import Button from "../../ui/Button";
import { Modal, modalActions } from "../../ui/Modal";
// import BuyMembershipShimmers from '../loaders/buyMembershipShimmer';

const BuyMembership = () => {
  const [currMembership, setCurrMembership] = useState(null);
  const handleMembership = (membership) => {
    if (membership.name === currMembership?.name) {
      setCurrMembership(null);
      return;
    }
    setCurrMembership(membership);
  };
  const memberships = [
    {
      name: "Silver",
      url: `${silver}`,
      activeUrl: `${activeSilver}`,
      price: 1,
    },
    { name: "Gold", url: `${Gold}`, activeUrl: `${activeGold}`, price: 2},
    {
      name: "Platinum",
      url: `${platinum}`,
      activeUrl: `${activePlatinum}`,
      price: 3,
    },
  ];

  const handleModalShow = () => {
    modalActions("my_modal_5", "open");
  };
  return (
    <div className="container mx-auto">
      <h1 className="font-semibold mb-4 text-2xl text-secondary">
        Buy Memb<span className={`text-primary`}>ership</span>
      </h1>
      <h2 className="text-base font-semibold mb-2 text-secondary">
        Select Your Subscription Plan
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {memberships.map((membership) => (
          <div
            key={membership.name}
            className={`card border justify-between ${
              currMembership?.name === membership.name
                ? "border-primary !bg-info-content"
                : "border cursor-pointer !bg-primary-content"
            }`}
            onClick={() => handleMembership(membership)}
          >
            <h1 className="font-semibold text-2xl text-center mt-8 mb-5 text-secondary">
              {membership.name}
            </h1>
            <div className="text-center  mb-10">
              <Image
                src={
                  membership.name === currMembership?.name
                    ? membership.activeUrl
                    : membership.url
                }
                className="mx-auto"
              />
            </div>
            <div
              className={`${
                membership.name === currMembership?.name &&
                `bg-primary rounded-tl-0 rounded-tr-0 rounded-br-xl rounded-bl-xl ${styles.maticActive}`
              }  border-t cursor-pointer py-4 px-6 text-center`}
            >
              <span
                className={`${
                  membership.name === currMembership?.name
                    ? styles.activeShop
                    : styles.shop
                } icon mr-2`}
              ></span>
              <span
                className={`${
                  membership.name === currMembership?.name
                    ? "text-base-100"
                    : "text-secondary opacity-80 "
                } text-base font-semibold`}
              >
                Buy Now {membership.price}MATIC
              </span>
            </div>
          </div>
        ))}
        <div>{/* <BuyMembershipShimmers /> */}</div>
      </div>
      {currMembership && (
        <div className="mt-7 text-center">
          <h1 className="text-lg font-semibold text-secondary">
            About {currMembership?.name?.toLowerCase()} membership
          </h1>
          <p className="mt-2 mb-6 text-secondary">
            we’re building a DAO where members collaborate to create the
            videos.The DAO presents an incredible opportunity to shape the
            future of fighting games.
          </p>
          <MaticInput value={currMembership?.price} />
          <div className="text-right mt-5 max-sm:text-center">
            <Button
              type="primary"
              handleClick={handleModalShow}
              btnClassName=""
            >
              MINT For Membership Pass
            </Button>
          </div>
        </div>
      )}

      <Modal id={"my_modal_5"}>
        <div className="">
          <div className="flex justify-between items-center  mb-5">
            <h3 className="font-semibold text-lg mb-5"></h3>
          </div>
          <div className="text-center">
            <img className="mx-auto" src={success} />
            <h1 className={`text-success text-3xl font-semibold mt-5 mb-2`}>
              Congratulations!
            </h1>
            <p className="text-lg">0x4a9Df2CF...37c33929A</p>
            <p className="text-base mt-6 mb-8">
              Your{" "}
              <span className="font-semibold">
                mint for membership pass Registration
                <br /> is Successfull
              </span>{" "}
            </p>
            <p className={`text-secondary opacity-60`}>
              We will Get back to you Soon.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BuyMembership;
