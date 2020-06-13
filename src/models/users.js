const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    googleId:{
        type:String
    },
    username:{
        type:String
    }
})

mongoose.model('User',userSchema)
