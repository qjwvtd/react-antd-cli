import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Row, Col, Dropdown } from 'antd';
import Logo from './../logo';

export default class Head extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            current: 'contacts'
        };
    }
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    }
    userStatus = () => {
        return (<Menu style={{ textAlign: 'center' }}>
            <Menu.Item>
                <Link to="/setPassword">修改密码</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/">安全退出</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/register">注册</Link>
            </Menu.Item>
        </Menu>);
    }
    render() {
        const { SubMenu } = Menu;
        return (
            <Row className="dhsass-head-container">
                <Col span={3}>
                    <Logo link='/main' />
                </Col>
                <Col span={19} style={{ textAlign: 'center' }}>
                    <Menu onClick={() => this.handleClick(event)} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
                        <Menu.Item><Icon type="contacts" />通讯录</Menu.Item>
                        <SubMenu
                            title={
                                <span className="submenu-title-wrapper">
                                    <Icon type="appstore" />
                                    工程项目
                                </span>
                            }
                        >
                            <Menu.Item key="appstore:1">项目管理</Menu.Item>
                            <Menu.Item key="appstore:2">群组通话管理</Menu.Item>
                            <Menu.Item key="appstore:3">团队人员管理</Menu.Item>
                            <Menu.Item key="appstore:4">作业面管理</Menu.Item>
                            <Menu.Item key="appstore:5">安全中心</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            title={
                                <span className="submenu-title-wrapper">
                                    <Icon type="cluster" />
                                    我的企业
                                </span>
                            }
                        >
                            <Menu.Item key="buisess:1">企业详情</Menu.Item>
                            <Menu.Item key="buisess:2">申请加入设置</Menu.Item>
                            <Menu.Item key="buisess:3">企业公告管理</Menu.Item>
                            <Menu.Item key="buisess:4">审核管理</Menu.Item>
                            <Menu.Item key="buisess:5">设备管理</Menu.Item>
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
                    </Menu>
                </Col>
                <Col span={2}>
                    <Dropdown overlay={this.userStatus} placement="bottomLeft" trigger={['hover']}>
                        <div className="head-status">
                            <Icon type="user" />
                            贺鹏阳
                        </div>
                    </Dropdown>
                </Col>
            </Row>
        );
    }
}