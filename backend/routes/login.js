const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//Access token
const accessTokenSecret = 'youraccesstokensecret';

//Post request ved login
router.post('/userloginWithAuth', async (req, res) => {
    //Undersøg user-collection for bruger med brugernavnet fra requesten
    let user = await User.find({username: req.body.username});

    //Hvis der ikke er en bruger med brugernavnet
    if(user.length === 0) {
        res.json({msg: "Brugeren eksisterer ikke", success: false});
    //Hvis brugernavn og password stemmer
    } else if (user.length > 0 && user[0].password == req.body.password){
        //Sign en accesstoken og send den til brugeren, så den kan gemmes i localstorage
        const accessToken = jwt.sign({u: user[0]}, accessTokenSecret);
        res.json({msg: "korrekt", success: true, token: accessToken, user: user});
    //Hvis forkert password
    } else if (user.length > 0 && user[0].password !== req.body.password) {
        res.json({msg: "Der findes en bruger med brugernavnet, men password er ikke korrekt", success: false});
    }
});

module.exports = router;