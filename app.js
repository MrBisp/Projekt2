const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const Revisor = require('./models/Revisor');

//Middleware
const validateMiddleware = require('./middleware/validationMiddleware');

//Controllers
const nyRevisorController = require('./controllers/nyRevisor');
const homeController = require('./controllers/home');
const aboutController = require('./controllers/about');
const revisorSideController = require('./controllers/revisorSide');
const storeRevisor = require('./controllers/storeRevisor');
const alleRevisorerController = require('./controllers/alleRevisorer');
const visMoedeController = require('./controllers/visMoede');



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


//Routes til files
app.get('/', homeController);
app.get('/about', aboutController);
app.get('/create', nyRevisorController);
app.get('/visRevisor', alleRevisorerController);
app.get('/visRevisor/:id', revisorSideController);
app.post('/posts/store', storeRevisor);

app.get('/visMoede', visMoedeController);

//Connect to DB
mongoose.connect('mongodb+srv://admin:marza123@semester2-p9wyp.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    () => {
        console.log('Connected til database');
    });

//Start listening to the server
app.listen(3000);

