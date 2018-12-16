import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    img: {
        height: 'auto',
        width: 'auto',
        maxHeight: '150px',
        maxWidth: '200px',
    },
  });
class CardItems extends Component {
  render() {
    const { classes } = this.props;
    return (
        <div className="projects-div">
            {this.props.cards.map( (cards, index) => {
                return (
                <Card className="project-content" id="display" key={index}>
                    <CardMedia>
                    <img id="img" className={classes.img} src={cards.image} alt="thumbnail"/>
                    </CardMedia>
                    <CardContent>
                        <Typography>
                            <h2>{cards.title}</h2>
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Button 
                            color="primary" 
                            variant="contained">
                            <a 
                                className="project-link-button" 
                                href={cards.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Read More
                            </a>
                        </Button>
                    </CardContent>
                    <CardContent>
                        <Typography>
                            <div>Showing on Page {cards.name}</div>
                        </Typography>
                    </CardContent>
                </Card>
            )
        })}
        </div>
    );
  }
}

CardItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  cards: reduxState.cards,
});

export default compose(
    connect(mapReduxStateToProps),
    withStyles(styles)
)(CardItems);


