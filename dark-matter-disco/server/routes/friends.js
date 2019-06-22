const express = require('express');
const router = express.Router();
const { storeFriendRequest, getPendingRequests, getUserByUsername, acceptFriendRequest } = require('../../database-postgres/helpers.js');

//setup get request for friend invitations
router
  .get('/request', (req, res) => {
    //get user by username
    const username = req.body.params.username;
    // const userId = req.body.params.userId;
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
    //call helper to save pending requests
    const userId =  req.body.userId;
    const friendId = req.body.friendId;
    
    storeFriendRequest(userId, friendId);
    storeFriendRequest(friendId, userId);

    //send 201 status code
    res.send(201);
  })
//setup post for accepted friends
.put('/', (req, res) => {
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
