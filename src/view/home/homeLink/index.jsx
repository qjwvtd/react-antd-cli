import React, { PureComponent, Fragment } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

export default class HomeLink extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            menuKeys: ['member', 'equipment', 'safeCenter', 'workScopeInfo', 'projectSetting'],
            openKeys: ['member']
        };
    }
    //点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。
    onChangeMunuEvent(openKeys) {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        console.log(openKeys);
        if (this.state.menuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    }
    render() {
        const { collapsed, collapsedEvent, linkClickEvent } = this.props;
        return (
            <Fragment>
                <Button type="primary" onClick={() => collapsedEvent()} style={{ margin: '10px auto' }}>
                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onChangeMunuEvent.bind(this)}
                    inlineCollapsed={collapsed}
                >
                    <Menu.Item key="member">
                        <Link to="/home/member" replace onClick={() => linkClickEvent('成员管理')}>
                            <Icon type="pie-chart" />
                            <span>成员管理</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="equipment"
                        title={
                            <Link to="/home/equipment" replace onClick={() => linkClickEvent('设备管理')}>
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
                            <Link to="/home/safe" replace onClick={() => linkClickEvent('安全中心')}>
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
                            <Link to="/home/scope" replace onClick={() => linkClickEvent('作业面信息')}>
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
                            <Link to="/home/setting" replace onClick={() => linkClickEvent('项目设置')}>
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
}