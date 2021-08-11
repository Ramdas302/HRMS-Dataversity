var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('./config/development');
var User = require('./src/api/HRMS/UserTemplate');
var Holiday = require('./src/api/HRMS/Holidayhistory');
var Attendance = require('./src/api/HRMS/Attendance');
var LeaveTemplate = require('./src/api/HRMS/LeaveTemplate');
var DepartmentTemplate = require('./src/api/HRMS/DepartmentTemplate');
var clients = require('./src/api/HRMS/clients');
var projects = require('./src/api/HRMS/ProjectTemplate');
var app = express();
app.use(bodyParser.json());
app.use('/api',User);
app.use('/api',Holiday);
app.use('/api',Attendance);
app.use('/api',LeaveTemplate);
app.use('/api',DepartmentTemplate);
app.use('/api',clients);
app.use('/api',projects);
app.listen(3000, () =>{
    console.log('server started at port 3000')
})