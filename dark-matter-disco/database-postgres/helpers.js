//require models
const { User, Friends } = require('./index.js');

const storeUser = (user) => {
  User.findOrCreate({ 
    where: { username: user.username }, 
    defaults: {
      username: user.username,
      starsTotal: user.starsTotal,
      status: user.status
    }     
  }).then((success) => {
    console.log(success, 'stored');
  })
};


const storeFriendRequest = (friend) => {
  //store all friend requests in database
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
  //update status on accepted friend request
  Friends.find({ where: { status: 0 } })
    .on('success', (statusToUpdate) => {
      statusToUpdate.update({
        status: 1,
      });
    });
}


module.exports.storeFriendRequest = storeFriendRequest;
module.exports.acceptFriendRequest = acceptFriendRequest;
module.exports.storeUser = storeUser;