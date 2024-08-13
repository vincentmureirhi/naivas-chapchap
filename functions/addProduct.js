const products = [];

exports.handler = async function(event, context) {
    const data = JSON.parse(event.body);
    const { name, code, price } = data;
    products.push({ name, code, price });

    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Product added successfully' })
    };
};
