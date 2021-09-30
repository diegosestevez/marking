const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
        name: String,
        username: String,
        usertype: { type: String, default: 'Instructor' },
        password:{
                type: String, 
                default:'123456',
                select: false
        }
})

//Document Middleware runs before userSchema
userSchema.pre('save', async function(next){
        this.password = await bcrypt.hash(this.password, 12);
        next();
})

//create instance method that we run on authenticateUsers in userController.js
userSchema.methods.correctPassword = async (incomingPass, storedPass) => {
        return await bcrypt.compare(incomingPass, storedPass);
}

const User = mongoose.model('User', userSchema);

module.exports = User;