var express = require('express');
var router = express.Router();
var dashboard = require('../controllers/dashboardController');
var common = require('../controllers/commonController/commonController');

// router.post('/create-work-order', dashboard.createWorkOrder);
router.post('/create-all-tables-data', common.createAllTablesData);
router.get('/fetch-work-order', common.fetchWorkOrder);

module.exports = router;