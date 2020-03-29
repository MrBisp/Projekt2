const express = require('express');
const router = express.Router();
const User = require('../models/User');

const mongoose = require('mongoose');
const options = {discriminatorKey: 'user'};

// Sub classes
const Revisor = require("../models/Revisor");
const Kunde = require("../models/Kunde");
const moede = require("../models/Moede");

//Routes
//Henter alle brugere fra DB
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({msg: 'Fejl: ' + err});
    }
});

//Henter alle brugere af typen 1 (revisorer) fra DB
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

//Tilføj et skattemøde
router.post('/revisor', async (req, res) => {
    const moede = new Revisor({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        navn: req.body.navn,
        startDag: req.body.startDag,
        slutDag: req.body.slutDag,
        moeder: req.body.moeder,
        type: 1
    });

    //Gem revisoren
    try {
        const gemtRevisor = await moede.save();
        res.json(gemtRevisor)
    } catch (err) {
        res.json({msg: err});
    }
});

//Henter alle brugere af typen 2 (kunde) i DB
router.get('/hentBrugere', (req, res) => {
        User.find({type: 2})
            .exec()
            .then((docs) => {
                const response = {
                    count: docs.length,
                    kunder: docs.map((doc) => {
                        return {
                            _id: doc._id,
                            username: doc.username,
                            password: doc.password,
                            email: doc.email,
                            navn: doc.navn,
                            tlf: doc.tlf,
                            type: doc.type,
                            privatKunde: doc.privatKunde,
                            erhvervsKunde: doc.erhvervsKunde,
                            //Kan bruges til at navigere rundt i eks. postman (Henter de/det møde som kunden er knyttet til)
                            moede: {
                                type: "GET",
                                url: "http://localhost:3000/moede/kunde/test" + doc._id
                            }
                        }
                    })
                };
                res.json(response);
                return response
                })
            .catch((err)=>{
                res.json({msg: 'Fejl: ' + err});
            });
});

router.post("/opretBruger", async (req, res) => {
    let privatKunde = false;
    let erhvervsKunde = false;

    /*
    Godt nok - Der opstod et problem med queryen der kom med requesten. I og med vi stringifyer den, inden der bliver sendt som req, så ankommer hele queryen
    i " " citations tegn. Så når man skal behandle det første og det sidste parameter i queryen, så skal man tage højde for at der er " i enden af stringen
    eks: "fornavn=Tobias&efternavn=Nielsen" - så vil det sige, at når vi siger req.body.fornavn så kan den ikke finde denne værdi, da den i queryen ikke har
    navnet 'fornavn' men '"fornavn' og for værdien til efternavn er det ikke 'Nielsen' men 'Nielsen"'.

    Nedenunder går jeg værdien for kundeType ingennem (den sidste værdi i queryen) og tilføjer alle tegn pånær det sidste ind i en ny variabel, som jeg
    arbejder videre med

    Dette er så ikke et problem, hvis vi lader vær med at stringify
    */
    //undersøger kundeTypen
    if(req.body.kundeType == "privat"){
        privatKunde = true;
        console.log("privat");
    } else if (req.body.kundeType == "erhverv") {
        erhvervsKunde = true;
        console.log("erhverv");
    } else if (req.body.kundeType == "erhvervOgPrivat") {
        privatKunde = true;
        erhvervsKunde = true;
        console.log("privat og erhverv");
    } else {console.log("Noget gik galt med typen af kunde");}

    //Kan ikke få fornavnet med
   let kunde = new Kunde({
       username: req.body.username,
       password: req.body.password,
       email: req.body.email,
       navn: req.body.fornavn + " " + req.body.efternavn,
       tlf: req.body.tlf,
       type: 2,
       privatKunde: privatKunde,
       erhvervsKunde: erhvervsKunde
   });

   console.log(kunde);
   try {
        const gemtKunde = await kunde.save();
        res.json(gemtKunde);
   } catch (err) {
       console.log("Fejl: " + err);
   }
});




/*
Kunde.create({navn: "Tobias",
    email: "t@kunde.dk",
    tlf: 20202020,
    username: "Tobi",
    password: "123456",
    type: 2,
    privatKunde: true,
    erhvervsKunde: false}, console.log("Kunde oprettet"));
*//*
Revisor.create({
    navn: "RevTob",
    email: "t@revisor.dk",
    tlf: 10101010,
    username: "REVISORTOBIAS",
    password: "123456",
    type: 1,
    startDag: 12,
    slutDag: 18
}, console.log("Revisor oprettet"));
*/


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

Kunde

kunde.create({navn: "Tobias",
    email: "t@kunde.dk",
    tlf: 20202020,
    username: "Tobi",
    password: "123456",
    moeder: ["moede1", "moede2", "moede3"],
    type: 2,
    privatKunde: true,
    erhvervsKunde: false});
 */