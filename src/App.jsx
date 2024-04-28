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
          <Route path="/statistics" element={<Statistics />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
