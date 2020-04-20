const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//Access token
const accessTokenSecret = 'youraccesstokensecret';

router.post('/', async (req, res) => {
    let user = await User.find({username: req.body.username});
    console.log(req.body.password);
    console.log(user[0].type);

    if(user.length === 0) {
        res.json({msg: "Brugeren eksisterer ikke", success: false});
    } else if (user.length > 0 && user[0].password == req.body.password){

        const accessToken = jwt.sign({u: user[0].populate('moeder')}, accessTokenSecret);
        res.json({msg: "korrekt", success: true, token: accessToken});

    } else if (user.length > 0 && user[0].password !== req.body.password) {
        res.json({msg: "Der findes en bruger med brugernavnet, men password er ikke korrekt", success: false, user: user});
    }
});

//Det som ikke virker er at når der er flere brugere med samme brugernavn - med det kan jo ikke lade sig gøre længere grundet valideringen i skemaet.

module.exports = router;


/*
{
    "navn": "Marza Mustafa",
    "username": "marzzz",
    "password": "123456",
    "type": "1"
}
*/
