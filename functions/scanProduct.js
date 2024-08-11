const { MongoClient } = require('mongodb');

exports.handler = async function(event, context) {
    try {
        const { qrData } = JSON.parse(event.body);

        const client = new MongoClient('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('supermarket');
        const collection = db.collection('products');

        const product = await collection.findOne({ code: qrData });

        await client.close();

        if (product) {
            return {
                statusCode: 200,
                body: JSON.stringify(product),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Product not found' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to retrieve product', error }),
        };
    }
};
