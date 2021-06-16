const userRouter = require('./user')
const activityRouter = require('./activity')
const applyRouter = require('./apply')
const noticeRouter = require('./notice')
const messageRouter = require('./message')
const discussRouter = require('./discuss')

module.exports = app =>{
  app.use('/user',userRouter)
  app.use('/activity', activityRouter)
  app.use('/apply', applyRouter)
  app.use('/notice', noticeRouter)
  app.use('/message',messageRouter)
  app.use('/discuss',discussRouter)
}

