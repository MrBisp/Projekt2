module.exports =  async (req, res) => {
    console.log(req.body);
    try {
        await Revisor.create(req.body);
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.redirect('/create');
    }
};