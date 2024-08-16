import React from 'react';
import Calendar from '../app/Calendar';

const TestComponentPage: React.FC = () => {
  return (
    <div className="relative border border-gray-900 flex flex-col p-4">

      <h1>Testing Calendar</h1>
          <Calendar events={[]} />
    </div>
  );
};

export default TestComponentPage;
