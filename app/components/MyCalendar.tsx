// src/components/Calendar.tsx
"use client"

import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventType } from "@/libs/definations";

// Setup the localizer with date-fns
const locales = {
  'en-US': require('date-fns/locale/en-US'),
  // Add other locales if needed
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarProps {
  events: Event[];
}

const MyCalendar: React.FC<CalendarProps> = ({ events }) => {
  return (
    <div style={{ height: '100vh' }}>
      {/* <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      /> */}
    </div>
  );
};

export default MyCalendar;
