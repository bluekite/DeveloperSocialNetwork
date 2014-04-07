var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CommentSchema = new Schema({
    ticket_id: { type: String, default:''},
    number: { type: String, default:''},
    commenter: { type: String, default:''},
    commenttime: { type: String, default:''},
    content: { type: String, default:''},
	owner: { type: String, default:''}
});



exports.CommentModel = mongoose.model("comments",CommentSchema);