const mongoose = require('mongoose');

const options = {discriminatorKey: 'user'};


//Laver en Schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    navn: String,
    type: Number
}, options);


module.exports = mongoose.model('User', userSchema);

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






