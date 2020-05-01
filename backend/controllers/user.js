const User = require('../models/User');
const Revisor = require("../models/Revisor");
const Kunde = require("../models/Kunde");

//Henter alle Brugere fra DB
exports.getAlleBrugere = async function (req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({msg: 'Fejl: ' + err});
    }
};

//Henter alle revisorere fra DB
exports.getAlleRevisoere = async function (req, res) {
    try {
        const users = await User.find({type: 1});
        res.json(users);
    } catch (err) {
        res.json({msg: 'Fejl: ' + err});
    }
};

//Opretter Kunde i DB
exports.postKunde = async function (req, res) {
    let privatKunde, erhvervsKunde;
    //undersøger kundeTypen og definerer property ud fra dette
    if(req.body.kundeType == 1){
        privatKunde = true;
        erhvervsKunde = false;
        console.log("privat");
    } else if (req.body.kundeType == 2) {
        erhvervsKunde = true;
        privatKunde = false;
        console.log("erhverv");
    } else if (req.body.kundeType == 3) {
        privatKunde = true;
        erhvervsKunde = true;
    } else {console.log("Noget gik galt med typen af kunde");}

    let kunde = new Kunde({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        navn: req.body.navn,
        tlf: req.body.tlf,
        type: 2,
        privatKunde: privatKunde,
        erhvervsKunde: erhvervsKunde
    });

    //Gem kunden og returner den, eller giv en fejl hvis det mislykkes
    try {
        const gemtKunde = await kunde.save();
        res.json(gemtKunde);
    } catch (err) {
        res.status(500).json(err);
    }
};

//Opretter Revisor i DB
exports.postRevisor = async function (req,res) {
    let startTime = req.body.startTime;
    let slutTime = req.body.slutTime;
    let startMinut = req.body.startMinutter;
    let slutMinut = req.body.slutMinutter;
    let startTid, slutTid;

    //Konverterer 30 minutter til 0,5 (timer)
    if(startMinut == 30) startMinut = 0.5;
    //Bemærk at startTime ganges med 1, for at konvertere fra String -> Number. Uden dette får man uventede resultater
    startTid = startTime * 1 + startMinut;

    //Samme som ovenstående linjer kode
    if(slutMinut == 30) slutMinut = 0.5;
    slutTid = slutTime * 1 + slutMinut;

    let revisor = new Revisor({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        navn: req.body.navn,
        tlf: req.body.tlf,
        type: 1,
        startDag: startTid,
        slutDag: slutTid
    });

    //Gemmer revisor og returnerer
    try {
        let gemtRevisor = await revisor.save();
        res.json(gemtRevisor);
    } catch (err) {
        res.status(500).json(err)
    }
};

//Henter bruger på baggrund af en token
exports.getBrugerByToken = function (req,res) {
    res.json({'user': req.user});
};
