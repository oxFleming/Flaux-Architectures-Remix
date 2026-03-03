import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Portfolio from './components/Portfolio';
import Admin from './components/Admin';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/admin-portal" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;