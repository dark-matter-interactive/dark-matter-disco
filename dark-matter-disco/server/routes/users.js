const express = require('express');
const router = express.Router();
const { storeOrFindUser, getUserByUsername, getAllUsers } = require('../../database-postgres/helpers.js');


//get online users on user login  
router.get('/login', (req, res) => {
  //call helper to find user by username
  getAllUsers().then((users) => {
      //send user as response
      res.send(users);
  });
})

//get username on login username endpoint
router.get('/:username', (req, res) => {
  const username = req.params.username;
  //call helper to find user by username
  getUserByUsername(username).then((user) => {
      //send user as response
      res.send(user);
  });
})

//add new logged in user to database
router.post('/login', (req, res) => {  
  //call helper to save user in db
  storeOrFindUser(req.body.username).then((user)=>{
    //send 201 status code
    res.status(201);
    res.send(user);
  }).catch((err) => {
    res.sendStatus(500);
  });
})



module.exports = router;