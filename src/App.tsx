// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import './index.css';
import OurMissionPage from './pages/OurMissionPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          {/* Add more routes as needed */}
          <Route path="/our-mission" element={<OurMissionPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;