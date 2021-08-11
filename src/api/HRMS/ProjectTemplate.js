const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
var ProjectSchema = require('../../../app/models/project');
var ProjectModel = mongoose.model('project');
var ProjectTaskSchema = require('../../../app/models/ProjectTask');
var ProjectTaskModel = mongoose.model('projecttask');

router.post('/addProject',function(req,res){
    var projectData = new ProjectModel({
        ProjectCode:req.body.ProjectCode,
        ProjectTitle:req.body.ProjectTitle,
        ClientName:req.body.ClientName,
        clientId:req.body.clientId,
        AssignLead:req.body.AssignLead,
        StartDate:req.body.StartDate,
        Fixrate:req.body.Fixrate,
        Hourlyrate:req.body.Hourlyrate,
        Estimatehours:req.body.Estimatehours,
        Description:req.body.Description
    });
    projectData.save(function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).json({
          message: 'Bad Request'
        });
      } else {
        res.json({
          status: 200,
          data: result
        })
      }

    });
});

router.get('/getPendingLeave/:userId',function(req,res){
    ProjectModel.find({userId:req.params.userId,Leave_status:"Pending"}).exec(function(err,attendance){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: attendance
        });
      }
    
    });
  });

  router.get('/getApprovedLeave/:userId',function(req,res){
    ProjectModel.find({userId:req.params.userId,Leave_status:"Approved"}).exec(function(err,attendance){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: attendance
        });
      }
    
    });
  });

  router.get('/getRejectedLeave/:userId',function(req,res){
    ProjectModel.find({userId:req.params.userId,Leave_status:"Rejected"}).exec(function(err,attendance){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: attendance
        });
      }
    
    });
  });

// router.get('/getDatewise/:Date/:fullName',function(req,res){
//     AttendanceModel.find({Date:req.params.Date,fullName:req.params.fullName}).exec(function(err,attendence){
//       if(err){
//         return res.status(400).json({
//           message: 'Bad Request'
//         });
//       }else{
//         res.json({
//           status: 200,
//           data: attendence
//         });
//       }
    
//     });
//   });


//   router.get('/getDate/:Date/:userId',function(req,res){
//     LeaveModel.find({Date:req.params.Date,userId:req.params.userId}).exec(function(err,attendence){
//       if(err){
//         return res.status(400).json({
//           message: 'Bad Request'
//         });
//       }else{
//         res.json({
//           status: 200,
//           data: attendence
//         });
//       }
    
//     });
//   });

//   router.put('/changeLeavestatus',function(req,res){
//        query={
//           _id:req.body._id
//         }
//        update = {
//        $set: {
//         Leave_status:req.body.Leave_status,
     
//         }
//     };
//     LeaveModel.findByIdAndUpdate(query,update, function (err, Leavestatus) {
//       if (err) {
//         console.error("err"+err)
//         return res.status(400).json({
//           message: 'Bad Request'
//         });
//       } else {
//         res.json({
//           status: 200,
//           data: Leavestatus
//         })
//       }

//     });

// });


router.post('/addProjectTask',function(req,res){

    var d = new Date();
  var localdate = d.toString();

  console.log(localdate)

    var projectTaskdata = new ProjectTaskModel({
        ClientName:req.body.ClientName,
        clientId:req.body.clientId,
        ProjectName:req.body.ProjectName,
        ProjectId:req.body.ProjectId,
        TaskTitle:req.body.TaskTitle,
        fullName:req.body.AssignTo,
        userId:req.body.userId,
        StartDate:req.body.StartDate,
        visible:req.body.visible,
        Estimatehours:req.body.Estimatehours,
        Description:req.body.Description,
        createdAt:localdate
    });
    projectTaskdata.save(function (err, result) {
      if (err) {
        console.error(err);
        return res.status(400).json({
          message: 'Bad Request'
        });
      } else {
        res.json({
          status: 200,
          data: result
        })
      }

    });
});

router.get('/gettask',function(req,res){
    ProjectTaskModel.find({}).exec(function(err,user){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: user
        });
      }
    
    });
  });

  
 router.put('/chanetaskStatus/:userId',async(req,res)=>{


    var awadata = await ProjectTaskModel.find({userId:req.params.userId})

        const myJSON = JSON.stringify(awadata);
        console.log(myJSON)
        const myObj = JSON.parse(myJSON);

       var create= myObj["createdAt"]; 
      var replacedata = create.replace(/:/g, '.')
      var strdata = replacedata;
        removetrdata = strdata.slice(15);
        console.log(removetrdata); 
       var parsedata = parseFloat(removetrdata)
       console.log(parsedata)
       var hours= myObj["Estimatehours"];
       var Estimatetime = parseFloat(hours);
       console.log(Estimatetime)
       var Totaltime=parsedata+Estimatetime;
        console.log(Totaltime)
           

            var d = new Date();
            var n = d.toString(); 
            
            var time = n.replace(/:/g, '.')
            console.log(time);

              var str = time;
              str = str.slice(15);
              console.log(str); 
              
            var timedata = parseFloat(str)
            console.log(timedata);



          if(Totaltime <=timedata ){
       query={
          _id:req.body._id
        }
       update = {
       $set: {
        status:req.body.status,
     
        }
    };
    ProjectTaskModel.findByIdAndUpdate(query,update, function (err, Leavestatus) {
      if (err) {
        console.error("err"+err)
        return res.status(400).json({
          message: 'Bad Request'
        });
      } else {
        res.json({
          status: 200,
          data: Leavestatus
        })
      }

    });
          }
     
        
})
  module.exports=router;