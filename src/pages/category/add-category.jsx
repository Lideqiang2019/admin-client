/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import {Select,Form,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item;
const { Option } = Select;

export default class AddCategory extends Component {
    // 通过 Ref 来获取 Form 实例
    formRef = React.createRef()

    static propTypes = {
        categorys:PropTypes.array.isRequired, // 一级分类数组
        parentId:PropTypes.string.isRequired, // 父组件的标识
        setForm:PropTypes.func.isRequired
    } 

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.parentId!=this.props.parentId){
            // 判断是否需要更新Item中的值，如果需要更新，则重新渲染
            this.formRef.current.setFieldsValue({'parentId':nextProps.parentId});
            console.log("parentId对比",nextProps.parentId)
            return true
        }else{
            return false
        }
    }

    componentDidMount () {
        // 将form对象通过setForm()传递父组件
        const form = this.formRef.current
        // 尝试修改每次的修改
        
        // console.log("这是form",form)
        this.props.setForm(form) 
    }

    render() {
        const {categorys,parentId} = this.props 
        // console.log("wode parentID",parentId)
        return (
            <Form
                ref={this.formRef}
                initialValues={{parentId:'0'}}
            >
                <Item name='parentId'>
                    {/* // 如果要动态显示，则看看parentId和Option里的value值是否匹配 */}
                    <Select> 
                        <Option value="0">一级分类</Option>
                        {categorys.map((c)=><Option value={c._id}>{c.name}</Option>)}
                    </Select>
                </Item>
                <Item name='categoryName'>
                    <Input placeholder="请输入分类名称"></Input>
                </Item>
            </Form>
        )
    }
}