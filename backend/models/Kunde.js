const mongoose = require("mongoose");
const User = require("./User");

const Kunde = User.discriminator("Kunde", new mongoose.Schema({
        privatKunde: {type: Boolean, required: true},
        erhvervsKunde: {type: Boolean, required: true}
    }),
);

module.exports = mongoose.model("Kunde");
