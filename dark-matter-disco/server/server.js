const express = require('express');
const app = express();
const path = require('path');
const { youTubeSearch } = require('./helpers/youtube-helpers.js');
const { storeOrFindUser, storeFriendRequest, getUserByUsername, getUserById, acceptFriendRequest } = require('../database-postgres/helpers.js');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// require('../database-postgres/helpers.js');


const port = process.env.PORT || 8080;
// require('../database-postgres/index.js');

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

//serve static assets
app.use(express.static(path.join(__dirname, '../dist/dark-matter-disco')))

//hash for usernames to socket ids
const socketIds = {};


io.on('connection', (socket) => {
    console.log('new connection');

    // connect usernames and socket ids
    socket.emit('user', 'who you is?')
    socket.on('user', (username) => {
        socketIds[username] = socket.id;
    })

    // handle who online request
    socket.on('who online', () => {
        socket.emit('who online', Object.keys(socketIds));
        // console.log('who online?', Object.keys(socketIds))
    });

    // handle invite
    socket.on('invite', (fromUsername, toUsername) => {
        socket.broadcast.to(socketIds[toUsername]).emit('invite', fromUsername);
        console.log('invite from:', fromUsername,'to', toUsername)
    });

     // handle accept invite
     socket.on('accept invite', (fromUsername, toUsername) => {
        socket.broadcast.to(socketIds[toUsername]).emit('invite accepted', fromUsername);
    });

    // handle pose data
    socket.on('pose', (friendUsername, pose) => {
        socket.broadcast.to(socketIds[friendUsername]).emit('pose', pose);
    })

    // handle song change
    socket.on('changeSong', (videoID) => {
        console.log(videoID, 'Server');
        io.emit('changeSong', videoID)
    })

    // handle disconnect 
    socket.on('disconnect', () => {
        for(let username in socketIds) {
            if (socketIds[username] === socket.id) delete socketIds[username];
        }
    });
})


//setup post request for user login
app.post('/login', (req, res) => {
    //call helper to save user in db
    storeOrFindUser('Khari');
    //send 201 status code
    res.send(201);
})

//setup post request for friend invitations
app.post('/invite', (req, res) => {
    //call helper to save pending requests
    storeFriendRequest(1, 2);
    storeFriendRequest(2, 1);

    //send 201 status code
    res.send(201);
})
//setup post for accepted friends
app.post('/accepted', (req, res) => {
    // storeFriendRequest(2, 1).then(() => {
        acceptFriendRequest(1, 2);
        acceptFriendRequest(2, 1);
    // });
    // acceptFriendRequest(1, 3);
    res.send(201);
})

// //setup get request for getting user
// app.get('/user', (req, res) => {
//     //call helper to find user by username
//     getUserByUsername('Kalkidan').then((result) => {
//         //send user as response
//         res.send(result);
//     });
// })

//setup get request for getting user
app.get('/user', (req, res) => {
    //call helper to find user by username
    getUserById(2).then((result) => {
        //send user as response
        res.send(result);
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


http.listen(port, () => {
    console.log(`listening on ${port}`)
});


