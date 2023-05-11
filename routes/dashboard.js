var express = require('express');
var router = express.Router();
var dashboard = require('../controllers/dashboardController');
var common = require('../controllers/commonController/commonController');

// DASHBOARD
// router.post('/create-work-order', dashboard.createWorkOrder);
router.post('/create-all-tables-data', common.createAllTablesData);
router.get('/fetch-work-order', common.fetchWorkOrder);
router.get('/fetch-new-work-order', dashboard.fetchNewWorkOrder);
router.get('/fetch-my-work-order', dashboard.fetchMyWorkOrder);
router.get('/fetch-all-work-order', dashboard.fetchAllWorkOrder);
// router.post('/create-appointment', dashboard.createAppointment)

// LOCATION LIST
router.get('/fetch-locations', dashboard.fetchLocationsCustomers); 

// ARCHIVE
router.put('/archive-my-work-order/:id', dashboard.archiveMyWorkOrder);

module.exports = router;