const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

let products = [];

// Route to add a new product
app.post('/add-product', (req, res) => {
    const { name, code, price } = req.body;
    products.push({ name, code, price });
    res.status(201).send('Product added successfully');
});

// Route to get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Route to handle QR scan and return product details
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
    res.sendFile(path.join(__dirname, 'customer.html'));
});

// Serve admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
