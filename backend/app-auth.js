const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const Revisor = require('./models/Revisor');

//Middleware
const validateMiddleware = require('./middleware/validationMiddleware');

//Setup
app.set('view engine', 'ejs');

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));



//Json Web token stuff
app.use(bodyParser.json());
const accessTokenSecret = 'youraccesstokensecret';

app.use('/login-auth', require('./routes/login-auth'));

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user.u;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/books', authenticateJWT, (req,res) => {
    const type = req.user.type;

    //If revisor
    if(type == 1) {
        res.json(req.user);
        //res.send('revisor');
    }
    //If kunde
    else if (type == 2) {
        res.send('kunde');
    }
});

app.get('/userByToken/:token', (req,res) => {
    jwt.verify(req.params.token, accessTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        res.json({'user': user.u});
    });
});



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:52669"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//Er det her ikke brugt til udførelse af bogens materiale?
//app.use( '/posts/store', validateMiddleware);


//Import routes (api)
app.use('/revisor', require('./routes/revisor'));
app.use('/moede', require('./routes/moede'));
app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));




//Connect to DB
mongoose.connect('mongodb+srv://admin:marza123@semester2-p9wyp.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    () => {
        console.log('Connected til database');
    });

//Start listening to the server
app.listen(3000, () => console.log("listening on port:3000..."));

