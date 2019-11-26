import React, { Fragment } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

export default function MainLink(props) {
    const { collapsed, callback } = props;
    return (
        <Fragment>
            <Button type="primary" onClick={() => callback()} style={{ margin: '10px auto' }}>
                <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
            <Menu
                defaultSelectedKeys={['member']}
                defaultOpenKeys={['equipment']}
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
            >
                <Menu.Item key="member">
                    <Link to="/member">
                        <Icon type="pie-chart" />
                        <span>成员管理</span>
                    </Link>
                </Menu.Item>
                <SubMenu
                    key="equipment"
                    title={
                        <Link to="/equipment">
                            <Icon type="mail" />
                            <span>设备管理</span>
                        </Link>
                    }
                >
                    <Menu.Item key="equipment1">Option 1</Menu.Item>
                    <Menu.Item key="equipment2">Option 2</Menu.Item>
                    <Menu.Item key="equipment3">Option 3</Menu.Item>
                    <Menu.Item key="equipment4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="safeCenter"
                    title={
                        <Link to="safe">
                            <Icon type="appstore" />
                            <span>安全中心</span>
                        </Link>
                    }
                >
                    <Menu.Item key="safeCenter1">Option 1</Menu.Item>
                    <Menu.Item key="safeCenter2">Option 2</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="workScopeInfo"
                    title={
                        <Link to="scope">
                            <Icon type="desktop" />
                            <span>作业面信息</span>
                        </Link>
                    }
                >
                    <Menu.Item key="workScopeInfo1">Option 1</Menu.Item>
                    <Menu.Item key="workScopeInfo2">Option 2</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="projectSetting"
                    title={
                        <Link to="/setting">
                            <Icon type="desktop" />
                            <span>项目设置</span>
                        </Link>
                    }
                >
                    <Menu.Item key="projectSetting1">Option 1</Menu.Item>
                    <Menu.Item key="projectSetting2">Option 2</Menu.Item>
                </SubMenu>
            </Menu>
        </Fragment>
    );
}