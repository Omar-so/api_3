const express = require('express');
const router = express.Router();
const subscriptionController = require('../controller/subscribtion_controller');

// Pay subscription for a student
router.post('/pay', subscriptionController.subscribePay);

// Display all subscription records for a student
router.get('/display', subscriptionController.displaySubscription);

// Get number of students subscribed this month
router.get('/this-month', subscriptionController.subscribedThisMonth);

// Download all subscriptions as CSV
router.get('/download-all', subscriptionController.getAllSubscriptionsCSV);

module.exports = router;
