import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Wallet from './components/Wallet';

import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
