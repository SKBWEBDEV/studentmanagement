const Profile = require('../model/profilSchema')

const profileControler =  async(req,res) => {
  const {parentsPhoneNumber,gender,bloodgroup,studentClass,paymentDate,motherName,fatherName,roll,name,email} = req.body
  console.log(parentsPhoneNumber,gender,bloodgroup,studentClass,paymentDate,motherName,fatherName,roll,name);

  const existingUser = await Profile.findOne({email})

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "This email already Used"
    })
  }

  const firstName = name.slice(0,3)
  const randomNumber = Date.now().toString()
  let pid = firstName + randomNumber .slice(-3)
  console.log(pid);
  
  const profile = new Profile({
    parentsPhoneNumber,
    gender,
    bloodgroup,
    studentClass,
    paymentDate,
    fatherName,
    motherName,
    roll,
    name,
    email,
    profilId: pid
  })
  profile.save()
  res.status(201).json({
    success: true,
    message: "Profile Created",
    uesr:profile
  })
} 

const getProfileControler = async (req,res) => {
  const user = await Profile.find({})
  res.status(200).json({
    success: true,
    message: "All Profile",
    data: user
  })
}

const getSingleProfile = async (req,res) =>{
  const {id} = req.params
  const user = await Profile.findOne({_id : id})
  res.status(200).json({
    success: true,
    message: `${user.name} Profile`,
    data: user
  })
}

const updateProfile = async (req,res) => {
  const {id} = req.params
  const user = await Profile.findByIdAndUpdate({_id:id},req.body,{new:true})
  res.status(200).json({
    success:true,
    message: "upate completed",
    data:user
  })
}

const holdProfile = async (req,res) => {
  const {id} = req.body
  const user = await Profile.findOne({_id:id})
  user.isHold = true
  user.save()
  res.status(200).json({
    success: true,
    message: "profile hold completed"
  })
}

const getHoldProfile = async (req,res) => {
  const user = await Profile.find({isHold: {$eq:true}})
  res.send(user)
}
const getNotHoldProfile = async (req,res) => {
  const user = await Profile.find({isHold: {$ne:true}})
  res.send(user)
}

module.exports = {profileControler,getProfileControler,getSingleProfile,updateProfile,holdProfile,getHoldProfile,getNotHoldProfile} 