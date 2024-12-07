const express = require('express');
const { connectDB } = require('./config/db');


const app = express();
connectDB();

app.use(express.json());

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);





module.exports = app;
