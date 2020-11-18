/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'


const Item = Form.Item;

export default class UpdateCategory extends Component {
    // 通过 Ref 来获取 Form 实例
    // 同样的，你可以不使用createRef()方法而用this.refs.XXX也可以
    formRef = React.createRef()
    static propTypes = {
        categoryName:PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    state={
        categoryName:'非'
    }

    getValidateValues= async () => {
        const form = this.formRef.current
        console.log("form",form)
        console.log(form.getFieldValue("categoryName"))
        // 使用 validateFields 获取验证后字段值
        try {
          const values = await form.validateFields(['categoryName'])
          console.log(values)
        } catch (err) {
          console.log(err)
        }
    }

    resetValues = ()=>{
        const form = this.formRef.current
        // console.log("执行reset",form)
        form.resetFields()
    }

    updateInput=(e)=>{
        const categoryName = e.target.value;
        this.setState({categoryName})
    }

    componentDidMount () {
        // 将form对象通过setForm()传递父组件
        const form = this.formRef.current
        // console.log("这是form",form)
        this.props.setForm(form)
    }
    
    render() {
        const {categoryName} = this.props
        console.log("分类",categoryName)
        return (
            <Form
            ref={this.formRef}
            // initialValues={ {'categoryName':categoryName}}
            >
                <Item
                name='categoryName'
                // initialValue={categoryName}
                rules={[
                    {required: true, message: '分类名称必须输入'}
                ]}
                noStyle
                >
                    <Input placeholder="请输入分类名称" 
                    value={this.state.categoryName}
                    onChange={this.updateInput} 
                    ></Input>
                </Item>
                {/* <Item>
                    <Button type='link' onClick={this.getValidateValues}>非 Submit 方式（验证）</Button>
                    <Button type='link' onClick={this.resetValues}>重置</Button>
                </Item> */}
            </Form>
        )
    }
}

