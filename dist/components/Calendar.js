"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var io_1 = require("react-icons/io");
var md_1 = require("react-icons/md");
var locale_1 = require("date-fns/locale"); // Import your locales
var date_fns_1 = require("date-fns");
var Utils = __importStar(require("@/libs/utils"));
var Constants = __importStar(require("@/libs/constants"));
// Helper function to generate days of the week
var generateWeekDays = function (locale) {
    var weekdays = Array.from({ length: 7 }, function (_, i) { return i; });
    return weekdays.map(function (day) {
        return (0, date_fns_1.format)(new Date(2022, 0, day + 2), 'EEE', { locale: locale });
    });
};
var startYear = 2024;
var endYear = 2000;
var years = Array.from({ length: startYear - endYear + 1 }, function (_, i) { return startYear - i; });
// Function to generate localized month names
var generateMonths = function (locale) {
    // Array of month indices, 0 (January) to 11 (December)
    var months = Array.from({ length: 12 }, function (_, i) { return i; });
    return months.map(function (month) {
        return ({
            id: month + 1,
            name: (0, date_fns_1.format)(new Date(2022, month, 1), 'MMMM', { locale: locale }) // Use any date with the month part
        });
    });
};
// Helper function to get the number of days in a month
var getDaysInMonth = function (year, month) {
    return new Date(year, month, 0).getDate();
};
// Helper function to get the start day of the month
var getStartDay = function (year, month) {
    return new Date(year, month - 1, 1).getDay();
};
// Define a default locale
var defaultLocale = locale_1.fr;
var Calendar = function (_a) {
    var _b = _a.locale, locale = _b === void 0 ? defaultLocale : _b, events = _a.events;
    var _c = (0, react_1.useState)(0), selectedMonth = _c[0], setSelectedMonth = _c[1];
    var _d = (0, react_1.useState)(0), selectedYear = _d[0], setSelectedYear = _d[1];
    var weekDays = generateWeekDays(locale);
    var months = generateMonths(locale);
    var setCurrentMonth = function () {
        var curDate = new Date();
        setSelectedMonth(curDate.getMonth() + 1);
        setSelectedYear(curDate.getFullYear());
    };
    (0, react_1.useEffect)(function () {
        setCurrentMonth();
    }, []);
    var generateCalendarDays = function () {
        var startDay = getStartDay(selectedYear, selectedMonth);
        var daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
        var calendarDays = [];
        for (var i = 0; i < startDay; i++) {
            calendarDays.push(null); // Empty cells before the start of the month
        }
        for (var i = 1; i <= daysInMonth; i++) {
            calendarDays.push(i);
        }
        return calendarDays;
    };
    var handlePrevBtnClick = function () {
        if (selectedMonth == 1) {
            setSelectedMonth(12);
            setSelectedYear(selectedYear - 1);
        }
        else {
            setSelectedMonth(selectedMonth - 1);
        }
    };
    var handleNextBtnClick = function () {
        if (selectedMonth == 12) {
            setSelectedMonth(1);
            setSelectedYear(selectedYear + 1);
        }
        else {
            setSelectedMonth(selectedMonth + 1);
        }
    };
    // Generate calendar days
    var calendarDays = generateCalendarDays();
    // // Check if a date is within any event range
    // const isDateInRange = (date: Date) => {
    // 	return events.some(event =>
    // 		date >= event.start && date <= event.end
    // 	);
    // };
    var handleMonthChange = function (e) {
        setSelectedMonth(parseInt(e.target.value));
    };
    var handleYearChange = function (e) {
        setSelectedYear(parseInt(e.target.value));
    };
    var filterEvents = function (day) {
        return events.filter(function (event) { return event.start.getDate() === day && (event.start.getMonth() + 1) === selectedMonth
            && event.start.getFullYear() === selectedYear; });
    };
    var curDate = new Date();
    var title = Utils.findItemFromList(months, selectedMonth, "id");
    return (react_1.default.createElement("div", { className: "w-full h-full items-center justify-center" },
        react_1.default.createElement("h2", { className: "flex items-center justify-between mb-4 w-full" },
            react_1.default.createElement("div", { className: "flex-1 flex items-center justify-center space-x-8" },
                react_1.default.createElement("div", { className: "cursor-pointer", onClick: function (e) { return handlePrevBtnClick(); } },
                    react_1.default.createElement(io_1.IoIosArrowBack, null)),
                react_1.default.createElement("div", { className: "cursor-pointer" },
                    title && title.name,
                    " ",
                    selectedYear),
                react_1.default.createElement("div", { className: "cursor-pointer", onClick: function () { return handleNextBtnClick(); } },
                    react_1.default.createElement(md_1.MdNavigateNext, null))),
            react_1.default.createElement("div", { className: "ml-auto cursor-pointer", onClick: function () { return setCurrentMonth(); } },
                react_1.default.createElement(md_1.MdToday, { size: 24 }))),
        react_1.default.createElement("div", { className: "grid grid-cols-7" },
            weekDays.map(function (day) { return (react_1.default.createElement("div", { key: day, className: "p-1 text-center font-medium text-black border border-gray-300 bg-gray-200 text-sm" }, day)); }),
            calendarDays.map(function (day, index) { return (react_1.default.createElement("div", { key: index, className: "relative border border-gray-300 ".concat(day ? 'cursor-pointer' : 'bg-gray-100', " flex flex-col") }, day ? (react_1.default.createElement("div", { className: "relative flex flex-col h-[100px]" },
                react_1.default.createElement("div", { className: "absolute top-2 right-2 text-lg text-gray-800" }, curDate.getFullYear() == selectedYear && (curDate.getMonth() + 1) == selectedMonth && curDate.getDate() === day ? react_1.default.createElement("span", { className: "rounded-full bg-blue-300 p-1" }, day) : react_1.default.createElement(react_1.default.Fragment, null, day)),
                react_1.default.createElement("div", { className: "flex-1 pt-6 items-start" },
                    react_1.default.createElement("ul", { className: "list-none space-y-1 text-xs mt-4 px-1" },
                        filterEvents(day).length > 0 &&
                            react_1.default.createElement("li", { className: "truncate p-1 rounded-sm", style: { backgroundColor: filterEvents(day)[0] === undefined ? Constants.DEFAULT_COLOR : filterEvents(day)[0].color } }, filterEvents(day)[0].title),
                        filterEvents(day).length > 1 &&
                            react_1.default.createElement("li", { className: "truncate bg-blue-200 p-1 rounded-sm" },
                                "More ",
                                filterEvents(day).length - 1,
                                " event",
                                filterEvents(day).length > 2 && 's'))))) : "")); }))));
};
exports.default = Calendar;
