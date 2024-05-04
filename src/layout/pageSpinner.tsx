import React from "react";
import Spinner from "../components/loaders/spinner";

const PageSpinner = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default PageSpinner;
