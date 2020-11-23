/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import {reqRoles} from '../../api'
import AddRole from './add-form'
import UpdateRole from './update-form'
import {reqAddRole,reqUpdateRole} from '../../api'
import {formateTime} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils' 

export default class Role extends Component {
    
    constructor(props){
        super(props)
        
        this.auth = React.createRef()

        this.state = {
            roles: [],// 空的用户角色
            role:{},// 当前选中
            isShowAdd: false,
            isShowUpdate:false
        }

    }
    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: (create_time) => formateTime(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: formateTime
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            },
        ]
    }

    onRow = (role)=>{
        return{
            onClick: event => {
                // console.log('row onClick()', role)
                this.setState({role})
            }, // 点击行
        } 
    }

    getRoles = async ()=>{
        const result = await reqRoles()
        if(result.status===0){
            // 请求成功
            this.setState({
                roles:result.data
            })
        }
    }
    
    handleCancel = () => {
        this.setState({ isShowAdd:false })
         // 清除上次的表单数据
         this.form.resetFields()
    }

    addRole = async () => {
        // console.log("addRole()")
        this.form.validateFields(['roleName']).then(async (values) => {
            // 准备数据
            const {roleName} = values
            // console.log("roleName",roleName)
            // 清除上次的表单数据
            this.form.resetFields()
            // 发送请求
            const result = await reqAddRole(roleName)
            // 请求成功，更新
            this.setState({isShowAdd:false})
            if(result.status===0){
                message.success("添加用户角色成功！")
                // this.getRoles()
                const role = result.data
                this.setState(preState=>({
                    roles:[...preState.roles,role]
                }))
            }else{
                message.success("添加用户角色失败！")
            }
        })
    }
    updateRole = async ()=>{
        console.log("updateRole()")
        const menus = this.auth.current.getAuth()
        // console.log("meunys",menus)
        this.setState({isShowUpdate:false})

        const role = this.state.role
        role.menus = menus
        role.auth_time = new Date()
        role.auth_name = memoryUtils.user.username

        const result = await reqUpdateRole(role)
        if(result.status===0){
            message.success("更新用户权限成功！")
        }else{
            message.error("更新用户权限失败！")
        }
    }

    componentWillMount() {
        this.initColumns()
    }
    componentDidMount(){
        this.getRoles()
    }
    render() {
        const { roles,role,isShowAdd ,isShowUpdate} = this.state
        const title = (
            <span>
                <Button type="primary" onClick={()=>this.setState({isShowAdd:true})}>创建角色</Button>&nbsp;&nbsp;
                <Button type="primary" disabled={!role._id} onClick={()=>this.setState({isShowUpdate:true})}>设置角色权限</Button>
            </span>
        )
        return (
            <Card
                title={title}
            >
                <Table
                    rowKey='_id'
                    columns={this.columns}
                    bordered
                    dataSource={roles}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys:[role._id]
                    }}
                    onRow={this.onRow}
                    pagination={{ defaultPageSize: PAGE_SIZE }}
                />
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={this.handleCancel}>
                    <AddRole setForm={(form)=>this.form = form}/>
                </Modal>
                <Modal
                    title="修改角色"
                    visible={isShowUpdate}
                    onOk={this.updateRole}
                    onCancel={()=>{
                        this.setState({isShowUpdate:false})
                    }}>
                    <UpdateRole role={role} ref={this.auth}/>
                </Modal>
            </Card>
        )
    }
}