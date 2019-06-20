//require models
const { User, Friends } = require('./index.js');

const acceptFriendRequest = (friend) => {
  Friends.findOrCreate({ 
    defaults: {
      userId,
      friendId,
      starsGiven,
      status
    }
  });
}

module.exports.acceptFriendRequest = acceptFriendRequest;