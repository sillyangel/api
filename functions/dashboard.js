let listeningData = {};

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        const album = body.album;

        if (listeningData[album]) {
            listeningData[album]++;
        } else {
            listeningData[album] = 1;
        }

        return {
            statusCode: 200,
            body: 'Data received'
        };
    } else if (event.httpMethod === 'GET') {
        let mostListenedAlbum = Object.keys(listeningData).reduce((a, b) => listeningData[a] > listeningData[b] ? a : b);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: `<h1>Most Listened Album: ${mostListenedAlbum}</h1>`
        };
    } else {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }
};
