// src/pages/index.tsx

import React from 'react';
import MyCalendar from './components/Calendar';

const events = [
  {
    title: 'Meeting with Bob',
    start: new Date(2024, 7, 15, 10, 0), // YYYY, MM, DD, HH, MM
    end: new Date(2024, 7, 15, 11, 0),
  },
  {
    title: 'Lunch with Alice',
    start: new Date(2024, 7, 16, 12, 0),
    end: new Date(2024, 7, 16, 13, 0),
  },
  // Add more events as needed
];

export default function Home() {
  return (
    <div>
      <h1>My Calendar</h1>
      <MyCalendar events={events} />
    </div>
  );
};