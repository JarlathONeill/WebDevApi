const express = require('express');
const controller = require('../controllers/usercontroller');
const router = express.Router();
router.get('/users/:id', controller.getUserDetails);

module.exports = router;