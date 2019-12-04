//Conexion 
let socket = io();
//Referencia por cada elemento de pantalla publica
let lblTicket1 = $('#lblTicket1');
let lblTicket2 = $('#lblTicket2');
let lblTicket3 = $('#lblTicket3');
let lblTicket4 = $('#lblTicket4');

let lblCaja1 = $('#lblCaja1');
let lblCaja2 = $('#lblCaja2');
let lblCaja3 = $('#lblCaja3');
let lblCaja4 = $('#lblCaja4');

//Guardarlos en arreglos, para tenerlos por posicion e ir actualizando el html
let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4]
let lblCajas = [lblCaja1, lblCaja2, lblCaja3, lblCaja4]

//lamar el estado actual del socket
socket.on('estadoActual', (data) => {
    console.log(data);
    actualizaHTML(data.ultimos4)
})

////Escuchamos los ultimos 4 que emitimos en el broadcast
socket.on('ultimos4', (data) => {
    console.log(data);
    actualizaHTML(data.ultimos4)
})

//Actualizar HTML, recorriendo los arreglos previamente creados
function actualizaHTML(ultimos4) {
    for (let i = 0; i <= ultimos4.length - 1; i++) {
        //Renderizacion
        lblTickets[i].text('Ticket ' + ultimos4[i].num)
        lblCajas[i].text('Caja ' + ultimos4[i].caja)
    }
}