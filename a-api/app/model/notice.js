const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const noticeSchema = new Schema({
  sno:{type:String, require:true},
  title:{type:String, require:true},
  content:{type:String, require:true},
  createTime:{type:String},
  name:{type:String}
})

const Notice = model('Notice',noticeSchema)

module.exports = Notice