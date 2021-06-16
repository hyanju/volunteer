const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const messageSchema = new Schema({
  content:{type:String, require:true},
  activityId:{type:String, require:true},
  createTime:{type:String},
  wxname:{type:String},
  sno:{type:String}
})

const Message = model('Message',messageSchema)

module.exports = Message