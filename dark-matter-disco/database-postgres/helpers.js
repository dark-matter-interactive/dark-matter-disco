//require models
const { User, Friends, Achievements, userAchievements } = require('./index.js');

// Looks for username, if none are found creates a new entry to save information in database
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
    return User.findAll({ where: { username } }).then((foundUser) => {
      return foundUser;
  });
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

// Updates friend status after friend accepts friend request
const updateStatus = (friendName, username) => {
  Friends.update({status: 1}, { where: {  friendName, username }  })
}

// Adds new friend to database for current user
const acceptFriendRequest = (username, friendName) => {
  Friends.create({ username, friendName, status: 1});
  Friends.update({status: 1}, { where: { username: friendName, friendName: username}  });

}

//helper for finding friends in database
const getFriends = (username) => {
  return Friends.findAll({where : { friendName: username, status: 1}}).then(friends => friends.map(friend => friend));
}

// updates stars for user
const updateStars = (username) => {
  return User.findAll({ where: { username } }).then((user) => {
    const currentStars = user[0].starsTotal;
    return User.update({ starsTotal: currentStars + 1 }, { where: { username: user[0].username }})
  })
}

// gets Achievement for user
const getAchievement = () => {
  return Achievements.findAll({}).then(achieve => achieve);
}

// update Achievement in join table
const updateAchievement = (username, achievementID) => {
  return userAchievements.findOrCreate({ where: { UserUsername: username, AchievementId: achievementID, status: 1 } });
}

// get unlocked achievements
const unlockedAchievements = (username) => {
  return User.findAll({
    where: {
      username: username
    },
    attributes: ['username'],
    include: [{
      model: Achievements,
      attributes: ['id', 'badgeURL', 'starsThreshold'],
      required: true,
    }],
  });
}


// exporting helper functions
module.exports.updateAchievement = updateAchievement;
module.exports.unlockedAchievements = unlockedAchievements;
module.exports.getAchievement = getAchievement;
module.exports.updateStars = updateStars;
module.exports.storeFriendRequest = storeFriendRequest;
module.exports.acceptFriendRequest = acceptFriendRequest;
module.exports.storeOrFindUser = storeOrFindUser;
module.exports.getUserByUsername = getUserByUsername;
module.exports.getPendingRequests = getPendingRequests;
module.exports.updateStatus = updateStatus;
module.exports.getAllUsers = getAllUsers;
module.exports.getFriends = getFriends;