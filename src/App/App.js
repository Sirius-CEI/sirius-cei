import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from '../components/Nav';
import Routes from './Routes';
import FooterNav from '../components/FooterNav';
import Footer from '../components/Footer';
import './App.css';
import LearnMore from '../components/LearnMore';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAt, faChartArea, faChevronDown, faEdit, faFileCsv, faFileUpload, faHome, faInfo, faPhone, faPlus, faSignInAlt, faSignOutAlt, faThLarge, faTimes, faTrash, faUserCircle, faUserCog, faUsers, faSmile, faFrown, faMeh } from '@fortawesome/free-solid-svg-icons'
library.add(faAt, faChartArea, faChevronDown, faEdit, faFileCsv, faFileUpload, faHome, faInfo, faPhone, faPlus, faSignInAlt, faSignOutAlt, faThLarge, faTimes, faTrash, faUserCircle, faUserCog, faUsers, faSmile, faFrown, faMeh )


class App extends Component {
	componentDidMount() {
		this.props.dispatch({
			type: 'GET_DATA',
			main: 'LOAD_DATA'
		});
	}

  render() {
    return (
			<Router>
				<div>
					<Nav />
					<Routes />
					<LearnMore />
					<FooterNav />
					<Footer />
				</div>
			</Router>
		)
  }
}

const mapStateToProps = state => ({ state })

export default connect(mapStateToProps)(App);
