const express = require('express');
const controller = require('../controllers/usercontroller');
const conn = require('../utils/dbconn');
const router = express.Router();

router.get('/:id', controller.getUserDetails);
router.post('/login', controller.postLogin);
router.post('/register', controller.postRegister);

module.exports = router;