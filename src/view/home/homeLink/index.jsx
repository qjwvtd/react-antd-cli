import React, { PureComponent, Fragment } from 'react';
import { Menu } from 'antd';
import { TeamOutlined, GroupOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

export default class HomeLink extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            menuKeys: ['module1', 'module2', 'module3'],
            openKeys: ['module1']
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
                    <Menu.Item key="module1">
                        <Link to="/home/module1" replace onClick={() => linkClickEvent('模块1')}>
                            <TeamOutlined />
                            <span>模块1</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="module2"
                        title={
                            <Link to="/home/module2" replace onClick={() => linkClickEvent('模块2')}>
                                <GroupOutlined />
                                <span>模块2</span>
                            </Link>
                        }
                    >
                        <Menu.Item key="module21">Option 1</Menu.Item>
                        <Menu.Item key="module22">Option 2</Menu.Item>
                        <Menu.Item key="module23">Option 3</Menu.Item>
                        <Menu.Item key="module24">Option 4</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="module13"
                        title={
                            <Link to="/home/module3" replace onClick={() => linkClickEvent('模块3')}>
                                <SettingOutlined />
                                <span>模块3</span>
                            </Link>
                        }
                    >
                        <Menu.Item key="module31">Option 1</Menu.Item>
                        <Menu.Item key="module32">Option 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="module4">
                        <Link to="/home/module4" replace onClick={() => linkClickEvent('模块4')}>
                            <TeamOutlined />
                            <span>模块4</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Fragment>
        );
    }
}