const Revisor = require('../models/Revisor.js');

module.exports = async (req, res) => {
    const id = req.query.id;
    if(id == undefined){
        console.log('no id provided');
        try {
            const revisorer = await Revisor.find({});
            res.render('alleRevisorer', {
                revisorer: revisorer
            });
        } catch (e) {
            console.log(e);
        }
    } else {
        res.redirect('/visRevisor/' + id.toString());
    }

};