const mongoose = require('mongoose');

//Laver en Schema
const revisorSchema = mongoose.Schema({
    navn: {
        type: String,
        required: true,
        default: 'Frederik'
    },
    startDag: {
        type: Number,
        required: true
    },
    slutDag: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Revisorer', revisorSchema);





