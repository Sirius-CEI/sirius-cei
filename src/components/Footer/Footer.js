import React from 'react';
import 'typeface-lato';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    textAlign: 'center'
  },
  footer: {
    marginTop: '4vh',
    marginBottom: '2vh',
    position: 'absolute',
    verticalAlign: 'bottom',
    width: '100%',
  },
  card: {
    height: 180,
    maxWidth: 290,
    margin: '1%',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
  },
  media: {
    height: '100%'
  },
  cardTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 700,
    fontFamily: 'Lato',
    lineHeight: '1em',
    paddingTop: 50,
    paddingBottom: 25,
  },
  footerTitle: {
    color: '#4c2a74',
    textTransform: 'uppercase',
    letterSpacing: '1.53px',
    lineHeight: '1em',
    fontFamily: 'Lato',
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: '30px',
    textAlign: 'center',
    paddingBottom: '1.5%'
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  button: {
    borderRadius: 50,
    fontSize: 15,
    fontWeight: 500,
    textTransform: 'lowercase',
    marginTop: 0,
    backgroundColor: 'white',
    "&:hover": {
      backgroundColor: 'white',
      border: '2px solid #4c2a74'
    },
  },
  contact: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    letterSpacing: '1.53px',
    lineHeight: '2em',
    marginTop: '10px',
    fontSize: 15,
    }
};

const Footer = (props) => {

  const { classes } = props;

  return (
    <footer className={classes.footer}>
      <div className={classes.footerTitle}>See the full impact</div>

      <div className={classes.root}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="images/macro.jpeg"
            title="macro">
            <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
              Macro
            </Typography>
            <Button className={classes.button}>
              <Link className={classes.link} to="/macro">Read More</Link>
            </Button>
          </CardMedia>
        </Card>

        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="images/economic-development.jpeg"
            title="economic-development">
            <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
              Economic Development
            </Typography>
            <Button className={classes.button}>
              <Link className={classes.link} to="/economic-development">Read More</Link>
            </Button>
          </CardMedia>
        </Card>

        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="images/human-capital.jpeg"
            title="human-capital">
            <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
              Human Capital
            </Typography>
            <Button className={classes.button}>
              <Link className={classes.link} to="/human-capital">Read More</Link>
            </Button>
          </CardMedia>
        </Card>

        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="images/access-transit.jpeg"
            title="access-transit">
            <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
              Access & Transit
            </Typography>
            <Button className={classes.button}>
              <Link className={classes.link} to="/access-transit">Read More</Link>
            </Button>
          </CardMedia>
        </Card>
      </div>

      <Grid className={classes.contact}>
        <div>(612) 351-8200</div> 
        <div>info@centerforeconomicinclusion.org</div>
      </Grid>
    </footer>
  )
};

Footer.propTypes = {
  classes: propTypes.object.isRequired,
};

export default (withStyles(styles)(Footer));
