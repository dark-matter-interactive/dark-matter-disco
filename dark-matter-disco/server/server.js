const express = require('express');
const app = express();
const path = require('path');
const { youTubeSearch } = require('./helpers/youtube-helpers.js');
const { storeUser } = require('../database-postgres/helpers.js');
const http = require('http').createServer(app);
const io = require('socket.io')(http);


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
    socket.on('user', (username) => {
        socketIds[username] = socket.id;
        const user = {
            username,
            starsTotal: 0,
            status: 0
        }
        storeUser(user);
        console.log(socketIds);
    })
    socket.on('pose', (pose, friendUsername) => {
        if(friendUsername) {
            socket.broadcast.to(socketIds[friendUsername]).emit('pose', pose);
        }
    })
    socket.on('changeSong', (videoID) => {
        console.log(videoID, 'Server');
        io.emit('changeSong', videoID)
    })
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

// http.listen(8080, () => {
//     console.log(`web socket listening on 3000`)
// });
