import React from 'react'
import ScorePage from './page/ScorePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Statistics from './page/Statistics'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScorePage />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
