var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    CompanyName:{type:String, required:true},
    CompanyEmail:{type:String, required:true},
    Vat:{type:String, required:true},
    Notes:{type:String, required:true},
  
})
mongoose.model('client',ClientSchema);