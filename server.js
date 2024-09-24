const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Render uses process.env.PORT

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory product storage
let products = [];

// Add product route (Admin adds products)
app.post('/add-product', (req, res) => {
    const { name, code, price } = req.body;
    products.push({ name, code, price });
    res.status(201).send('Product added successfully');
});

// Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// QR scan route (Customer scans QR code)
app.post('/scan', (req, res) => {
    const { qrData } = req.body;
    const product = products.find(p => p.code === qrData);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Serve customer page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'customer.html'));
});

// Serve admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


