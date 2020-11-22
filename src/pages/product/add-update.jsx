/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Cascader,
    Button,
    message
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../components/link-button/link-button'
import { reqCategorys } from '../../api/index'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
import { reqAddOrUpdateProduct } from '../../api'

const { Item } = Form
const { TextArea } = Input

export default class AddUpdate extends Component {

    state = {
        options: [],
    }
    constructor(props) {
        super(props)

        this.formRef = React.createRef()
        // 创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
        this.editor = React.createRef()
    }
    validatePrice = (rule, value) => {
        if (value * 1 >= 0) {
            // 通过
            return Promise.resolve();
        }
        // 拒绝并提示
        return Promise.reject('价格必须大于0!')
    }
    submit = () => {
        const form = this.formRef.current
        form.validateFields(['name', 'desc', 'price', 'categoryIds']).then(async (values) => {
            console.log("validateFields", values)
            
            // 1. 收集数据, 并封装成product对象
            const { name, desc, price, categoryIds } = values
            let pCategoryId, categoryId
            if (categoryIds.length === 1) {
                pCategoryId = '0'
                categoryId = categoryIds[0]
            } else {
                pCategoryId = categoryIds[0]
                categoryId = categoryIds[1]
            }

            const imgs = this.pw.current.getImgs()// 使用pw容器对象中<PicturesWall/>组件的函数
            const detail = this.editor.current.getDetail()// 使用pw容器对象中<PicturesWall/>组件的函数

            const product = { name, desc, price, imgs, detail, pCategoryId, categoryId }
            console.log("product",product)
            // 如果是更新, 需要添加_id
            if (this.isUpdate) {
                product._id = this.product._id
            }

            // 2. 调用接口请求函数去添加/更新
            const result = await reqAddOrUpdateProduct(product)

            // 3. 根据结果提示
            if (result.status === 0) {
                message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
                this.props.history.goBack()
            } else {
                message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
            }

        })
    }
    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;

        // 获取二级列表
        const subCategorys = await this.getCategorys(targetOption.value)// 当前选中一级列表的id
        // 获取二级列表成功
        targetOption.loading = false;
        if (subCategorys && subCategorys.length > 0) {
            // 如果有二级分类，且二级分类不为空,
            const childOptions = subCategorys.map(c => (
                {
                    label: c.name,
                    value: c._id,
                    isLeaf: true
                }
            ))
            targetOption.children = childOptions
        } else {
            // 没有二级分类,应该设置为true，否则会再次请求，一级分类就无法选中
            targetOption.isLeaf = true
        }
        this.setState({
            options: [...this.state.options],
        })
    };
    initOptions = async (categorys) => {
        const options = categorys.map(c =>
            ({
                value: c._id,
                label: c.name,
                isLeaf: false
            })
        )
        // 如果是二级分类的更新
        const { isUpdate, product } = this
        const { pCategoryId } = product
        if (isUpdate && pCategoryId !== '0') {
            // 如果是更新，而且有二级分类，要获取一下二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            // 如果有二级分类，且二级分类不为空,
            const childOptions = subCategorys.map(c => (
                {
                    label: c.name,
                    value: c._id,
                    isLeaf: true
                }
            ))
            // 找到关联的option,此时targetOption指向的内存地址为某一个option的地址，如果是append的，那么options也会改变，赋值options不会改变
            const targetOption = options.find(option => option.value === pCategoryId)
            // 将childoptions关联到对应option上
            targetOption.children = childOptions
        }
        // 更新state
        this.setState({
            options
        })
    }
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)
        if (result.status === 0) {
            const categorys = result.data
            // 如果是一级分类列表
            if (parentId === '0') {
                this.initOptions(categorys)
            } else {
                // 是二级分类列表
                return categorys // 返回二级列表 ==> 当前async函数返回的promsie就会成功且value为categorys
            }
        }
    }

    componentWillMount() {
        // 取出location携带的product信息，如果是添加商品product没有值，否则有值
        const product = this.props.location.state
        // debugger
        // 保存是否为更新的标识
        this.isUpdate = !!product
        this.product = product || {}
    }

    componentDidMount() {
        this.getCategorys("0")
    }
    render() {
        const { isUpdate, product } = this
        const { pCategoryId, categoryId, imgs, detail } = product
        const categoryIds = []
        // 用来接收级联分组的id
        if (isUpdate) {
            // 如果是一级分类的商品
            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                // 如果是二级分类的商品
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }

        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        }

        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined />
                </LinkButton>
                <span style={{ marginLeft: 10 }}>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )

        return (
            <Card title={title}>
                <Form
                    {...layout}
                    ref={this.formRef}
                    initialValues={{ 'name': product.name, 'desc': product.desc, 'price': product.price, 'categoryIds': categoryIds }}
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
                        rules={[{ required: true, message: '必须指定商品分类!' }]}
                    >
                        <Cascader
                            placeholder="请输入商品分类"
                            options={this.state.options}
                            loadData={this.loadData}
                        />
                    </Item>
                    <Item label="商品图片：">
                        <PicturesWall ref={this.pw} imgs={imgs} />
                    </Item>
                    <Item label="商品详情：" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
                        <RichTextEditor ref={this.editor} detail={detail} />
                    </Item>
                    <Item >
                        <Button type="primary" onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

/*
1. 子组件调用父组件的方法: 将父组件的方法以函数属性的形式传递给子组件, 子组件就可以调用
2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象), 调用其方法
 */

/*
使用ref
1. 创建ref容器: thi.pw = React.createRef()
2. 将ref容器交给需要获取的标签元素: <PictureWall ref={this.pw} />
3. 通过ref容器读取标签元素: this.pw.current
 */