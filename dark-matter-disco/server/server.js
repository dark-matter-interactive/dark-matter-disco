const express = require('express');
const app = express();
const path = require('path');
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

io.on('connection', (socket) => {
    console.log('new connection');
    socket.on('pose', (pose) => {
        console.log('pose received');
        socket.broadcast.emit('pose', pose);
    })
})

// app.get('/', (req, res) => {
//     res.sendStatus(200);
//     console.log('running')
// })

http.listen(port, () => {
    console.log(`listening on ${port}`)
});

// http.listen(8080, () => {
//     console.log(`web socket listening on 3000`)
// });