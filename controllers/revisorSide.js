const Revisor = require('../models/Revisor.js');

module.exports = async (req, res) => {
    try {
        const revisor = await Revisor.findById(req.params.id);
        res.render('visRevisor', {
            revisor
        });
    } catch (e) {
        console.log(e);
    }
};