const fs = require('fs');
const path = './products.json';

exports.handler = async function(event, context) {
    // Load existing products from file, if it exists
    let products = [];
    if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, 'utf8');
        products = JSON.parse(data);
    }

    const { qrData } = JSON.parse(event.body);
    
    // Find the product based on the scanned code
    const product = products.find(p => p.code === qrData);

    if (product) {
        return {
            statusCode: 200,
            body: JSON.stringify(product)
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Product not found' })
        };
    }
};
