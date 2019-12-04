const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
const moongose = require('mongoose');

//Conectar a Mongo
moongose.connect('mongodb://localhost:27017/TicketBancoCAMER')
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

//Importar rutas
const indexRoutes= require('../routes/index');
//Configuracion
app.set('port', process.env.PORT || 3000);
//routes
app.use('/',indexRoutes);

let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');





server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});