const Moede = require('../models/Moede.js');

module.exports = async (req, res) => {
    try {
        const moeder = await Moede.find({});
        res.render('moede', {
            moeder
        });
    } catch (e) {
        console.log(e);
    }

};