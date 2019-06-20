//require models
const { User, Friends } = require('./index.js');

const storeOrFindUser = (username) => {
  return User.findOrCreate({ 
    where: { username }, 
    defaults: {
      username,
      starsTotal: 0,
      status: 0,
    }     
  }).then((success) => {
    console.log(success[0].id, 'stored');
    return success[0].id
  })
};

storeOrFindUser('James');
storeOrFindUser('Jesse');


//get user by id


const storeFriendRequest = (userId, friendId) => {
  //store all friend requests in database
  Friends.findOrCreate({ 
    where: { userId, friendId },
    defaults: {
      userId,
      friendId,
      status: 0
    }
  }).then((success) => {
    console.log('success');
  });
}

storeFriendRequest(1, 2);


const acceptFriendRequest = () => {
  //update status on accepted friend request
  Friends.find({ where: { userId } })
    .on('success', (statusToUpdate) => {
      statusToUpdate.update({
        status: 1,
      });
    });
}


module.exports.storeFriendRequest = storeFriendRequest;
module.exports.acceptFriendRequest = acceptFriendRequest;
module.exports.storeOrFindUser = storeOrFindUser;