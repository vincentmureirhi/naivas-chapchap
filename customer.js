const qrReader = new Html5Qrcode("my-qr-reader");

qrReader.start(
    { facingMode: "environment" }, // Use the back camera
    {
        fps: 10, // Set the scanning speed (frames per second)
        qrbox: { width: 250, height: 250 } // Set the scanning box size
    },
    async (decodedText) => {
        console.log(`QR Code scanned: ${decodedText}`);
        try {
            const response = await fetch('/.netlify/functions/scanProduct', { // Update to use Netlify Function
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ qrData: decodedText })
            });

            if (response.ok) {
                const product = await response.json();
                console.log('Product found:', product);

                // Update the UI with the product information
                document.getElementById('you-qr-results').innerHTML = `
                    <p>Product: ${product.name}</p>
                    <p>Price: ${product.price} KSH</p>
                `;

                // Update the total price
                const totalElement = document.getElementById('total');
                totalElement.innerText = parseInt(totalElement.innerText) + product.price;
            } else {
                alert('Product not found.');
            }
        } catch (error) {
            console.error('An unexpected error occurred while scanning the product:', error);
            alert('An unexpected error occurred.');
        }
    },
    (errorMessage) => {
        console.error('QR Code scan error:', errorMessage);
    }
).catch((err) => {
    console.error('Error initializing QR code scanner:', err);
});

function payNow() {
    alert('Processing payment. Please wait for the M-PESA prompt.');
}

function generateReceipt() {
    alert('Receipt generated successfully.');
}
