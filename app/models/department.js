var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
    Department:{type:String, required:true},
    Department_Head:{type:String, required:true},
})
mongoose.model('department',DepartmentSchema);