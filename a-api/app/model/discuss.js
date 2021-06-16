const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const discussSchema = new Schema({
  content:{type:String, require:true},
  createTime:{type:String},
  wxname:{type:String},
  sno:{type:String}
})

const Discuss = model('Discuss',discussSchema)

module.exports = Discuss