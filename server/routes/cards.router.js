const express = require('express');
const router = express.Router();
const Card = require('../models/cards.model');
const { rejectUnauthenticated } = require('../auth/authentication-middleware');

//GET route to get Cards from database
router.get('/', (req, res) => {
    Card.find({})
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
});

//GET route to get a single Card from database
router.get('/:id', (req, res) => {
    const cardId = req.params.id;
    Card.findById({cardId})
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
});


//POST route to add Card to database
router.post('/', rejectUnauthenticated, (req, res) => {
    const newCard = req.body;
    Card.create(newCard)
        .then( (results) => {
            res.sendStatus(201);
        })
        .catch( (error) => {
            res.sendStatus(500);
        })
});

// PUT route to edit card
router.put('/:id', rejectUnauthenticated, (req, res) => {
    let updateCard = req.body;
    Card.findByIdAndUpdate({
        _id: req.params.id
    }, updateCard)
    .then((results) => {
    res.sendStatus(200);
    })
    .catch((error) => {
        res.sendStatus(500);
    })
})

// DELETE route to remove a card
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let reqId = req.params.id;
    Card.findOneAndDelete({
        _id: reqId
    })
        .then( (removedDocument) => {
            res.sendStatus(200)
        })
        .catch( (error) => {
            res.sendStatus(500)
        })
}) 

module.exports = router;