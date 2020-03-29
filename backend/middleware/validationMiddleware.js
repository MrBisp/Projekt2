module.exports = (req, res, next) => {
    console.log(req);
    if(req.body.navn == null || req.body.startDag == null || req.body.slutDag ==  null){
        console.log('Form submittion not valid');
        return res.redirect('/');
    } else {
        console.log('Form submittion valid');
    }
    next();
};