/*
用户登陆的路由组件
*/
import React, { Component } from 'react'

import { Button, Card, Table, message, Modal } from 'antd'

import { PAGE_SIZE } from '../../utils/constants'
import LinkButton from '../../components/link-button/link-button'
import {formateTime} from '../../utils/dateUtils'
import {reqUserList} from '../../api'
import UserForm from './user-form'

export default class User extends Component {
    state = {
        users:[],
        showState:false,
        loading:false,
        roles:[]
    }
    initColumns = ()=>{
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: formateTime
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id)=>this.roleNames[role_id]
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdateUser(user)}>修改</LinkButton>
                        <LinkButton onClick={() => this.showDeleteUser(user)}>删除</LinkButton>
                    </span>
                )  
            },

        ];
    }
    /*
  根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
   */
    initRoles = (roles)=>{
        this.roleNames = roles.reduce((pre,role)=>{
            pre[role._id] = role.name
            return pre
        },{})
        console.log("roleNames",this.roleNames)
    }
    showUpdateUser = ()=>{
        console.log("更新用户")
        this.setState({
            showState:true
        })
    }

    showDeleteUser = ()=>{
        console.log("删除用户")
    }

    addOrUpdateUser = ()=>{
        console.log("addOrUpdateUser()")
    }

    getUsers = async ()=>{
        this.setState({loading:true})
        const result = await reqUserList()
        this.setState({loading:false})
        // console.log("userList",result)
        if(result.status===0){
            const {users,roles} = result.data
            this.initRoles(roles)
            this.setState({
                users,roles
            })
        }
        
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount(){
        this.getUsers()
    }

    render() {
        const {users,showState,loading} = this.state
        // debugger
        const title = (
            <Button type="primary" onClick={()=>this.setState({showState:true})}>添加用户</Button>
        )
        return (
            <Card title={title}>
                <Table
                    rowKey='_id'
                    columns={this.columns}
                    bordered
                    loading={loading}
                    dataSource={users}
                    pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
                />
                <Modal
                    title="一级分类"
                    visible={showState}
                    onOk={this.addOrUpdateUser}
                    onCancel={()=>this.setState({showState:false})}
                >
                    <UserForm/>

                </Modal>
            </Card>
        )
    }
}