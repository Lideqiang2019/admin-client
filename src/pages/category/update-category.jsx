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

    componentDidMount () {
        // 将form对象通过setForm()传递父组件
        const form = this.formRef.current
        // 尝试修改每次的修改
        
        // console.log("这是form",form)
        this.props.setForm(form) 
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.categoryName!=this.props.categoryName){
            // console.log("应该更新一下")
            // console.log("props",nextProps)
            // const {categoryName} = this.props
            // console.log("分类",categoryName)
            this.formRef.current.setFieldsValue({'categoryName':nextProps.categoryName});
            return true
        }else{
            return false
        }
   }
    
    render() {
        const {categoryName} = this.props
        
        return (
            <Form
            ref={this.formRef}
            initialValues={ {'categoryName':categoryName}}
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
                    ></Input>
                </Item>
            </Form>
        )
    }
}

