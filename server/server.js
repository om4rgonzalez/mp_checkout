require('../config/config');
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');


//////////////////////////////////


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


//indice de rutas
app.use(require('../routes'));

// app.listen(process.env.PORT, () => {
//     console.log('Usuario Escuchando el puerto ', process.env.PORT);

// });

let file_1 = '/etc/letsencrypt/live/bintelligence.net/privkey.pem';
let file_2 = '/etc/letsencrypt/live/bintelligence.net/fullchain.pem';
const httpsServer = https.createServer({
    key: fs.readFileSync(file_1),
    cert: fs.readFileSync(file_2),
}, app);
httpsServer.listen(process.env.PORT, () => {
    console.log('HTTPS Server running');
});