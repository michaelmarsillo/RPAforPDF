
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from io import BytesIO

def fill_pdf(template_path, output_path, data, field_coords):
    reader = PdfReader(template_path)
    writer = PdfWriter()

    # Create an overlay canvas to write text onto
    packet = BytesIO()
    can = canvas.Canvas(packet)

    # Set the font and size here
    can.setFont("Helvetica-Bold", 11)  # You can change the font and size as needed

    # Draw text at specific coordinates for this PDF
    for field, coord in field_coords.items():
        if field in data:
            x, y = coord
            can.drawString(x, y, data[field])

    can.save()
    packet.seek(0)
    overlay_pdf = PdfReader(packet)

    # Merge overlay with the template PDF
    for page_num in range(len(reader.pages)):
        page = reader.pages[page_num]
        page.merge_page(overlay_pdf.pages[0])
        writer.add_page(page)

    # Write the filled PDF to a new file
    with open(output_path, 'wb') as output_file:
        writer.write(output_file)


# Function to fill multiple PDFs, each with unique field coordinates
def fill_multiple_pdfs(template_paths, output_paths, data, all_field_coords):
    for template_path, output_path, field_coords in zip(template_paths, output_paths, all_field_coords):
        fill_pdf(template_path, output_path, data, field_coords)


# Collect data from the user once
data = {
    'field1': input("Enter the UM Ticket Number: "),
    'field2': input("Locator's name: "),
    'field3': input("Address of Locate: "),
    'field4': input("Date Completed: ")
}

# Define paths for your templates and output files
template_paths = [
    'C:/Users/theca/OneDrive/Documents/Utility Marx PDFs/UTL.pdf',
    'C:/Users/theca/OneDrive/Documents/Utility Marx PDFs/PG.1.pdf'
]
output_paths = [
    'C:/Users/theca/OneDrive/Documents/Utility Marx PDFs Filled/UTL.pdf',
    'C:/Users/theca/OneDrive/Documents/Utility Marx PDFs Filled/PG.1.pdf'
]

# Define coordinates for each field in each PDF
all_field_coords = [
    {  # Coordinates for UTL.pdf (portrait)
        'field1': (157, 656),
        'field2': (321, 656),
        'field3': (157, 642),
        'field4': (482, 121)
    },
    {  # Coordinates for PG.1.pdf (portrait)
        'field1': (140, 672),
        'field2': (105, 165),
        'field3': (140, 600),
        'field4': (140, 655)
    },
]

# Fill all PDFs with a single call
fill_multiple_pdfs(template_paths, output_paths, data, all_field_coords)

