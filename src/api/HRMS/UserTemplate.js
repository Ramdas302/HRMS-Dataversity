const express = require('express');
var router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');

const { check, validationResult } = require('express-validator');
var UserSchema = require('../../../app/models/users');
var UserModel = mongoose.model('user');
var KycSchema = require('../../../app/models/kyc');
var KycModel = mongoose.model('kyc');
var authorize = require("../../../Middleware/AuthJwt");

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
//   }

 let upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        let type = req.params.type;
        let path = `./uploads`;
        callback(null, path);
      },
      filename: (req, file, callback) => {
        callback(null, file.originalname,file.fieldname);
      }
    })
  });

router.post("/register-user",
    [
        check('Email_ID', 'Email is required')
            .not()
            .isEmpty(),
        check('Password', 'Password should be between 5  characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5})
    ],
    (req, res) => {
        const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        else {
            bcrypt.hash(req.body.Password, 10).then((hash) => {
                const user = new UserModel({
                    Firstname: req.body.Firstname,
                    MiddleName: req.body.MiddleName,
                    Lastname: req.body.Lastname,
                    fullName:req.body.Firstname.concat(' ', req.body.Lastname),
                    Email_ID: req.body.Email_ID,
                    Phone_No: req.body.Phone_No,
                    Department:req.body.Department,
                    Designation:req.body.Designation,
                    Password: hash
                });
                user.save().then((response) => {
                    res.status(201).json({
                        message: "User successfully created!",
                        result: response
                    });
                }).catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
            });
        }
    });



    router.get('/getUser',function(req,res){
      UserModel.find({}).exec(function(err,user){
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
    
    
    router.get('/getUserdata',function(req,res){
      UserModel.find({},{_id:0,fullName:1,Designation:1}).exec(function(err,user){
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

    var cpUpload = upload.fields([{ name: 'adharfront', maxCount: 1 }, { name: 'pancard', maxCount: 1 }, { name: 'ResignationLetter', maxCount: 1 }])

    router.post('/kyc-verify',cpUpload,function(req,res){
        var KycData = new KycModel({

            Name:req.body.Name,
            Email_ID:req.body.Email_ID,
            Phone_No:req.body.Phone_No,
            userId:req.body.user,
            // Date_Of_Birth :req.body.Date_Of_Birth,
            // Place_Of_Birth:req.body.Place_Of_Birth,
            // Address:req.body.Address,
            AdharCardNo:req.body.AdharCardNo,
            adharfront:req.files.adharfront,
            PanCardNo:req.body.PanCardNo,
            pancard:req.files.pancard,
            ResignationLetter:req.files.ResignationLetter,
            // UAN_Number:req.body.UAN_Number,
            // Name_Of_School:req.body.Name_Of_School,
            // Degree:req.body.Degree,
            // Grade:req.body.Grade,
            Department:req.body.Department,
            Designation:req.body.Designation
        });
        KycData.save(function (err, result) {
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


  router.get("/getuserdata", async (req, res) => {
    var view_data = [];
    KycModel.find({}).populate("userId", ["fullName","Email_ID","Phone_No"]).exec(function (err, kyc) {
        if (err) {
          console.error(err);
        } else if (kyc != "" || kyc != undefined || kyc != null) {
          kyc.forEach(function (kycs) {
            view_data.push({
              Designation: kycs.Designation,
              Department:kycs.Department,
              AdharCardNo:kycs.AdharCardNo,
              PanCardNo:kycs.PanCardNo,
              FullName: kycs.userId.fullName,
              Email_ID:kycs.userId.Email_ID,
              Phone_No:kycs.userId.Phone_No
            });
          });
          res.json({
            status: 200,
            data: view_data,
          });
        } else {
          res.json({
            status: 400,
          });
        }
      });
  });  

  router.get('/getKycs',function(req,res){
    KycModel.find({},{_id:0,Education:1}).exec(function(err,kyc){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: kyc
        });
      }
    
    });
  });

  router.get('/getKycs',function(req,res){
    KycModel.find({},{_id:0,carrerExperience:1}).exec(function(err,kyc){
      if(err){
        return res.status(400).json({
          message: 'Bad Request'
        });
      }else{
        res.json({
          status: 200,
          data: kyc
        });
      }
    
    });
  });


router.post("/login", (req, res) => {
    let getUser;
    UserModel.findOne({
        Email_ID: req.body.Email_ID,
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.Password, user.Password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            Email_ID: getUser.Email_ID,
            userid: getUser._id,
            role:getUser.role
        }, "authorize", {
            expiresIn: "1h"
        });
        res.status(200).json({
            user:{
            _id: getUser._id,
            role:getUser.role,
            Firstname:getUser.Firstname,
            Lastname:getUser.Lastname,
            Email_ID:getUser.Email_ID
            },
            token: jwtToken,
        });
    }).catch(err => {
        return res.status(400).json({
            message: "Authentication failed"
        });
    });
});




router.put('/updateuser/:id',function(req,res){
  console.log(req.body);
      
      update = {
        $set: {
          fullName:req.body.fullName,
          Email_ID:req.body.Email_ID,
          Phone_No:req.body.Phone_No,
          Department:req.body.Department,
          Designation:req.body.Designation
         
        }
      };
      UserModel.findByIdAndUpdate(req.params.id,update, function (err, user) {
          if (err) {
            console.error("err"+err)
            return res.status(400).json({
              message: 'Bad Request'
            });
          } else {
            res.json({
              status: 200,
              data: user
            })
          }
    
        });
    });

    
router.post('/deleteuser/:id',function(req,res){
  UserModel.findByIdAndRemove(req.params.id,function(err,deleteuser){
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
