const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// return all Cards
router.get('/', (req, res) => {
    console.log('in get cards router');
    const queryText = 'SELECT cards.*, category.name as name FROM cards JOIN category ON cards.category_id = category.id';
    pool.query(queryText)
        .then((result) => { 
            res.send(result.rows); 
        })
        .catch((error) => {
            console.log('Error completing GET Cards query', error);
            res.sendStatus(500);
        });
  });

// add a Card
router.post('/', (req, res) => {
    console.log('post card info: ', req.body);
    const addCard = req.body;
    const queryText = `INSERT INTO cards ("title", "image", "url", "category_id")
                    VALUES ($1, $2, $3, $4)`;
    const queryValues = [
        addCard.title,
        addCard.image,
        addCard.url,
        addCard.category_id,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((error) => {
        console.log('Error completing Card POST query', error);
        res.sendStatus(500);
      });
  });

// PUT request to update card information
router.put('/', (req, res) => {
    const cardId = req.body.id;
    console.log('card id: ', cardId);
    const updateCard = req.body;
    
    const queryText = `UPDATE cards
    SET "title" = $1, 
    "image" = $2, 
    "url" = $3, 
    "category_id" = $4
    WHERE id=${cardId}
    `;
  
    const queryValues = [
        updateCard.title,
        updateCard.image,
        updateCard.url,
        updateCard.category_id
    ];
  
    pool.query(queryText, queryValues)
        .then(() => { 
            console.log('success editing card');
            res.sendStatus(200); 
        })
        .catch((error) => {
            console.log('Error updating Card query', error);
            res.sendStatus(500);
        });
  });

// delete Card
router.delete('/:id', (req, res) => {
  const cardId = req.params.id;
  const sqlText = 'DELETE FROM cards WHERE id=$1;';
  pool.query(sqlText, [cardId])
    .then((result) => {
      console.log('Card deleted');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`DELETE error ${sqlText}`, error);
      res.sendStatus(500);
    })
})

module.exports = router;

// // --------------------------------------------- //
// // Mongo Setup

// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');

// // MONGOOSE SCHEMA //

// const Schema = mongoose.Schema;

// // create a schema for an koala
// const koalaSchema = new Schema({
//     name: { type: String, required: true},
//     gender: { type: String, required: true},
//     age: { type: Number, required: true},
//     rtt: { type: Boolean, default: false, required: true},
//     notes: { type: String, required: true}
// });

// const Koala = mongoose.model('Koala', koalaSchema);

// // Setup a GET route to get all the koalas from the database
// router.get('/', (req, res) => {
//     Koala.find({})
//         .then((results) => {
//             res.send(results);
//         })
//         .catch((error) => {
//             console.log(`Error making database query`, error);
//             res.sendStatus(500); // Good server always responds
//         })
// });


// // Setup a POST route to add a new koala to the database
// router.post('/', (req, res) => {
//     const newKoala = req.body;
//     console.log(newKoala);
//     Koala.create(newKoala)
//         .then( (results) => {
//             console.log('POST results ',results);
//             res.sendStatus(201)
//         })
//         .catch( (error) => {
//             console.log('POST error', error);
//             res.sendStatus(500)
//         })
// });

// // PUT ROUTE TO UPDATE READY TO TRANSFER FLAG
// router.put('/transfer/', (req, res) => {
//     let updateKoala = req.body;
//     // set the ready to transfer flag to true
//     updateKoala.rtt = true;
//     console.log('ready to transfer koala:', req.body);

//     Koala.findByIdAndUpdate({
//         _id: req.body._id
//     }, updateKoala)
//     .then((results) => {
//     console.log(`Success making database UPDATE`, results);
//     res.sendStatus(200);
//     })
//     .catch((error) => {
//         console.log(`Error making database UPDATE`, error);
//         res.sendStatus(500); // Good server always responds
//     })
// })

// // PUT ROUTE TO UPDATE KOALA
// // router.put('/:id', (req, res) => {
// //     let updateKoala = req.body;
// //     console.log('update koala:', req.body);

// //     Koala.findByIdAndUpdate({
// //         _id: req.params.id
// //     }, updateKoala)
// //     .then((results) => {
// //     console.log(`Success making database UPDATE`, results);
// //     res.sendStatus(200);
// //     })
// //     .catch((error) => {
// //         console.log(`Error making database UPDATE`, error);
// //         res.sendStatus(500); // Good server always responds
// //     })
// // })

// // Setup DELETE to remove a koala
// router.delete('/', (req, res) => {
//     let reqId = req.query.id;
//     console.log('Delete request for id', reqId);
//     Koala.findOneAndDelete({
//         _id: reqId
//     })
//         .then( (removedDocument) => {
//             console.log('results', removedDocument);
//             res.sendStatus(200)
//         })
//         .catch( (error) => {
//             console.log('error', error);
//             res.sendStatus(500)
//         })
// }) 

// module.exports = router;
