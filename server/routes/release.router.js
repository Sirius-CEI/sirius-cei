const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// return all Cards
router.get('/', (req, res) => {
    console.log('in get release router');
    const queryText = 'SELECT * FROM annual_release';
    pool.query(queryText)
        .then((result) => { 
            res.send(result.rows); 
        })
        .catch((error) => {
            console.log('Error completing GET Release query', error);
            res.sendStatus(500);
        });
  });

// add a Release
router.post('/', (req, res) => {
    console.log('post Release info: ', req.body);
    const addRelease = req.body;
    const queryText = `INSERT INTO annual_release ("year", "graph", "header", "description")
                    VALUES ($1, $2, $3, $4)`;
    const queryValues = [
        addRelease.year,
        addRelease.graph,
        addRelease.header,
        addRelease.description,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((error) => {
        console.log('Error completing Release POST query', error);
        res.sendStatus(500);
      });
  });

module.exports = router;

// // --------------------------------------------- //
// // Mongo Setup

// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');

// // MONGOOSE SCHEMA //

// const Schema = mongoose.Schema;

// create a schema for an annual release
// const releaseSchema = new Schema({
//     year: { type: Number, required: true},
//     graph: { type: Number, required: true},
//     header: { type: String, required: true},
//     description: { type: String, required: true},
// });

// const release = mongoose.model('release', releaseSchema);

// // // Setup a GET route to get annual releases from database
// router.get('/', (req, res) => {
//     release.find({})
//         .then((results) => {
//             res.send(results);
//         })
//         .catch((error) => {
//             console.log(`Error making database query`, error);
//             res.sendStatus(500); // Good server always responds
//         })
// });

//POST route to add new release to the database
// router.post('/', (req, res) => {
//     const newRelease = req.body;
//     console.log(newRelease);
//     release.create(newRelease)
//         .then( (results) => {
//             console.log('POST results ',results);
//             res.sendStatus(201)
//         })
//         .catch( (error) => {
//             console.log('POST error', error);
//             res.sendStatus(500)
//         })
// });

// module.exports = router;
