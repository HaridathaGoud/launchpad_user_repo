import React from "react";
import NaviLink from "./NaviLink";
const BreadCrumb = () => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <NaviLink path="/dashboard" className="!font-normal">Dashboard</NaviLink>
        </li>
        <li>
          <NaviLink path="/projects" className="!font-normal">Projects</NaviLink>
        </li>
        <li>Add Document</li>
      </ul>
    </div>
  );
};

export default BreadCrumb;
