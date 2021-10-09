const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    email : {
        type : String
    },
    password :{ 
        type : String 
}
})
userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password , bcrypt.genSaltSync(5), null)
}
userSchema.methods.comperPassword = function(password){
    return bcrypt.compareSync(password , this.password)
}

module.exports = mongoose.model('User' , userSchema)