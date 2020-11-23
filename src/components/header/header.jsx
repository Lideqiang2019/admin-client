import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './header.less';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import {formateTime} from '../../utils/dateUtils';
import {reqWeather} from '../../api/index';
import menuList from '../../config/menuConfig';
import LinkButton from '../link-button/link-button'

class Header extends Component {
    state = {
        currentTime:formateTime(Date.now()), // 用定义的时间格式化函数，做一次格式化，得到想要的时间形式
        dayPictureUrl:'', // 天气图片的url
        weather:''
    }

    getTime = ()=>{
        // 需要每隔1s能够更新一次时间
        this.intervalId = setInterval(()=>{
            this.setState({currentTime:formateTime(Date.now())})
        },1000)
    }
    getWeather = async ()=>{
        // 获取天气图片的url与天气状况信息
        const {dayPictureUrl,weather} = await reqWeather('北京')
        // 更新状态
        this.setState({dayPictureUrl,weather})
    }
    getTitle = ()=>{
        // 找到和当前访问的路由对应的title
        const pathname = this.props.location.pathname;
        let title;
        menuList.forEach(item=>{
            if(item.key===pathname){
                title = item.title
            }else if(item.children){
                // 如果有二级memu，则找二级下的title
                const cItem = item.children.find(cItem=>pathname.indexOf(cItem.key)===0)
                // 如果有值才说明有匹配的
                if(cItem) {
                    // 取出它的title
                     title = cItem.title
                }
            }
        })
        return title;
    }

    logout =()=>{
        Modal.confirm({
            title: '退出登录？',
            icon: <ExclamationCircleOutlined />,
            // content: 'Bla bla ...',
            okText: '确认',
            cancelText: '取消',
            onOk:()=>{

             // 删除保存的user数据，跳转到登录
            storageUtils.removeUser()
            memoryUtils.user = {}
            this.props.history.replace('/login')
            }
        });
    }
    componentDidMount(){
        // 在render之后执行一次
        // 处理异步ajax请求与时间函数
        this.getTime()
        this.getWeather()
    }

    componentWillUnmount(){
        // 清除定时器
        clearInterval(this.intervalId)
    }

    render() {
        const username = memoryUtils.user.username;
        const {currentTime,dayPictureUrl,weather} = this.state;
        const title = this.getTitle()
        return (
               <div className="header">
                   <div className='header-top'>
                    <span>欢迎,{username}</span>
                       {/* <a href="javascript::" ></a> */}
                       <LinkButton onClick={this.logout}>退出</LinkButton>
                   </div>
                   <div className='header-bottom'>
                       <div className='header-bottom-left'>{title}</div>
                       <div className='header-bottom-right'>
                            <span>{currentTime}</span>
                            <img src={dayPictureUrl} alt=""/>
                            <span>{weather}</span>
                       </div>
                   </div>
               </div>
        )
    }
}

export default withRouter(Header)