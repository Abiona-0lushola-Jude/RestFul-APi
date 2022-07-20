const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    subscribedToChannel:{
        required:true,
        type:String
    },
    subscribedDate:{
        type:Date,
        required:true,
        default:Date.now
    }
})


module.exports = mongoose.model('subscriber',subscriberSchema)