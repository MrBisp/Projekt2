const Revisor = require('../models/Revisor.js');

module.exports = async (req, res) => {
    try {
        const revisorer = await Revisor.find({});
        res.render('index', {
            revisorer: revisorer
        });
    } catch (e) {
        console.log(e);
    }
};