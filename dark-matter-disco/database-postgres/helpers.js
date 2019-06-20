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

const acceptFriendRequest = () => {
  Friends.find({ where: { status: 0 } })
    .on('success', (statusToUpdate) => {
      statusToUpdate.update({
        status: 1,
      });
    });
}


module.exports.acceptFriendRequest = storeFriendRequest;