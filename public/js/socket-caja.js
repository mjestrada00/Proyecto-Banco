//Establecer conexion
let socket = io();

let searchParams = new URLSearchParams(window.location.search)
    //Extraer que caja es por medio de la url
if (!searchParams.has('caja')) {
    window.location = 'index.html';
    throw new Error('La caja es necesaria')
}

//Guardamos en esta variable que caja estamos utilizando
let caja = searchParams.get('caja');

let label = $('small');
console.log(caja);
//Ticket caja actualmente en la pantalla
$('h1').text('Caja ' + caja)


//Listener del boton, cuando se presione click cambia el small por el ticket que devuelva el servidor
$('button').on('click', () => {
    //Llamamos al socket atender ticket
    socket.emit('atenderTicket', { caja: caja }, function(resp) {

        if (resp === 'No hay tickets') {
            label.text(resp)
            alert(resp)
            return;
        }
        //Mostramos en el frontend el ticket atendido por dicha caja
        label.text('Ticket' + resp.num)
    })
})