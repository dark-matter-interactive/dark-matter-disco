const express = require('express');
const router = express.Router();
const { storeOrFindUser, getUserByUsername, getUserById, } = require('../../database-postgres/helpers.js');


router.get('/', (req, res) => {
  const username = req.body.params.username;
  //call helper to find user by username
  getUserByUsername(username).then((result) => {
      //send user as response
      res.send(result);
  });
})

//setup post request for user login
router.post('/login', (req, res) => {  
  //call helper to save user in db
  storeOrFindUser(req.body.username);
  //send 201 status code
  res.send(201);
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