/*
用户登陆的路由组件
*/
import React, { Component } from 'react'
import './index.less'
import Line from './line'
import Bar from './bar'
import {
    Card,
    Statistic,
    Timeline,
    DatePicker
} from 'antd'
import moment from 'moment';

import { ArrowUpOutlined, ArrowDownOutlined, QuestionCircleOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
export default class Home extends Component {
    state = {
        isVisited: true
    }
    handleChange = (isVisited) => {
        return () => this.setState({isVisited})
    }
    render() {
        const { isVisited } = this.state
        return (
            <div className="home">
                <Card
                    className="home-card"
                    title="商品总量"
                    extra={<QuestionCircleOutlined />}
                    style={{ width: 250, height: 300 }}>
                    <Statistic
                        value={11}
                        precision={0}
                        valueStyle={{ color: '#000000' }}
                        prefix={"总体趋势"}
                        suffix={<div>%<ArrowUpOutlined /></div>}
                    />
                    <Statistic
                        title="Active"
                        value={11.28}

                        precision={2}
                        valueStyle={{ color: '#3f8600', fontSize: 15 }}
                        prefix="周同比"
                        suffix={<div>%<ArrowUpOutlined /></div>}
                    />
                    <Statistic
                        title="Idle"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322', fontSize: 15 }}
                        prefix="周同比"
                        suffix={<div>%<ArrowDownOutlined /></div>}
                    />
                </Card>
                <Line />

                <Card
                    className='home-content'
                    title={
                        <div className="home-menu">
                            <span className={isVisited ? "home-menu-active home-menu-visited" : 'home-menu-visited'}
                                onClick={this.handleChange(true)}>访问量</span>
                            <span className={isVisited ? "" : 'home-menu-active'} onClick={this.handleChange(false)}>销售量</span>
                        </div>
                    }
                    extra={<RangePicker
                        defaultValue={[moment('2020/11/10', dateFormat), moment('2019/11/24', dateFormat)]}
                        format={dateFormat}
                      />}
                >
                    <Card
                        className="home-table-left"
                        title={isVisited ? '访问趋势' : '销售趋势'}
                        bodyStyle={{ padding: 0, height: 275 }}
                        extra={<QuestionCircleOutlined />}
                    >
                        <Bar />
                    </Card>
                    <Card title='任务' extra={<QuestionCircleOutlined/>} className="home-table-right">
                        <Timeline>
                            <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                            <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                            <Timeline.Item color="red">
                                <p>联调接口</p>
                                <p>功能验收</p>
                            </Timeline.Item>
                            <Timeline.Item>
                                <p>登录功能设计</p>
                                <p>权限验证</p>
                                <p>页面排版</p>
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                </Card> 
            
            </div >
        )
    }
}