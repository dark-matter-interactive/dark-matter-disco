const express = require('express');
const app = express();
const path = require('path');
const { youTubeSearch } = require('./helpers/youtube-helpers.js');
const { updateStars, getAchievement, updateAchievement, unlockedAchievements } = require('../database-postgres/helpers.js');
const http = require('http').createServer(app);
const users = require('./routes/users.js');
const friends = require('./routes/friends.js');
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
require('./websocket')(io);

const redirectApp = express();
const port = process.env.PORT || 8080;

//redirects http traffic to https
redirectApp.listen(8081, () => {
  console.log('redirect server on 8081');
})

redirectApp.use((req, res, next) => {
 console.log('redirecting to https ...')   
 res.redirect('https://disco.darknrgy.com');
});


// Middleware
app.use((req, res, next) => {
    next();
})

app.use(bodyParser.json());

// Routes
app.use('/user', users);
//use friend routes for friend endpoint
app.use('/friend', friends);


//serve static assets
app.use(express.static(path.join(__dirname, '../dist/dark-matter-disco')))


// Can we move below to routes?

// endpoint to search YouTube using API, uses helper function to make call to YouTube and return results
app.get('/search/youtube', (req, res, next) => {
    youTubeSearch(req.query.query).then((response) => {
        res.send(response);
    })
})

// endpoint for /user/stars, put request to update users starCount, uses helper function to query and update db.
app.put('/user/stars', (req, res, next) => {
    updateStars(req.body.username).then((response) => {
        res.sendStatus(201);
    })
})

// endpoint for /achievement, gets all the achievements from database using helper function.
app.get('/achievement', (req, res, next) => {
    getAchievement().then((response) => {
        res.send(response);
        // res.sendStatus(200);
    })
})

// endpoint for /achievment, updates the userAchievements join table when user gets new achievement
app.post('/achievement', (req, res, next) => {
    const username = req.body.username;
    const achievementID = req.body.achievementID;
    updateAchievement(username, achievementID);
})

// endpoint for /userAchievements, allows us to search the database for unlocked achievements by current user, calls helper function to query db
app.get('/userAchievements', (req, res, next) => {
    const username = req.query.username;
    unlockedAchievements(username).then((achievement) => {
        let result = achievement[0].Achievements.map((achieve) => achieve.badgeURL);
        res.send(result);
    })
})


http.listen(port, '0.0.0.0' , () => {
    console.log(`listening on ${port}`)
});





