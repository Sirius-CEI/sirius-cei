import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { Typography, CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';

const styles = theme => ({
    root: {
      maxWidth: '100%',
			height: 'auto',
    },
    title: {
      fontWeight: 700,
      color: 'white',
			textTransform: 'uppercase',
			margin: theme.spacing.unit * 2
    },
    card: {
      height: 450,
      flex: 1,
    },
    media: {
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
    },
  });

class TitleIndicator extends Component {

  backgroundImages = (title) => {  
    let image = "images/twincitiesblue.jpg"; 
    return image; 
  }

  render() {
    const { classes, title, route } = this.props;
      return (
        <div className={classes.root}>
            <Card className={classes.card} elevation={0} square>
                <CardMedia
                    className={classes.media}
                    image={`images/${route}.jpg`}
                    title="title-background">
                    <Typography variant="h3" align="center" className={classes.title}>{title}</Typography>
                </CardMedia>
            </Card>
        </div>
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

TitleIndicator.propTypes = {
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(TitleIndicator));