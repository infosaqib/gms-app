const express = require('express')
const app = express();

app.get('/', function (req, res) {
    res.send("Hey Charms! This is our server 3500 live");
})
app.listen(8000);