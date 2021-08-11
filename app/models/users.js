var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var UserSchema = new Schema({
    Firstname:{type:String, required:true},
    MiddleName:{type:String, required:true},
    Lastname :{type:String, required:true},
    fullName:{type:String},
    Email_ID:{type: String,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    Phone_No:{type:Number, required:true},
    Password :{type:String, required:true},
    Department:{type:String, required:true},
    Designation:{type:String, required:true},
    role: {type:String, default:"employee"},
   
})
UserSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
mongoose.model('user',UserSchema);