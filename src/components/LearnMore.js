import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import 'typeface-lato';
import Grid from '@material-ui/core/Grid';
import { Typography, CardMedia, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'grey',
  },
  title: {
    marginBottom: '5vh'
  },
  graph: {
    padding: '1%'
  },
  card: {
    maxWidth: 290,
    height: 280,
    padding: '2%',
    margin: '1%',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
    borderRadius: 5,
  },
  image: {
    maxWidth: 290,
    height: 180,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class LearnMore extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'GET_CARDS'});
  }

  render() {
    const { classes } = this.props;
      return (
        <div className={classes.root}>
        <Typography variant="display1">
            What you can do
        </Typography>
          <Grid container spacing={12}>

          {this.props.cards.map( (cards, index) => (
                  <Grid key={index} className={classes.card} item xs={3}>
                  <CardContent style={{backgroundColor: 'white', fontSize: 30, padding: 2}}>{cards.title}</CardContent>
                  <CardMedia className={classes.image} image={cards.image}>
                    
                    <a target='blank' href={cards.url}>
                    <Button variant='contained'>Read More</Button>
                    </a>
                    </CardMedia>
                  </Grid>
                ))}

          </Grid>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  cards: state.cards,
});

LearnMore.propTypes = {
  classes: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(LearnMore));