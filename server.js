const express = require('express');
const hbs = require('hbs');

var app = express();

app.get('/', (req, resp) => {
    resp.send({
        name: 'luke',
        likes: [
            'cities',
            'biking'
        ]
    });
});

app.get('/about', (req, resp) => {
    resp.send('about page');
});

app.get('/bad', (req, resp) => {
    resp.send({
        errorMessage: 'page unavailable'
    });
});


app.listen(3000);