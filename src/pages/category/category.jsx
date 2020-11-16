/*
商品品类管理
*/
import React, { Component } from 'react'
import {Button,Card,Table,message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'
import {reqCategory,reqAddCategory,reqUpdateCategory} from '../../api/index'

export default class Category extends Component {
    state = {
        loading: false, // 是否正在获取数据中
        categorys:[],
        parentId: '0', // 当前需要显示的分类列表的父分类ID
    }
    initColums = ()=>{
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
              key: 'name',
              width:'75%'
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render:()=>(
                  <span>
                      <LinkButton>修改分类</LinkButton>
                      <LinkButton>查看子分类</LinkButton>
                  </span>
              )
              },
           
        ];
        
    }

    /*
    异步获取一级/二级分类列表显示
    parentId: 如果没有指定根据状态中的parentId请求, 如果指定了根据指定的请求
    */
    getCategorys = async (parentId)=>{
        const _parentId = parentId || this.state.parentId
        const result = await reqCategory(_parentId)

        if(result.status===0){
            const categorys = result.data
            this.setState({categorys})
        }else{
            message.error("获取分类列表失败")
        }
    }

    componentWillMount(){
        this.initColums()
    }

    componentDidMount(){
        this.getCategorys()
    }
    render() {
        const title = "一级分类列表"
        const extra = (
            <Button type='primary'>
                <span>
                    <PlusOutlined />
                    添加
                </span>
            </Button>
        )
        const {categorys} = this.state
        return (
            <Card title={title} extra={extra}>
                <Table 
                dataSource={categorys}
                columns={this.columns}
                bordered
                />;
            </Card>
           
        )
    }
}