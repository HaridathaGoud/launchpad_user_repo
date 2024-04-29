import React from "react";
import BreadCrumb from "../../ui/breadcrumb";
import ProjectCardComponent from "./projectCards";
import ApplyNow from "../applynow";

export default function Project() {
  return (
    <>
      <div className="container mx-auto px-3 lg:px-0 mt-3 mb-8">
        <BreadCrumb />
        <ProjectCardComponent />
      </div>
      <ApplyNow />
    </>
  );
}
