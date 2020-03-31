const mongoose = require("mongoose");
const User = require("./User");

const Kunde = User.discriminator("Kunde", new mongoose.Schema({
        //Boolean da man kan være privatkunde, erhvervskunde eller begge dele (true false, false true eller true true)
        privatKunde: {type: Boolean, required: true},
        erhvervsKunde: {type: Boolean, required: true}
    }),
);

module.exports = mongoose.model("Kunde");
