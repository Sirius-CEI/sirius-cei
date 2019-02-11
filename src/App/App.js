import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchOutcomeAreas, fetchIndicators, getInitialData } from '../redux/actions';
import './fontawesome';

import Nav from '../components/Nav';
import Routes from './Routes';
import Footer from '../components/Footer';
import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.getInitialData();
	}

  render() {
    return (
			<Router>
				<div>
					<Nav />
					<Routes />
					<Footer />
				</div>
			</Router>
		)
  }
}

App.propTypes ={ 
	getInitialData: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ state })

export default connect(mapStateToProps, {getInitialData})(App);
