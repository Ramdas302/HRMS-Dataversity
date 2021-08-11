var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttendanceSchema = new Schema({
    Date:{type:String, required:true},
    userId:{type:String, required:true},
    fullName:{type:String, required:true},
    Punch_In:{type:String, required:true},
    Punch_Out:{type:String, default:""},
  
})
mongoose.model('attendance',AttendanceSchema);