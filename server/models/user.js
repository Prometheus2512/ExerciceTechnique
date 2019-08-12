var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        email: { type: String, unique: false, required: false },
        password: { type: String, unique: false, required: false },
        firstName: { type: String, unique: false, required: false },
        lastName: { type: Date,unique: false,required:false },
        phoneNumber: { type: String ,unique: false}

    });

var user = mongoose.model('User', userSchema);

module.exports = user;