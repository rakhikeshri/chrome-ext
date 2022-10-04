const mongoose = require("mongoose");
const snippetSchema = new mongoose.Schema({
    topic:String,
    image:String
})

module.exports = mongoose.model('snippets', snippetSchema)