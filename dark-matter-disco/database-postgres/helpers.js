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

//get all users
const getAllUsers = () =>{
  return User.findAll({}).then(users => users);
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
  }).then((user) => {

    return user
  });
}

const updateStatus = (friendName, username) => {
  Friends.update({status: 1}, { where: {  friendName, username }  })

}

const acceptFriendRequest = (username, friendName) => {
  //update status on accepted friend request
  // Friends.update({status: 1}, { where: { friendName, username }  })
  // storeFriendRequest(friendName, username)
  Friends.create({ username, friendName, status: 1});
  Friends.update({status: 1}, { where: { username: friendName, friendName: username}  });

}

//helper for finding friends in database
const getFriends = (username) => {
  return Friends.findAll({where : { friendName: username, status: 1}}).then(friends => friends.map(friend => friend));
}



module.exports.storeFriendRequest = storeFriendRequest;
module.exports.acceptFriendRequest = acceptFriendRequest;
module.exports.storeOrFindUser = storeOrFindUser;
module.exports.getUserByUsername = getUserByUsername;
module.exports.getPendingRequests = getPendingRequests;
module.exports.updateStatus = updateStatus;
module.exports.getAllUsers = getAllUsers;
module.exports.getFriends = getFriends;