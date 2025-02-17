import React from "react";
import"./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Utility Marx PDF Filler</h1>
      <p>
        This tool was designed to automate PDF generation for the Utility Locate Technicians, streamlining the documentation process.
      </p>
      <p>
        <strong>How It Works:</strong> Simply enter the required information, and the app will automatically generate pre-filled PDFs for you. If you leave any fields empty, that's okay, when you download the PDFs, you can manually fill in any missing details later.
      </p>
      <p>
        Some fields, such as the <strong>One Call Number</strong> and <strong>Work to Begin Date</strong>, are not included since they may not always be applicable. The PG Number on the PG.1 document is also left blank so you can adjust it based on the number of drawings needed, which is often determined after completing the locate.
      </p>
      <p>
        <strong>📝 Important Notes</strong>
      </p>
      <ul>
        <li>Once information is entered and the PDFs are generated, that text cannot be edited. The system prints data directly onto the PDF, making it unchangeable.</li>
        <li>If certain details are subject to change, consider leaving them blank so they can be manually adjusted later.</li>
        <li>Check for spelling errors before submitting, as mistakes require regenerating the PDF from scratch.</li>
      </ul>
      <p>
        This app was created to make filling out PG.1 and ULT documents quicker and more efficient, reducing repetitive manual work and mistakes.
      </p>
      <p>
        <strong>JHA coverage coming soon. (Hopefully!)</strong>
      </p>

    <div>
      {/* Footer */}
      <footer className="footer">
          <p className="footer-title">
            This app was created by Michael Marsillo for Utility Marx. All rights reserved ©️
          </p>
        </footer>
        </div>
      </div>
   
  );
};

export default About;