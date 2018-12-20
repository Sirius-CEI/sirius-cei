import React from 'react';
import './Footer.css';

import 'typeface-lato';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

const styles = {
  card: {
    maxWidth: 345,
    margin: '20px',
    display: 'inline-block',
    width: '100%',
  },
  media: {
    height: 200,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 40,
    fontSize: 30,
    fontWeight: 700,
    fontFamily: 'Lato',
    lineHeight: '1em',
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
    marginTop: 45,
    backgroundColor: 'white',
    "&:hover": {
      backgroundColor: "white"
    }
  }
};

const Footer = (props) => {

  const { classes } = props;

  return (
    <footer>
      <div className="footer-title">See the full impact</div>
      <div className="cards">
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="images/macro.jpeg"
            title="macro">
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">
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
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">
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
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">
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
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">
              Access & Transit
            </Typography>
            <Button className={classes.button}>
              <Link className={classes.link} to="/access-transit">Read More</Link>
            </Button>
          </CardMedia>
        </Card>
      </div>

      <div className="contact">
        <span className="phone">(612) 351-8200</span> 
        <span className="email">info@centerforeconomicinclusion.org</span>
      </div>
    </footer>
  )
};

Footer.propTypes = {
  classes: propTypes.object.isRequired,
};

export default (withStyles(styles)(Footer));
