// functions/scanProduct.js

exports.handler = async function(event, context) {
    const { qrData } = JSON.parse(event.body);

    // Search for the product in the array
    const product = products.find(p => p.code === qrData);

    if (product) {
        return {
            statusCode: 200,
            body: JSON.stringify(product)
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Product not found' })
        };
    }
};
