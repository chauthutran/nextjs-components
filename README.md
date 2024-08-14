# JC's Company Next.js Component

A reusable component for Next.js applications.

## Installation

## Usage
"use client"

import Calendar from "./components/Calendar";
import { enUS, es, fr, de } from 'date-fns/locale'; // Import your locales


const events = [
	{
		title: 'Meeting with Bob',
		start: new Date(2024, 7, 15, 10, 0), // YYYY, MM, DD, HH, MM
		end: new Date(2024, 7, 15, 11, 0),
		color: "#ff00ff"
	},
	{
		title: 'Dinner with Honey',
		start: new Date(2024, 7, 15, 20, 0), // YYYY, MM, DD, HH, MM
		end: new Date(2024, 7, 15, 20, 0),
		color: "#ff0f0f"
	},
	{
		title: 'Lunch with Alice',
		start: new Date(2024, 7, 16, 12, 0),
		end: new Date(2024, 7, 16, 13, 0),
	}
]

export default function Home() {
	return (
		<main className="m-5 flex w-[700px] h-[700px] flex-col items-center justify-between bg-white p-4">
			<Calendar events={events} locale={enUS} />
		</main>
	);
}


export default HomePage;

### 2. **Build Your Component**

Run the build script to transpile your code:

```bash
npm run build

``` NPM link
https://www.npmjs.com/package/nextjs-calendar
