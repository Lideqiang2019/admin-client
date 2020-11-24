import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'
import './left-nav.less'
import logo from '../../assets/images/logo.png'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { connect } from 'react-redux'
import {setTitle} from '../../redux/actions'

const { SubMenu } = Menu;

class LeftNav extends Component {
    // getMenuNodes = (menuList)=>{
    //     return menuList.map((item)=>{
    //         if(!item.children){
    //             switch (item.icon) {
    //                 case 'HomeOutlined':
    //                     return(
    //                         <Menu.Item key={item.key}>
    //                         <Link to={item.key}>
    //                             <HomeOutlined/>
    //                           <span>{item.title}</span>
    //                         </Link>
    //                       </Menu.Item>
    //                     )
    //                 case 'BarsOutlined':
    //                     return(
    //                         <Menu.Item key={item.key}>
    //                         <Link to={item.key}>
    //                             <BarsOutlined/>
    //                           <span>{item.title}</span>
    //                         </Link>
    //                       </Menu.Item>
    //                     )
    //                 case 'ToolOutlined':
    //                     return(
    //                         <Menu.Item key={item.key}>
    //                         <Link to={item.key}>
    //                             <ToolOutlined/>
    //                             <span>{item.title}</span>
    //                         </Link>
    //                         </Menu.Item>
    //                     )
    //                 case 'UserOutlined':
    //                     return(
    //                         <Menu.Item key={item.key}>
    //                         <Link to={item.key}>
    //                             <UserOutlined/>
    //                             <span>{item.title}</span>
    //                         </Link>
    //                         </Menu.Item>
    //                     )
    //                 case 'SafetyOutlined':
    //                     return(
    //                         <Menu.Item key={item.key}>
    //                         <Link to={item.key}>
    //                             <SafetyOutlined/>
    //                             <span>{item.title}</span>
    //                         </Link>
    //                         </Menu.Item>
    //                     )
    //                     case 'BarChartOutlined':
    //                         return(
    //                             <Menu.Item key={item.key}>
    //                             <Link to={item.key}>
    //                                 <BarChartOutlined/>
    //                                 <span>{item.title}</span>
    //                             </Link>
    //                             </Menu.Item>
    //                         )
    //                     case 'LineChartOutlined':
    //                         return(
    //                             <Menu.Item key={item.key}>
    //                             <Link to={item.key}>
    //                                 <LineChartOutlined/>
    //                                 <span>{item.title}</span>
    //                             </Link>
    //                             </Menu.Item>
    //                         )
    //                     case 'PieChartOutlined':
    //                         return(
    //                             <Menu.Item key={item.key}>
    //                             <Link to={item.key}>
    //                                 <PieChartOutlined/>
    //                                 <span>{item.title}</span>
    //                             </Link>
    //                             </Menu.Item>
    //                         )

    //                 default:
    //                     return(
    //                         <Menu.Item key={item.key}>
    //                         <Link to={item.key}>
    //                             <WindowsOutlined/>
    //                           <span>{item.title}</span>
    //                         </Link>
    //                       </Menu.Item>
    //                     )
    //             }

    //         }else{
    //             // 查找一个与当前请求路径匹配的子Item
    //             const pathname = this.props.location.pathname;
    //             const cItem = item.children.find(cItem=>cItem.key===pathname)
    //             // 如果存在, 说明当前item的子列表需要打开
    //             if (cItem) {
    //                 this.openKey = item.key
    //             }
    //             switch (item.icon) {
    //                 case 'AppstoreOutlined':
    //                     return(
    //                         <SubMenu
    //                         key={item.key}
    //                         title={
    //                         <span>
    //                             <AppstoreOutlined />
    //                             <span>{item.title}</span>
    //                         </span>
    //                         }
    //                     >
    //                         {this.getMenuNodes(item.children)}
    //                     </SubMenu>
    //                     )
    //                 case 'AreaChartOutlined':
    //                     return(
    //                         <SubMenu
    //                         key={item.key}
    //                         title={
    //                         <span>
    //                             <AreaChartOutlined />
    //                             <span>{item.title}</span>
    //                         </span>
    //                         }
    //                     >
    //                         {this.getMenuNodes(item.children)}
    //                     </SubMenu>
    //                     )
    //                 default:
    //                     break;
    //             }

    //         }
    //     })
    // }
    hasAuth = (item) => {
        /**
         1. 用户都可以看到首页，设置为isPublic
         2. 超级管理员，可以看到所有权限，username为'admin'
         3. 当前用户包括的role
         */
        const { user } = memoryUtils
        const { username, role } = user
        const menus = role.menus
        if (username === 'admin' || item.isPublic || menus.indexOf(item.key) !== -1) {
            // menus中能找到item.key即可
            return true
        } else if (item.children) {
            // 但是有的可能有二级路由，而一级路由的menus没有包含item.key，而应该在item.children中找
            return !!item.children.find(cItem => menus.indexOf(cItem.key) !== -1)
        }
    }

    getMenuNodes = (menuList) => {
        return menuList.map((item) => {
            // 查找一个与当前请求路径匹配的子Item
            const pathname = this.props.location.pathname;
            // 满足条件才能拿到item
            if (this.hasAuth(item)) {
                if (!item.children) {
                    // 判断item是否是当前对应的item
                    if (item.key === pathname || pathname.indexOf(item.key) === 0) {
                        // 更新redux中的headerTitle状态
                        this.props.setTitle(item.title)
                    }
                    return (
                        <Menu.Item key={item.key}>
                            <Link to={item.key} onClick={()=>this.props.setTitle(item.title)}>
                                <item.icon1 />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {

                    // const cItem = item.children.find(cItem=>cItem.key===pathname)此为精准匹配，
                    //对于/product来说，其子路由/product/details也应该选中
                    const cItem = item.children.find(cItem => pathname.indexOf(cItem.key) === 0)
                    // 如果存在, 说明当前item的子列表需要打开
                    if (cItem) {
                        this.openKey = item.key
                    }
                    return (

                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                                    <item.icon1 />
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {this.getMenuNodes(item.children)}
                        </SubMenu>
                    )
                }

            }

        })
    }
    /*
     在第一次render()之前执行一次
     为第一个render()准备数据(必须同步的)
   */
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }
    render() {
        let pathname = this.props.location.pathname;
        const openKey = this.openKey;
        if (pathname.indexOf("/product") === 0) {
            pathname = "/product"
        }
        return (
            <div className='left-nav'>
                <Link to='/' className='logo-link'>
                    <img src={logo} alt="logo" />
                    <h1>后台服务</h1>
                </Link>
                <Menu
                    // defaultSelectedKeys={['/home']}
                    selectedKeys={[pathname]}
                    defaultOpenKeys={[openKey]}
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
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

export default connect(
    state => ({
        headTitle: state.headTitle
    }),
    {
        setTitle
    }
)(withRouter(LeftNav))