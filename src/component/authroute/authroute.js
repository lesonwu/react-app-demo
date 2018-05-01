import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
@connect(
    //如果不需要user的信息，这里可以写null
    //state=>state.user,
    null,
    {loadData}
)
@withRouter
class Authroute extends React.Component{
    componentDidMount(){
        //判断当前是否是登录或者注册页，无需跳转
        const publicList = ['/login','/register']
        // console.log(this.props.location);    //获取路由url信息
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){//如果是当前页面，无需做跳转
            return null;
        }
        //获取用户信息
        axios.get('/user/info').then(res=>{
            if(res.status == 200){
                console.log(res.data)
                if(res.data.code == 0){
                    //有登录信息
                    this.props.loadData(res.data.data)
                }else{
                    // console.log('2222')
                    //没有登录信息
                    //console.log(this.props.history);//undefined,因为Authroute不是一个路由组件
                    this.props.history.push('/login');
                }
            }
        })
        // 是否登录
        // 现在的url 登录页无需跳转
        // 用户type 是牛人还是boss
        // 用户完善信息
    }
    render(){

        // return(
        //     <h2>判断跳转的地方</h2>
        // )
        return null
    }
}
export default Authroute