const PDFDocument = require('pdfkit');
const AWS = require('aws-sdk');
const S3 = new AWS.S3();

const BUCKET_NAME = 'receipts-123456879';

module.exports.hello = async (event) => {
  // Create a new PDF document




  console.log('event1', event);

  await createPDF(event);
  const link = S3.getSignedUrl('getObject', {
    Bucket: BUCKET_NAME,
    Key: `${event.user_name}-${event.departure_airport}-${event.arrival_airport}.pdf`,
    Expires: 7200,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      link,
    }),
  };
};

async function createPDF(event) {
    const doc = new PDFDocument();
    const group_name = 'Nesterines';
    const user_name = event.user_name;
    const email = event.email;
    const departure_airport = event.departure_airport;
    const departure_date = event.departure_date;
    const arrival_airport = event.arrival_airport;
    const arrival_date = event.arrival_date;
    const price = event.price;
    const quantity = event.quantity;
  
    // Pipe the PDF into a buffer
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
  
    // Add some text to the PDF
    doc.fontSize(20).text('Boleta', { align: 'center' });
    doc.moveDown();
  
    doc.fontSize(16).text(`Group: ${group_name}`);
    doc.moveDown(0.5);
  
    doc.fontSize(14).text('User Details:', { underline: true });
    doc.fontSize(12).text(`Name: ${user_name}`);
    doc.text(`Email: ${email}`);
    doc.moveDown(0.5);
  
    doc.fontSize(14).text('Flight Details:', { underline: true });
    doc.fontSize(12).text(`Departure Airport: ${departure_airport}`);
    doc.text(`Departure Date: ${departure_date}`);
    doc.text(`Arrival Airport: ${arrival_airport}`);
    doc.text(`Arrival Date: ${arrival_date}`);
    doc.moveDown(0.5);
  
    doc.fontSize(14).text('Booking Details:', { underline: true });
    doc.fontSize(12).text(`Price: ${price}`);
    doc.text(`Quantity: ${quantity}`);
  
    const file_name = `${user_name}-${departure_airport}-${arrival_airport}.pdf`
    // Wait for the PDF to be fully generated
    // Finalize the PDF and end the stream
    doc.end();
    return new Promise((resolve, reject) => {
      doc.on('end', async () => {
        let pdfData = Buffer.concat(buffers);
        
        const params = {
          Bucket: BUCKET_NAME,
          Key: file_name,  // Change the key as needed
          Body: pdfData,
          ContentType: 'application/pdf'
        };
        console.log('params', params);
        // Upload the PDF to S3
        try {
          await S3.putObject(params).promise();
          console.log('PDF uploaded successfully');
          resolve();
        } catch (err) {
          console.error('Error uploading PDF:', err);
          reject(err);
        }

      });

      doc.on('error', (err) => {
        console.error('Error generating PDF:', err);
        reject(err);
      });
    });
  };