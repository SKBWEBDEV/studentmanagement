const User = require("../model/userSchema")
const bcrypt = require('bcrypt');

const regestationControler = async(req,res)=> {

  const {name,email,password} = req.body
  console.log(name,email,password);

  try {
      const existingUser = await User.findOne({email:email})
  if(existingUser){
    return res.status(400).json({
      success: false,
      message: 'This email already existing'
    })
  }

  const hash = bcrypt.hashSync(password, 10);
  // console.log(hash);
  
  
  const user = new User({
    name,
    email,
    password:hash
  })
  user.save()
  res.send({
    name: user.name,
    email: user.email,
    id: user._id
  })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error"
    })
  }

}

// const loginControler = async(req,res)=> {
//   const {email,password} = req.body

//   const user = await User.findOne({email})

//   if(user.isLogin){
//     return res.status(400).json({
//       success: false,
//       message: "Please log out onather device"
//     })
//   }

//   if (!user) {
//     return res.status(400).json({
//       success: false,
//       message: "Email not found"
//     })
//   }

//   const pass = bcrypt.compareSync(password, user.password); 

//   if (pass) {
//     user.isLogin = true
//     user.save()
//      res.status(200).json({
//       success: true,
//       message: "login success"
//     })
//   }else{
//     res.status(200).json({
//       success: false,
//       message: "Invalid credentials"
//     })
//   }

// }

const loginControler = async(req,res)=> {

  const {email,password} = req.body

  const existingUser = await User.findOne({email})

    if(!existingUser){
    return res.status(404).json({
      success: false,
      message: "email not found"
    })
  }

  if(existingUser.isLogin){
    return res.status(400).json({
      success: false,
      message: "Please Log Out From Onather Device"
    })
  }



  let pass = bcrypt.compareSync(password, existingUser.password); 
  if (pass) {
    existingUser.isLogin = true
    existingUser.save()
    res.status(200).json({
      success: true,
      message: "Login success full"
    })
  }else{
    res.status(400).json({
      success: false,
      message: "invalide credentials"
    })
  }

}

const logOutControler = async(req,res)=> {
  const {id} = req.body
  const user = await User.findOne({_id:id})
  user.isLogin = false
  user.save()
  res.status(200).json({
    success: true,
    message: "logout done",
    data:user
  })
}

const isLoginId = async(req,res) => {
  const user = await User.find({isLogin: {$eq:true}})
  res.send(user)
}



module.exports = {regestationControler,loginControler,logOutControler,isLoginId}