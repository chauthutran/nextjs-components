"use client"

import Calendar from "./components/Calendar";
import { enUS, es, fr, de } from 'date-fns/locale'; // Import your locales


const events = [
	{
		title: 'Meeting with Bob',
		start: new Date(2024, 7, 15, 10, 0), // YYYY, MM, DD, HH, MM
		end: new Date(2024, 7, 15, 11, 0),
	},
	{
		title: 'Dinner with Honey',
		start: new Date(2024, 7, 15, 20, 0), // YYYY, MM, DD, HH, MM
		end: new Date(2024, 7, 15, 20, 0),
	},
	{
		title: 'Lunch with Alice',
		start: new Date(2024, 7, 16, 12, 0),
		end: new Date(2024, 7, 16, 13, 0),
	}
]

export default function Home() {
	return (
		<main className="m-5 flex w-[700px] h-[700px] flex-col items-center justify-between bg-white">
			<Calendar events={events} locale={enUS} />
		</main>
	);
}
