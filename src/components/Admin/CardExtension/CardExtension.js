import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import AddCard from './AddCard';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardItems from './CardItems';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
  });

class CardExtension extends Component {

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

    // handle open of drop down menu
    handleOpen = () => {
        this.setState({
            open: true
        });
    };
    
    // handle close of drop down menu
    handleClose = () => {
        this.setState({
            open: false 
        });  
    };

    // remove project
    deleteCard = (id) => {
        console.log('In delete card function', id);
        this.props.dispatch( { type: 'DELETE_CARD', payload: id } );
    }

    // display cards on page load
    componentDidMount() {
        this.getCards();
    }

    // get projects from server
    getCards() {
        console.log('dispatching GET_CARDS');
        this.props.dispatch( { type: 'GET_CARDS' } );
    }

    // Edit cards
    editCard() {
        this.props.dispatch( { type: 'EDIT_CARD' } );
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button onClick={this.handleOpen}>Add Card</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <h2 id="add_card_popup">Add A Card</h2>
                    <AddCard handleClose={this.handleClose} />
                </div>
                </Modal>
                <br></br>
                <CardItems />
            </div>
        );
    }
}

CardExtension.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
  reduxState
});

export default compose(
    connect(mapReduxStateToProps),
    withStyles(styles)
)(CardExtension);
