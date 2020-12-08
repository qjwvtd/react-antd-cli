import React, { Fragment, useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import router from '@/common/router';

const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2'];
export default function HomeLink({ linkClickEvent }) {
    const [current, updateCurrent] = useState('1');
    const [openKey, updateOpenKey] = useState(['sub1']);
    function handleClick(e) {
        console.log(e);
        updateCurrent(e.key);
    }
    function handleChange(keys) {
        console.log(keys);
        const latestOpenKey = keys.find(key => openKey.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            updateOpenKey(keys);
        } else {
            updateOpenKey(latestOpenKey ? [latestOpenKey] : []);
        }
    }
    return <Fragment>
        <Menu
            mode="inline"
            theme={'light'}
            onClick={handleClick}
            onOpenChange={handleChange}
            selectedKeys={[current]}
            openKeys={openKey}
        >
            <Menu.Item key="1">
                <Link to="/home/module1" replace onClick={() => linkClickEvent('模块1')}>
                    <AppstoreOutlined />
                    <span>Mobx状态管理</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/home/module2" replace onClick={() => linkClickEvent('模块2')}>
                    <AppstoreOutlined />
                    <span>数组转链表</span>
                </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="模块3">
                <Menu.Item key="3">
                    <Link to="/home/module3" replace onClick={() => linkClickEvent('模块3')}>
                        <AppstoreOutlined />
                        <span>use-global-hook</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="模块4">
                <Menu.Item key="4">
                    <Link to="/home/module4" replace onClick={() => linkClickEvent('模块4')}>
                        <AppstoreOutlined />
                        <span>useReducer和useContext</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
                <Link to="/home/module5" replace onClick={() => linkClickEvent('模块5')}>
                    <AppstoreOutlined />
                    <span>自定义Hook</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="100">
                <a onClick={() => { linkClickEvent('error page'); router.push('/error'); }}>
                    <AppstoreOutlined />
                    <span>Error Page</span>
                </a>
            </Menu.Item>
        </Menu>
    </Fragment >;
}
