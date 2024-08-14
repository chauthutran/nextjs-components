"use client"

import Image from "next/image";
import MyCalendar from "./components/MyCalendar";
import Calendar from "./components/Calendar";
import { enUS, es, fr, de } from 'date-fns/locale'; // Import your locales


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
  }
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <h1>My Calendar</h1>
      <Calendar events={events} locale={enUS} />
      {/* <Calendar events={events} locale={fr} /> */}

      {/* <MyCalendar events={events}  /> */}
    </main>
  );
}
