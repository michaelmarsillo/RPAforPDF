import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import './PdfForm.css';

const PdfForm = () => {
    // Manage form data
    const [formData, setFormData] = useState({
        ticketNumber: '',
        locatorName: '',
        address: '',
        dateCompleted: '',
        utilities: '',
        companyName: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        natureOfWork: '',
        timeIn: '',
        timeOut: '',

    });

    // Update form data as user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fill PDF with data
    const fillPdf = async (templateUrl, data, fieldCoords) => {
        const pdfBytes = await fetch(templateUrl).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const page = pdfDoc.getPage(0);
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
        // Add data to fields
        Object.entries(fieldCoords).forEach(([field, coords]) => {
            if (Array.isArray(coords[0])) {
                // Handle case where the field has multiple coordinate pairs
                coords.forEach(([x, y]) => {
                    if (data[field]) {
                        page.drawText(data[field], {
                            x,
                            y,
                            size: 11,
                            font,
                            color: rgb(0, 0, 0),
                        });
                    }
                });
            } else {
                // Handle standard case where the field has a single coordinate pair
                if (data[field]) {
                    page.drawText(data[field], {
                        x: coords[0],
                        y: coords[1],
                        size: 11,
                        font,
                        color: rgb(0, 0, 0),
                    });
                }
            }
        });
    
        return pdfDoc.save();
    };

    // Generate filled PDFs from form data
    const generateFilledPdfs = async (data) => {
        const pdfTemplates = [
            '/pdfs/ULT.pdf',
            '/pdfs/PG.1.pdf'
        ];


        const allFieldCoords = [
            { // Coordinates for ULT.pdf (portrait)
                'ticketNumber': [157, 656],
                'locatorName': [321, 656],
                'address': [157, 642],
                'dateCompleted': [482, 121],
                'utilities': [157, 629]
            },
            { // Coordinates for PG.1.pdf (portrait)
                'ticketNumber': [140, 672],
                'locatorName': [105, 165],
                'address': [140, 600],
                'dateCompleted': [[140, 655], [240, 165]],
                'companyName': [341, 672],
                'contactName': [341, 655],
                'contactPhone': [341, 637],
                'contactEmail': [341, 619],
                'natureOfWork': [140, 582],
                'timeIn': [105, 148],
                'timeOut': [240, 148]
            }
        ];

        const filledPdfs = await Promise.all(
            pdfTemplates.map((template, index) => fillPdf(template, data, allFieldCoords[index]))
        );

        // Automatically download filled PDFs
        filledPdfs.forEach((pdfBytes, index) => {
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Filled${pdfTemplates[index]}`;
            link.click();
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        await generateFilledPdfs(formData);
    };

    return (
        <div className="container">
  
        {/* Main Title */}
        <div className="title-section">
          <h1>Utility Marx PDF Filler</h1>
          <h3 className="subtext">For ULT and PG.1</h3>
        </div>
  
        {/* Form */}
        <form onSubmit={handleSubmit} className="form">
          {[
            { label: "Ticket Number", name: "ticketNumber" },
            { label: "Locator Name", name: "locatorName" },
            { label: "Address Of Locate", name: "address" },
            { label: "Date Completed", name: "dateCompleted" },
            { label: "Utilities Located", name: "utilities" },
            { label: "Company Name", name: "companyName" },
            { label: "Contact Name", name: "contactName" },
            { label: "Contact Phone", name: "contactPhone" },
            { label: "Contact Email", name: "contactEmail" },
            { label: "Nature Of Work", name: "natureOfWork" },
            { label: "Time In", name: "timeIn" },
            { label: "Time Out", name: "timeOut" },
          ].map(({ label, name }) => (
            <div key={name} className="form-group">
              <label htmlFor={name}>{label}</label>
              <input
                type="text"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
              />
            </div>
          ))}

  
          <button type="submit" className="submit-btn">Generate PDFs</button>
        </form>
  
        {/* Footer */}
        <footer className="footer">
          <p className="footer-title">
            This app was created by Michael Marsillo for Utility Marx. All rights reserved ©️
          </p>
        </footer>
      </div>
    );
  };

export default PdfForm;
