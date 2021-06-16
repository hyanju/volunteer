const express = require('express')
const Activity = require('../model/activity')
const router = express.Router()

//获取我创建的活动列表
router.get('/myCreate', async (req,res)=>{
  let data = req.query.data1
  console.log(data) 
  await Activity.find({sno:data})
  .then(newActivity=>{
    res.send({status:1, data:newActivity})
  })
  .catch(error=>{
    console.log('添加活动异常',error)
    res.send({status:0, msg:'添加活动异常'})
  })
})

//获取我的活动列表
router.get('/mylist', async (req,res)=>{
  let data = req.query.id
  console.log(data)
  await Activity.find({_id:data})
  .then(newActivity=>{
    res.send({status:1, data:newActivity})
  })
  .catch(error=>{
    console.log('添加活动异常',error)
    res.send({status:0, msg:'添加活动异常'})
  })
})

//取消报名
router.get('/myCancel', async (req,res)=>{
  let data = req.query.id
  console.log(data)
  await Activity.findOneAndUpdate({_id:data},{$inc: {numbered:-1}})
  .then(newActivity=>{
    res.send({status:1, data:newActivity})
  })
  .catch(error=>{
    console.log('添加活动异常',error)
    res.send({status:0, msg:'添加活动异常'})
  })
})

//取消活动
router.get('/myCancel', async (req,res)=>{
  let id = req.query.id
  let result = await Apply.deleteOne({_id:id})
  console.log(result.n)
  res.send(result)
})


//获取活动列表
router.get('/list', async (req,res)=>{
  let data = req.query.data
  console.log(data)
  if(!data){
    let list = await Activity.find().sort({'startTime':-1})
    res.send(list)
    console.log('444')
  }else{
    let reg = new RegExp(data, 'i') 
    let whereStr={'title':reg}
    let whereStr1={'detail':reg}
    let result = await Activity.find({$or:[whereStr,whereStr1]}).sort({'startTime':-1})
    console.log(result)
    res.send(result)
  }
})


//获取当前活动活动
router.get('/oneList', async (req,res)=>{
  let _id = req.query.id
  console.log(_id)
 // let result = await Activity.find({_id,_id})

  await Activity.findOneAndUpdate({_id:_id},{$inc: {numbered:1}})
  .then(newActivity=>{
    res.send({status:1, data:newActivity})
    console.log(1)
  })
  .catch(error=>{
    console.log('添加活动异常',error)
    res.send({status:0, msg:'添加活动异常'})
  })
  
  
  
  
  // console.log(sno)
  // await Activity.findOneAndUpdate({_id:id},{$addToSet:{apply:{sno:sno}}})
  
}) 

//创建活动
router.get('/create', async (req,res)=>{
  let data2 = JSON.parse(req.query.data)
  let createTime = Date()
  let data = data2.data1
  const newActivity = new Activity({
    title: data.title,                
    local: data.local,  
    name: data.name,                         
    startTime: data.date1+data.time1,
    endTime: data.date2+data.time2,
    phone: data.phone,
    number: data.number,
    detail: data.detail,
    need: data.need,
    createTime: createTime,
    sno:data2.sno
  })
    await Activity.create(newActivity)
   .then(newActivity=>{
     res.send({status:0, data:newActivity})
   })
   .catch(error=>{
     console.log('添加活动异常',error)
     res.send({status:1, msg:'添加活动异常'})
   })
})


module.exports = router