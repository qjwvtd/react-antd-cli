import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import Logo from '@/view/component/logo';

//Logo
import logo from '@/static/images/logo.png';

export default class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <React.Fragment>
                <Row className="clearfix">
                    <Col span={10}>
                        <Logo link={null} />
                    </Col>
                    <Col span={14} className="text-right">
                        <Button type="primary" shape="round"><Link to="/login">登  录</Link></Button>
                        <Button type="primary" shape="round">微信小程序</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <h3>智安汇是什么？</h3>
                        <p>
                            智安汇以智能硬件为入口，以项目管控为核心，聚焦现场工程进度、安全管控、协同管理，保证业务各方高效沟通；同时采集现场人员健康数据，确保安全施工，让工程管理更高效、工人作业更安全！
                        </p>
                    </Col>
                    <Col span={12}>
                        UI图
                    </Col>
                </Row>
                <Row>
                    <Button type="primary" shape="round">观看视频</Button>
                </Row>
            </React.Fragment>
        );
    }
}