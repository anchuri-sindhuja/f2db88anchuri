const mongoose = require("mongoose")

const hatSchema = mongoose.Schema({

    hat_color: {type: String,required: [true, 'hat color cannot be empty']}, 

    hat_type:{type: String,required: [true, 'hat type cannot be empty']}, 

    hat_size : {type: Number,required: [true, 'hat size cannot be empty']}

})



module.exports = mongoose.model("hat", hatSchema)