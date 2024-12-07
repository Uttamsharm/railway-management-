const { Train } = require('../models/Train');

// Add a new train
exports.addTrain = async (req, res) => {
  const { trainName, source, destination, totalSeats } = req.body;

  try {
    // Create the train
    const newTrain = await Train.create({
      trainName,
      source,
      destination,
      totalSeats,
      availableSeats: totalSeats
    });

    res.status(201).json({ message: 'Train added successfully', train: newTrain });
  } catch (error) {
    res.status(500).json({ message: 'Error adding train', error: error.message });
  }
};

exports.updateSeats = async (req, res) => {
  const { trainId } = req.params;
  const { seatsToUpdate } = req.body;

  try {
    // Find the train
    const train = await Train.findByPk(trainId);
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }

    // Update seats
    train.availableSeats = seatsToUpdate;
    await train.save();

    res.status(200).json({ message: 'Seats updated successfully', train });
  } catch (error) {
    res.status(500).json({ message: 'Error updating seats', error: error.message });
  }
};
