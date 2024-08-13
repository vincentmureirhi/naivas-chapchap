const products = [];

exports.handler = async function(event, context) {
    const data = JSON.parse(event.body);
    const { qrData } = data;
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
