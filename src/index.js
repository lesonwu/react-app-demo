import React from 'react';
import ReactDOM from 'react-dom';
//compose专门用来组合函数的
//新建store需要引入createStore，applyMiddleware 开启redux-thunk中间件
import { createStore,applyMiddleware,compose} from 'redux'
//redux处理异步，需要redux-thunk插件
import thunk from 'redux-thunk'
//使用react-redux来连接react和redux
import { Provider } from 'react-redux'
import {BrowserRouter,Route,Link,Redirect,Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'

import reducers from './reducer'
import './config'
//引入antd-mobile样式
// import 'antd-mobile/dist/antd-mobile.css'
import './index.css'
//创建一个store存储数据，传入reducer
// compose对函数applyMiddleware(thunk)和window.devToolsExtension得到的函数进行组合
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    //这是redux调试工具，判断是否有window.devToolsExtension这个函数，当有window.devToolsExtension这个函数就执行这个函数，没有就返回一个空函数f=>f
    window.devToolsExtension?window.devToolsExtension():f=>f
))

function Erying(){
    return <h2>二营</h2>
}
// function Qibinglian(){
//     return <h2>骑兵连</h2>
// }
// class Test extends React.Component{
//     constructor(props){
//         super(props)
//     }
//     render(){
//         //this.props.history.push('/'); 用这种方式跳转
//         console.log(this.props);
//         return <h2>测试组件{this.props.match.params.location}</h2>
//     }
// }
ReactDOM.render(
    //provider用来更新代码
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                {/*<ul>*/}
                    {/*<li><Link to="/">一营</Link></li>*/}
                    {/*<li><Link to="/login">登录</Link></li>*/}
                    {/*<li><Link to="/register">注册</Link></li>*/}
                {/*</ul>*/}
                <AuthRoute></AuthRoute>
                <Switch>
                    {/*//switch只渲染第一个命中的路由*/}
                    {/*路由强制跳转*/}
                    {/*<Redirect to="/"></Redirect>*/}
                    {/*路由参数*/}
                    {/*<Route path="/:location" component={Test}></Route>*/}
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
