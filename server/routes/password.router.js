const express = require('express');
// const pool = require('../modules/pool');
const router = express.Router();

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

// PUT request to change password
router.put('/:id', (req, res) => {
    console.log('req.params password router info: ', req.params);
    const updatePassword = encryptLib.encryptPassword(req.body);
    Person.findByIdAndUpdate({
        _id: req.params.id
    }, updatePassword)
    .then((results) => {
    console.log(`Success updating Password`, results);
    res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`Error making database UPDATE`, error);
        res.sendStatus(500);
    })
  });

module.exports = router;
