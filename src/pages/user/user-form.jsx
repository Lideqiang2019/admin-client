import React from 'react';
import {
    Select,
    Form,
    Input,
} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const { Option } = Select

export default class UserForm extends React.Component {
    constructor(props) {
        super(props)

        this.formRef = React.createRef()
    }
    static propTypes = {
        roles: PropTypes.array.isRequired,
        user: PropTypes.object,
        setForm: PropTypes.func.isRequired
    }
    componentDidMount() {
        // 将form对象通过setForm()传递父组件
        const form = this.formRef.current
        // 尝试修改每次的修改

        // console.log("这是form",form)
        this.props.setForm(form)
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.user!=this.props.user){
            // console.log("应该更新一下")
            // console.log("props",nextProps.user)
            // const {categoryName} = this.props
            // console.log("分类",categoryName)
            this.formRef.current.setFieldsValue({'username': nextProps.user.username, 'phone': nextProps.user.phone,
             'email': nextProps.user.email, 'role_id': nextProps.user.role_id });
            return true
        }else{
            return false
        }
   }

    render() {
        const { roles} = this.props
        const user = this.props.user
        console.log("user",user)
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 20 },
        };
        return (
            <Form
                {...layout}
                ref={this.formRef}
                initialValues={{ 'username': user.username, 'phone': user.phone, 'email': user.email, 'role_id': user.role_id }}
            >
                <Item label="用户名" name="username">
                    <Input placeholder="请输入用户名"></Input>
                </Item>
                {
                    user._id ? null : <Item label="密码" name="password">
                        <Input placeholder="请输入密码"></Input>
                    </Item>
                }

                <Item label="手机号" name="phone">
                    <Input placeholder="请输入手机号"></Input>
                </Item>
                <Item label="邮箱" name="email">
                    <Input placeholder="请输入邮箱"></Input>
                </Item>
                <Item label="角色" name="role_id">
                    <Select placeholder="请选择角色">
                        {roles.map(role => (
                            <Option value={role._id} key={role._id}>{role.name}</Option>
                        ))}
                    </Select>
                </Item>
            </Form>
        )
    }
}