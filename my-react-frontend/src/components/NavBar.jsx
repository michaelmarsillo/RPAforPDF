import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

const NavBar = () => {
    const [isDarkMode, setIsDarkMode] = useState(true); // Start with dark mode by default
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state
    
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

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="navbar">
            <div className="navbar-content">
                <div className="navbar-left">
                    <a 
                        href="https://www.utilitymarx.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="navbar-title"
                    >
                        Utility Marx
                    </a>
                    <span className="navbar-subtitle">PDF Automation</span>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-desktop">
                    <nav className="navbar-nav">
                        <Link to="/" className="navbar-link">
                            <button className="navbar-btn">Home</button>
                        </Link>
                        <Link to="/about" className="navbar-link">
                            <button className="navbar-btn">About</button>
                        </Link>
                    </nav>
                    
                    <button 
                        onClick={toggleTheme} 
                        className="theme-toggle-btn"
                        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    >
                        <span className="theme-icon">{isDarkMode ? '☀️' : '🌙'}</span>
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav">
                    <Link to="/" className="mobile-link" onClick={closeMobileMenu}>
                        <span className="mobile-link-icon">🏠</span>
                        Home
                    </Link>
                    <Link to="/about" className="mobile-link" onClick={closeMobileMenu}>
                        <span className="mobile-link-icon">ℹ️</span>
                        About
                    </Link>
                    <button 
                        onClick={() => {
                            toggleTheme();
                            closeMobileMenu();
                        }} 
                        className="mobile-theme-btn"
                    >
                        <span className="mobile-link-icon">{isDarkMode ? '☀️' : '🌙'}</span>
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="mobile-menu-overlay"
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                />
            )}
        </header>
    )
}

export default NavBar