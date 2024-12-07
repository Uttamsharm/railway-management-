const express = require('express');
const { validateApiKey } = require('../middlewares/apiKeyMiddleware');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { addTrain, updateSeats } = require('../controllers/adminController');

const router = express.Router();

// Route to add a new train
router.post(
  '/add-train',
  validateApiKey,
  authenticateToken,
  authorizeRole('admin'),
  addTrain
);

// Route to update seats in an existing train
router.put(
  '/update-seats/:trainId',
  validateApiKey,
  authenticateToken,
  authorizeRole('admin'),
  updateSeats
);

module.exports = router;
