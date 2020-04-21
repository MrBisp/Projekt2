const express = require('express');
const router = express.Router();
const Moede = require('../models/Moede');
const User = require('../models/User');

const mongoose = require('mongoose');
const options = {discriminatorKey: 'kind'};

// Sub classes
let skatMoede = Moede.discriminator('SkatteMøde', new mongoose.Schema({'skat': Object}, options));

//Routes
router.get('/', async (req, res) => {
    try {
        const moede = await Moede.find().populate('revisor').populate('kunde');
        res.json(moede);
    } catch (err) {
        res.json({msg: 'Fejl: ' + err});
    }
});

//Hent møder fra en revisor med revisorid id
router.get('/:id', async (req, res) => {
    console.log('get id');
    try {
        const moede = await Moede.find({"revisor":req.params.id}).populate('revisor').populate('kunde');
        res.json(moede);
    } catch (e) {
        res.json({msg: 'fejl ' + e});
    }
});

//Tilføj et generisk møde
router.post('/', async (req, res) => {
    const moede = new Moede({
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        kunde: req.body.kunde,
        revisor: req.body.revisor,
        kommentar: req.body.kommentar,
        tlfnr: req.body.tlfnr,
        mail: req.body.mail,
        type: 0
    });

    //console.log("Møde id = " + moede.id);
    //console.log("Revisor id = " + rid);

    //Gem møde
    try {
        const gemtRevisor = await moede.save();
        res.json(gemtRevisor);

    } catch (err) {
        res.json({msg: err});
    }
});

//Tilføj et skattemøde
router.post('/skat', async (req, res) => {
    const moede = new skatMoede({
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        kunde: req.body.kunde,
        revisor: req.body.revisorid.replace(/\D+/g, ''),
        kommentar: req.body.kommentar,
        tlfnr: req.body.tlfnr,
        mail: req.body.mail,
        type: 1,
        skat: {
            'skat1': req.body.skat.skat1,
            'skat2': req.body.skat.skat2
        }
    });

    //Gem revisoren
    try {
        const gemtRevisor = await moede.save();
        res.json(gemtRevisor)
    } catch (err) {
        res.json({msg: "fejl " + err});
    }
});

router.get('/kunde/test:id', async (req, res) => {
    try {
        const moede = await Moede.find({kunde: req.params._id});
        res.json(moede);
    } catch (err) {
        res.json({msg: 'Fejl: ' + err});
    }
});

/*
skatMoede.create({
startTime: "10:00",
endTime: "12:00",
kunde: ObjectId("5e7ca555e03e521f504550c6"),
revisor: ObjectId("5e7caf08a4b6c31ec0dd79e7"),
kommentar: String,
    tlfnr: Number,
    mail: String,
    type: String
});*/

module.exports = router;





/*
POSTMAN:
{
    "startTime": "2020-02-25T18:41:11.267Z",
    "endTime": "2020-02-25T18:41:11.267Z",
    "kunde": 0,
    "kommentar": "kommentar",
    "revisor": "5e6c8960b2e0381700de2537",
    "tlfnr": 123,
    "mail": "f@lort.dk",
    "type": "0"
}
{
	"startTime": "2020-02-25T18:41:11.267Z",
	"endTime": "2020-02-25T18:41:11.267Z",
	"kunde": 0,
	"kommentar": "kommentar",
	"tlfnr": "123",
    "mail": "f@lort.dk",
    "type": 0,
    "skat": {
    	"skat1": "test1",
    	"skat2": "test2"
    },
    "revisor": "5e6c8960b2e0381700de2537"
}
 */


//Fjerner møde
router.delete('/:id', async (req, res) => {
    try {
        const sletmoede = await Moede.remove({_id: req.params.id});
        res.json(sletmoede);
    } catch (e) {
        res.json({msg: 'fejl ' + e});
    }
});
