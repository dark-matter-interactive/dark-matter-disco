const express = require('express');
const router = express.Router();
const { storeOrFindUser, getUserByUsername, getUserById, } = require('../../database-postgres/helpers.js');


router.get('/', (req, res) => {
  //call helper to find user by username
  getUserById(2).then((result) => {
      //send user as response
      res.send(result);
  });
})

// //setup get request for getting user
// router.get('/user', (req, res) => {
//     //call helper to find user by username
//     getUserByUsername('Kalkidan').then((result) => {
//         //send user as response
//         res.send(result);
//     });
// })

module.exports = router;