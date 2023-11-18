const mongodb = require('mongodb');

let db;

mongodb.MongoClient.connect('mongodb+srv://sillyangel3:3pWlQq6nHk1IsCgk@musicappcluster.mzeycp2.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Connected successfully to server');
    db = client.db('musicDatabase');
});


exports.handler = async (event, context) => {
    const mostListenedAlbum = await db.collection('listeningData').find().sort({ count: -1 }).limit(1).toArray();

    let html = `<h1>Most Listened Album: ${mostListenedAlbum[0].album}</h1>`;

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: html,
    };
};