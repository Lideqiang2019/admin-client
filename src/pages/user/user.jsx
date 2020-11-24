/*
用户登陆的路由组件
*/
import React, { Component } from 'react'

import { Button, Card, Table, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PAGE_SIZE } from '../../utils/constants'
import LinkButton from '../../components/link-button/link-button'
import { formateTime } from '../../utils/dateUtils'
import { reqUserList, reqDelelteUser, reqAddUser, reqAddOrUpdateUser } from '../../api'
import UserForm from './user-form'

export default class User extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            showState: false,
            loading: false,
            roles: []
        }
    }

    initColumns = () => {
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
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdateUser(user)}>修改</LinkButton>
                        <LinkButton onClick={() => this.DeleteUser(user)}>删除</LinkButton>
                    </span>
                )
            },

        ];
    }
    /*
  根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
   */
    initRoles = (roles) => {
        this.roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
        console.log("roleNames", this.roleNames)
    }
    showUpdateUser = (user) => {
        this.user = user
        // console.log("更新用户")
        this.setState({
            showState: true
        })
    }

    addOrUpdateUser = () => {
        // console.log("addOrUpdateUser()")
        // 收集数据
        this.form.validateFields().then(async (user) => {
            // console.log('values',values)
            // const {username,password,email,phone,role_id} = values
            // 如果是更新, 需要给user指定_id属性
            if (this.user) {
                user._id = this.user._id
            }
            const result = await reqAddOrUpdateUser(user)
            this.setState({ showState: false })
            if (result.status === 0) {
                message.success(`${this.user ? '修改' : '添加'}用户成功`)
                this.getUsers()
            } else {
                message.error(result.msg)
            }
        })
    }

    getUsers = async () => {
        this.setState({ loading: true })
        const result = await reqUserList()
        this.setState({ loading: false })
        console.log("userList", result)
        if (result.status === 0) {
            const { users, roles } = result.data
            this.initRoles(roles)
            this.setState({
                users, roles
            })
        }

    }

    DeleteUser = (user) => {
        Modal.confirm({
            title: `删除用户${user.username}吗？`,
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                const { _id } = user
                const result = await reqDelelteUser(_id)
                if (result.status === 0) {
                    console.log("result", result)
                    message.success("删除用户成功")
                    this.getUsers()
                }
            }
        });
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        const { users, showState, loading, roles } = this.state
        const user = this.user || {}
        // debugger
        const title = (
            <Button type="primary" onClick={() => {
                this.user = null
                this.setState({
                    showState: true
                })
            }}
            >添加用户</Button>
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
                    title={user._id ? '更改用户' : '添加用户'}
                    visible={showState}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => this.setState({ showState: false })}
                >
                    <UserForm ref={this.formRef} roles={roles} user={user} setForm={(form) => { this.form = form }} />
                </Modal>
            </Card>
        )
    }
}