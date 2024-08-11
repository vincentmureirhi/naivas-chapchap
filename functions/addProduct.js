// functions/addProduct.js

let products = [];  // Simple in-memory array to store products

exports.handler = async function(event, context) {
    const { name, code, price } = JSON.parse(event.body);

    // Simple validation
    if (!name || !code || !price) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid product data' })
        };
    }

    // Add the product to the array
    products.push({ name, code, price });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Product added successfully' })
    };
};
