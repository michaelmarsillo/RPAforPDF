import React, { useState } from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import './PdfForm.css';

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
        WorkerName1: '',
        SafeWorkPermit: '',
    });

    const [showMessage, setShowMessage] = useState(false);
    const [previewPdf, setPreviewPdf] = useState(null); // State to track the preview PDF
    const [isPreview, setIsPreview] = useState(false); // State to toggle between form and preview mode
    const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0); // State to track the current preview index
    const [previewPdfs, setPreviewPdfs] = useState([]); // State to hold all generated PDFs

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

    const generateFilledPdfs = async (data) => {
    const pdfTemplates = ['/pdfs/ULT.pdf', '/pdfs/PG.1.pdf', '/pdfs/JHA.pdf'];
    const filledPdfs = await Promise.all(pdfTemplates.map(template => fillPdf(template, data)));

    filledPdfs.forEach((pdfBytes, index) => {
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Filled_${pdfTemplates[index].split('/').pop()}`; // Ensure correct file name for download
        link.click();
    });

    setShowMessage(true);
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
    };

    const handleGoBack = () => {
        setIsPreview(false);  // Go back to form
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await generateFilledPdfs(formData);
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

    return (
        <div className="container">
            <div className="title-section">
                <h1>Utility Marx PDF Filler</h1>
                <h3 className="subtext">For ULT, PG.1 and JHA</h3>
            </div>

            {!isPreview ? (
                <form onSubmit={handleSubmit} className="form">
                    {[{ label: "Ticket Number", name: "ticketNumber" }, { label: "Locator Name", name: "locatorName" }, { label: "Address Of Locate", name: "address" }, { label: "Date Completed", name: "dateCompleted" }, { label: "Utilities Located", name: "utilities" }, { label: "Company Name", name: "companyName" }, { label: "Contact Name", name: "contactName" }, { label: "Contact Phone", name: "contactPhone" }, { label: "Contact Email", name: "contactEmail" }, { label: "Nature Of Work", name: "natureOfWork" }, { label: "Ontario One Call #", name: "ontarioOneCall" }, { label: "Work To Begin Date", name: "workToBegin" }, { label: "Locate Log / Remarks", name: "locateLog", multiline: true }, { label: "PG 1 of _", name: "numOfPages" }, { label: "Assistant Workers Name", name: "workerName1" }, { label: "Safe Work Permit #", name: "safeWorkPermit" }, { label: "Time In", name: "timeIn" }, { label: "Time Out", name: "timeOut" }].map(({ label, name, multiline }) => (
                        <div key={name} className="form-group">
                            <label htmlFor={name}>{label}</label>
                            {multiline ? (
                                <textarea
                                    id={name}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    rows="1"
                                    className="remarks-box"
                                />
                            ) : (
                                <input
                                    type="text"
                                    id={name}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    className="input-field"
                                />
                            )}
                        </div>
                    ))}
                    <button type="button" className="preview-button" onClick={handlePreview}>Preview</button>
                </form>
            ) : (

                <div className="preview-section">
                    <h2>Preview</h2>
                    {previewPdf && (
                        <embed src={previewPdf} width="600" height="800" type="application/pdf" />
                    )}
                    <div className="navigation-buttons">
                        <button type="button" className="prev-button" onClick={handlePrevPdf}>Previous</button>
                                            <button type="button" className="go-back-button" onClick={handleGoBack}>Go Back</button>

                        <button type="button" className="next-button" onClick={handleNextPdf}>Next</button>
                    </div>
                    <button type="button" className="submit-button" onClick={handleSubmit}>Confirm & Generate PDFs</button>
                </div>
            )}

            {showMessage && (
                <div className="message show">
                    <h2>Happy Locating!</h2>
                    <ul>Make sure to double check for any mistakes.</ul>
                </div>
            )}

            <footer className="footer">
                <p className="footer-title">
                    This app was created by Michael Marsillo for Utility Marx. ©️ All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default PdfForm;
