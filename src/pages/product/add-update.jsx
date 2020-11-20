/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'
import {reqCategorys} from '../../api/index'

const { Item } = Form
const { TextArea } = Input
const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    },
]

export default class AddUpdate extends Component {
    formRef = React.createRef()
    state = {
        options:[],
    }
    validatePrice = (rule, value) => {
        if (value * 1 >= 0) {
            // 通过
            return Promise.resolve();
        }
        // 拒绝并提示
        return Promise.reject('价格必须大于0!')
    }
    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;

        // 获取二级列表
        const subCategorys = await this.getCategorys(targetOption.value)// 当前选中一级列表的id
        // 获取二级列表成功
        targetOption.loading = false;
        if(subCategorys&&subCategorys.length>0){
            // 如果有二级分类，且二级分类不为空,
            const childOptions = subCategorys.map(c=>(
                {
                    label: c.name,
                    value: c._id,
                    isLeaf: true
                }
            ))
            targetOption.children = childOptions
        }else{
            // 没有二级分类
            targetOption.isLeaf = false
        }
        this.setState({
            options: [...this.state.options],
        })
    };
    initOptions = (categorys)=>{
        const options = categorys.map(c=>
            ({
                value: c._id,
                label: c.name,
                isLeaf: false
            })
        )
        // 更新state
        this.setState({
            options
        })
    }
    getCategorys = async (parentId)=>{
        const result = await reqCategorys(parentId)
        if(result.status===0){
            const categorys = result.data
            // 如果是一级分类列表
            if (parentId==='0') {
              this.initOptions(categorys)
            }else{
                // 是二级分类列表
                return categorys // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
            }
        }
    }
    componentDidMount(){
        this.getCategorys("0")
    }
    render() {
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined />
                </LinkButton>
                <span style={{ marginLeft: 10 }}>商品详情</span>
            </span>
        )
        return (
            <Card title={title}>
                <Form
                    {...layout}
                    ref={this.formRef}
                >
                    <Item
                        label="商品名称："
                        name="name"
                        rules={[{ required: true, message: '商品名称必须输入!' }]}
                    >
                        <Input placeholder="请输入商品名称"></Input>
                    </Item>
                    <Item
                        label="商品描述："
                        name="desc"
                        rules={[{ required: true, message: '商品描述必须输入!' }]}
                    >
                        <TextArea
                            placeholder="请输入商品描述"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Item>
                    <Item
                        label="商品价格："
                        name="price"
                        rules={[
                            { required: true, message: '必须输入商品价格' },
                            { validator: this.validatePrice }
                        ]}
                    >
                        <Input type='number' placeholder='请输入商品价格' addonAfter='元' />
                    </Item>
                    <Item
                        label="商品分类："
                        name="categoryIds"
                    >
                        <Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                        />
                    </Item>
                    <Item label="商品图片：">
                        <div>商品图片</div>
                    </Item>
                    <Item label="商品详情：">
                        <div>商品详情</div>
                    </Item>
                    <Item >
                        <Button type="primary">提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}