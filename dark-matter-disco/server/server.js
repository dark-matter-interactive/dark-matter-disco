const express = require('express');
const app = express();
const path = require('path');
const { youTubeSearch } = require('./helpers/youtube-helpers.js');

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.use(express.static(path.join(__dirname, '../dist/dark-matter-disco')))

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

app.listen(8080);