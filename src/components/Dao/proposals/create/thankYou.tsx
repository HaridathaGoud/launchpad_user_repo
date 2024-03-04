import React from "react";
import success from "../../../../assets/images/thank-you.svg";
const ThankYou = () => {
  return (
    <div className="container mx-auto pt-5">
      <div className="text-center">
        <img src={success} className="mx-auto" alt="Successful!" />
        <h1 className="text-success font-bold text-lg mt-3">Thank You</h1>
        <p className="mb-5 text-secondary">
          Your proposal is submitted successfully!
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
