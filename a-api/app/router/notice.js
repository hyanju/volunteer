const express = require('express')
const Notice = require('../model/notice')
const router = express.Router()

//创建公告
router.get('/create', async (req,res)=>{
  let data = JSON.parse(req.query.data)
  let newData = new Notice({
    title: data.date1.title,
    content: data.date1.content,
    sno: data.sno,
    name:data.name,
    createTime: Date()
  })
  await Notice.create(newData)
  .then(newData=>{
    res.send({status:0, data:newData})
  })
  .catch(error=>{
    console.log('添加公告异常',error)
    res.send({status:1, msg:'添加公告异常'})
  })
})

//公告列表
router.get('/list',async (req,res)=>{
  let result = await Notice.find()
  res.send(result)
})




module.exports = router
