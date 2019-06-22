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
  });
};



//get user by name. takes username
const getUserByUsername = (username) => {
  //return sequelize model query that returns found user
  return User.findOne({ where: { username } }).then(user => user);
}


//get pending friend requests
const getPendingRequests = (username) => {
  //find pending requests where friendId matches userId
  return Friends.findAll({ where: { friendName: username, status: 0 }})
    .then(pendingRequests => pendingRequests.map(request => request.username));
}

const storeFriendRequest = (username, friendName) => {
  //store all friend requests in database
  return Friends.findOrCreate({ 
    where: { username, friendName },
    defaults: {
      username,
      friendName,
      status: 0
    }
  }).then((success) => {
    console.log('success');
    return success
  });
}



const acceptFriendRequest = (username, friendName) => {
  //update status on accepted friend request
  Friends.update({status: 1}, { where: { username, friendName }  })
}



module.exports.storeFriendRequest = storeFriendRequest;
module.exports.acceptFriendRequest = acceptFriendRequest;
module.exports.storeOrFindUser = storeOrFindUser;
module.exports.getUserByUsername = getUserByUsername;
module.exports.getPendingRequests = getPendingRequests;