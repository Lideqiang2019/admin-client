/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductHome from './home'
import AddUpdate from './add-update'
import Details from './details'

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductHome} exact></Route>
                <Route path='/product/addupdate' component={AddUpdate}></Route>
                <Route path='/product/details' component={Details}></Route>
                <Redirect to='/product'></Redirect>
            </Switch>
        )
    }
}