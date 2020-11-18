/*
商品品类管理
*/
import React, { Component } from 'react'
import {Button,Card,Table,message,Modal} from 'antd'
import {PlusOutlined,ArrowRightOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'
import {reqCategory,reqAddCategory,reqUpdateCategory} from '../../api/index'
import AddCategory from './add-category'
import UpdateCategory from './update-category'

export default class Category extends Component {
    state = {
        loading: false, // 是否正在获取数据中
        categorys:[],
        subCategorys:[],
        parentId: '0', // 当前需要显示的分类列表的父分类ID
        parentName:'', // 当前需要显示的分类列表的父分类名称
        showState:0 // 0都不显示,1显示添加一级分类，2显示添加二级分类
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
                render:(category)=>(
                  <span>
                      <LinkButton onClick={()=>this.showAddSubCatory(category)}>修改分类</LinkButton>
                      {this.state.parentId==='0'?<LinkButton onClick={()=>this.showSubCategorys(category)}>查看子分类</LinkButton>:null}
                      
                  </span>
              )
              },
           
        ];
        
    }

    /*
    异步获取一级/二级分类列表显示
    parentId: 如果没有指定根据状态中的parentId请求, 如果指定了根据指定的请求
    */
    getCategorys = async ()=>{
         // 在发请求前, 显示loading
        this.setState({
            loading:true
        })
        const {parentId} = this.state
        const result = await reqCategory(parentId)
        // 在请求完成后, 隐藏loading
        this.setState({loading: false})
        console.log("parentId",parentId)
        if(result.status===0){
            // 取出分类数组(可能是一级也可能二级的)
            const categorys = result.data
            if(parentId==='0'){
                // 父分类
                this.setState({categorys:categorys})
            }else{
                // debugger
                this.setState({subCategorys:categorys}) 
            }
        }else{
            message.error("获取分类列表失败")
        }
    }
    /*
     显示指定一级分类对象的二子列表
   */
    showSubCategorys = (category)=>{
        // 更新状态
        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{// 在状态更新且重新render()后执行
            this.getCategorys()
            // setState()不能立即获取最新的状态: 因为setState()是异步更新状态的
            console.log("state",this.state)
        })

    }

    showCategorys = ()=>{
        // 显示父列表
        this.setState({
            parentId:'0',
            subCategorys:[],
            parentName:''
        })
    }

    addCategory = ()=>{
        console.log("addCategory()")
    }

    updateSubCategory= async ()=>{
        console.log("updateSubCategory()")
        console.log("form",this.form)
        const values = await this.form.validateFields(['categoryName'])
        console.log("取出来表单的value",values)
        // 1. 隐藏确定框
        this.setState({
            showState: 0
        })

        // 准备数据
        const categoryId = this.category._id
        const {categoryName} = values || ''
        // 清除输入数据
        this.form.resetFields()

        // 2. 发请求更新分类
        const result = await reqUpdateCategory(categoryId, categoryName)
        if (result.status===0) {
        // 3. 重新显示列表
            console.log("成功了",result)
            this.getCategorys()
        }

    }

    showAdd = ()=>{
        this.setState({showState:1})
    }

    showAddSubCatory = (category)=>{
        // 将category交给this
        this.category = category
        // 更新状态显示
        this.setState({showState:2})
    }

    handleCancel =()=>{
        this.setState({showState:0})
    }

    componentWillMount(){
        this.initColums()
    }

    componentDidMount(){
        this.getCategorys()
    }

    render() {
        const {categorys,loading,subCategorys,parentId,parentName,showState} = this.state
        // 读取指定的分类
        const category = this.category || {} // 如果还没有指定一个空对象

        const title = parentId==='0'?"一级分类列表":(
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <ArrowRightOutlined />
                <span>{parentName}</span>
            </span>  
        )
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <span>
                    <PlusOutlined />
                    添加
                </span>
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                rowKey='_id'
                columns={this.columns}
                bordered
                loading={loading}
                dataSource={parentId==='0' ? categorys : subCategorys}
                pagination={{defaultPageSize: 5, showQuickJumper: true}}
                />;
                <Modal
                    title="一级分类"
                    visible={showState===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddCategory/>
                    
                </Modal>

                <Modal
                    title="更新分类"
                    visible={showState===2}
                    onOk={this.updateSubCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateCategory 
                    categoryName={category.name}
                    setForm={(form) => {this.form = form}}
                    />
                </Modal>
           
            </Card>
             
        )
    }
}