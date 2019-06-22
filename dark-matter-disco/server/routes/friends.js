const express = require('express');
const router = express.Router();
const { storeFriendRequest, getPendingRequests, getUserByUsername, acceptFriendRequest } = require('../../database-postgres/helpers.js');

//setup get request for friend invitations
router
  .get('/request/:username', (req, res) => {  
    //get user by username
    const username = req.params.username;
    //call helper to find user by username
    getUserByUsername(username)
      .then((user) => {
        //call helper to find a user's pending friend requests
        getPendingRequests(user.id).then((results) => {
          //send list of pending requests to client
          res.send(results);
        });
    })
  })

  //setup post request for friend invitations
  .post('/request', (req, res) => {
    const userId =  req.body.userId;
    const friendId = req.body.friendId;
    
    //call helper to save pending requests
    storeFriendRequest(userId, friendId);
    storeFriendRequest(friendId, userId);

    //send 201 status code
    res.send(201);
  })
  //setup post for accepted friends
  .put('/request', (req, res) => {
    // storeFriendRequest(2, 1).then(() => {
    const userId =  req.body.userId;
    const friendId = req.body.friendId;
    acceptFriendRequest(userId, friendId);
    acceptFriendRequest(friendId, userId);
    // });
    // acceptFriendRequest(1, 3);
    res.send(202);
  })



module.exports = router;
