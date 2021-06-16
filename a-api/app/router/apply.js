const express = require('express')
const Apply = require('../model/apply')
const router = express.Router()

//获取当前活动活动
router.get('/applyList', async (req,res)=>{
  let data = JSON.parse(req.query.data)
 // console.log(data)
  let result = await Apply.find()
  if(result==''){
    await Apply.create(data)
    res.send('1')
  }else{
    let id = data.id
    let sno = data.sno
    let result1 = await Apply.countDocuments({id:id})
    let result2 = await Apply.findOne({id:id})
    let result3 = await Apply.countDocuments({id:id,sno:sno})
    //console.log(result2)
    if(result2==null){
      console.log('555')
      await Apply.create(data)
      res.send('1')
    }else{
      if(result3==0&&result1<result2.number){
        console.log('1111')
        await Apply.create(data)
        res.send('1')
      }else{
        console.log('222')
        res.send('0')
      } 
    }  
  }  
}) 


//获取我的活动列表
router.get('/mylist', async (req,res)=>{
  let data = req.query.data1
  console.log(data)
  let reg = new RegExp(data, 'i') 
  let whereStr={'sno':reg}
  let result = await Apply.find(whereStr)
  console.log(result)
  res.send(result)
})

//取消我的活动
router.get('/myCancel', async (req,res)=>{
  let data = JSON.parse(req.query.data)
  let id = data.id
  let sno = data.sno
  console.log(sno)
  let result = await Apply.deleteOne({id:id,sno:sno})
  console.log(result.n)
  res.send(result)
})




module.exports = router

