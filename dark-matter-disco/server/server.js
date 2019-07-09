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
    console.log(req.method, req.url);
    next();
})

app.use(bodyParser.json());

// Routes
app.use('/user', users);
app.use('/friend', friends);


//serve static assets
app.use(express.static(path.join(__dirname, '../dist/dark-matter-disco')))


// Can we move below to routes?

app.get('/search/youtube', (req, res, next) => {
    console.log(req);
    youTubeSearch(req.query.query).then((response) => {
        console.log(response);
        res.send(response);
    }).catch(err => console.error(err))
})

app.put('/user/stars', (req, res, next) => {
    console.log('updateStars', req);
    updateStars(req.body.username).then((response) => {
        console.log(response);
        res.sendStatus(201);
    }).catch(err => console.error(err));
})

app.get('/achievement', (req, res, next) => {
    console.log('achievement', req);
    getAchievement().then((response) => {
        res.send(response);
        // res.sendStatus(200);
    }).catch(err => console.error(err));
})

app.post('/achievement', (req, res, next) => {
    console.log(req, 'update achievement');
    const username = req.body.username;
    const achievementID = req.body.achievementID;
    updateAchievement(username, achievementID);
})

app.get('/userAchievements', (req, res, next) => {
    console.log(req, 'unlocked achievements');
    const username = req.query.username;
    console.log(username);
    unlockedAchievements(username).then((achievement) => {
        console.log(achievement[0].Achievements, 'please hit this');
        let result = achievement[0].Achievements.map((achieve) => achieve.badgeURL);
        console.log(result);
        res.send(result);
    }).catch(err => console.error(err))
})


http.listen(port, () => {
    console.log(`listening on ${port}`)
});





