const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')


//新建app
const app = express()
//让其可以解析cookie
app.use(cookieParser())
//可以接受前端post传过来的json参数
app.use(bodyParser.json())
//app.use 开启一个中间件，跟user相关的路由拦截，子路由userRouter
app.use('/user',userRouter)


// app.get('/',function(req,res){
//     res.send('<h1>Hello,node!</h1>');
// })
// app.get('/data',function(req,res){
//     res.json({'name':'wuliexiong','age':28});
// })

app.listen(9093,function(){
    console.log('Node app start at port 9093');
})