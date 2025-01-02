import React, { useState, useEffect } from 'react';

const BookingForm = ({ formData, handleInputChange, handleSubmit }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    setCurrentDate(today);

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setCurrentTime(formattedTime);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto space-y-6">
      <div>
        <label htmlFor="date" className="block text-gray-700 font-semibold">Select Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          min={currentDate} // Restricts past dates
          className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label htmlFor="time" className="block text-gray-700 font-semibold">Select Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
          min={formData.date === currentDate ? currentTime : undefined} // Restricts past times for the current date
          className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label htmlFor="guests" className="block text-gray-700 font-semibold">Number of Guests</label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleInputChange}
          min="1"
          required
          className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-gray-700 font-semibold">Your Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Full Name"
          required
          className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label htmlFor="contact" className="block text-gray-700 font-semibold">Contact Information</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          placeholder="Phone or Email"
          required
          className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        className="w-full p-3 mt-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
