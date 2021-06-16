const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const applySchema = new Schema({
  id:{type:String, require:true},
  title:{type:String, require:true},
  sno:{type:String, require:true},
  name:{type:String, require:true},
  number:{type:Number}
})

const Apply = model('Apply',applySchema)

module.exports = Apply