const express = require('express');
const router = express.Router();
const Revisor = require('../models/Revisor');

//Routes
router.get('/', async (req, res) => {
    try {
        const revisorer = await Revisor.find();
        res.json(revisorer);
    } catch (err) {
        res.json({msg: 'Fejl'});
    }
});

//Tilføj en revisor
router.post('/', async (req, res) => {
    const revisor = new Revisor({
        navn: req.body.navn,
        startDag: req.body.startDag,
        slutDag: req.body.slutDag
    });

    //Gem revisoren
    try {
        const gemtRevisor = await revisor.save();
        res.json(gemtRevisor)
    } catch (err) {
        res.json({msg: err});
    }
});

//Hent en specifik revisor
router.get('/:id', async (req, res) => {
    try {
        const revisor = await Revisor.findById(req.params.id);
        res.json(revisor);
    } catch (e) {
        res.json({msg: 'fejl ' + e});
    }
});

//Fjern revisor
router.delete('/:id', async (req, res) => {
    try {
        const fjern = await Revisor.remove({_id: req.params.id});
        res.json(fjern);
    } catch (e) {
        res.json({msg: 'fejl ' + e});
    }
});

//Opdater revisor
router.patch('/:id', async (req, res) => {
    try {
        const opdateret = await Revisor.updateOne({_id: req.params.id},
            {$set: {
                navn: req.body.navn,
                startDag: req.body.startDag,
                slutDag: req.body.slutDag
            }
        });
        res.json(opdateret);

    } catch (e) {
        res.json({msg: 'fejl ' + e});
    }
});

module.exports = router;