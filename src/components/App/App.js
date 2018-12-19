import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

//Protected Components
import AdminHome from '../Admin/AdminHome';

//Non Protected Components
import Macro from '../Macro/Macro';
import EconomicDevelopment from '../EconomicDevelopment/EconomicDevelopment';
import HumanCapitol from '../HumanCapitol/HumanCapitol';
import AccessTransit from '../AccessTransit/AccessTransit';
import AnnualRelease from '../AnnualRelease/AnnualRelease';
import Footer from '../Footer/Footer';

//Nav Bar Components
import Nav from '../Nav/Nav';
import SideDrawer from '../Nav/SideDrawer';
import Backdrop from '../Nav/Backdrop';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
    this.props.dispatch({type: 'FETCH_CSV'});
  }

  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  render() {

    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    return (
      <Router>
        <div>
        <div style={{height: '100%'}}>
        <Nav drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer show={this.state.sideDrawerOpen} />
        {backdrop}
          </div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            <Route
              exact
              path="/home"
              component={AnnualRelease}
            />
            <Route
              exact
              path="/macro"
              component={Macro}
            />
            <Route
              exact
              path="/economic-development"
              component={EconomicDevelopment}
            />
            <Route
              exact
              path="/human-capitol"
              component={HumanCapitol}
            />
            <Route
              exact
              path="/access-transit"
              component={AccessTransit}
            />
            <ProtectedRoute
              exact
              path="/admin"
              component={AdminHome}
            />
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

const mapReduxStateToProps = reduxState => ({
  csv: reduxState.csv,
});

export default connect(mapReduxStateToProps)(App);
