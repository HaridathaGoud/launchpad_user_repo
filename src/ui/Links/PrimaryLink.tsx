import React from 'react'
import { Link, useLocation } from 'react-router-dom'
interface PrimaryLinkProps{
  path:string;
  children?:any;
}
const PrimaryLink = ({path,children}:PrimaryLinkProps) => {
    const location=useLocation();
  return <Link to={path} className={` ${location.pathname===path ? 'active' : ''} block py-2 font-semibold px-4 text-base hover:text-primary hover:bg-transparent`}>{children}</Link>
}

export default PrimaryLink