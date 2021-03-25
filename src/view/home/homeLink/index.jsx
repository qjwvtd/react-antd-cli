import React, { Fragment, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import router from '@/common/router';

const { SubMenu } = Menu;
const rootSubmenuKeys = ['sub1', 'sub2'];
export default function HomeLink({ linkClickEvent }) {
    const [current, updateCurrent] = useState('1');
    const [openKey, updateOpenKey] = useState(['sub1']);
    const homeRouterMap = {
        '1': '/home/arrayToLinkList',
        '2': '/home/reduxDemo',
        '3': '/home/useGlobalHookDemo',
        '4': '/home/hookStateDemo',
        '5': '/home/recoilDemo',
        '6': '/home/mobxDemo',
        '7': '/home/constateDemo',
        '99': '/home/customHook'
    };
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
    useEffect(() => {
        const pathname = router.location.pathname;
        for (let key in homeRouterMap) {
            if (homeRouterMap[key] === pathname) {
                updateCurrent(key);
            }
        }
    }, []);
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
                <Link to="/home/arrayToLinkList" replace onClick={() => linkClickEvent('模块1')}>
                    <AppstoreOutlined />
                    <span>数组转链表</span>
                </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="React状态管理">
                <Menu.Item key="2">
                    <Link to="/home/reduxDemo" replace onClick={() => linkClickEvent('模块2')}>
                        <AppstoreOutlined />
                        <span>redux</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/home/useGlobalHookDemo" replace onClick={() => linkClickEvent('模块3')}>
                        <AppstoreOutlined />
                        <span>use-global-hook</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/home/hookStateDemo" replace onClick={() => linkClickEvent('模块4')}>
                        <AppstoreOutlined />
                        <span>react hook state</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/home/recoilDemo" replace onClick={() => linkClickEvent('模块6')}>
                        <AppstoreOutlined />
                        <span>recoil</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to="/home/mobxDemo" replace onClick={() => linkClickEvent('模块6')}>
                        <AppstoreOutlined />
                        <span>mobx,mobx-react</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link to="/home/constateDemo" replace onClick={() => linkClickEvent('模块7')}>
                        <AppstoreOutlined />
                        <span>constate</span>
                    </Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="99">
                <Link to="/home/customHook" replace onClick={() => linkClickEvent('模块99')}>
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
