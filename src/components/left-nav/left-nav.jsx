import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button,Icon } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import menuList from '../../config/menuConfig'
import './left-nav.less'
import logo from '../../assets/images/logo.png'
const { SubMenu } = Menu;

export default class LeftNav extends Component {
    getMenuNodes = (menuList)=>{
        return menuList.map(item=>{
            if(!item.children){
                return(
                    <Menu.Item key={item.key}>
                    <Link to={item.key}>
                      <Icon type={item.icon}/>
                      <span>{item.title}</span>
                    </Link>
                  </Menu.Item>
                )
            }else{
                return(
                    <SubMenu
                    key={item.key}
                    title={
                    <span>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                    </span>
                    }
                >
                    {this.getMenuNodes(item.children)}
                </SubMenu>
                )
            }
        })
    }
    render() {

        return (
            <div className='left-nav'>
                <Link to='/' className='logo-link'>
                    <img src={logo} alt="logo" />
                    <h1>后台服务</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to='/home'>首页</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                        <Menu.Item key="2">
                            <Link to='/product'>
                            <span>
                                <ContainerOutlined/>
                                <span>品类管理</span>
                            </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to='/product'>
                                <ContainerOutlined/>
                                <span>商品管理</span>
                             </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4" icon={<PieChartOutlined />}>
                        <Link to='/user'> 用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<PieChartOutlined />}>
                        <Link to='/role'>角色管理</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<MailOutlined />} title="图形图表">
                        <Menu.Item key="6">
                            <Link to="/charts/bar">
                                <span>
                                    <ContainerOutlined/>
                                    <span>柱状图</span>
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                        <Link to="/charts/line">
                                <span>
                                    <ContainerOutlined/>
                                    <span>折线图</span>
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                        <Link to="/charts/pie">
                                <span>
                                    <ContainerOutlined/>
                                    <span>饼状图</span>
                                </span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<PieChartOutlined />}>
                        <Link to="/order">订单管理</Link>
                    </Menu.Item> */}
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        )
    }
}