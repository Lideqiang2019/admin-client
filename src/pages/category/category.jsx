/*
商品品类管理
*/
import React, { Component } from 'react'
import {Button,Card,Table} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'
export default class Category extends Component {
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

        const dataSource = [
            {
              key: '1',
              name: '胡彦斌',
            
            },
          ];
          
          const columns = [
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

        return (
            <Card title={title} extra={extra}>
                <Table 
                dataSource={dataSource}
                columns={columns}
                bordered
                />;
            </Card>
           
        )
    }
}