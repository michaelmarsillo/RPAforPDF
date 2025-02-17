import './App.css'; // Importing global styles
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Link
import PdfForm from './PdfForm.js'; // Home Page Component
import About from './About'; // About Page Component

function App() {
  return (
    <Router>
      <div>
        {/* Header with navigation links */}
        <header className="header">
            <div className="title">
                <a href="https://www.utilitymarx.com/" target="_blank" rel="noreferrer">
                    Utility Marx
                </a>
            </div>

            <div className="buttons-container">
                <Link to="/">
                    <button className="homebutton">Home</button>
                </Link>
                <Link to="/about">
                    <button className="aboutbutton">About</button>
                </Link>
            </div>

            <div className="subtitle">
                A tool for PDF automation
            </div>
        </header>

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