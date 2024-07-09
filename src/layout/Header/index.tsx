import React from 'react';
import Navbar from './navbar';
const Header = (props) => {
  return <Navbar handleDisconnect={props.onDisconnect} />;
};

export default Header;
