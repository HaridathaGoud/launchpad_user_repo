import React, { useState } from 'react';
import '../../assets/css/custom-styles.css'; // Make sure to import or include your CSS file
import { Outlet } from 'react-router-dom';
import Header from '../modules/Header/Header';

const Sidebar: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState<string>('0');
  const [mainMarginLeft, setMainMarginLeft] = useState<string>('0');

  const openNav = () => {
    setSidebarWidth('250px');
    setMainMarginLeft('250px');
  };

  const closeNav = () => {
    setSidebarWidth('0');
    setMainMarginLeft('0');
  };

  return (
    <div>
      <div id="mySidebar" className="sidebar" style={{ width: sidebarWidth }}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          ×
        </a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>

      <div id="main" style={{ marginLeft: mainMarginLeft }}>
        <button className="openbtn" onClick={openNav}>
          ☰ Open Sidebar
        </button>
        <h2>Collapsed Sidebar</h2>
        <p>
            
        <Outlet />
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
