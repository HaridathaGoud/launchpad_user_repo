import React from "react";
import { Link, useLocation } from "react-router-dom";
interface LinkProps {
  path: string;
  children?: any;
  type?: string;
  className?: string;
  target?:string;
  rel?:string;
}

const LinkStylings = {
  primary:
    "block font-semibold text-base hover:text-primary hover:bg-transparent",
  footerNav: "text-secondary hover:text-primary opacity-60",
};
const NaviLink = ({ path, children, type, className,target,rel }: LinkProps) => {
  const location = useLocation();
  return (
    <Link
      to={path}
      target={target}
      rel={rel}
      className={`!p-0 ${className} ${
        location.pathname === path ? "active menu-active" : ""
      } ${
        type
          ? LinkStylings[type]
          : "block py-2 font-semibold px-4 text-base hover:text-primary hover:bg-transparent"
      }`}
    >
      {children}
    </Link>
  );
};

export default NaviLink;
