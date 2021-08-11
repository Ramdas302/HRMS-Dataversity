var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeaveSchema = new Schema({
    LeaveType:{type:String, required:true},
    Leave_From:{type:String, required:true},
    Leave_To:{type:String, required:true},
    Leave_Type:{type:String, required:true},
    userId:{type:String, required:true},
    fullName:{type:String, required:true},
    Leave_status:{type:String, default:"Pending"},
  
})
mongoose.model('leave',LeaveSchema);