const express = require('express')
const Message = require('../model/message')
const router = express.Router()

//发表评论
router.get('/create', async (req,res)=>{
  let data = JSON.parse(req.query.data)
  console.log(data)
  let newData = new Message({
    activityId: data.activityId,
    content: data.content,
    sno: data.sno,
    wxname:data.wxname,
    createTime: data.date
  })
  await Message.create(newData)
  .then(newData=>{
    res.send({status:0, data:newData})
  })
  .catch(error=>{
    console.log('添加评论异常',error)
    res.send({status:1, msg:'添加评论异常'})
  })
})

//评论列表
router.get('/list',async (req,res)=>{
  let data = req.query.id
  console.log(data)
  let result = await Message.find({activityId:data})
  res.send(result)
})


module.exports = router
