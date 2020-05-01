const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
//Middleware -
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

//Routes -
//Henter alle brugere fra DB
router.get('/', userController.getAlleBrugere);

//Henter alle brugere af typen 1 (revisorer) fra DB
router.get('/revisor', userController.getAlleRevisoere);

//Når der oprettes en ny kunde
router.post("/kunde", userController.postKunde);

router.post("/revisor", userController.postRevisor);

//Benytter middleware authenticationMiddleware til at vertify at authorization headeren er gyldig
//Er den dette, får man brugeren i req.user
router.get('/userByToken', authenticationMiddleware, userController.getBrugerByToken);

module.exports = router;