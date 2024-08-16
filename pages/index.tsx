// pages/test-component.tsx
import React from 'react';
// import "./styles/globals.css";
import Calendar from '../app/Calendar';
import MyApp from '../app/pages/_app';


const TestComponentPage: React.FC = () => {
  return (
    <div>
      <h1>Testing Calendar</h1>
        {/* <MyApp className=""> */}
          <Calendar events={[]} />
        {/* </MyApp> */}
      {/* <Calendar events={[]} /> */}
    </div>
  );
};

export default TestComponentPage;
