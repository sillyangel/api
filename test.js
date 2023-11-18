fetch('https://upgraded-bassoon-4wp4q6wgjxqh7g75-8888.app.github.dev/.netlify/functions/musicapi', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                album: currentAlbum
            })
        })