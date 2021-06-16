const mongoose = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

const activitySchema = new Schema({
  title:{type:String, require:true},
  name:{type:String, require:true},
  local:{type:String, require:true},
  createTime:{type:String, require:true},
  number:{type:Number, require:false},
  numbered:{type:Number, default:0},
  phone:{type:String, require:false},
  startTime:{type:String, require:false},
  endTime:{type:String, require:false},
  detail:{type:String, require:false},
  need:{type:String, require:false},
  sno:{type:String, require:false}

})

const Activity = model('Activity',activitySchema)

module.exports = Activity