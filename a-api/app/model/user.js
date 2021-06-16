const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const UserSchema = new Schema({
  openid:{type:String, require:true},
  img:{type:String, require:true},
  wxname:{type:String, require:true},
  qinshihao:{type:String},
  name:{type:String, require:false},
  password:{type:String, require:false},
  phone:{type:String, require:false},
  email:{type:String, require:false},
  isAdmin:{type:String},  //角色 0:志愿者，1:志愿者组织
  sno:{type:String}
})

const User = model('User',UserSchema)

module.exports = User