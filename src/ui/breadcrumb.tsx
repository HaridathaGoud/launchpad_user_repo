import React from "react";
import NaviLink from "./NaviLink";
const BreadCrumb = () => {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <NaviLink path="/dashboard">Dashboard</NaviLink>
        </li>
        <li>
          <NaviLink path="/projects">Projects</NaviLink>
        </li>
        <li>Add Document</li>
      </ul>
    </div>
  );
};

export default BreadCrumb;
