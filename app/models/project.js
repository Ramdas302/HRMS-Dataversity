var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProjectSchema = new Schema({
    ProjectCode:{type:String, required:true},
    ProjectTitle:{type:String, required:true},
    ClientName:{type:String, ref:"client"},
    clientId:{type:String, ref:"client"},
    AssignLead:{type:String, required:true},
    StartDate:{type:String, required:true},
    Fixrate:{type:String, required:true},
    Hourlyrate:{type:String, required:true},
    Estimatehours:{type:String, required:true},
    Description:{type:String, required:true},
  
})
mongoose.model('project',ProjectSchema);