var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var KycSchema = new Schema({

    Name:{type:String,required:true},
    Email_ID:{type:String,required:true},
    Phone_No:{type:Number,required:true},
    // Date_Of_Birth :{type:String, required:true},
    // Place_Of_Birth:{type:String, required:true},
    // Address:{type:String, required:true},
    
    AdharCardNo:{type:String, required:true},
    adharfront:{},
    PanCardNo:{type:String, required:true},
    pancard:{},
    // UAN_Number:{type:String, required:true},
    // Name_Of_School :{type:String, required:true},
    // Degree:{type:String, required:true},
    // Grade:{type:String,required:true},
    // Area_Of_Specialization:{type:String,required:true} ,
    // YearOfPassing:{type:String, required:true},
    // NameOfCompony:{type:String, required:true},
    Designation:{type:String,required:true},
    Department:{type:String,required:true} ,
    // JoiningDate:{type:String,required:true} ,
    // lastDateOfWorking:{type:String,required:true} ,
    // NameOfReportingManage:{type:String, required:true},
    // AppointmentLetter:{type:String, required:true},
    ResignationLetter:{},
    // RelevingLetter:{type:String,required:true} ,
    // ExperienceCertificate :{type:String,required:true} ,
    // SalarySlip:{type:String,required:true} ,
    // CertificateNumber:{type:String, required:true},
    // IssuingInstitute:{type:String, required:true},
    // StartDate:{type:String,required:true},
    // ComplitionDate:{type:String,required:true} ,
    // CertificationGrade:{type:String, required:true},
    // Proof:{type:String,required:true},
    // Resume:{type:String,required:true} ,
    userId:{type: String,ref:'user'}
})

mongoose.model('kyc',KycSchema);