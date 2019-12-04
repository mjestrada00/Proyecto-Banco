const { io } = require('../server');
//Importamos la clase TicketControl
const { TicketControl } = require('../classes/ticket-control');

//Disparamos el constructor de la clase
const ticketControl = new TicketControl();


io.on('connection', (client) => {
    //Escuchar el boton de generar ticket
    client.on('siguienteTicket', (data, callback) => {
            let siguiente = ticketControl.siguienteTicket();
            //Se guarda cual es el siguiente ticket
            console.log(siguiente);
            //Ejecutando callback para mandarlo al frontend y mostrarlo en el label
            callback(siguiente);
        })
        //Llamamos y retornamos el objeto ultimo ticket
    client.emit('estadoActual', {
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4()
        })
        //Escuchar al evento atender ticket, callback para notificar el ticket que le toca al escritorio
    client.on('atenderTicket', (data, callback) => {
        if (!data.caja) {
            return callback({
                err: true,
                mensaje: "Caja es necesaria"
            })
        }
        //Llamamos a la funcion atender ticket de la clase
        let atenderTicket = ticketControl.atenderTicket(data.caja)
            //Retornamos para el frontend
        callback(atenderTicket);
        //Actulizar cambios en os ultimos 4, emitir ultimos 4 en el socket publico
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    })

});