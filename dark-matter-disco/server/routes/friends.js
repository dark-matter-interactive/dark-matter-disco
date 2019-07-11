const express = require('express');
const router = express.Router();
const { storeFriendRequest, updateStatus, getPendingRequests, getFriends, acceptFriendRequest } = require('../../database-postgres/helpers.js');

//setup requests for friend invitations
router
  //route to add new friend invitations to database
  .post('/request', (req, res) => {
    const username =  req.body.username;
    const friendName = req.body.friendName;
    
    //call helper to save pending requests
    storeFriendRequest(username, friendName);
    //send 201 status code
    res.send(201);
  })
  //route to get a user's list of pending invitations
  .get('/request/:username', (req, res) => {  
    const username = req.params.username;
    //call helper to find a user's pending friend requests
    getPendingRequests(username).then((results) => {
      //send list of pending friend requests to client
      res.send(results);
    });
  })

  //route for updating status of accepted friend invitations
  .put('/request', (req, res) => {
    // storeFriendRequest(2, 1).then(() => {
    const username =  req.body.username;
    const friendName = req.body.friendName;
    //call helper to update request status in database
    acceptFriendRequest(username, friendName);
    res.send(202);
  })

  //route for finding a user's friends list
  router.get('/:username', (req, res) => {
    const username = req.params.username;
    //call helper to find friends
    getFriends(username).then((results) => {
      res.send(results);
    });
  })


module.exports = router;
