/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'

const Item = Form.Item;

const { TreeNode } = Tree;

export default class UpdateRole extends Component {
    // 通过 Ref 来获取 Form 实例
    // 同样的，你可以不使用createRef()方法而用this.refs.XXX也可以
    // formRef = React.createRef()

    static propTypes = {
        role: PropTypes.object
    }

    constructor(props){
        super(props)

        const {menus} = this.props.role

        this.state = {
            checkedKeys:menus
        }
    }

    getMenus = (menuList)=>{
        return menuList.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children?this.getMenus(item.children):null}
                </TreeNode>
            )
            return pre
        },[])
    }

    getAuth = ()=>this.state.checkedKeys

    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    componentWillMount(){
        this.menuTreeNodes = this.getMenus(menuList)
    }
    /*
    在render之前调用，只有props发生改变时才调用，因为点击取消的时候，
    并不会重新刷新组件，只是重新render一下，而且render似乎没有必要，考虑用shouldComponetUpdate优化
     */
    
    UNSAFE_componentWillReceiveProps(nextProps){
        // console.log(" UNSAFE_componentWillReceiveProps",nextProps)
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys:menus
        })
    }

    render() {
        const { role } = this.props
        // debugger
        const {checkedKeys} = this.state
        return (
            <div>
                <Item
                    label='角色名称'
                >
                    <Input value={role.name} disabled></Input>
                </Item>
                <Item>
                    <Tree
                        checkable
                        defaultExpandAll
                        checkedKeys={checkedKeys}
                        onCheck = {this.onCheck}
                    >
                        {this.menuTreeNodes}
                    </Tree>
                </Item>
            </div>
        )
    }
}

