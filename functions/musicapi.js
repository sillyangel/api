const MongoClient = require('mongodb').MongoClient;

exports.handler = async function(event, context) {
    // Respond to OPTIONS request (preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: 'This was a preflight!'
        };
    }

    const data = JSON.parse(event.body);
    const uri = 'mongodb+srv://sillyangel3:3pWlQq6nHk1IsCgk@musicappcluster.mzeycp2.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const collection = client.db('musicDatabase').collection('listeningData');
        const result = await collection.insertOne(data);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ message: 'Data inserted successfully', id: result.insertedId })
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ message: 'An error occurred when inserting data' })
        };
    } finally {
        await client.close();
    }
};