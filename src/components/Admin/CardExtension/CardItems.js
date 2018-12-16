import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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

    editCard = () => {
        console.log('Edit Card');
    }

    deleteCard = (id) => {
        console.log('Delete Card id: ', id);
        this.props.dispatch( { type: 'DELETE_CARD', payload: id } );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="projects-div">
                {this.props.cards.map( (cards, index) => {
                    return (
                    <div key={index}>
                        <Card className="project-content" id="display">
                            <CardMedia>
                                <img 
                                    id="img" 
                                    alt="card-action" 
                                    className={classes.img} 
                                    src={cards.image}
                                />
                            </CardMedia>
                            <CardContent>
                                <h2>{cards.title}</h2>
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
                                <div>Showing on Page {cards.name}</div>
                            </CardContent>
                        </Card>
                        <Button onClick={this.editCard}>Edit</Button>
                        <Button onClick={() => this.deleteCard(cards.id)}>Delete</Button>
                    </div>
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


