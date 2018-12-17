// const express = require('express');
// // const pool = require('../modules/pool');
// const router = express.Router();

// // return all Cards
// router.get('/', (req, res) => {
//     console.log('in get cards router');
//     const queryText = 'SELECT cards.*, category.name as name FROM cards JOIN category ON cards.category_id = category.id';
//     pool.query(queryText)
//         .then((result) => { 
//             res.send(result.rows); 
//         })
//         .catch((error) => {
//             console.log('Error completing GET Cards query', error);
//             res.sendStatus(500);
//         });
//   });

// // add a Card
// router.post('/', (req, res) => {
//     console.log('post card info: ', req.body);
//     const addCard = req.body;
//     const queryText = `INSERT INTO cards ("title", "image", "url", "category_id")
//                     VALUES ($1, $2, $3, $4)`;
//     const queryValues = [
//         addCard.title,
//         addCard.image,
//         addCard.url,
//         addCard.category_id,
//     ];
//     pool.query(queryText, queryValues)
//       .then(() => { res.sendStatus(201); })
//       .catch((error) => {
//         console.log('Error completing Card POST query', error);
//         res.sendStatus(500);
//       });
//   });

// // PUT request to update card information
// router.put('/', (req, res) => {
//     const cardId = req.body.id;
//     console.log('card id: ', cardId);
//     const updateCard = req.body;
    
//     const queryText = `UPDATE cards
//     SET "title" = $1, 
//     "image" = $2, 
//     "url" = $3, 
//     "category_id" = $4
//     WHERE id=${cardId}
//     `;
  
//     const queryValues = [
//         updateCard.title,
//         updateCard.image,
//         updateCard.url,
//         updateCard.category_id
//     ];
  
//     pool.query(queryText, queryValues)
//         .then(() => { 
//             console.log('success editing card');
//             res.sendStatus(200); 
//         })
//         .catch((error) => {
//             console.log('Error updating Card query', error);
//             res.sendStatus(500);
//         });
//   });

// // delete Card
// router.delete('/:id', (req, res) => {
//   const cardId = req.params.id;
//   const sqlText = 'DELETE FROM cards WHERE id=$1;';
//   pool.query(sqlText, [cardId])
//     .then((result) => {
//       console.log('Card deleted');
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.log(`DELETE error ${sqlText}`, error);
//       res.sendStatus(500);
//     })
// })

// module.exports = router;

// --------------------------------------------- //
// Mongo Setup

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// MONGOOSE SCHEMA //

const Schema = mongoose.Schema;

//Schema for Cards
const cardSchema = new Schema({
    title: { type: String, required: true},
    image: { type: String, required: true},
    url: { type: String, required: true},
    category_id: { type: Number, required: true},
});

const Card = mongoose.model('action_cards', cardSchema);

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
            console.log('Card POST results ',results);
            res.sendStatus(201);
        })
        .catch( (error) => {
            console.log('Card POST error', error);
            res.sendStatus(500);
        })
});

// PUT route to edit card
router.put('/:id', (req, res) => {
    let updateCard = req.body;
    console.log('update card:', req.body);
    Card.findByIdAndUpdate({
        _id: req.params.id
    }, updateCard)
    .then((results) => {
    console.log(`Success updating Card`, results);
    res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`Error making database UPDATE`, error);
        res.sendStatus(500);
    })
})

// Setup DELETE to remove a card
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete card request for id', req.params);
    Card.findOneAndDelete({
        _id: reqId
    })
        .then( (removedDocument) => {
            console.log('delete results', removedDocument);
            res.sendStatus(200)
        })
        .catch( (error) => {
            console.log('delete error', error);
            res.sendStatus(500)
        })
}) 

module.exports = router;
