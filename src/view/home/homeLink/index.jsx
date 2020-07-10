import React, { PureComponent, Fragment } from 'react';
import { Menu } from 'antd';
import { TeamOutlined, GroupOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

export default class HomeLink extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            menuKeys: ['member', 'equipment', 'projectSetting'],
            openKeys: ['member']
        };
    }
    //点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。
    onChangeMunuEvent(openKeys) {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.menuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    }
    render() {
        const { linkClickEvent } = this.props;
        return (
            <Fragment>
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onChangeMunuEvent.bind(this)}
                >
                    <Menu.Item key="member">
                        <Link to="/home/member" replace onClick={() => linkClickEvent('成员管理')}>
                            <TeamOutlined />
                            <span>成员管理</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="equipment"
                        title={
                            <Link to="/home/equipment" replace onClick={() => linkClickEvent('设备管理')}>
                                <GroupOutlined />
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
                        key="projectSetting"
                        title={
                            <Link to="/home/setting" replace onClick={() => linkClickEvent('项目设置')}>
                                <SettingOutlined />
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