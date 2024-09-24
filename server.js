const express = require('express'); // Import Express framework
const bodyParser = require('body-parser'); // Import body-parser to parse JSON in requests
const path = require('path'); // Import path for file path management

const app = express(); // Initialize Express app
const port = process.env.PORT || 3000; // Set the port for the server, using PORT env variable or 3000

app.use(bodyParser.json()); // Middleware to parse JSON bodies in requests
app.use(express.static(__dirname)); // Serve static files like HTML, CSS from the root directory

let products = []; // In-memory storage for products

// Route to add a new product (Admin adds products)
app.post('/add-product', (req, res) => {
    const { name, code, price } = req.body; // Extract product details from request body
    products.push({ name, code, price }); // Add new product to the in-memory products array
    res.status(201).send('Product added successfully'); // Send a success response
});

// Route to get all products (For debugging or product listings)
app.get('/products', (req, res) => {
    res.json(products); // Respond with the full list of products in JSON format
});

// Route to handle QR scan and return product details (Customer scans the product code)
app.post('/scan', (req, res) => {
    const { qrData } = req.body; // Extract the QR code data from the request body
    const product = products.find(p => p.code === qrData); // Find the product by its code
    if (product) {
        res.json(product); // If the product exists, return the product details
    } else {
        res.status(404).send('Product not found'); // If no product matches the code, return 404
    }
});

// Serve customer page (UI for customers to scan products)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'customer.html')); // Serve the customer.html file
});

// Serve admin page (UI for admins to add products)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html')); // Serve the admin.html file
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); // Log that the server is running
});

