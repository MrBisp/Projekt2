const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Revisor = require('./models/Revisor');

//Middleware
const validateMiddleware = require('./middleware/validationMiddleware');

//Setup
app.set('view engine', 'ejs');

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:63342"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use( '/posts/store', validateMiddleware);

//Import routes (api)
app.use('/revisor', require('./routes/revisor'));
app.use('/moede', require('./routes/moede'));
app.use('/user', require('./routes/user'));


//Connect to DB
mongoose.connect('mongodb+srv://admin:marza123@semester2-p9wyp.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    () => {
        console.log('Connected til database');
    });

//Start listening to the server
app.listen(3000, () => console.log("listening on port:3000..."));

