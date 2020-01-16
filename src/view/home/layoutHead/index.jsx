import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Row, Col, Dropdown, Menu, Icon } from 'antd';
import Logo from '@/view/component/logo';
import user from '@/common/store/user';

const MainHead = observer(() => {
    //退出
    function logout() {
        user.logout();
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to='/updatePassword'>
                    <Icon type="setting" style={{ marginRight:'8px' }} />修改密码
                </Link>
            </Menu.Item>
            <Menu.Item onClick={logout}>
                <Icon type="logout" />退出
            </Menu.Item>
        </Menu>
    );
    const HeadNode = (
        <Row>
            <Col span={8}>
                <Logo type={1} />
            </Col>
            <Col span={8} offset={8} className="text-right">
                <Dropdown overlay={menu}>
                    <a style={{ color:'#ffffff' }}>
                        <Icon type="user" /> {user.data.name} <Icon type="down" />
                    </a>
                </Dropdown>
            </Col>
        </Row>
    );
    return HeadNode;
});
export default MainHead;
