import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const NavBar = () => {
    const [isDarkMode, setIsDarkMode] = useState(true); // Start with dark mode by default
    
    // Apply theme changes when isDarkMode changes
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
        // Save the preference to localStorage for persistence
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);
    
    // On initial load, check if there's a saved theme preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme !== null) {
            setIsDarkMode(savedTheme === 'true');
        }
    }, []);
    
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
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
            
            <div className="theme-toggle">
                <button 
                    onClick={toggleTheme} 
                    className="theme-toggle-btn"
                >
                    <span className="toggle-icon">{isDarkMode ? '☀️' : '🌙'}</span>
                    <span className="toggle-text">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>

            <div className="subtitle">
                A tool for PDF automation
            </div>
        </header>
    )
}
export default NavBar