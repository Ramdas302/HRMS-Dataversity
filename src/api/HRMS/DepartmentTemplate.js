const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
var DepartmentSchema = require('../../../app/models/department');
var DepartMentModel = mongoose.model('department');


router.post('/addDepartment',function(req,res){
    var DepartmentData = new DepartMentModel({

        Department:req.body.Department, 
        Department_Head:req.body.Department_Head,
    });
    DepartmentData.save(function (err, result) {
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

router.get('/getDepartments',function(req,res){
    DepartMentModel.find({}).exec(function(err,DepartMents){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: DepartMents
        });
      }
    
    });
  });


  router.put('/updateDepartment/:id',function(req,res){

        update = {
          $set: {
            
           Department:req.body.DepartMent
          }
        };
        DepartMentModel.findByIdAndUpdate(req.params.id,update, function (err, department) {
            if (err) {
              console.error("err"+err)
              return res.status(400).json({
                message: 'Bad Request'
              });
            } else {
              res.json({
                status: 200,
                data: department
              })
            }
      
          });
      });
  
      
  router.post('/deletdepartment/:id',function(req,res){
    DepartMentModel.findByIdAndRemove(req.params.id,function(err,deleteDepartment){
        if(err){
            res.json({
                status : 400
            })
        }else{
            res.json({
                status : 200
            })
        }
    })
  });

  module.exports=router;