const jwt = require('jsonwebtoken');
const accessTokenSecret = 'studiegruppe50semester2';

module.exports = (req, res, next) => {
    //Hent http-requestens 'Authorization'-header
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            //Hvis token er ugyldig, send 403 og fejlbesked
            if (err) {
                return res.status(403).json(err);
            }
            //Hvis token er valid, gør useren tilgængelig ved req.user.
            req.user = user.u;
            next();
        });
    //Hvis der ikke er en authorization header, send 401
    } else {
        res.status(401);
    }
};

