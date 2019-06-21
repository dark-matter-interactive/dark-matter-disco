const express = require('express');
const app = express();
const path = require('path');
const { youTubeSearch } = require('./helpers/youtube-helpers.js');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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


