//Comando establecer conexion activa activa con servidor
let socket = io();

//boton de nuevo ticket
let label = $('#lblNuevoTicket')

//Dos eventos de los sockets
socket.on('connect', () => {
    console.log('Usuario Conectado');
})

socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
    })
    //Escuchar evento del estado actual y mostrarlo en pantalla
socket.on('estadoActual', (resp) => {
        label.text(resp.actual)
    })
    //Usando jquery para funcionalidad de los botones van a disparar la siguiente funcion
$('button').on('click', () => {
    //Comunicacion con el servidor y frontend del siguiente ticket
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        //Mostrando en pantalla el siguiente ticket
        label.text(siguienteTicket)
    });

})