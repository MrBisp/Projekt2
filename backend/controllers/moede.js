const Moede = require('../models/Moede');

//Henter alle møder, som tilhører en bestemt kunde
exports.getMoedeByKundeid = async function (req, res) {
    try {
        const moede = await Moede.find({"kunde":req.params.id}).populate('revisor').populate('kunde');
        res.json(moede);
    } catch (e) {
        res.json({msg: 'fejl ' + e});
    }
};

//Henter alle møder, som tilhører en bestemt revisor
exports.getMoedeByRevisorid = async function (req, res) {
    try {
        const moede = await Moede.find({"revisor":req.params.id}).populate('revisor').populate('kunde');
        res.json(moede);
    } catch (e) {
        res.json({msg: 'fejl ' + e});
    }
};

//Henter alle møder i DB
exports.getAlleMoeder = async function (req, res) {
    try {
        const moede = await Moede.find().populate('revisor').populate('kunde');
        res.json(moede);
    } catch (err) {
        res.json({msg: 'Fejl: ' + err});
    }
};

//Opretter et møde i DB
exports.postMoede = async function (req, res) {
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
};

//Sletter møder fra DB
exports.deleteMoede = async function (req, res) {
    try {
        const sletmoede = await Moede.remove({_id: req.params.id});
        res.json(sletmoede);
    } catch (e) {
        res.json({msg: 'fejl ' + e});
    }
};

//Ændrer approved propertien ved et møde i DB
exports.putMoedeStatus = async function (req, res) {
    //Tager ingen argumenter, ændrer approved fra false til true
    console.log('møde approving');
    try {
        let moede = await Moede.findOneAndUpdate({_id: req.params.id}, {approved: true}, {new: true});
        res.json({newMoede: moede});
        console.log('Mødet blev ændret');
    } catch (e) {
        res.json({mag:"fejl: " + e});
        console.log('Der skete en fejl');
    }
};