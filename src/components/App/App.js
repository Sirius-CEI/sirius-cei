import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from '../UI/Nav';
import Routes from './Routes';
import FooterNav from '../UI/FooterNav';
import Footer from '../UI/Footer';
import outcomeAreas from '../../redux/outcome-areas'
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faAt, faUserCog, faHome, faChartArea, faSignInAlt, faSignOutAlt, faInfo, faFileUpload, faFileCsv, faThLarge } from '@fortawesome/free-solid-svg-icons'
library.add(faPhone, faAt, faUserCog, faHome, faChartArea, faSignInAlt, faSignOutAlt, faInfo, faFileUpload, faFileCsv, faThLarge)

class App extends Component {
	componentDidMount() {
		this.props.dispatch({
			type: 'SET_OUTCOME_AREAS', payload: outcomeAreas,
		})
		this.props.dispatch({
			type: 'FETCH_USER'
		})		
	}

  render() {
    return (
			<Router>
				<div>
					<Nav />
					<Routes />
					<FooterNav />
					<Footer />
				</div>
			</Router>
		)
  }
}

export default connect()(App);
