"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var Calendar_1 = __importDefault(require("./components/Calendar"));
var locale_1 = require("date-fns/locale"); // Import your locales
var events = [
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
];
function Home() {
    return (React.createElement("main", { className: "m-5 flex w-[700px] h-[700px] flex-col items-center justify-between bg-white p-4" },
        React.createElement(Calendar_1.default, { events: events, locale: locale_1.enUS })));
}
