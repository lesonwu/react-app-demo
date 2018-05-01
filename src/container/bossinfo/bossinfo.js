import React from 'react'
import { Redirect } from 'react-router-dom'
import { NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {update}
)

class BossInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            avatar:'',
            title:'',
            company:'',
            money:'',
            decription:''
        }
        this.selectAvatar = this.selectAvatar.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    selectAvatar(imgname){
        console.log(imgname)
        this.setState({
            avatar:imgname
        })
    }
    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!=path?<Redirect to={this.props.redirectTo} />:null}
                <NavBar mode="dark">完善用户信息</NavBar>
                {/*第一种方式，父组件给子组件传递一个函数*/}
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                {/*第二种方式：直接用家头函数*/}
                {/*<AvatarSelector selectAvatar={(imgname)=>{*/}
                    {/*this.setState({*/}
                        {/*avatar:imgname*/}
                    {/*})*/}
                {/*}}>*/}
                <InputItem
                    onChange={v=>this.handleChange('title',v)}
                >招聘信息</InputItem>
                <InputItem
                    onChange={v=>this.handleChange('company',v)}
                >公司名称</InputItem>
                <InputItem
                    onChange={v=>this.handleChange('money',v)}
                >职位薪酬</InputItem>
                <TextareaItem
                    onChange={v=>this.handleChange('decription',v)}
                    rows={3}
                    autoHeight
                    title="职位要求"
                ></TextareaItem>
                <Button
                    onClick={()=>this.props.update(this.state)}
                    type="primary">保存</Button>
            </div>
        )
    }
}
export default BossInfo

