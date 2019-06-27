const express = require('express');
const router = express.Router();
const { storeOrFindUser, getUserByUsername, getAllUsers } = require('../../database-postgres/helpers.js');





router.get('/login', (req, res) => {
  // const username = req.params.username;
  //call helper to find user by username
  getAllUsers().then((users) => {
      //send user as response
      res.send(users);
  });
})

router.get('/:username', (req, res) => {
  const username = req.params.username;
  //call helper to find user by username
  getUserByUsername(username).then((user) => {
      //send user as response
      res.send(user);
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