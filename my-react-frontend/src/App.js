import './App.css'; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import PdfForm from './PdfForm.js'; 
import About from './About';
import NavBar from './components/NavBar.jsx';
// eslint-disable-next-line no-unused-vars
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <Router>
      <div>
        <NavBar/>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<PdfForm />} /> {/* Home page */}
          <Route path="/about" element={<About />} /> {/* About page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;