// components/AvailabilityDisplay.jsx
import React from 'react';

const AvailabilityDisplay = ({ bookings }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Available Bookings</h2>
      <ul className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-md">
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
            </li>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </ul>
    </div>
  );
};

export default AvailabilityDisplay;
