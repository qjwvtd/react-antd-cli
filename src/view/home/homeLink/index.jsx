import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Menu, Icon, Button } from 'antd';

const { SubMenu } = Menu;

export default function MainLink(props) {
    const { collapsed, callback } = props;
    return (
        <Fragment>
            <Button type="primary" onClick={() => callback()} style={{ marginBottom: 16 }}>
                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
            >
                <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>通讯录</span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="mail" />
                            <span>工程项目</span>
                        </span>
                    }
                >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="appstore" />
                            <span>我的企业</span>
                        </span>
                    }
                >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <Menu.Item key="2">
                    <Icon type="desktop" />
                    <span>系统设置</span>
                </Menu.Item>
            </Menu>
        </Fragment>
    );
}