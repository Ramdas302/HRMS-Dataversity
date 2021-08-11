const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
var AttendanceSchema = require('../../../app/models/attendance');
var AttendanceModel = mongoose.model('attendance');


router.post('/addAttendance',function(req,res){
    var data = req.body;
    
    var d = new Date();
    var localtime = d.toTimeString();
    console.log(localtime)
    var d = new Date();
  var date = d.to();
  console.log(date)
       var exampleObject=data;
        objectLength = Object.keys(exampleObject).length;
    

if(objectLength==2){
   

    var AttendanceData = new AttendanceModel({

        Date:date,
        userId:req.body.userId,
        fullName:req.body.fullName,
        Punch_In:localtime,
        
    });

    AttendanceData.save(function (err, result) {
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
}


 if(objectLength==1){

    query={
        _id:req.body.id
    }
    update = {
        $set: {
            Punch_Out:localtime,
         
        }
      };
      AttendanceModel.findByIdAndUpdate(query,update, function (err, attendance) {
          if (err) {
            console.error("err"+err)
            return res.status(400).json({
              message: 'Bad Request'
            });
          } else {
            res.json({
              status: 200,
              data: attendance
            })
          }
    
        });
    
}

});

router.get('/getDatewise/:Date',function(req,res){
    AttendanceModel.find({Date:req.params.Date},{_id:0,fullName:1}).exec(function(err,attendance){
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
    AttendanceModel.find({Date:req.params.Date,userId:req.params.userId}).exec(function(err,attendence){
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



//   router.put('/updateHoliday/:id',function(req,res){
//     console.log(req.body);
        
//         update = {
//           $set: {
//             HoliadayName:req.body.HoliadayName,
//             Description:req.body.Description,
//             HolidayDate:req.body.HolidayDate,
           
//           }
//         };
//         HolidayModel.findByIdAndUpdate(req.params.id,update, function (err, holiday) {
//             if (err) {
//               console.error("err"+err)
//               return res.status(400).json({
//                 message: 'Bad Request'
//               });
//             } else {
//               res.json({
//                 status: 200,
//                 data: holiday
//               })
//             }
      
//           });
//       });
  
      
//   router.post('/deletholiday/:id',function(req,res){
//     HolidayModel.findByIdAndRemove(req.params.id,function(err,deleteholiday){
//         if(err){
//             res.json({
//                 status : 400
//             })
//         }else{
//             res.json({
//                 status : 200
//             })
//         }
//     })
//   });

  module.exports=router;