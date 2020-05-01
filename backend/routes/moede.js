const express = require('express');
const router = express.Router();
const moedeController = require('../controllers/moede');

//Routes
router.get('/', moedeController.getAlleMoeder);

//Hent møder fra en revisor med revisorid id
router.get('/:id', moedeController.getMoedeByRevisorid);

//Hent møder fra en kunde med kundeid id
router.get('/kunde/:id', moedeController.getMoedeByKundeid);

//Tilføj et møde
router.post('/', moedeController.postMoede);

//Fjerner møde
router.delete('/:id', moedeController.deleteMoede);


//Godkend møde i møde
router.put('/approve/:id', moedeController.putMoedeStatus);

module.exports = router;