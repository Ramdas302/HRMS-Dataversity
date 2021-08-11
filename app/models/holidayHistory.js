var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HolidaySchema = new Schema({
    HoliadayName:{type:String, required:true},
    Description:{type:String, required:true},
    HolidayDate:{type:String, required:true},
  
})
mongoose.model('holidayhistory',HolidaySchema);