const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.get('/inventory', reportController.getInventoryReport);
router.get('/transactions', reportController.getTransactionReport);

module.exports = router;
