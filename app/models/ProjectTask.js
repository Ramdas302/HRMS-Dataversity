var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectTaskSchema = new Schema({
    ClientName:{type:String, ref:"client"},
    clientId:{type:String, ref:"client"},
    ProjectName:{type:String, ref:"project"},
    ProjectId:{type:String, ref:"project"},
    TaskTitle:{type:String, required:true},
    fullName:{type:String, ref:'user',required:true},
    userId:{type:String, ref:'user'},
    StartDate:{type:String, required:true},
    Estimatehours:{type:String, required:true},
    Description:{type:String, required:true},
    visible:{type:String, required:true},
    status:{type:String, default:"uncomplete"},
    createdAt: {type:String},
  
})
mongoose.model('projecttask',ProjectTaskSchema);