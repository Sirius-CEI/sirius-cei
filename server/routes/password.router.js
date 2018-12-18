const express = require('express');
// const pool = require('../modules/pool');
const router = express.Router();

// PUT request to change password
router.put('/', (req, res) => {
    console.log('password router info: ', req.body);
    const updatePassword = req.body;
    const queryText = `UPDATE person
    SET 
    "username" = $1,
    "password" = $2
    `;
  
    const queryValues = [
        updatePassword.username,
        updatePassword.password
    ];
  
    pool.query(queryText, queryValues)
        .then(() => { 
            console.log('Success Changing Password');
            res.sendStatus(200); 
        })
        .catch((error) => {
            console.log('Error Changing Password', error);
            res.sendStatus(500);
        });
  });

module.exports = router;
