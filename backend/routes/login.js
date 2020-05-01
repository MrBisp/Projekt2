const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

//Post request ved login
router.post('/userloginWithAuth', loginController.login);

module.exports = router;