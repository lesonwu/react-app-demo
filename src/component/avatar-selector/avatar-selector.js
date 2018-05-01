import React from 'react'
import { Grid } from 'antd-mobile';
//属性检测，做大型项目的时候可以避免很多问题
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
    static prosTypes = {
        //必须是函数类型
        // selectAvatar:PropTypes.func
        //必须是函数类型，必传
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render(){
        const avatarList = 'boy,boy-1,boy-2,boy-3,boy-4,boy-5,girl,girl-1,girl-2,girl-3,girl-4,girl-5,girl-6,girl-7,man,man-1'
                            .split(',')
                            .map(v=>({//v是图像的名字
                                icon:require(`../img/${v}.png`),
                                text:v
                            }))
        const gridHeader = this.state.icon?
                            (<div>
                                <span className="avatar">
                                    已选择头像
                                    <img style={{width:30}} src={this.state.icon} alt=""/>
                                </span>
                            </div>):<div className="avatar">请选择头像</div>;
        return (
            <div>
                {gridHeader}
                <Grid data={avatarList}
                onClick={elm=>{
                    //设置选中的头像
                    this.setState(elm)
                    this.props.selectAvatar(elm.text)
                }}
                />
            </div>
        )
    }
}
export default AvatarSelector

