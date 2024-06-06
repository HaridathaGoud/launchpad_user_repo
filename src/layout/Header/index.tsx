import React from 'react';
import Navbar from './navbar';
const Header = (props) => {
  return <Navbar changingAddress={props.changingAddress} handleDisconnect={props.onDisconnect} />;
};

export default Header;
