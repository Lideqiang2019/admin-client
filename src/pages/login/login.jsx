/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../api/index';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils'
import './login.less'
import logo from '../../assets/images/logo.png'

export default class Login extends Component {
    onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const {username,password} = values;
        // const result = reqLogin(username,password).then(response=>{
        //     console.log(response)
        //     // if(result.status===0){
        //     //     // 提示登录成功
        //     //     message.success("登录成功")
        //     //     console.log("看看这个是什么")
        //     //     // 跳转到管理界面 (不需要再回退回到登陆)
        //     //     this.props.history.replace('/')
        //     // }else{
        //     //     message.error("登录失败")
        //     // }
        // })
        // 注意：改了package.json配置一定要重启项目，否则会报错
        const result = await reqLogin(username,password)
        // console.log("result",result)
        if(result.status===0){
            // 提示登录成功
            message.success("登录成功")
            // 保存登录状态
            memoryUtils.user = result.data;
            storageUtils.saveUser(result.data); 
            //保存到localstorage
            // 跳转到管理界面 (不需要再回退回到登陆)
            this.props.history.replace('/')
        }else{
            message.error(result.msg)
        }
        
      };
    render() {
        const user = memoryUtils.user;
        if(user&&user._id){
            return <Redirect to='/'></Redirect>
        }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt='logo'></img>
                    <h1>React 项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' },
                            { min: 4, message: '用户名必须大于4!' },
                            { max: 16, message: '用户名必须小于8!' },
                            { pattern: /^[a-zA-Z_0-9]+$/, message: '用户名必须是英文、数组或者下划线组成!' },
                        ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.5)'}}/>} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.5)'}}/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}