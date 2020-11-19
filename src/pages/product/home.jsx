/*
商品主页
*/
import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message
} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api/index'
import LinkButton from '../../components/link-button/link-button'
import {PAGE_SIZE} from '../../utils/constants'
import "./product.less"

const { Option } = Select;
export default class ProductHome extends Component {
    state = {
        loading:false,
        products:[], // 商品的数组
        total:0, //总页数
        searchName:'',//搜索关键字
        searchType:'productName',//搜索类型
    }
    initColums = ()=>{
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
                // width: '75%'
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
                // width: '75%'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => "¥" + price
            },
            {
                title: '操作',
                width:100,
                // dataIndex: 'status',
                render: (product) => {
                    const {status,_id} = product
                    const newStatus = status===1?2:1
                    return(
                        <span>
                            <Button 
                            type="primary"
                            onClick={()=>this.updateStatus(_id,newStatus)}
                            >{status===1?'上架':'下架'}</Button>
                            <span>{status===1?'在售':'已下架'}</span>
                        </span>
                    )
                }
            },
            {
                title: '状态',
                width:100,
                render: (product) => {
                    return(
                        <span>
                            <LinkButton onClick={()=>this.props.history.push('/product/details',{product})}>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            },
            

        ];
    }

    updateStatus = async (productId, status)=>{
        const result = await reqUpdateStatus(productId,status)
        if(result.status===0){
            message.success("更新商品状态成功")
            this.getProducts(this.pageNum)
        }

    }

    getProducts = async (pageNum)=>{
        this.pageNum = pageNum // 保存pageNum, 让其它方法可以看到
        this.setState({loading:true}) // 正在加载
        const {searchName,searchType} = this.state
        let result;
        if(searchName){
            // 如果有要搜索的内容
            result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
            // console.log("result",result)
            // debugger
        }else{
            result = await reqProducts(pageNum,PAGE_SIZE)
        }
        this.setState({loading:false}) // 加载成功
        if(result.status===0){
            const {list,total} = result.data
            this.setState({products:list,total:total})
        }
    }

    componentWillMount(){
        this.initColums()
    }

    componentDidMount(){
        // 发送请求
        this.getProducts(1)
    }

    render() {
        const {products,loading,total,searchName,searchType} = this.state
        const title = (
            <span>
                <Select 
                value={searchType}
                style={{width:'150px'}}
                onChange={value=>this.setState({searchType:value})}
                >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="ProductDesc">按描述搜索</Option>
                </Select>
                <Input 
                style={{width:'150px',margin:"0 15px"}} 
                value={searchName}
                onChange={e=>this.setState({searchName:e.target.value})}
                ></Input>
                <Button type="primary" onClick={()=>this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary'>
                <PlusOutlined/>
                添加商品
            </Button>
        )

        return (
            <Card
                title={title}
                extra={extra}
            >
                <Table
                    rowKey='_id'
                    columns={this.columns}
                    bordered
                    loading={loading}
                    dataSource={products}
                    
                    pagination={{ 
                        total:total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange:this.getProducts
                    }}
                />
            </Card>
        )
    }
}