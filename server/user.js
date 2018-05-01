const express = require('express')
const utils = require('utility') //引入MD5加密工具
const Router = express.Router();
const model = require('./model')
const User = model.getModel('user')
//定义一个公共的查询条件
const _filter = {'pwd':0,'__v':0}

Router.get('/list',function(req,res){
    //移除清空所有数据
    // User.remove({},function(err,doc){})
    //查找所有数据
    User.find({},function(err,doc){
        return res.json(doc)
    })
})
Router.post('/update', function(req,res){
    //先读取cookie的userid
    const {userid} = req.cookies
    //如果没有值
    if (!userid) {
        //返回1
        return res.json({code:1})
    }
    //根据id查询并更新
    const body = req.body
    User.findByIdAndUpdate(userid,body, function(err,doc){
        //node没有配babel，所以没有用...，用Object.assign展开数据
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data:data})
    })
})
Router.post('/login', function(req,res){
    //{user, pwd}解耦写法接收参数
    const {user, pwd} = req.body
    //登录查询，不需要返回密码，第一个查询条件，第二个是显示条件设置{'pwd':0}
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if (!doc) {
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        //登录成功，设置cookie
        res.cookie('userid', doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.post('/register', function(req, res){
    console.log(req.body);
    const {user, pwd, type} = req.body
    //User.findOne({user:user},function(err,doc){ //先查找用户名是否存在
    User.findOne({user},function(err,doc){//user es6写法
        if (doc) {
            return res.json({code:1,msg:'用户名重复'})
        }

        // User.create({user,type,pwd:md5Pwd(pwd)},function(e,d){
        //     if (e) {
        //         return res.json({code:1,msg:'后端出错了'})
        //     }
        //     return res.json({code:0})
        //     // const {user, type, _id} = d
        //     // res.cookie('userid', _id)
        //     // return res.json({code:0,data:{user, type, _id}})
        // })
        //create创建的时候无法拿到用户的id，所以改用userModel
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if (e) {
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user, type, _id} = d
            //设置cookie
            res.cookie('userid', _id)
            return res.json({
                code:0,
                //es6写法，user:user,type:type,_id:_id
                data:{user, type, _id}})
        })
    })
})
Router.get('/info',function(req, res){
    //先读取cookie的userid
    const {userid} = req.cookies
    //如果没有值
    if (!userid) {
        //返回1
        return res.json({code:1})
    }
    //有查询用户数据id
    User.findOne({_id:userid} ,_filter , function(err,doc){
        if (err) {
            return res.json({code:1, msg:'后端出错了'})
        }
        if (doc) {
            return res.json({code:0,data:doc})
        }
    })
})

function md5Pwd(pwd){
    const salt = 'wuliexiong_app123456#888%&^~~%'
    return utils.md5(utils.md5(pwd+salt)) //加严双层md5加密
}
Router.get('/info',function(req,res){
    //用户是否有cookie的校验
    return res.json({code:0}) //code:0 表示登录
})
module.exports = Router