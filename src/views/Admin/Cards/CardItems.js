import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '@material-ui/core/Modal';
import EditCard from './EditCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    img: {
        height: 'auto',
        width: 'auto',
        maxHeight: '150px',
        maxWidth: '200px',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    projectsDiv: {
        display: 'flex',
    },
    cardStyle: {
        
        padding: '2%',
        margin: '1%',
        display: 'inline-block',
        width: '100%',
        textAlign: 'center',
        maxHeight: 250,
    }
  });
class CardItems extends Component {

    deleteCard = (id) => {
        console.log('Delete Card id: ', id);
        this.props.dispatch( { type: 'DELETE_CARD', payload: id } );
    }

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    
      handleClose = () => {
        this.setState({ open: false });
    };

    rand = () => {
        return Math.round(Math.random() * 20) - 10;
    }

    getModalStyle = () => {
        const top = 50 + this.rand();
        const left = 50 + this.rand();
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.projectsDiv}>
            <Grid container spacing={12}>
                {this.props.cards.map( (card, index) => {
                    return (
                    <div key={index}>
                    <Grid  item xs={8}>
                        <Card className={classes.cardStyle} id="display">
                        <Typography>
                                <h2>{card.title}</h2>
                            </Typography>
                            <CardMedia image={card.image}>
                                
                                <Button 
                                    color="primary" 
                                    variant="contained">
                                    <a 
                                        className="project-link-button" 
                                        href={card.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Read More
                                    </a>
                                </Button>
                                <Typography>
                                Showing on Page {card.name}
                                </Typography>
                            </CardMedia>
                        </Card>
                        <Button onClick={this.handleOpen}>Edit</Button>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                        <div style={this.getModalStyle()} className={classes.paper}>
                            <h2 id="add_card_popup">Edit Card</h2>
                            <EditCard card={card} cardId={card._id} handleClose={this.handleClose} />
                        </div>
                        </Modal>                        
                        <Button onClick={() => this.deleteCard(card._id)}>Delete</Button>
                        </Grid>
                    </div>
                )
            })}
            </Grid>
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


