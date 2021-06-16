const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('./app/config/db')
const routes = require('./app/router/index')
const app = express()

mongo(app)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

routes(app)


app.listen(3000);
console.log('listening to port 3000');