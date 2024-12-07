const express = require('express');
const {
  registerUser,
  loginUser,
  getSeatAvailability,
  bookSeat,
  getBookingDetails
} = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/register', registerUser);


router.post('/login', loginUser);


router.get('/trains/availability', authenticateToken, getSeatAvailability);

// Route to book a seat
router.post('/book-seat', authenticateToken, bookSeat);

// Route to get specific booking details
router.get('/booking/:bookingId', authenticateToken, getBookingDetails);

module.exports = router;
