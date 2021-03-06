/*
后台管理主路由组件
*/
import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';

import Header from '../../components/header/header'
import LeftNav from '../../components/left-nav/left-nav'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Order from '../order/order'

const {  Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        if (!user || !user._id) {
            return <Redirect to="/login"></Redirect>
        }
        return (
                <Layout style={{width:' 100%',height:'100%'}}>
                    <Sider><LeftNav/></Sider>
                    <Layout>
                        <Header>Header</Header>
                        <Content style={{margin:20,backgroundColor:'#fff'}}>
                            <Switch>
                            <Redirect from='/' exact to='/home'/>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/user' component={User}/>
                            <Route path='/role' component={Role}/>
                            <Route path="/charts/bar" component={Bar}/>
                            <Route path="/charts/pie" component={Pie}/>
                            <Route path="/charts/line" component={Line}/>
                            <Route path="/order" component={Order}/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>推荐使用谷歌浏览器，
                            可以获得更佳页面操作体验</Footer>
                    </Layout>
                </Layout>
        )
    }
}