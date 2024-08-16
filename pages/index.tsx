// pages/test-component.tsx
import React from 'react';
// import "./styles/globals.css";
import Calendar from '../app/Calendar';

const TestComponentPage: React.FC = () => {
  return (
    <div>
      <h1>Testing Calendar</h1>
      <Calendar events={[]} />
    </div>
  );
};

export default TestComponentPage;
