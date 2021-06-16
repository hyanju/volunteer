const mongoose = require('mongoose')
//mongoose.set('useFindAndModify', false)
const mongoUrl = 'mongodb://localhost:27017/volunteer' 

module.exports = app =>{
  mongoose.connect(mongoUrl,{useFindAndModify:false, useNewUrlParser:true, useUnifiedTopology:true},()=>{
    console.log('mongdb connect')
  })
}
