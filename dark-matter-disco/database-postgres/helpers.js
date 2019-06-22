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



//get user by name. takes username
const getUserByUsername = (username) => {
  //return sequelize model query that returns found user
  return User.findOne({ where: { username } }).then(user => user);
}
//get user by id. takes id
const getUserById = (id) => {
  //return sequelize model query that returns found user
  return User.findAll({ where: { id } }).then(user => user);
}

//get pending friend requests
const getPendingRequests = (userId) => {
  //find pending requests where friendId matches userId
  return Friends.findAll({ where: { friendId: userId, status: 0 }})
    .then((pendingRequests) => pendingRequests);
}

const storeFriendRequest = (userId, friendId) => {
  //store all friend requests in database
  return Friends.findOrCreate({ 
    where: { userId, friendId },
    defaults: {
      userId,
      friendId,
      status: 0
    }
  }).then((success) => {
    console.log('success');
    return success
  });
}



const acceptFriendRequest = (userId, friendId) => {
  //update status on accepted friend request
  Friends.update({status: 1}, { where: { userId, friendId }  })
}



module.exports.storeFriendRequest = storeFriendRequest;
module.exports.acceptFriendRequest = acceptFriendRequest;
module.exports.storeOrFindUser = storeOrFindUser;
module.exports.getUserByUsername = getUserByUsername;
module.exports.getUserById = getUserById;
module.exports.getPendingRequests = getPendingRequests;