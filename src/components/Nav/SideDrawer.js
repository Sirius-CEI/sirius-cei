import React from 'react';
import { Link } from 'react-router-dom';

import './SideDrawer.css';

const sideDrawer = props => {
  
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li><Link className="nav-link" to="/">Home</Link></li>
        <li><Link className="nav-link" to="/macro">Macro Indicators</Link></li>
        <li><Link className="nav-link" to="/economic-development">Economic Development</Link></li>
        <li><Link className="nav-link" to="/human-capitol">Human Capitol</Link></li>
        <li><Link className="nav-link" id="nav-link-at" to="/access-transit">Access & Transit</Link></li>
      </ul>
    </nav>
  );
};

export default sideDrawer;