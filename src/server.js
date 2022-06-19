const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

//Iniciar el servidor
const app = express();
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, './log/access.log'), { flags: 'a' }),
    interval: '7d'
}));

//Configurar rutas
app.use('/example', require('./router/ExampleRouter'))

//http server
const server = require('http').createServer(app);

// Cron job
const Cron = require('./helper').Cron;
Cron.UpdateCoinList();

//Init Socket
const Socket = require('./helper').Socket;
Socket.initSocket(server);

module.exports = server;