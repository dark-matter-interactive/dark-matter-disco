const express = require('express');
const router = express.Router();
const { storeFriendRequest, getPendingRequests, acceptFriendRequest } = require('../../database-postgres/helpers.js');

//setup post request for friend invitations
router
  .get('/', (req, res) => {
    //call helper to find user by username
    getPendingRequests(1).then((results) => {
        //send user as response
        res.send(results);
    });
  })
  .post('/', (req, res) => {
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
      acceptFriendRequest(1, 2);
      acceptFriendRequest(2, 1);
  // });
  // acceptFriendRequest(1, 3);
  res.send(202);
})



module.exports = router;
