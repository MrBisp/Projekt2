const express = require('express');
const router = express.Router();
const User = require('../models/User');

const mongoose = require('mongoose');
const options = {discriminatorKey: 'user'};

// Sub classes
let revisor = User.discriminator('Revisor', new mongoose.Schema({
    startDag: Number,
    slutDag: Number
}, options));

//Routes
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({msg: 'Fejl: ' + err});
    }
});
router.get('/revisor', async (req, res) => {
    try {
        const users = await User.find({type: 1});
        res.json(users);
    } catch (err) {
        res.json({msg: 'Fejl: ' + err});
    }
});

//Tilføj en generisk user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        navn: req.body.navn,
        type: 0
    });

    //Gem møde
    try {
        const gemtUser = await user.save();
        res.json(gemtUser);
    } catch (err) {
        res.json({msg: err});
    }
});

//Tilføj en revisor
router.post('/revisor', async (req, res) => {
    const nyRevisor = new revisor({
        username: req.body.username,
        password: req.body.password,
        navn: req.body.navn,
        startDag: req.body.startDag,
        slutDag: req.body.slutDag,
        moeder: req.body.moeder,
        type: 1
    });

    //Gem revisoren
    try {
        const gemtRevisor = await nyRevisor.save();
        res.json(gemtRevisor)
    } catch (err) {
        res.json({msg: err});
    }
});

module.exports = router;



/*
POSTMAN:
{
	"username": "f",
	"password": "123",
	"navn": "Frederik"
}

Revisor
{
	"username": "f",
	"password": "123",
	"navn": "Frederik",
	"startDag": 8,
	"slutDag": 16
}
 */