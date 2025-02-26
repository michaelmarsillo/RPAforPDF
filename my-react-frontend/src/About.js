import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Utility Marx PDF Filler</h1>
      <p>
        This tool was developed to simplify and speed up the process of generating PDF forms for the Locate Technicians at Utility Marx. No more manually filling out repetitive forms, this app does it for you!
      </p>
      <p>
        <strong>How It Works:</strong> Simply fill in the required fields, and the app will generate the filled PDFs ready to download. If you miss a field or need to change something, don't worry! The PDFs are fully editable, so you can tweak any info later if needed.
      </p>
      <p>
        Certain fields like the <strong>One Call Number</strong> or <strong>Work to Begin Date</strong> are completely optional, as they may not apply to every situation. You can also leave the <strong>PG Number</strong> blank for easy adjustment after completing the locate.
      </p>
      <p>
        <strong>📝 Key Features:</strong>
      </p>
      <ul>
        <li>🛠️ <strong>Customizable:</strong> Change any detail even after generating the PDF, so you don’t have to worry about missing or incorrect info.</li>
        <li>🌊 <strong>Dynamic Input Fields:</strong> Enter your data, and let the app fill in the rest, saving you time and reducing errors.</li>
        <li>🚀 <strong>Efficiency:</strong> This tool eliminates repetitive tasks, letting you focus on what really matters, getting the job done!</li>
      </ul>
      <p>
        This app was created to make filling out the <strong>PG.1</strong>, <strong>ULT</strong> and <strong>JHA</strong> documents faster and easier. It's designed to reduce errors, save time, and improve productivity for Utility Marx Technicians.
      </p>
      <p>
        <strong>💫 JHA coverage added.</strong>
      </p>

      <div>
        {/* Footer */}
        <footer className="footer">
          <p className="footer-title">
            This app was created by Michael Marsillo for Utility Marx. ©️ All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;
