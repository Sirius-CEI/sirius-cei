import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import 'typeface-lato';
import DrawerToggleButton from './DrawerToggleButton';

const Nav = (props) => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
        <Link to="/"><img src={`/images/CEI_Logo.png`} className="toolbar-logo" alt="CEI"/></Link>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
          <ul>
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/macro">Macro Indicators</Link></li>
            <li><Link className="nav-link" to="/economic-development">Economic Development</Link></li>
            <li><Link className="nav-link" to="/human-capital">Human Capital</Link></li>
            <li><Link className="nav-link" id="nav-link-at" to="/access-transit">Access & Transit</Link></li>
          </ul>
        </div>
    </nav>
  </header>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
