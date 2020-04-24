const mongoose = require('mongoose');
const User = require("./User");

//Brug User.discriminator, til at lave en form for nedarvning af User Schemaet
const Revisor = User.discriminator("Revisor", new mongoose.Schema({
        startDag: {type: Number, required: true, min: 6.00, max: 23.75},
        slutDag: {type: Number, required: true, min: 6.00, max: 23.75}
    }),
);

module.exports = mongoose.model('Revisor');