import React from "react";
import BreadCrumb from "../../ui/breadcrumb";
import View from "./view";
import Tabs from "./tabs";
const Portfolio = () => {
  return (
    <div className="container mx-auto max-lg:px-3 mt-3 investments">
      <BreadCrumb />
      <View />
      <Tabs />
    </div>
  );
};

export default Portfolio;
