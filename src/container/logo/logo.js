import React from 'react'
//js文件import的时候可以省略后缀，css，png不可以
import logoImg from '../logo/job.png'
import './logo.css'
class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img src={logoImg} alt=""/>
            </div>
        )
    }
}
export default Logo
