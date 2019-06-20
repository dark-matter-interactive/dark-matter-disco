//require models
const { User, Friends } = require('./index.js');

const storeFriendRequest = (friend) => {
  Friends.findOrCreate({ 
    defaults: {
      userId,
      friendId,
      starsGiven,
      status
    }
  });
}




module.exports.acceptFriendRequest = storeFriendRequest;