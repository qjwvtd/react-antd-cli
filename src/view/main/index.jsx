import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import Logo from "../component/logo";

export default class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <React.Fragment >
                <div className="guide_container">
                    <Row className="head" style={{ lineHeight: '60px' }}>
                        <Col span={8} offset={4} className="flex_between">
                            <Logo />
                        </Col>
                        <Col span={8} className="flex_between">
                            <div className='login_box'>
                                <Link to="/login">
                                    <Button className="login_btn" type="primary" ghost>登录</Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <Row className='info'>
                        <Col span={8} offset={4}>
                            <p className='title'>智安汇是什么？</p>
                            <div className='txt'>智安汇以智能硬件为入口，以项目管控为核心，聚焦现场工程进度、安全管控、协同管理，保证业务各方高效沟通；同时采集现场人员健康数据，确保安全施工，让工程管理更高效、工人作业更安全！</div>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}
