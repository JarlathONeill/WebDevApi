const express = require('express');
const controller = require('./../controllers/schedulecontrollers');
const conn = require('../utils/dbconn');
const router = express.Router();

//api routes
router.get('/selectsnapshot/:id', controller.getSelectSnapshot);
router.get('/getdashboard', controller.getDashboard);

router.post('/addsnapshot', controller.postNewSnap);

router.put('/updatesnapshot/:id', controller.updateSnapshot);

router.delete('/deletesnapshot/:id', controller.deleteSnapshot);


module.exports = router;    