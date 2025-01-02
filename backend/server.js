const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const DB_URI = 'mongodb://localhost:27017/tableBooking'; // Update for deployment
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookingSchema = new mongoose.Schema({
  date: String,
  time: String,
  guests: Number,
  name: String,
  contact: String,
  status: { type: String, default: 'booked' },
});

const Booking = mongoose.model('Booking', bookingSchema);

// API Endpoints

// Create a new booking
app.post('/bookings', async (req, res) => {
  try {
    const { date, time, guests, name, contact } = req.body;

    // Check for double booking
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
      return res.status(400).json({ message: 'Slot already booked.' });
    }

    const booking = new Booking({ date, time, guests, name, contact });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings or filter by date
app.get('/bookings', async (req, res) => {
  try {
    const { date } = req.query;
    const filter = date ? { date } : {};
    const bookings = await Booking.find(filter);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a booking by ID
app.delete('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: 'Booking deleted.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
