const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/test', function(req, res) {
    res.status(201).send('Post request was successful');
})

app.listen(port, () => console.log(`Listening on port ${port} yay!`));