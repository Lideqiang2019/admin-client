/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import {
    Card,
    Button
} from 'antd'

export default class Line extends Component {
    state = {
        happyness:[120, 200, 150, 80, 70, 110, 130]
    }
    getOption = (happyness)=>{
        return {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: happyness,
                type: 'line'
            }]
        };
    }
    updateData = ()=>{
        this.setState((state)=>({
            happyness:[...state.happyness].map(h=>h+1)
        }))
    }
    render() {
        const {happyness} = this.state
        const title = (
            <Button type="primary" onClick={this.updateData}>更新</Button>
        )
        return (
            <Card
            title={title}
            >
                <ReactEcharts option={this.getOption(happyness)} />
            </Card>
           
        )
    }
}