const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    name: String,
    users : Array
});

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;