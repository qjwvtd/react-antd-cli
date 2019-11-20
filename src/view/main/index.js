import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Row, Col, Dropdown, Button } from 'antd';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'appstore'
        };
    }
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    };
    userStatus = () => {
        return (<Menu style={{ textAlign: 'center' }}>
            <Menu.Item>
                <Link to="/">修改密码</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/login">安全退出</Link>
            </Menu.Item>
        </Menu>);
    };
    render () {
        const { SubMenu } = Menu;
        return (
            <React.Fragment>
                <Row className="head-container">
                    <Col span={2}>
                        <Link className="head-logo" to="/">
                            <img src="http://www.dhwork.cn/favicon.ico" style={{ width: '30px', height: '30px' }} />
                            <span>运营后台</span>
                        </Link>
                    </Col>
                    <Col span={20} style={{ textAlign: 'center' }}>
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
                            <SubMenu
                                title={
                                    <span className="submenu-title-wrapper">
                                        <Icon type="appstore" />
                                        业务模块
                                    </span>
                                }
                            >
                                <Menu.Item key="appstore:1">智安汇</Menu.Item>
                                <Menu.Item key="appstore:2">天天云志</Menu.Item>
                                <Menu.Item key="appstore:3">招聘产品</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                title={
                                    <span className="submenu-title-wrapper">
                                        <Icon type="setting" />
                                        系统设置
                                    </span>
                                }
                            >
                                <Menu.Item key="setting:1">帐户管理</Menu.Item>
                                <Menu.Item key="setting:2">角色管理</Menu.Item>
                                <Menu.Item key="setting:3">操作日志</Menu.Item>
                            </SubMenu>
                            <Menu.Item><Icon type="apartment" />生产流程</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={2}>
                        <Dropdown overlay={this.userStatus()} placement="bottomLeft" trigger={['hover']}>
                            <div className="head-status">
                                <Icon type="user" />
                                贺鹏阳
                            </div>
                        </Dropdown>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}