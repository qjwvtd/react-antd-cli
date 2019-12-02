import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import LogoBlackIcon from '@/static/images/logo-black.svg';

//登录页容器
export default function MainLoginAndGuideWrap(props) {
    const { children } = props;
    return (
        <Fragment>
            <div className="mainWarpContainer">
                <Row className="main-login-head">
                    <Col span={16} offset={4}>
                        <Link to="/">
                            <img src={LogoBlackIcon} />
                            <span>智安汇</span>
                        </Link>
                    </Col>
                </Row>
                <Row className="mainLoginAndGuideWrap">
                    {children}
                </Row>
                <div className="mainLoginAndGuideFoot"> © 2018 - 2019 DHwork ltc. All Rights Reserved</div>
            </div>
        </Fragment>
    );
}