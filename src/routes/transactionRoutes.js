const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.get('/', transactionController.getTransactions);
router.post('/', transactionController.createTransaction);

module.exports = router;
