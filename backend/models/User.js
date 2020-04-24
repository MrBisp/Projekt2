const mongoose = require('mongoose');
const userOptions = {discriminatorKey: 'user', collection: "user"};

//Definerer User Schema
const User = mongoose.Schema({
    navn: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    tlf: {type: Number, required: true, min: 10000000, max: 99999999},
    username: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true, trim: true},
    moeder: [{type: mongoose.Schema.Types.ObjectId, ref: 'Moede', required: false}],
    type: {type: Number, required: true, enum: [1, 2]}
}, userOptions);

module.exports = mongoose.model('User', User);