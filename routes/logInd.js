const express = require('express');
const router = express.Router();

//Routes
router.get('/', (req, res) => {
    res.send('Loginside');
});

router.get('/underside', (req, res) => {
    res.send('Loginside underside');
});

module.exports = router;