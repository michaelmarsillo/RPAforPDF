import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Utility Marx PDF Filler</h1>
        <p className="hero-subtitle">
          Streamlining PDF generation for Utility Marx locate technicians
        </p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>🚀 What This Tool Does</h2>
          <p>
            This tool was developed to simplify and speed up the process of generating PDF forms 
            for the Locate Technicians at Utility Marx. No more manually filling out repetitive PDFs, this app does it for you!
          </p>
        </div>

        <div className="about-section">
          <h2>⚡ How It Works</h2>
          <p>
            Simply fill in the required fields, and the app will generate filled PDFs ready to download. 
            <strong> If you miss a field or need to change something, don't worry!</strong> The PDFs are 
            fully editable, so you can tweak any info later if needed.
          </p>
        </div>

        <div className="about-section">
          <h2>📋 Supported Forms</h2>
          <p>
            This app generates three essential documents for Utility Marx operations:
          </p>
          <div className="form-types">
            <div className="form-card">
              <div className="form-icon">📄</div>
              <h3>ULT Form</h3>
              <p>Utility locate documentation</p>
            </div>
            <div className="form-card">
              <div className="form-icon">📋</div>
              <h3>PG.1 Form</h3>
              <p>Project documentation</p>
            </div>
            <div className="form-card">
              <div className="form-icon">🛡️</div>
              <h3>JHA Form</h3>
              <p>Job hazard analysis</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>💡 Pro Tips</h2>
          <div className="tips-container">
            <div className="tip-item">
              <span className="tip-icon">💡</span>
              <p>You can edit PDFs while previewing them, just download after making changes</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📏</span>
              <p>The locate log/remarks field is resizable, drag the bottom-right corner to adjust</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🔄</span>
              <p>Make your edits, then download the current page before moving to the next</p>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📋</span>
              <p>Optional fields like One Call Number and Work Begin Date can be left blank</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>✨ Key Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🛠️</div>
              <div className="feature-content">
                <h3>Fully Customizable</h3>
                <p>Change any detail even after generating the PDF, no need to worry about missing or incorrect info.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🌊</div>
              <div className="feature-content">
                <h3>Smart Auto-Fill</h3>
                <p>Enter your data once, and let the app intelligently fill in all relevant forms.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <div className="feature-content">
                <h3>Time Saving</h3>
                <p>Eliminates repetitive tasks, letting you focus on what really matters, getting the job done!</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <div className="feature-content">
                <h3>Mobile Friendly</h3>
                <p>Works seamlessly on phones, tablets, and desktop computers.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section ">
          <h2>🎯 Built for Efficiency</h2>
          <p>
            This app was created specifically to make filling out <strong>PG.1</strong>, <strong>ULT</strong>, 
            and <strong>JHA</strong> documents faster and easier. It's designed to reduce errors, save time, 
            and improve productivity for Utility Marx technicians.
          </p>
        </div>
      </div>

      <footer className="about-footer">
        <div className="footer-content">
          <p>
            This app was created by{" "}
            <a href="https://github.com/michaelmarsillo" target="_blank" rel="noopener noreferrer">
              Michael Marsillo
            </a>{" "}
            for Utility Marx. ©️ All rights reserved {new Date().getFullYear()}.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
