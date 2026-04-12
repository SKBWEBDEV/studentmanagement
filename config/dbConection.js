const mongoose = require('mongoose')

const dbConection = ()=> {
  mongoose.connect('mongodb+srv://schoolmanagement:VeKqjwGtCTfeEfyi@cluster0.dr5uolb.mongodb.net/school?appName=Cluster0')
  .then(()=> {
    console.log('Database Conected');   
  }).catch(()=> {
    console.log('Database Conected hosse na');
  })
}

module.exports = dbConection