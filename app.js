const express = require('express');
const app = express();

//Routes
app.get('/', (req, res) => {
    res.send('Hello world');
});

//Start listening to the server
app.listen(3000);