const mongoose = require("mongoose")

const listSchema = mongoose.Schema({
    
    activity: String,
    status: String,
    timetaken: String,
    action: String,

})
const listModel = mongoose.model("list",listSchema)

module.exports = listModel;