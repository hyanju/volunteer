const express = require('express')
const User = require('../model/user')
const router = express.Router()

const Fly = require("flyio/src/node")
const jwt = require('jsonwebtoken')
const fly = new Fly

//查询
router.get('/getUser',async (req,res)=>{
  console.log(req.get('authorization'));
  let token = req.get('authorization');
  let result = jwt.verify(token, 'halice');
  console.log(result.openid);
  const user = await User.findOne({openid:result.openid})
  if(user){
    let data={
      avatarUrl:user.img,
      nickName:user.wxname
    }
    res.send(data)
  }
  
})

//获取用户列表
router.get('/', async (req,res)=>{
  const list = await User.findOne()
  res.send(list)
})

//注册
router.post('/register',async (req,res)=>{
  let data = req.body.user
  let openid = req.body.user.openid
  console.log(data)
  let user = await User.findOne({openid:openid})
  console.log(user)
  if(user){
    await User.findOneAndUpdate({openid:openid},{$set: data})
    res.send('0')
    console.log('0')
  }

  //const newUser = await new User(req.body).save()  //向数据库插入数据
  //res.send(user)
})

//登录
router.post('/login',async (req,res)=>{
  let data = req.body.data
  console.log(data)
  let user = await User.findOne({phone:data.phone})
  if(!user){
    return res.status(422).send("0")
  }
  if(data.password !== user.password){
    return res.status(422).send("1")
  }else{
    res.send(user)
  }
})

router.get('/getOpenId',async (request,response)=>{
  //获取code
  let data= JSON.parse(request.query.data);
  console.log(data.code);
  let appId='wx3707c8e0214d2b5b';
  let appSecret='3a1c6acb350165e00d835499ea16caff';
  let url=`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${data.code}&grant_type=authorization_code`;
  
  //通过用户id获取信息,参数直接写在url中
  let result=await fly.get(url);
  
  let userInfo=JSON.parse(result.data);
  console.log(userInfo);//获取到session_key、openid
  
   
  //将用户的openid存入数据库
  let token = jwt.sign(userInfo, 'halice');
  
  const newopenid = await new User({
    openid: token,                
    img: data.img,                           
    wxname: data.wxname 
  }).save()  //向数据库插入数据
  
  //自定义登录状态，根据用户的openid和sessionKey进行加密生成token，返回给前端
  //console.log(token);
  response.send(token);
})



module.exports = router