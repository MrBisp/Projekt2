const Revisor = require('../models/User.js');

module.exports = async (req, res) => {
    try {
        const revisorer = await Revisor.find({type:1});
        res.render('index', {
            revisorer: revisorer
        });
    } catch (e) {
        console.log(e);
    }
};