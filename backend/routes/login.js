const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/userLogin', async (req, res) => {
    console.log(req.query.username);
        let user = await User.find({username: req.query.username});
        if(user.length === 0) {
            res.json({msg: "Brugeren eksisterer ikke", success: false});
        } else if (user.length > 0 && user.password === req.query.password){
            res.json({msg: "Brugeren med de indtastede oplysninger eksisterer, password er også korrekt", success: true, user: user});
        } else if (user.length > 0 && user.password !== req.query.password) {
            res.json({msg: "Der findes en bruger med brugernavnet, men password er ikke korrekt", success: false, user: user});
        }
});

//Det som ikke virker er at når der er flere brugere med samme brugernavn - med det kan jo ikke lade sig gøre længere grundet valideringen i skemaet.

module.exports = router;