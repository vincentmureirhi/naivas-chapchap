const { MongoClient } = require('mongodb');

exports.handler = async function(event, context) {
    try {
        const { name, code, price } = JSON.parse(event.body);

        const client = new MongoClient('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('supermarket');
        const collection = db.collection('products');

        const result = await collection.insertOne({ name, code, price });

        await client.close();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Product added successfully', result }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to add product', error }),
        };
    }
};
