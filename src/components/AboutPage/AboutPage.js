import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
// import Button from '@material-ui/core/Button';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
});

class AboutPage extends Component {

   // display annual releases on about page load
   componentDidMount() {
    this.getRelease();
  }

  // get annual releases from server
  getRelease() {
      console.log('dispatching GET_RELEASE');
      this.props.dispatch( { type: 'GET_RELEASE' } );
  }

  render() {
    const { classes } = this.props;
    const releaseOne = this.props.releases[0];
    // const releaseTwo = this.props.annualRelease[1];
    return (
        <div className={classes.div} id="form">
              {JSON.stringify(releaseOne)}
               <p>Macro Page</p>
               <GridList cellHeight={160} className={classes.gridList} cols={1}>
                {/* {this.props.releases.map( (releases, index) => (
                  <GridListTile key={index} cols={releases.cols || 1}>
                    <h3>{releases.header}</h3>
                  </GridListTile>
                ))} */}
                {releaseOne}
              </GridList>
              
        </div>
    );
  }
}

AboutPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  releases: reduxState.annualRelease
});

export default compose(
    connect(mapReduxStateToProps),
    withStyles(styles)
)(AboutPage);