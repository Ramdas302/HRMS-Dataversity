const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
var LeaveSchema = require('../../../app/models/leave');
var LeaveModel = mongoose.model('leave');


router.post('/addLeave',function(req,res){
    var LeaveData = new LeaveModel({
        LeaveType:req.body.LeaveType,
        Leave_From:req.body.Leave_From,
        Leave_To:req.body.Leave_To,
        Leave_Type:req.body.Leave_Type,
        userId:req.body.userId,
        fullName:req.body.fullName
    });
    LeaveData.save(function (err, result) {
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
    LeaveModel.find({userId:req.params.userId,Leave_status:"Pending"}).exec(function(err,attendance){
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
    LeaveModel.find({userId:req.params.userId,Leave_status:"Approved"}).exec(function(err,attendance){
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
    LeaveModel.find({userId:req.params.userId,Leave_status:"Rejected"}).exec(function(err,attendance){
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


  router.get('/getDate/:Date/:userId',function(req,res){
    LeaveModel.find({Date:req.params.Date,userId:req.params.userId}).exec(function(err,attendence){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: attendence
        });
      }
    
    });
  });

  router.put('/changeLeavestatus',function(req,res){
       query={
          _id:req.body._id
        }
       update = {
       $set: {
        Leave_status:req.body.Leave_status,
     
        }
    };
    LeaveModel.findByIdAndUpdate(query,update, function (err, Leavestatus) {
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

});


  module.exports=router;