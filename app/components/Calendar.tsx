import { EventType, JSONObject, MonthType } from '@/libs/definations';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext, MdToday } from "react-icons/md";
import { enUS, es, fr, de } from 'date-fns/locale'; // Import your locales
import { format } from 'date-fns';


// Define type for supported locales
type LocaleType = typeof enUS | typeof es | typeof fr | typeof de;


// Helper function to generate days of the week
const generateWeekDays = (locale: LocaleType): string[] => {
	const weekdays = Array.from({ length: 7 }, (_, i) => i);

	return weekdays.map(day =>
		format(new Date(2022, 0, day + 2), 'EEE', { locale })
	);
};

const startYear = 2024;
const endYear = 2000;
const years = Array.from({ length: startYear - endYear + 1 }, (_, i) => startYear - i);

// Function to generate localized month names
const generateMonths = (locale: LocaleType): MonthType[] => {
	// Array of month indices, 0 (January) to 11 (December)
	const months = Array.from({ length: 12 }, (_, i) => i);

	return months.map((month) =>
	({
		id: month + 1,
		name: format(new Date(2022, month, 1), 'MMMM', { locale })  // Use any date with the month part
	} as MonthType)
	);
};

// Helper function to get the number of days in a month
const getDaysInMonth = (year: number, month: number) => {
	return new Date(year, month, 0).getDate();
};

// Helper function to get the start day of the month
const getStartDay = (year: number, month: number) => {
	return new Date(year, month - 1, 1).getDay();
};


interface CalendarProps {
	locale?: LocaleType,
	events: EventType[];
}

// Define a default locale
const defaultLocale: LocaleType = fr;

const Calendar: React.FC<CalendarProps> = ({ locale = defaultLocale, events }) => {

	const monthRef = useRef(null);
	const yearRef = useRef(null);

	const [selectedMonth, setSelectedMonth] = useState<number>(0);
	const [selectedYear, setSelectedYear] = useState<number>(0);

	const weekDays = generateWeekDays(locale);
	const months: JSONObject[] = generateMonths(locale);


	useEffect(() => {
		var curDate = new Date();
		setSelectedMonth( curDate.getMonth() + 1);
		setSelectedYear( curDate.getFullYear() );
	},[]);

	const generateCalendarDays = (): (number | null)[] => {
		
		const startDay = getStartDay(selectedYear, selectedMonth );
		const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

		const calendarDays = [];
		for (let i = 0; i < startDay; i++) {
			calendarDays.push(null); // Empty cells before the start of the month
		}
		for (let i = 1; i <= daysInMonth; i++) {
			calendarDays.push(i);
		}

		return calendarDays;
	}

	// Generate calendar days
	const calendarDays = generateCalendarDays();
	
	// Check if a date is within any event range
	const isDateInRange = (date: Date) => {
		return events.some(event =>
			date >= event.start && date <= event.end
		);
	};

	const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedMonth(parseInt( e.target.value ));
	}

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedYear(parseInt( e.target.value ))
	}

	const filterEvents = (day: number): EventType[] => {
		return events.filter(event => event.start.getDate() === day && (event.start.getMonth() + 1) === selectedMonth 
			&& event.start.getFullYear() === selectedYear );
	}

	const curDate = new Date();
	
	return (
		<div className="w-full h-full items-center justify-center">
			<h2 className="flex items-center justify-between text-xl font-semibold mb-4 w-full">
				<div className="flex-1 flex items-center justify-center space-x-8">
					<div className="cursor-pointer">
						<IoIosArrowBack />
					</div>
					<div className="cursor-pointer">
						<select 
						value={selectedMonth}
						  onChange={handleMonthChange}>
							{months.map((item, idx) => (
								<option key={`month_${item.id}`} value={item.id}>{item.name}</option>
							))}
						</select>

						{/* Year Selector */}
						<select
							className="p-2 border border-gray-300 rounded"
							value={selectedYear}
						  onChange={handleYearChange}
						>
							{years.map(year => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</div>
					<div className="cursor-pointer">
						<MdNavigateNext />
					</div>
				</div>

				{/* Right-Aligned Button */}
				<div className="ml-auto cursor-pointer">
					<MdToday size={24} />
				</div>
			</h2>

			<div className="grid grid-cols-7">
				{weekDays.map((day: string) => (
					<div key={day} className="p-1 text-center font-medium text-black border border-gray-300 bg-gray-200 text-sm">
						{day}
					</div>
				))}
				{calendarDays.map((day, index) => (
					<div
						key={index}
						className={`relative border border-gray-300 ${day ? 'cursor-pointer' : ''} flex flex-col`}
					>
						{day ? (
							<div className="relative flex flex-col h-[100px]">
								<div className="absolute top-2 right-2 text-lg text-gray-800">
									{curDate.getFullYear() == selectedYear && (curDate.getMonth() + 1) == selectedMonth && curDate.getDate() === day ? <span className="rounded-full bg-blue-300 p-1">{day}</span> : <>{day}</>}
									
								</div>
								<div className="flex-1 pt-6 items-start">
									<ul className="list-none space-y-1 text-xs mt-4">
										{filterEvents(day).length > 0 && 
											<li className="truncate bg-blue-200 p-1 rounded-sm">{filterEvents(day)[0].title}</li>
										}
										{filterEvents(day).length > 1 && 
											<li className="truncate bg-blue-200 p-1 rounded-sm">More {filterEvents(day).length - 1} event(s)</li>
										}
									</ul>
								</div>
							</div>
						) : <div className="bg-gray-400"></div>}
					</div>
				))}
			</div>
		</div>
	);
};

export default Calendar;
