import React, { useState } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
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
        ontarioOneCall: '',
        workToBegin: '',
        locateLog: '',
        numOfPages: '',
    });
    const fieldNameMapping = {
        ticketNumber: {
            'ULT.pdf': 'UM Ticket No',
            'PG.1.pdf': 'Text1',
        },
        locatorName: {
            'ULT.pdf': ['ULT Name', 'ULT Signature'],
            'PG.1.pdf': 'locator1',
        },
        address: {
            'ULT.pdf': 'Locate Address',
            'PG.1.pdf': 'Text7',
        },
        dateCompleted: {
            'ULT.pdf': 'Date',
            'PG.1.pdf': ['Text2', 'date1']
        },
        utilities: {
            'ULT.pdf': 'Utilities',
        },
        companyName: {
            'PG.1.pdf': 'Text3',
        },
        contactName: {
            'PG.1.pdf': 'Text4',
        },
        contactPhone: {
            'PG.1.pdf': 'Text5',
        },
        contactEmail: {
            'PG.1.pdf': 'Text6',
        },
        natureOfWork: {
            'PG.1.pdf': 'Text8',
        },
        timeIn: {
            'PG.1.pdf': 'timein1',
        },
        timeOut: {
            'PG.1.pdf': 'timeout1',
        },
        ontarioOneCall: {
            'PG.1.pdf': 'Text9',
        },
        workToBegin: {
            'PG.1.pdf': 'Text10',
        },
        locateLog: {
            'PG.1.pdf': 'log1',
        },
        numOfPages: {
            'PG.1.pdf': 'pg',
        },
        // Add other fields here with corresponding mappings for each PDF
    };

    // Update form data as user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to fill a PDF form using interactive fields
    const fillPdf = async (templateUrl, data) => {
        // Load the existing PDF file
        const pdfBytes = await fetch(templateUrl).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);
    
        // Embed a font (Standard Helvetica or any available font)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
        // Get the form from the PDF
        const form = pdfDoc.getForm();
    
        // Get the PDF file name (e.g., 'ULT.pdf' or 'PG.1.pdf')
        const pdfName = templateUrl.split('/').pop();
    
        // Loop through each form field and fill it with user input
        Object.entries(data).forEach(([field, value]) => {
            // Use the fieldNameMapping to get the corresponding field name in the current PDF
            const fieldMapping = fieldNameMapping[field];
            if (fieldMapping && fieldMapping[pdfName]) {
                const fieldInPdf = fieldMapping[pdfName];
    
                // Check if it's an array (multiple fields)
                if (Array.isArray(fieldInPdf)) {
                    fieldInPdf.forEach(fieldName => {
                        const formField = form.getTextField(fieldName);  // Get the corresponding field by name
                        if (formField) {
                            formField.setText(value);  // Fill it with user data
    
                            // Ensure font is set before changing font size
                            formField.updateAppearances(helveticaFont);
    
                            // Set font size specifically for 'locateLog'
                            if (field === "locateLog") {
                                formField.setFontSize(12);  // Adjust font size as needed
                            }
                        }
                    });
                } else {
                    const formField = form.getTextField(fieldInPdf);  // Get the corresponding field by name
                    if (formField) {
                        formField.setText(value);  // Fill it with user data
    
                        // Ensure font is set before changing font size
                        formField.updateAppearances(helveticaFont);
    
                        // Set font size specifically for 'locateLog'
                        if (field === "locateLog") {
                            formField.setFontSize(12);  // Adjust font size as needed
                        }
                    }
                }
            }
        });
    
        // Save and return the updated PDF
        return pdfDoc.save();
    };

    // Generate filled PDFs from form data
    const generateFilledPdfs = async (data) => {
        const pdfTemplates = [
            '/pdfs/ULT.pdf',
            '/pdfs/PG.1.pdf'
        ];

        const filledPdfs = await Promise.all(
            pdfTemplates.map(template => fillPdf(template, data))
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
                    { label: "Ontario One Call #", name: "ontarioOneCall" },
                    { label: "Work To Begin #", name: "workToBegin" },
                    { label: "Locate Log / Remarks", name: "locateLog" },
                    { label: "PG 1 of _", name: "numOfPages" },
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
