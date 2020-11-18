/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import {Select,Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item;
const { Option } = Select;

export default class AddCategory extends Component {
    onFinish = values => {
        console.log('Success:', values);
    };
    render() {
        return (
            <Form
                onFinish={this.onFinish}
            >
                <Item>
                    <Select defaultValue="0">
                        <Option value="0">Jack</Option>
                        <Option value="1">Lucy</Option>
                        <Option value="2">Tom</Option>
                    </Select>
                </Item>
                <Item>
                    <Input placeholder="请输入分类名称"></Input>
                </Item>
            </Form>
        )
    }
}