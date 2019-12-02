import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Dropdown, Menu, Icon } from 'antd';

import { removeToken } from '@/common/utils';

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
        const { title } = this.props;
        return (
            <Fragment>
                <Row className="dhsass-head-container">
                    <Col span={12} className="text-left">
                        <h4>{title}</h4>
                    </Col>
                    <Col span={12} className="head-status">
                        <div>
                            <img src={avtar} title="头像" />
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
