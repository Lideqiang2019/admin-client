import React from 'react';
import {
    Select,
    Form,
    Input
} from 'antd'

const Item = Form.Item
const {Option} = Select

export default class UserForm extends React.Component{
    render(){
        return (
            <Form>
                <Item label="用户名" name="username">
                    <Input></Input>
                </Item>
                <Item label="密码" name="password">
                    <Input></Input>
                </Item>
                <Item label="手机号" name="phone">
                    <Input></Input>
                </Item>
                <Item label="邮箱" name="email">
                    <Input></Input>
                </Item>
                <Item label="角色" name="role_id">
                    <Select>
                        <Option>管理员</Option>
                    </Select>
                </Item>
            </Form>
        )
    }
}