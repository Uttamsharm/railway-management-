const { Train } = require('../models/Train');
const { Booking } = require('../models/Booking');
const { sequelize } = require('../app');

// Get seat availability for a route
exports.getSeatAvailability = async (req, res) => {
  const { source, destination } = req.query;

  try {
    const trains = await Train.findAll({
      where: { source, destination },
      attributes: ['id', 'trainName', 'availableSeats']
    });

    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seat availability', error: error.message });
  }
};

// Book a seat on a train
exports.bookSeat = async (req, res) => {
  const { trainId } = req.body;
  const userId = req.user.id; // Assuming JWT middleware adds `req.user`

  const transaction = await sequelize.transaction();

  try {
    // Find the train and lock the row to prevent race conditions
    const train = await Train.findOne({
      where: { id: trainId },
      lock: true,
      transaction
    });

    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }

    if (train.availableSeats <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    // Decrement available seats
    train.availableSeats -= 1;
    await train.save({ transaction });

    // Create the booking
    const booking = await Booking.create(
      { trainId, userId, seatNumber: train.totalSeats - train.availableSeats },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({ message: 'Seat booked successfully', booking });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: 'Error booking seat', error: error.message });
  }
};

// Get specific booking details
exports.getBookingDetails = async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id; // Assuming JWT middleware adds `req.user`

  try {
    const booking = await Booking.findOne({
      where: { id: bookingId, userId },
      include: [{ model: Train, attributes: ['trainName', 'source', 'destination'] }]
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking details', error: error.message });
  }
};
