const mongoose = require("mongoose")

const hatSchema = mongoose.Schema({

    hat_color: String,

    hat_type:String,

    hat_size : Number,

})



module.exports = mongoose.model("hat", hatSchema)