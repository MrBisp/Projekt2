const mongoose = require('mongoose');
const userOptions = {discriminatorKey: 'user', collection: "user"};

//Laver en Schema
const User = mongoose.Schema({
    navn: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    tlf: {type: Number, required: true, min: 10000000, max: 99999999},
    username: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true, trim: true},
    //Ved oprettelse af brugeren har kunden jo formentlig ikke nogle møder, og derfor skal det være muligt at oprette
    //Yderligere skal der gøres brug af User.find().populate("moeder") hvis man vil hente kunde documentet indeholdende moede documenterne ned.
    moeder: [{type: mongoose.Schema.Types.ObjectId, ref: 'Moede', required: false}],
    type: {type: Number, required: true, enum: [1, 2]}
}, userOptions);


module.exports = mongoose.model('User', User);


//module.exports = mongoose.model('User', userSchema);

//Til aflevering
/*
const revisorSchema = mongoose.Schema({
    username: String,
    password: String,
    navn: String,
    startDag: Number,
    slutDag: Number,
    revisorhus: [{type: mongoose.Schema.Types.ObjectId, ref: 'Revisorhus'}]
}, options);

const revisorhusSchema = mongoose.Schema({
    navn: String,
    adresse: String
}, options);

const kundeSchema = mongoose.Schema({
    username: String,
    password: String,
    navn: String,
    email: String,
    telefon: String,
    adresse: String
}, options);

const moedeSchema = mongoose.Schema({
    start: Date,
    slut: Date,
    type: Number,
    kommentar: String,
    revisor: [{type: mongoose.Schema.Types.ObjectId, ref: 'Revisor'}],
    kunde: [{type: mongoose.Schema.Types.ObjectId, ref: 'Kunde'}]
}, options);
*/






