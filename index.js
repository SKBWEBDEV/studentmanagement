require('dotenv').config()
const express = require('express')
const dbConection = require('./config/dbConection')
const { regestationControler, loginControler, logOutControler, isLoginId } = require('./controlers/authControler')
const { profileControler, getProfileControler, getSingleProfile, updateProfile, holdProfile, getHoldProfile, getNotHoldProfile } = 
require('./controlers/profileCreateControler')
const app = express()
app.use(express.json())
dbConection()

app.post('/regestation', regestationControler)
app.post('/login', loginControler)
app.post('/logout', logOutControler)
app.post('/islogin',isLoginId)
// ========================================================================
app.post('/profile', profileControler)
app.get('/allprofile', getProfileControler)
app.get('/singleProfile/:id', getSingleProfile)
app.post('/update/:id', updateProfile)
app.post('/holdprofile', holdProfile)
app.post('/getholdprofile', getHoldProfile)
app.post('/getnotholdprofile', getNotHoldProfile)


const port = process.env.PORt || 8000

app.listen(port, ()=> {
  console.log(`server running ${port}`)
})