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

app.get('/search/youtube', (req, res, next) => {
    youTubeSearch(req.query.query).then((response) => {
        res.send(response);
    })
})

app.put('/user/stars', (req, res, next) => {
    updateStars(req.body.username).then((response) => {
        res.sendStatus(201);
    })
})

app.get('/achievement', (req, res, next) => {
    getAchievement().then((response) => {
        res.send(response);
        // res.sendStatus(200);
    })
})

app.post('/achievement', (req, res, next) => {
    const username = req.body.username;
    const achievementID = req.body.achievementID;
    updateAchievement(username, achievementID);
})

app.get('/userAchievements', (req, res, next) => {
    const username = req.query.username;
    unlockedAchievements(username).then((achievement) => {
        let result = achievement[0].Achievements.map((achieve) => achieve.badgeURL);
        res.send(result);
    })
})


http.listen(port, () => {
    console.log(`listening on ${port}`)
});





