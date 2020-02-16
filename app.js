const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cors = require('cors');

const Revisor = require('./models/Revisor');

//Setup
app.set('view engine', 'ejs');

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

//Import routes
const logIndRoute = require('./routes/logInd');
app.use('/logInd', logIndRoute);
app.use('/revisor', require('./routes/revisor'));


//Routes til static files
app.get('/', async (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/index.html'));
    try {
        const revisorer = await Revisor.find({});
        res.render('index', {
            revisorer: revisorer
        });
    } catch (e) {
        console.log(e);
    }
});
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/create', (req, res) => {
    res.render('create');
});
app.get('/posts/store', (req, res) => { //Når der gemmes en revisor
    res.rediret('/');
});


//Posts

//Når der oprettes en ny revisor
app.post('/posts/store', async (req, res) => {
    console.log(req.body);
    try {
        await Revisor.create(req.body);
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.redirect('/create');
    }
});


//Connect to DB
mongoose.connect('mongodb+srv://admin:marza123@semester2-p9wyp.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    () => {
        console.log('Connected til database');
    });

//Start listening to the server
app.listen(3000);

