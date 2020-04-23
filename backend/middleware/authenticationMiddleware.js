const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403).json(err);
            }
            req.user = user.u;
            next();
        });
    } else {
        console.log("ingen header");
        res.sendStatus(401);
    }
};