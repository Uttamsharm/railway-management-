const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { User } = require('./User');
const { Train } = require('./Train');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  trainId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Train,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Associations
User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Train.hasMany(Booking, { foreignKey: 'trainId', onDelete: 'CASCADE' });
Booking.belongsTo(Train, { foreignKey: 'trainId' });

module.exports = { Booking };
