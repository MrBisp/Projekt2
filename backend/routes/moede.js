const express = require('express');
const router = express.Router();
const moedeController = require('../controllers/moede');
router.get('/kunde/:id', moedeController.getMoedeByKundeid);

const authenticationMiddleware = require('../middleware/authenticationMiddleware');

//Routes
router.get('/', moedeController.getAlleMoeder);

//Hent møder fra en revisor med revisorid id
router.get('/:id', moedeController.getMoedeByRevisorid);

//Hent møder fra en kunde med kundeid id
router.get('/kunde/:id', moedeController.getMoedeByKundeid);

//Tilføj et møde
router.post('/', moedeController.postMoede);

//Fjerner møde
router.delete('/:id', authenticationMiddleware, moedeController.deleteMoede);

//Godkend møde med mødeid id
router.put('/approve/:id', authenticationMiddleware, moedeController.putMoedeStatus);

module.exports = router;