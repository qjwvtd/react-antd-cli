import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Dropdown, Menu, Icon, Popover } from 'antd';

import { removeToken } from '@/common/utils';

import Logo from '@/view/component/logo';

const avtar = require('@/static/images/avtar.svg');

export default class HomeHead extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    dropdownMenu() {
        return <Menu>
            <Menu.Item>
                <div>项目1</div>
                <div>项目2</div>
                <div>项目3</div>
            </Menu.Item>
            <Menu.Item>
                账号设置
            </Menu.Item>
            <Menu.Item>
                <Link to="/" onClick={() => this.logout()}>退出登录</Link>
            </Menu.Item>
        </Menu>;
    }
    logout() {
        removeToken();
        localStorage.clear();
        sessionStorage.clear();
    }
    render() {
        return (
            <Fragment>
                <Row className="sass-ui-head">
                    <Col span={12} className="head-logo">
                        <Logo link={'/'} />
                    </Col>
                    <Col span={12} className="head-status">
                        <div>
                            <img src={avtar} title="头像" />
                            <Popover placement="bottomRight" content={this.dropdownMenu()} trigger="click">
                                <span>贺蓬阳<Icon type="caret-down" /></span>
                            </Popover>
                            <Dropdown overlay={() => this.dropdownMenu()} placement="bottomRight">
                                <span>贺蓬阳<Icon type="caret-down" /></span>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }

}
