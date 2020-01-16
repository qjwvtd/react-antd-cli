import React, { useState } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { setCurrentMenuKeys, getCurrentMenuKeys, setCurrentSubMenuKeys, getCurrentSubMenuKeys } from '@/common/store/storage';

const { SubMenu } = Menu;

const MainMenu = () => {
    const [openKeys, setOpenKeys] = useState(getCurrentMenuKeys() || ['1']);
    const [submenuKeys, setSubmenuKeys] = useState(getCurrentSubMenuKeys() || ['11']);
    //设置一级导航Menu的KEY
    function onChangeMunuEvent({ selectedKeys }) {
        setOpenKeys(selectedKeys);
        setCurrentMenuKeys(selectedKeys);
    }
    //设置SubMenu导航的keys
    function onChangeSubMenuKeys(keys) {
        setSubmenuKeys(keys);
        setCurrentSubMenuKeys(keys);
    }
    return (
        <Menu
            mode="inline"
            theme={'dark'}
            defaultSelectedKeys={openKeys}
            defaultOpenKeys={submenuKeys}
            openKeys={submenuKeys}
            onSelect={onChangeMunuEvent}
        >
            <SubMenu
                key="1"
                title={<span onClick={() => onChangeSubMenuKeys(['1'])}><Icon type="user" /><span>用户管理</span></span>}
            >
                <Menu.Item key="11">
                    <Link to='/home/userTrial' replace>试用用户</Link>
                </Menu.Item>
                <Menu.Item key="12">
                    <Link to="/home/userFormal" replace>正式用户</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="2"
                title={<span onClick={() => onChangeSubMenuKeys(['2'])}><Icon type="folder" /><span>项目管理</span></span>}
            >
                <Menu.Item key="21">
                    <Link to="/home/project" replace>项目管理</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="3"
                title={<span onClick={() => onChangeSubMenuKeys(['3'])}><Icon type="printer" /><span>设备管理</span></span>}
            >
                <Menu.Item key="31">
                    <Link to="/home/equipment_list" replace>设备管理</Link>
                </Menu.Item>
                <Menu.Item key="32">
                    <Link to='/home/equipment_fault' replace>设备故障管理</Link>
                </Menu.Item>
                <Menu.Item key="33">
                    <Link to='/home/equipment_types' replace>设备类型</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="4"
                title={<span onClick={() => onChangeSubMenuKeys(['4'])}><Icon type="message" /><span>消息中心</span></span>}
            >
                <Menu.Item key="41">
                    <Link to="/home/message_list" replace>消息列表</Link>
                </Menu.Item>
                <Menu.Item key="42">
                    <Link to='/home/message_push' replace>消息推送</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="5"
                title={<span onClick={() => onChangeSubMenuKeys(['5'])}><Icon type="safety-certificate" /><span>安全策略</span></span>}
            >
                <Menu.Item key="51">
                    <Link to="/home/safeSetting" replace>安全设置</Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key="6"
                title={<span onClick={() => onChangeSubMenuKeys(['6'])}><Icon type="setting" /><span>系统管理</span></span>}
            >
                <Menu.Item key="61">
                    <Link to="/home/systemAccount" replace>账户管理</Link>
                </Menu.Item>
                <Menu.Item key="62">
                    <Link to="/home/systemRole" replace>角色管理</Link>
                </Menu.Item>
                <Menu.Item key="63">
                    <Link to="/home/systemLog" replace>操作日志</Link>
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};
export default MainMenu;
