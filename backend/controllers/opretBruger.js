const user = require("../models/User");

module.exports = async (req, res) => {
    try {
        let kunder = await user.find({type: 2});
        res.render("opretKunde", {
            kunder: kunder
        });
    } catch (err) {
        console.log(err)
    }
};