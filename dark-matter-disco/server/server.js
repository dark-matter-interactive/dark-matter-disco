const express = require('express');
const app = express();
const path = require('path');
const { youTubeSearch } = require('./helpers/youtube-helpers.js');
const { updateStars, getAchievement, updateAchievement, unlockedAchievements } = require('../database-postgres/helpers.js');
const http = require('http').createServer();
const io = require('socket.io')(http);
const users = require('./routes/users.js');
const friends = require('./routes/friends.js');
const bodyParser = require('body-parser');

const redirectApp = express();

redirectApp.listen(8081, () => {
  console.log('redirect server on 8081');
})

redirectApp.use((req, res, next) => {
 console.log('redirecting to https ...')   
 res.redirect('https://disco.darknrgy.com');
});




const port = process.env.PORT || 8080;


app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.use(bodyParser.json());

//use user routes
app.use('/user', users);
app.use('/friend', friends);


//serve static assets
app.use(express.static(path.join(__dirname, '../dist/dark-matter-disco')))

//hash for usernames to socket ids
const socketIds = {};


/**
 * parties
 * username to roomname hash to manage socket traffic
 * for users who have joined respective part
 * partyName property is set by the first person to send the invite
 *  */ 
const parties = {};

// const usersByParty = {};

io.on('connection', (socket) => {
    console.log('new websock connection');

    // connect usernames and socket ids
    socket.emit('user', 'who you is?')
    socket.on('user', (username) => {
        socketIds[username] = socket.id;
        // send everyone who's online on new connection
        io.emit('who online', Object.keys(socketIds))
    })
    

    // handle who online request
    socket.on('who online', () => {
        socket.emit('who online', Object.keys(socketIds));
        // console.log('who online?', Object.keys(socketIds))
    });

    // handle invite
    socket.on('invite', (fromUsername, toUsername) => {
        // send invite 
        socket.broadcast.to(socketIds[toUsername]).emit('invite', fromUsername);
        // create a new party if there isn't one
        if (!parties[fromUsername]) {
            // usersByParty[fromUsername] = [fromUsername];
            parties[fromUsername] = { partyName: fromUsername, private: true };
            socket.join(fromUsername)
        }
        console.log('invite from:', fromUsername,'to', toUsername)
    });

     // handle accept invite
     socket.on('accept invite', (fromUsername, toUsername, userStars) => {
        let partyName = parties[toUsername].partyName;
         // send accept notification
        socket.broadcast.to(partyName).emit('invite accepted', fromUsername, userStars);
        // add new dancer to party!
        parties[fromUsername] = parties[toUsername];
        socket.join(partyName);
        let guests = [];
        for (let username in parties) {
            if (parties[username].partyName === partyName) {
                guests.push(username);
            }
        }
        socket.emit('guests', guests);
    });

    socket.on('guests', (guests) => {
        console.log('welcome, server', guests);
    })

    // handle pose data
    socket.on('pose', (username, pose, skinName) => {
        if (parties[username]) {
            socket.broadcast.to(parties[username].partyName).emit('pose', username, pose, skinName);
        }
        // socket.broadcast.to(socketIds[friendUsername]).emit('pose', pose);
    })

    // handle song change
    socket.on('changeSong', (videoID) => {
        console.log(videoID, 'Server');
        io.emit('changeSong', videoID)
    })


    // handle song play
    socket.on('playSong', () => {
        // console.log('play song button emitted')
        io.emit('playSong')
    })

    //handle song pause
    socket.on('pauseSong', () => {
        // console.log('pause song button emitted')
        io.emit('pauseSong')
    })

    // handle chat
    socket.on('chat', (username, message, color) => {
        if (parties[username]) {
            socket.broadcast.to(parties[username].partyName).emit('chat', username, message, color);
            console.log(username, message)
        }
    });

    // handle stars
    socket.on('stars', (toUsername, fromUsername) => {
        socket.broadcast.to(parties[toUsername].partyName).emit('stars', toUsername, fromUsername);
    })


    // handle disconnect 
    socket.on('disconnect', () => {
        for(let username in socketIds) {
            if (socketIds[username] === socket.id){
                delete socketIds[username];
                delete parties[username];
            } 
        }
    });
})






// app.get('/', (req, res) => {
//     res.sendStatus(200);
//     console.log('running')
// })



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
    const results = [];
    console.log(username);
    unlockedAchievements(username).then((achievement) => {
        console.log(achievement, 'please hit this');
        achievement.forEach((element) => {
            getAchievement().then((achievements) => {
                achievements.forEach((item) => {
                    if (item.id === element.AchievementId) {
                        console.log('server, get achievements', element);
                        results.push(item.badgeURL)
                    }
                    res.send(results);
                });
            }).catch(e => console.error(e));
        });
    }).catch(err => console.error(err));
})


app.listen(port, () => {
    console.log(`listening on ${port}`)
});


//websocket
http.listen(8082, () => {
    console.log('websocket server listening on 8082')
})


