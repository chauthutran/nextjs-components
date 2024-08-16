import { EventType, JSONObject, MonthType } from '../libs/definations';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext, MdToday } from "react-icons/md";
import { enUS, es, fr, de } from 'date-fns/locale'; // Import your locales
import { format } from 'date-fns';
import * as Utils from "../libs/utils";
import { LocaleType } from '../libs/locales';

import styles from './Calendar.module.css';


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
const defaultLocale: LocaleType = enUS;

const Calendar: React.FC<CalendarProps> = ({ locale = defaultLocale, events }) => {

	const [selectedMonth, setSelectedMonth] = useState<number>(0);
	const [selectedYear, setSelectedYear] = useState<number>(0);

	const weekDays = generateWeekDays(locale);
	const months: JSONObject[] = generateMonths(locale);

	const setCurrentMonth = () => {
		var curDate = new Date();
		setSelectedMonth(curDate.getMonth() + 1);
		setSelectedYear(curDate.getFullYear());
	}

	useEffect(() => {
		setCurrentMonth();
	}, []);

	const generateCalendarDays = (): (number | null)[] => {

		const startDay = getStartDay(selectedYear, selectedMonth);
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

	const handlePrevBtnClick = () => {
		if (selectedMonth == 1) {
			setSelectedMonth(12);
			setSelectedYear(selectedYear - 1);
		}
		else {
			setSelectedMonth(selectedMonth - 1);
		}
	}

	const handleNextBtnClick = () => {
		if (selectedMonth == 12) {
			setSelectedMonth(1);
			setSelectedYear(selectedYear + 1);
		}
		else {
			setSelectedMonth(selectedMonth + 1);
		}
	}

	// Generate calendar days
	const calendarDays = generateCalendarDays();

	// // Check if a date is within any event range
	// const isDateInRange = (date: Date) => {
	// 	return events.some(event =>
	// 		date >= event.start && date <= event.end
	// 	);
	// };

	const filterEvents = (day: number): EventType[] => {
		return events.filter(event => event.start.getDate() === day && (event.start.getMonth() + 1) === selectedMonth
			&& event.start.getFullYear() === selectedYear);
	}

	const curDate = new Date();

	const title = Utils.findItemFromList(months, selectedMonth, "id");

	return (
		<div className={styles.container}>
			<h2 className={styles.h2}>
				<div className={styles.calendarTitle}>
					<div className={styles.cursorPointer} onClick={(e) => handlePrevBtnClick()}>
						<IoIosArrowBack />
					</div>
					<div className={styles.cursorPointer}>
						{title && title.name} {selectedYear}
					</div>
					<div className={styles.cursorPointer} onClick={() => handleNextBtnClick()}>
						<MdNavigateNext />
					</div>
				</div>

				{/* Right-Aligned Button */}
				<div className={`${styles.marginRightAuto} ${styles.cursorPointer}`} onClick={() => setCurrentMonth()}>
					<MdToday size={24} />
				</div>
			</h2>

			<div className={styles.calendarGrid}>
				{weekDays.map((day: string) => (
					<div key={day} className={styles.weekDays}>
						{day}
					</div>
				))}
				{calendarDays.map((day, index) => (
					<div
						key={index}
						className={`${styles.calendarBoxContainer} ${day ? styles.cursorPointer : styles.bgGray}`}
					>
						{day ? (
							<div className={styles.calendarBox}>
								<div className={styles.dayNumberContainer}>
									{curDate.getFullYear() == selectedYear && (curDate.getMonth() + 1) == selectedMonth && curDate.getDate() === day 
										? <span className={styles.currentDay}>{day}</span> 
										: <>{day}</>}

								</div>
								<div className={styles.eventsContainer}>
									<ul className={styles.eventItemContainer}>
										{filterEvents(day).length > 0 &&
											<li className={styles.eventItem} style={{backgroundColor: filterEvents(day)[0] === undefined ? styles.defaultEventColor : filterEvents(day)[0].color }}>{filterEvents(day)[0].title}</li>
										}
										{filterEvents(day).length > 1 && 
											<li className={` ${styles.eventItem} ${styles.defaultEventColor}`}>More {filterEvents(day).length - 1} event{filterEvents(day).length > 2 && 's'}</li>
										}
									</ul>
								</div>
							</div>
						) : ""}
					</div>
				))}
			</div>
		</div>
	);
};

export default Calendar;
