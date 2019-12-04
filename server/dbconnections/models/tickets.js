const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema=new Schema({
    noTicket:Number,
    date:Date,
    horaGeneracion: Date,
    horaAtencion: Date,
    transactionType: String
})
module.exports = mongoose.model('Tickets', TicketSchema);