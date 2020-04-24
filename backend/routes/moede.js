const express = require('express');
const router = express.Router();
const Moede = require('../models/Moede');

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
    try {
        const moede = await Moede.find({"revisor":req.params.id}).populate('revisor').populate('kunde');
        res.json(moede);
    } catch (e) {
        res.json({msg: 'fejl ' + e});
    }
});

//Hent møder fra en kunde med kundeid id
router.get('/kunde/:id', async (req, res) => {
    console.log('get id');
    try {
        const moede = await Moede.find({"kunde":req.params.id}).populate('revisor').populate('kunde');
        res.json(moede);
    } catch (e) {
        res.json({msg: 'fejl ' + e});
    }
});

//Tilføj et møde
router.post('/', async (req, res) => {
    console.log(req.body.kunde);
    const moede = new Moede({
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        kunde: req.body.kunde,
        kundeNavn: req.body.kundeNavn,
        revisor: req.body.revisor,
        kommentar: req.body.kommentar,
        tlfnr: req.body.tlfnr,
        email: req.body.email,
        type: 0,
        approved: false
    });

    //Gem møde
    try {
        const gemtMøde = await moede.save();
        //Returner det gemte møde
        res.json({moede: gemtMøde, success: true});
    } catch (err) {
        res.status(500).json(err);
    }
});

//Fjerner møde
router.delete('/:id', async (req, res) => {
    try {
        const sletmoede = await Moede.remove({_id: req.params.id});
        res.json(sletmoede);
    } catch (e) {
        res.json({msg: 'fejl ' + e});
    }
});


//Godkend møde i møde
router.put('/approve/:id', async (req, res) => {
    //Tager ingen argumenter, ændrer approved fra false til true
    let moede = await Moede.findOneAndUpdate({_id: req.params.id}, {approved: true}, {new: true});
    try {
       res.json({newMoede: moede});
   } catch (e) {
       res.json({mag:"fejl: " + e});
   }
});

module.exports = router;