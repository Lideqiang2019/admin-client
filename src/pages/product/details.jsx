/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import {Card,List,} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'
import {BASE_IMG_URL} from '../../utils/constants'
import {reqCategory} from '../../api'

const Item = List.Item

export default class Details extends Component {
    state = {
        cName1: '', // 一级分类名称
        cName2: '', // 二级分类名称
    }
    
    async componentDidMount(){ // 也可以自己定义函数
        // 得到当前商品的分类ID
        const {pCategoryId,categoryId} = this.props.location.state.product
        if(pCategoryId==='0'){ // 如果是一级分类下的商品
            const result = await reqCategory(categoryId)
            // debugger
            const cName1 = result.data.name
            this.setState({cName1})
        }else{
            // 在普通商品下的分类
             /*
                //通过多个await方式发多个请求: 后面一个请求是在前一个请求成功返回之后才发送
                const result1 = await reqCategory(pCategoryId) // 获取一级分类列表
                const result2 = await reqCategory(categoryId) // 获取二级分类
                const cName1 = result1.data.name
                const cName2 = result2.data.name
                */
               // 一次性发送多个请求, 只有都成功了, 才正常处理
            const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({cName1,cName2})
        }
        
    }
    render() {
        const {name,desc,price,imgs,detail} = this.props.location.state.product
        const {cName1,cName2} = this.state
        const title=(
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                    <ArrowLeftOutlined />
                </LinkButton>
                <span style={{marginLeft:10}}>商品详情</span>
            </span>
        )
        return (
            <Card
            title={title}
            className="product-details"
            >
                <List>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>{cName1}{cName2?('-->'+cName2):''}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片：</span>
                        {
                            imgs.map((img,key)=>
                                <img
                                key={key} 
                                src={BASE_IMG_URL+img} 
                                alt="img"
                                className="img"
                                />
                            )
                        }
                        
                    </Item>
                    <Item>
                        <span className="left">商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}></span>
                    </Item>
                </List>
    
            </Card>
        )
    }
}