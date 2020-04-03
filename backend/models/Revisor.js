const mongoose = require('mongoose');
const User = require("./User");

//Laver en Schema
const Revisor = User.discriminator("Revisor", new mongoose.Schema({
    //Vi skal lige beslutte os for string eller number, nedenfor er to forskellige måder at validere
    //Skriv omkring overvejelserne i rapporten
        startDag: {type: Number, required: true, min: 6.00, max: 23.75},
        slutDag: {type: Number, required: true, min: 6.00, max: 23.75}
    }),
);

module.exports = mongoose.model('Revisor');





