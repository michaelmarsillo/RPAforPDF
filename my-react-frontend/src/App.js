import './App.css'; // Importing global styles
import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'; // Import Link
import PdfForm from './PdfForm.js'; // Home Page Component
import About from './About'; // About Page Component
import NavBar from './components/NavBar.jsx';

function App() {
  return (
    <Router>
      <div>
        {/* Header with navigation links */}
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