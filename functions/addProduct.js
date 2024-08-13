const fs = require('fs');
const path = './products.json';

exports.handler = async function(event, context) {
    let products = [];
    
    // Load existing products from file, if it exists
    if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, 'utf8');
        products = JSON.parse(data);
    }
    
    const { name, code, price } = JSON.parse(event.body);
    const newProduct = { name, code, price };
    
    // Add the new product
    products.push(newProduct);
    
    // Save the updated products list to the file
    fs.writeFileSync(path, JSON.stringify(products, null, 2));
    
    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Product added successfully', product: newProduct })
    };
};
