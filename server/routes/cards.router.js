const express = require('express');
const router = express.Router();
const Card = require('../models/cards.model');

//GET route to get Cards from database
router.get('/', (req, res) => {
    Card.find({})
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            console.log(`Error making Card GET query`, error);
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
            console.log(`Error making Card GET query`, error);
            res.sendStatus(500);
        })
});


//POST route to add Card to database
router.post('/', (req, res) => {
    const newCard = req.body;
    console.log('new card req.body', newCard);
    Card.create(newCard)
        .then( (results) => {
            // console.log('Card POST results ',results);
            res.sendStatus(201);
        })
        .catch( (error) => {
            console.log('Error making Card POST query', error);
            res.sendStatus(500);
        })
});

// PUT route to edit card
router.put('/:id', (req, res) => {
    let updateCard = req.body;
    // console.log('update card:', req.body);
    Card.findByIdAndUpdate({
        _id: req.params.id
    }, updateCard)
    .then((results) => {
    // console.log(`Success updating Card`, results);
    res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`Error making database UPDATE`, error);
        res.sendStatus(500);
    })
})

// DELETE route to remove a card
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    // console.log('Delete card request for id', req.params);
    Card.findOneAndDelete({
        _id: reqId
    })
        .then( (removedDocument) => {
            // console.log('delete results', removedDocument);
            res.sendStatus(200)
        })
        .catch( (error) => {
            console.log('delete error', error);
            res.sendStatus(500)
        })
}) 

module.exports = router;