var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ChangesetSchema = new Schema({
    changeset: { type: String, default:''},
    author: { type: String, default:''},
    ticket: { type: String, default:''},
    version: { type: String, default:''},
    timestamp: { type: String, default:''},
    message: { type: String, default:''},
	file: { type: String, default:''},
    type: { type: String, default:''}
});



exports.ChangesetModel = mongoose.model("changesets",ChangesetSchema);