const mongoose = require('mongoose');

const options = {discriminatorKey: 'kind'};

//Laver en Schema
const moedeSchema = mongoose.Schema({
    startTime: String,
    endTime: String,
    kunde: Number,
    revisor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    kommentar: String,
    tlfnr: Number,
    mail: String,
    type: String
}, options);

module.exports = mongoose.model('Moede', moedeSchema);





