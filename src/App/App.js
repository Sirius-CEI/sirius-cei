import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from '../components/Nav';
import Routes from './Routes';
import FooterNav from '../components/FooterNav';
import Footer from '../components/Footer';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAt, faChartArea, faChevronDown, faEdit, faFileCsv, faFileUpload, faHome, faInfo, faPhone, faPlus, faSignInAlt, faSignOutAlt, faThLarge, faTrash, faUserCircle, faUserCog, faUsers } from '@fortawesome/free-solid-svg-icons'
library.add(faAt, faChartArea, faChevronDown, faEdit, faFileCsv, faFileUpload, faHome, faInfo, faPhone, faPlus, faSignInAlt, faSignOutAlt, faThLarge, faTrash, faUserCircle, faUserCog, faUsers)

class App extends Component {
	componentDidMount() {
		this.props.dispatch({
			type: 'GET_OUTCOME_AREAS',
		});
		this.props.dispatch({
			type: 'GET_GEO_DATA'
		});
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
