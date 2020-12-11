import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Row, Col, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { removeToken } from '@/common/utils';
import Logo from '@/view/component/logo';

const avtar = require('@/assets/images/avtar.png');
const HomeHead = inject('userStore')(observer(({ userStore }) => {
    function logout() {
        removeToken();
        localStorage.clear();
        sessionStorage.clear();
    }
    function dropdownMenu() {
        return <Menu>
            <Menu.Item>
                <Link to="/updatePassword">更新密码</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/test">测试组件</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/" onClick={logout}>退出登录</Link>
            </Menu.Item>
        </Menu>;
    }
    useEffect(() => {
        userStore.initUser();
    }, []);
    return <Fragment>
        <Row className="sass-ui-head" style={{ height: '44px', lineHeight: '44px', borderBottom: '1px solid #ccc' }}>
            <Col span={12} className="head-logo">
                <Logo link={'/'} />
            </Col>
            <Col span={11} className="head-status text-right">
                <div>
                    <img src={userStore.data.portrait || avtar} title="头像" style={{ width: '32px' }} />
                    <Dropdown overlay={dropdownMenu} placement="bottomRight">
                        <span>{userStore.data.name || 'zhangxiaojun'}<DownOutlined /></span>
                    </Dropdown>
                </div>
            </Col>
        </Row>
    </Fragment>;
}));
export default HomeHead;
