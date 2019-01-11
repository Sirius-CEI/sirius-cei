import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { Card, CardHeader, CardActionArea, CardMedia, CardContent } from '@material-ui/core';


const styles = theme => ({
  root: {
    flexGrow: 1,
		backgroundColor: theme.palette.grey[500],
		padding: theme.spacing.unit * 3,
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: 180,
		width: 280,
	},
	text: {
		color: 'white'
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
    // this.props.dispatch({type: 'GET_CARDS'});
  }

  render() {
    const { classes, cards } = this.props;
      return (
        <div className={classes.root}>
					<Grid container spacing={24} justify="center">
						<Grid item xs={12}>
							<Typography align="center" variant="h4" className={classes.text}>
								What You Can Do
							</Typography>
						</Grid>
						{cards.map((card, index) => (
							<Grid item key={index}>
								<Card>
									<CardHeader
										title={card.title}
										titleTypographyProps={{
											variant: 'h5',
											align: 'center',
											color: 'inherit'
										}}
									/>
									<CardActionArea href={card.url} target="blank">
										<CardMedia
											image={card.image}
											title={card.title}
											className={classes.card}
										>
											<Chip
												clickable
												color="default"
												label="read more"
											/>
										</CardMedia>
									</CardActionArea>
								</Card>
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