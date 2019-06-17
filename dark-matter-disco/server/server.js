const express = require('express');
const app = express();
const path = require('path');

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.use(express.static(path.join(__dirname, '../dist/dark-matter-disco')))

// app.get('/', (req, res) => {
//     res.sendStatus(200);
//     console.log('running')
// })

app.listen(8080);