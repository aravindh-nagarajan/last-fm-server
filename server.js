const express = require('express');
const request= require('request');
const favicon = require('serve-favicon');
const port = process.env.PORT || 3000;
const app = express();

app.use(favicon(__dirname + '/favicon.png'));

app.use("/playground", express.static(__dirname + '/playground'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function errorHandler(err, response, responseObject) {
    responseObject.sendStatus(response.statusCode);
    responseObject.send(err);
}

function getUrl(item, params = []) {
    const baseUrl = 'http://ws.audioscrobbler.com/2.0/';
    const devKey = 'dd24d0ce78e8a2aa9e0b737a51431dd6';
    const limit = 25;

    let requestedUrl = `?method=${item}&api_key=${devKey}&format=json&limit=${limit}`;

    params.forEach(([key, value]) => {
        requestedUrl += `&${key}=${value}`
    });

    return `${baseUrl}${requestedUrl}`;
}

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
})

app.get('/top-tracks', (req, response) => {
    const apiUrl = getUrl('chart.gettoptracks');

    request.get(apiUrl, (err, res, body) => {
        if (err) {
            errorHandler(err, res, response);
        }

        const topRecords = JSON.parse(body);

        response.send(topRecords);
    });
});

app.get('/top-artists', (req, response) => {
    const apiUrl = getUrl('chart.gettopartists');

    request.get(apiUrl, (err, res, body) => {
        if (err) {
            errorHandler(err, res, response);
        }

        const topRecords = JSON.parse(body);

        response.send(topRecords);
    });
});

app.get('/artist/:artist', (req, response) => {
    const { artist }  = req.params;

    const apiUrl = getUrl('artist.getinfo', [
        ['artist', artist],
    ]);

    request.get(apiUrl, (err, res, body) => {
        if (err) {
            errorHandler(err, res, response);
        }

        const artistInfo = JSON.parse(body);

        response.send(artistInfo);
    });
});

app.get('/track/:artist/:track', (req, response) => {
    const { track, artist }  = req.params;

    const apiUrl = getUrl('track.getinfo', [
        ['artist', artist],
        ['track', track],
    ]);

    request.get(apiUrl, (err, res, body) => {
        if (err) {
            errorHandler(err, res, response);
        }

        const trackInfo = JSON.parse(body);

        response.send(trackInfo);
    });
});

app.get('/similar-tracks/:artist/:track', (req, response) => {
    const { track, artist }  = req.params;

    const apiUrl = getUrl('track.getSimilar', [
        ['artist', artist],
        ['track', track],
    ]);

    request.get(apiUrl, (err, res, body) => {
        if (err) {
            errorHandler(err, res, response);
        }

        const similarTracks = JSON.parse(body);

        response.send(similarTracks);
    });
});

app.get('/similar-artists/:artist', (req, response) => {
    const { artist }  = req.params;

    const apiUrl = getUrl('artist.getSimilar', [
        ['artist', artist],
    ]);

    request.get(apiUrl, (err, res, body) => {
        if (err) {
            errorHandler(err, res, response);
        }

        const similarArtists = JSON.parse(body);

        response.send(similarArtists);
    });
});

app.listen(port,( ) => {
    console.log(`Server listening at port : ${port}`);
});
