const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://sillyangel3:3pWlQq6nHk1IsCgk@musicappcluster.mzeycp2.mongodb.net/?retryWrites=true&w=majority';
const fs  = require('fs');
const path = require('path');


let db;

const app = express();

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        db = client.db('musicDatabase');

        // Define your routes here, after the MongoDB connection is established
        app.get('/song/api/', async (req, res) => {
            try {
                const data = await db.collection('listeningData').find().sort({ count: -1 }).limit(1).toArray();
                const filePath = path.join(__dirname, 'template.html');
                let fileContents = fs.readFileSync(filePath, 'utf8');
            
                // Replace the placeholder with the actual value
                const mostListenedAlbum = `<h1>Most Listened Album: ${data}</h1>`;
                fileContents = fileContents.replace('{mostListenedAlbum}', mostListenedAlbum);
            
                res.status(200).send(fileContents);
            } catch (error) {
                console.error('Error reading file', error);
                res.status(500).send('Error reading file');
            }
        });

        // Start the Express server after the MongoDB connection is established
        app.listen(3000, () => {
            console.log('Server is listening on port 3000');
        });
    })
    .catch(error => {
        console.error('Failed to connect to Database', error);
    });

app.get('/', (req, res) => {
    // send index.html to start client application
    res.sendFile(__dirname + '/index.html');
});