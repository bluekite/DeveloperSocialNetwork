var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var TicketSchema = new Schema({
    ticket: { type: String, default:''},
    status: { type: String, default:''},
    title: { type: String, default:''},
    timestamp: { type: String, default:''},
    reporter: { type: String, default:''},
	owner: { type: String, default:''},
    milestone: { type: String, default:''},
    description: { type: String, default:''}
});



exports.TicketModel = mongoose.model("tickets",TicketSchema);