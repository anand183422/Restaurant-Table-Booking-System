// components/CalendarView.jsx
import React from 'react';
import Calendar from 'react-calendar';  // You need to install react-calendar

const CalendarView = ({ onDateChange }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Select Date</h2>
      <Calendar onChange={onDateChange} />
    </div>
  );
};

export default CalendarView;
