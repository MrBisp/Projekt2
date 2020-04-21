const mongoose = require('mongoose');

const options = {discriminatorKey: 'kind'};

//Laver en Schema
const moedeSchema = mongoose.Schema({
    startTime: {type: String, required: true, min: 6.00, max: 23.75},
    endTime: {type: String, required: true, min: 6.00, max: 23.75},
    //Det er ikke nødvendigt at have en bruger når man skal oprette et møde, og derfor er kunde propertien ikke required
    kunde: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    revisor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    //En kommentar er ikke krævet ved oprettelse af møde - derudover er trim ikke tilføjet
    kommentar: {type: String, required: false},
    tlfnr: {type: Number, required: true, min: 10000000, max: 99999999},
    email: {type: String, required: true, unique: true, trim: true},
    type: {type: String, required: true, trim: true},
    approved: {type: Boolean, required: true}
}, options);

module.exports = mongoose.model('Moede', moedeSchema);



