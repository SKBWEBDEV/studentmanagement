const mongoose = require('mongoose')
const {Schema} = mongoose

const profileSchema = new Schema ({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  roll: {
    type: String,
    required: true
  },
  fatherName: {
    type: String,
    required: true
  },
  motherName: {
    type: String,
    required: true
  },
  studentClass: {
    type: String,
    required: true
  },
  paymentDate: {
    type: Date
    // required: true
  },
  bloodgroup: {
    type: String,
    required: true
  },
  gender : {
    type: String,
    enum: ["Male", "Female", "custom"],
    required: true
  },
 parentsPhoneNumber: {
    type: String,
    required: true
  },
 profilId: {
    type: String,
  },
  result:{
    english:{
      type:Number,
      required:true
    },
    math:{
      type:Number,
      required:true
    },
    Physics:{
      type:Number,
      required:true
    },
    Chemistry:{
      type:Number,
      required:true
    },
    Biology:{
      type:Number,
      required:true
    },
  },
  isHold:{
    type:Boolean,
    default:false
  }
})

module.exports = mongoose.model("Profile", profileSchema)