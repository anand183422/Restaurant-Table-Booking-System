// components/BookingSummary.jsx
import React from 'react';

const BookingSummary = ({ bookingDetails }) => {
  return (
    <div className="mt-10 p-8 bg-white shadow-xl rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Booking Summary</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {bookingDetails.name}</p>
        <p><strong>Contact:</strong> {bookingDetails.contact}</p>
        <p><strong>Date:</strong> {bookingDetails.date}</p>
        <p><strong>Time:</strong> {bookingDetails.time}</p>
        <p><strong>Guests:</strong> {bookingDetails.guests}</p>
      </div>
      <button
        className="w-full bg-accent text-white py-3 mt-6 rounded-md hover:bg-accent/80 transition duration-300"
        onClick={() => window.location.reload()}
      >
        Close
      </button>
    </div>
  );
};

export default BookingSummary;
