import React, { useState } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import './PdfForm.css';

/* Field Names */
const PdfForm = () => {
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
        workerName1: '',
        safeWorkPermit: '',
    });

    const [showMessage, setShowMessage] = useState(false);
    const [previewPdf, setPreviewPdf] = useState(null); // State to track the preview PDF
    const [isPreview, setIsPreview] = useState(false); // State to toggle between form and preview mode
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0); // State to track the current preview index
    const [previewPdfs, setPreviewPdfs] = useState([]); // State to hold all generated PDFs
    const [pdfNames] = useState(['ULT.pdf', 'PG.1.pdf', 'JHA.pdf']); // Names of the PDF files


    /* Mapping */
    const fieldNameMapping = {
        ticketNumber: {
            'ULT.pdf': 'UM Ticket No',
            'PG.1.pdf': 'Text1',
            'JHA.pdf': 'Utility Marx Ticket',
        },
        locatorName: {
            'ULT.pdf': ['ULT Name', 'ULT Signature'],
            'PG.1.pdf': 'locator1',
            'JHA.pdf': ["Locator's Name", "Locator's Name 2"],
        },
        address: {
            'ULT.pdf': 'Locate Address',
            'PG.1.pdf': 'Text7',
            'JHA.pdf': 'Address',
        },
        dateCompleted: {
            'ULT.pdf': 'Date',
            'PG.1.pdf': ['Text2', 'date1'],
            'JHA.pdf': 'Date',
        },
        utilities: {
            'ULT.pdf': 'Utilities',
        },
        companyName: {
            'PG.1.pdf': 'Text3',
            'JHA.pdf': "Contractor's Name",
        },
        contactName: {
            'PG.1.pdf': 'Text4',
            'JHA.pdf': 'Contact Person',
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
            'JHA.pdf': 'Time',
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
        workerName1: {
            'JHA.pdf': 'Worker Name 1',
        },
        safeWorkPermit: {
            'JHA.pdf': 'Safe Work Permit #',
        },
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle date field changes specifically
    const handleDateChange = (e) => {
        const { name, value } = e.target;

        // Format date from yyyy-mm-dd to "Month Day, Year" format
        let formattedDate = '';
        if (value) {
            // Split the date string and create a new Date object with explicit year, month, day
            const [year, month, day] = value.split('-').map(Number);
            // Note: month is 0-indexed in JavaScript Date (0 = January)
            const date = new Date(year, month - 1, day);

            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const monthName = monthNames[date.getMonth()];
            const dayOfMonth = date.getDate();
            const fullYear = date.getFullYear();
            formattedDate = `${monthName} ${dayOfMonth}, ${fullYear}`;
        }

        setFormData({
            ...formData,
            [name]: formattedDate
        });
    };

    const handleKeyDown = (e) => {
        const { name, value } = e.target;

        if (e.key === "Enter") {
            e.preventDefault();
            if (name === "locateLog") {
                e.target.value = value + "\n";
                setFormData({
                    ...formData,
                    [name]: e.target.value
                });
            } else {
                const formElements = Array.from(e.target.form.elements);
                const currentIndex = formElements.indexOf(e.target);
                if (currentIndex !== -1 && currentIndex < formElements.length - 1) {
                    formElements[currentIndex + 1].focus();
                }
            }
        }
    };

    const fillPdf = async (templateUrl, data) => {
        const pdfBytes = await fetch(templateUrl).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const form = pdfDoc.getForm();
        const pdfName = templateUrl.split('/').pop();

        Object.entries(data).forEach(([field, value]) => {
            const fieldMapping = fieldNameMapping[field];
            if (fieldMapping && fieldMapping[pdfName]) {
                const fieldInPdf = fieldMapping[pdfName];
                if (Array.isArray(fieldInPdf)) {
                    fieldInPdf.forEach(fieldName => {
                        const formField = form.getTextField(fieldName);
                        if (formField) {
                            formField.setText(value);
                            formField.updateAppearances(helveticaFont);
                            if (field === "locateLog") {
                                formField.setFontSize(12);
                            }
                        }
                    });
                } else {
                    const formField = form.getTextField(fieldInPdf);
                    if (formField) {
                        formField.setText(value);
                        formField.updateAppearances(helveticaFont);
                        if (field === "locateLog") {
                            formField.setFontSize(12);
                        }
                    }
                }
            }
        });

        return pdfDoc.save();
    };

    const handlePreview = async () => {
        const previewData = formData;
        const pdfTemplates = ['/pdfs/ULT.pdf', '/pdfs/PG.1.pdf', '/pdfs/JHA.pdf'];

        // Generate preview PDFs for each template
        const previewPdfs = await Promise.all(pdfTemplates.map(template => fillPdf(template, previewData)));

        // Store the preview PDFs (for navigation purposes)
        setPreviewPdfs(previewPdfs);

        setPreviewPdf(URL.createObjectURL(new Blob([previewPdfs[0]], { type: 'application/pdf' })));
        setIsPreview(true);  // Toggle to preview mode
        setShowMessage(true);
    };

    const handleGoBack = () => {
        setIsPreview(false);  // Go back to form
    };

    const handleNextPdf = () => {
        if (currentPreviewIndex < previewPdfs.length - 1) {
            const nextIndex = currentPreviewIndex + 1;
            setCurrentPreviewIndex(nextIndex);
            setPreviewPdf(URL.createObjectURL(new Blob([previewPdfs[nextIndex]], { type: 'application/pdf' })));
        }
    };

    const handlePrevPdf = () => {
        if (currentPreviewIndex > 0) {
            const prevIndex = currentPreviewIndex - 1;
            setCurrentPreviewIndex(prevIndex);
            setPreviewPdf(URL.createObjectURL(new Blob([previewPdfs[prevIndex]], { type: 'application/pdf' })));
        }
    };

   // Function to render the appropriate input field based on field type
const renderInputField = (label, name, placeholder, multiline) => {
    // Check if this is a date field
    const isDateField = name === "dateCompleted" || name === "workToBegin";
    
    if (multiline) {
        return (
            <textarea
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows="1"
                className="remarks-box"
            />
        );
    } else if (isDateField) {
        return (
            <input
                type="date"
                id={name}
                name={name}
                onChange={handleDateChange}
                className="date-picker"
            />
        );
    } else {
        return (
            <input
                type="text"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="input-field"
            />
        );
    }
};

    /* All the form fields*/
    return (
        <div className="container">
            <div className="title-section">
                <h1>Utility Marx PDF Filler</h1>
                <h3 className="subtext">For ULT, PG.1 and JHA</h3>
            </div>

            {!isPreview ? (
                <form className="form">
                    {[{ label: "Ticket Number", name: "ticketNumber", placeholder: "EG: 12345678" },
                    { label: "Locator Name", name: "locatorName", placeholder: "EG: John Pork" },
                    { label: "Address Of Locate", name: "address", placeholder: "EG: 123 Utility St, Toronto ON" },
                    { label: "Date Completed", name: "dateCompleted", placeholder: "Select date" },
                    { label: "Utilities Located", name: "utilities", placeholder: "EG: Hydro, Gas, Telecomms" },
                    { label: "Company Name", name: "companyName", placeholder: "EG: EllisDon" },
                    { label: "Contact Name", name: "contactName", placeholder: "EG: Ozzy Osbourne" },
                    { label: "Contact Phone", name: "contactPhone", placeholder: "EG: 123-456-7890" },
                    { label: "Contact Email", name: "contactEmail", placeholder: "EG: cutyourlawn@gmail.com" },
                    { label: "Nature Of Work", name: "natureOfWork", placeholder: "EG: Boreholes for survey" },
                    { label: "Locate Log / Remarks", name: "locateLog", placeholder: "Drag to resize ↘️", multiline: true },
                    { label: "Assistant Workers Name", name: "workerName1", placeholder: "EG: Mike" },
                    { label: "Time In", name: "timeIn", placeholder: "EG: 8:00am" },
                    { label: "Time Out", name: "timeOut", placeholder: "EG: 4:00pm" },
                    { label: "Ontario One Call #", name: "ontarioOneCall" },
                    { label: "Work To Begin Date", name: "workToBegin", placeholder: "Select date" },
                    { label: "Safe Work Permit #", name: "safeWorkPermit" },
                    { label: "PG 1 of _", name: "numOfPages", placeholder: "EG: 2" }
                    ].map(({ label, name, placeholder, multiline }) => (
                        <div key={name} className="form-group">
                            <label htmlFor={name}>{label}</label>
                            {renderInputField(label, name, placeholder, multiline)}
                        </div>
                    ))}
                    <button type="button" className="preview-button" onClick={handlePreview}>Preview</button>
                </form>
            ) : (
                <div className="preview-section">
                    <div className="preview-header">
                        <h2>Preview: {pdfNames[currentPreviewIndex]}</h2>
                        <div className="download-instruction">
                            Customize and download your PDF with changes here ⬇️
                        </div>
                    </div>
                    {previewPdf && (
                        <embed src={previewPdf} width="700" height="900" type="application/pdf" />
                    )}
                    <div className="navigation-buttons">
                        <button type="button" className="prev-button" onClick={handlePrevPdf} disabled={currentPreviewIndex === 0}>Previous</button>
                        <button type="button" className="go-back-button" onClick={handleGoBack}>Back to Edit</button>
                        <button type="button" className="next-button" onClick={handleNextPdf} disabled={currentPreviewIndex === previewPdfs.length - 1}>Next</button>
                    </div>
                </div>
            )}

            {/*When you press preview*/}
            {showMessage && (
                <div className="message show">
                    <h2>Happy Locating!</h2>
                    <ul>Make sure to double check for any mistakes.</ul>
                </div>
            )}

            {/*Footer*/}
            <footer className="footer">
                <p className="footer-title">
                    This app was created by Michael Marsillo for Utility Marx. ©️ All rights reserved 2025.
                </p>
            </footer>
        </div>


    );
};

export default PdfForm;