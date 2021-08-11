const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
var ClientSchema = require('../../../app/models/clients');
var ClientModel = mongoose.model('client');


router.post('/addClients',function(req,res){
    var ClientData = new ClientModel({

        CompanyName:req.body.CompanyName,
        CompanyEmail:req.body.CompanyEmail,
        Vat:req.body.Vat,
        Notes:req.body.Notes,
        
    });
    ClientData.save(function (err, result) {
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

router.get('/getClients',function(req,res){
    ClientModel.find({}).exec(function(err,Clients){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: Clients
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