import { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from '../components/BookingForm';
import AvailabilityDisplay from '../components/AvailabilityDisplay';
import BookingSummary from '../components/BookingSummary';
import CalendarView from '../components/CalendarView';
import '../styles/globals.css';

const Home = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    name: '',
    contact: '',
  });

  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([
    '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'
  ]); // Hardcoded example time slots for simplicity

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/bookings');
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error(error);
      setBookings([]);
    }
  };

  // Ensure the date is not in the past
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // reset current date to 00:00

    if (selectedDate < currentDate) {
      setMessage('Selected date cannot be in the past.');
    } else {
      setMessage('');
      setFormData({ ...formData, date: e.target.value });
    }
  };

  // Handle time validation against available slots
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    if (availableTimeSlots.includes(selectedTime)) {
      setFormData({ ...formData, time: selectedTime });
    } else {
      setMessage('Invalid time slot selected.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure all required fields are filled
    if (!formData.date || !formData.time || !formData.name || !formData.contact) {
      setMessage('Please fill all the fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/bookings', formData);
      setMessage('Booking successful!');
      setBookingDetails(response.data);
      fetchBookings();
      setFormData({ date: '', time: '', guests: 1, name: '', contact: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/restaurant-bg.jpg')" }}>
      <div className="p-6 bg-black bg-opacity-50 min-h-screen">
        <h1 className="text-4xl font-bold text-white text-center mb-10">Restaurant Table Booking</h1>
        <div className="max-w-3xl mx-auto">
          <BookingForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleDateChange={handleDateChange}
            handleTimeChange={handleTimeChange}
            availableTimeSlots={availableTimeSlots}
          />
          {message && <p className="mt-4 text-red-500">{message}</p>}
          {bookingDetails && <BookingSummary bookingDetails={bookingDetails} />}
          {bookings && bookings.length > 0 ? (
            <AvailabilityDisplay bookings={bookings} />
          ) : (
            <p className="text-center text-gray-500 mt-6">No bookings available.</p>
          )}
          <CalendarView onDateChange={(date) => setFormData({ ...formData, date: date.toISOString().split('T')[0] })} />
        </div>
      </div>
    </div>
  );
};

export default Home;
