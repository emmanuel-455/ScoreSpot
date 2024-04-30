import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScorePage from './page/ScorePage';
import Statistics from './page/Statistics';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<ScorePage />} />
          <Route path="/stats" element={<Statistics />} />
          {/* Add more routes for other pages if needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
