const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Import routes
const logIndRoute = require('./routes/logInd');
app.use('/logInd', logIndRoute);

app.use('/revisor', require('./routes/revisor'));

//Routes
app.get('/', (req, res) => {
    res.send('Hello world');
});

//Connect to DB
mongoose.connect('mongodb+srv://admin:marza123@semester2-p9wyp.mongodb.net/test?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
        console.log('Connected til database');
});

//Start listening to the server
app.listen(3000);

