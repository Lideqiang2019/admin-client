/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import {Select,Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item;
const { Option } = Select;

export default class AddRole extends Component {
    // 通过 Ref 来获取 Form 实例
    constructor(props){
        super(props)

        this.formRef = React.createRef()
    }
    

    static propTypes = {
        setForm:PropTypes.func.isRequired
    } 

    // shouldComponentUpdate(nextProps,nextState){
    //     if(nextProps.parentId!=this.props.parentId){
    //         // 判断是否需要更新Item中的值，如果需要更新，则重新渲染
    //         this.formRef.current.setFieldsValue({'parentId':nextProps.parentId});
    //         console.log("parentId对比",nextProps.parentId)
    //         return true
    //     }else{
    //         return false
    //     }
    // }

    componentDidMount () {
        // 将form对象通过setForm()传递父组件
        const form = this.formRef.current
        // 尝试修改每次的修改
        
        // console.log("这是form",form)
        this.props.setForm(form) 
    }

    render() {
        // const {categorys,parentId} = this.props 
        // console.log("wode parentID",parentId)
        return (
            <Form
                ref={this.formRef}
                // initialValues={{parentId:'0'}}
            >
                <Item 
                name='roleName'
                label='角色名称'
                rules={[
                    {required: true, message: '角色名称必须输入'}
                ]}
                >
                    <Input placeholder="请输入角色名称"></Input>
                </Item>
            </Form>
        )
    }
}